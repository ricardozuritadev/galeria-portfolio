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

  // If imagePath is already a full URL, use it directly
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
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
  
  return `${IMAGEKIT_URL_ENDPOINT}/${path}${separator}tr=${transformString}`;
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
