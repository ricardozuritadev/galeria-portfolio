import { NextRequest, NextResponse } from 'next/server';
import { fetchImagesFromFolder } from '@/lib/imagekit';

/**
 * API route to fetch images from an ImageKit folder
 * GET /api/images?folder=folderName
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const folder = searchParams.get('folder');

  if (!folder) {
    return NextResponse.json(
      { error: 'Folder parameter is required' },
      { status: 400 }
    );
  }

  try {
    const images = await fetchImagesFromFolder(folder);
    console.log(`Fetched ${images.length} images from folder: ${folder}`);
    if (images.length > 0) {
      console.log('Sample image URL:', images[0].url);
    }
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
