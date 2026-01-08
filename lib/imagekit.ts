/**
 * ImageKit.io utility functions
 * 
 * To use ImageKit.io:
 * 1. Sign up at https://imagekit.io
 * 2. Get your URL endpoint, public key, and private key
 * 3. Add them to .env.local:
 *    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
 *    IMAGEKIT_PUBLIC_KEY=your_public_key
 *    IMAGEKIT_PRIVATE_KEY=your_private_key
 */

const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '';

/**
 * ImageKit file response type from the Media API
 */
interface ImageKitFile {
  fileId: string;
  name: string;
  filePath: string;
  url?: string;
  width?: number;
  height?: number;
}

/**
 * Generate an optimized ImageKit.io URL with transformations
 * @param imagePath - The path to the image in ImageKit.io
 * @param width - Optional width for responsive images
 * @param quality - Optional quality (default: 80)
 * @returns Optimized image URL
 */
export function getImageKitUrl(
  imagePath: string,
  width?: number,
  quality: number = 80
): string {
  if (!IMAGEKIT_URL_ENDPOINT) {
    console.warn('ImageKit URL endpoint not configured. Using original URL.');
    return imagePath;
  }

  // If imagePath is already a full URL, add transformations if needed
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // If it's already an ImageKit URL, we might want to add transformations
    // But if it already has transformations, we'll use it as-is
    if (imagePath.includes('?tr=') || imagePath.includes('&tr=')) {
      return imagePath;
    }
    
    // Build transformation parameters
    const transformations: string[] = [];
    if (width) {
      transformations.push(`w-${width}`);
    }
    transformations.push(`q-${quality}`);
    transformations.push('f-auto');
    
    if (transformations.length > 0) {
      const transformString = transformations.join(',');
      const separator = imagePath.includes('?') ? '&' : '?';
      return `${imagePath}${separator}tr=${transformString}`;
    }
    
    return imagePath;
  }

  // Remove leading slash if present
  const path = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // Build transformation parameters
  const transformations: string[] = [];
  
  if (width) {
    transformations.push(`w-${width}`);
  }
  
  transformations.push(`q-${quality}`);
  transformations.push('f-auto'); // Auto format optimization

  const transformString = transformations.join(',');
  const separator = path.includes('?') ? '&' : '?';
  
  // Ensure IMAGEKIT_URL_ENDPOINT doesn't end with a slash
  const baseUrl = IMAGEKIT_URL_ENDPOINT.endsWith('/') 
    ? IMAGEKIT_URL_ENDPOINT.slice(0, -1) 
    : IMAGEKIT_URL_ENDPOINT;
  
  return `${baseUrl}/${path}${separator}tr=${transformString}`;
}

/**
 * Get responsive image URL with width
 * @param imagePath - The path to the image
 * @param width - Desired width
 * @returns Optimized image URL
 */
export function getResponsiveImageUrl(imagePath: string, width: number): string {
  return getImageKitUrl(imagePath, width);
}

/**
 * Get full-screen image URL (larger size)
 * @param imagePath - The path to the image
 * @returns Full-screen optimized image URL
 */
export function getFullScreenImageUrl(imagePath: string): string {
  // For full screen, use a large width (1920px max)
  return getImageKitUrl(imagePath, 1920, 90);
}

/**
 * Fetch images from an ImageKit folder using the Media API
 * @param folderPath - The folder path in ImageKit (e.g., 'pareja', 'pre-boda', 'maternidad')
 * @returns Array of image file information
 */
export async function fetchImagesFromFolder(folderPath: string) {
  const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!IMAGEKIT_PRIVATE_KEY) {
    throw new Error('IMAGEKIT_PRIVATE_KEY is not configured. Please check your .env.local file.');
  }

  // ImageKit Media API endpoint
  const apiUrl = 'https://api.imagekit.io/v1/files';
  
  // Ensure folder path starts with /
  const normalizedPath = folderPath.startsWith('/') ? folderPath : `/${folderPath}/`;

  try {
    // ImageKit uses HTTP Basic Auth: username = private key, password = empty string
    const authString = Buffer.from(`${IMAGEKIT_PRIVATE_KEY}:`).toString('base64');
    
    const response = await fetch(`${apiUrl}?path=${encodeURIComponent(normalizedPath)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ImageKit API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // ImageKit API might return an object with a files array, or just an array
    const files = Array.isArray(data) ? data : (data.files || data);
    
    if (!Array.isArray(files)) {
      console.error('Unexpected ImageKit API response format:', data);
      return [];
    }
    
    // Filter only image files and map to GalleryImage format
    const images = files
      .filter((file: ImageKitFile) => {
        const extension = file.name?.split('.').pop()?.toLowerCase();
        return extension && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
      })
      .map((file: ImageKitFile, index: number) => {
        // Prefer url if available (it's the direct ImageKit URL)
        // Otherwise use filePath (relative path that we'll convert to full URL)
        let imageUrl: string;
        
        if (file.url) {
          // Use the direct URL from ImageKit
          imageUrl = file.url;
        } else if (file.filePath) {
          // Use filePath and ensure it's properly formatted
          // filePath from ImageKit is usually like "/folder/image.jpg" or "folder/image.jpg"
          // Remove leading slash if present (getImageKitUrl will add it back)
          imageUrl = file.filePath.startsWith('/') ? file.filePath.slice(1) : file.filePath;
        } else {
          console.warn(`ImageKit file missing both url and filePath:`, file);
          imageUrl = '';
        }
        
        return {
          id: file.fileId || `img-${index}`,
          url: imageUrl,
          alt: file.name?.replace(/\.[^/.]+$/, '') || `Image ${index + 1}`,
          width: file.width,
          height: file.height,
        };
      });

    return images;
  } catch (error) {
    console.error('Error fetching images from ImageKit:', error);
    throw error;
  }
}
