# Environment Setup

## ImageKit.io Configuration

To use ImageKit.io for image hosting and optimization:

1. Sign up at [https://imagekit.io](https://imagekit.io)
2. Get your credentials from the dashboard:
   - URL Endpoint (e.g., `https://ik.imagekit.io/your_imagekit_id`)
   - Public Key
   - Private Key (from Developer Options)

3. Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
IMAGEKIT_PUBLIC_KEY=your_public_key_here
IMAGEKIT_PRIVATE_KEY=your_private_key_here
```

4. Replace the placeholder image URLs in the gallery pages (`app/pre-boda/page.tsx`, `app/pareja/page.tsx`, `app/maternidad/page.tsx`) with your actual ImageKit.io image paths.

## Adding Images

Update the `images` array in each gallery page with your ImageKit.io image paths. The `url` should be the path relative to your ImageKit.io URL endpoint.

Example:
```typescript
const images: GalleryImage[] = [
  {
    id: '1',
    url: 'pre-boda/image1.jpg', // Path in ImageKit.io
    alt: 'Pre-Boda 1',
  },
  // ... more images
];
```
