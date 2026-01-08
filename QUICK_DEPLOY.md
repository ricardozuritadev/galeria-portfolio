# Quick Deploy to Vercel

## Fastest Method (5 minutes)

### 1. Push to GitHub
```bash
# If you haven't already, create a GitHub repo and push:
git remote add origin https://github.com/yourusername/galeria-portfolio.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `galeria-portfolio` repository
4. Click "Import"

### 3. Add Environment Variables
In the deployment settings, add these **Environment Variables**:

```
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
```
Value: `https://ik.imagekit.io/your_imagekit_id`

```
IMAGEKIT_PUBLIC_KEY
```
Value: `your_public_key_here`

```
IMAGEKIT_PRIVATE_KEY
```
Value: `your_private_key_here`

**Important:** Add these for all environments (Production, Preview, Development)

### 4. Deploy
Click "Deploy" and wait ~2 minutes. Your site will be live!

## Your Site URL
After deployment, you'll get a URL like:
`https://galeria-portfolio.vercel.app`

## Next Steps After Deployment
1. Update image URLs in the three gallery pages with your actual ImageKit.io paths
2. Test all pages on mobile and desktop
3. (Optional) Add a custom domain in Vercel settings

## Need Help?
- Check `DEPLOYMENT.md` for detailed instructions
- Vercel docs: https://vercel.com/docs
