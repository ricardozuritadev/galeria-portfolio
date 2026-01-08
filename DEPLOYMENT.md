# Vercel Deployment Guide

## Prerequisites

1. **GitHub/GitLab/Bitbucket account** - Your code needs to be in a Git repository
2. **Vercel account** - Sign up at [vercel.com](https://vercel.com) (free)
3. **ImageKit.io account** - For image hosting (already set up)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git remote -v  # Check if remote exists
   # If no remote, add one:
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Settings" → "Environment Variables"
   - Add these three variables:
     ```
     NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT = https://ik.imagekit.io/your_imagekit_id
     IMAGEKIT_PUBLIC_KEY = your_public_key
     IMAGEKIT_PRIVATE_KEY = your_private_key
     ```
   - Make sure to add them for **Production**, **Preview**, and **Development** environments

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app automatically
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked about environment variables, add them or configure later in dashboard

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Checklist

- [ ] Environment variables are set in Vercel dashboard
- [ ] Images are uploaded to ImageKit.io
- [ ] Image paths in gallery pages are updated with actual ImageKit.io paths
- [ ] Test all three gallery pages (pre-boda, pareja, maternidad)
- [ ] Test full-screen image viewer
- [ ] Test navigation between pages
- [ ] Test on mobile devices

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Errors
- Check that all environment variables are set
- Verify ImageKit.io credentials are correct
- Check build logs in Vercel dashboard

### Images Not Loading
- Verify ImageKit.io URL endpoint is correct
- Check that images are uploaded to ImageKit.io
- Verify image paths in gallery pages match ImageKit.io file paths

### Environment Variables Not Working
- Make sure variables are set for the correct environment (Production/Preview/Development)
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)
