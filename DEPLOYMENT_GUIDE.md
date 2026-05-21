# ScholarFlow Deployment Configuration Guide

## Overview
This document outlines the deployment configuration for ScholarFlow on Vercel, including fixes for port conflicts and production build optimization.

## Problem Statement
The application was failing to deploy with the error: `Error: Port 5199 is already in use`

**Root Cause**: The build process was attempting to start the Vite dev server during deployment instead of creating a static production build.

## Solution

### 1. Vercel Configuration (`vercel.json`)
Properly configured with:
- **buildCommand**: `npm run build` - Creates optimized production build
- **devCommand**: `vite` - Runs dev server locally only
- **framework**: `vite` - Declares Vite as the build framework
- **outputDirectory**: `dist` - Points to the built output
- **routes**: Configured SPA routing for client-side navigation

### 2. Vite Configuration (`vite.config.ts`)
Enhanced with:
- **Port Configuration**: Uses `process.env.PORT` for platform flexibility
- **strictPort: false**: Allows fallback to next available port
- **Build Optimization**: 
  - Minification with Terser
  - Console.log removal in production
  - Source maps disabled for smaller output
  - Optimized dependency pre-bundling

### 3. Package.json Scripts
Added production-ready scripts:
```json
{
  "dev": "vite",                    // Local development
  "build": "tsc -b && vite build",  // Production build
  "build:prod": "NODE_ENV=production npm run build",  // Explicit production
  "preview": "vite preview --port 3000",  // Local preview
  "start": "vite preview --port ${PORT:-3000}",  // Production server
  "lint": "eslint ."
}
```

### 4. Vercel Ignore File (`.vercelignore`)
Excludes unnecessary files from deployment:
- Documentation files (DATABASE_*.md, UI_UX_*.md, etc.)
- Development directories (v0_plans, scripts/)
- Build artifacts and logs
- IDE and OS files

## Deployment Process

### Local Development
```bash
npm install
npm run dev        # Starts Vite dev server on port 5199
npm run lint       # Check code quality
```

### Local Production Preview
```bash
npm run build      # Create production build
npm run preview    # Preview built app locally on port 3000
```

### Vercel Deployment
When you push to your Vercel-connected GitHub repository:

1. **Install Phase**: `npm install`
2. **Build Phase**: `npm run build`
   - TypeScript compilation: `tsc -b`
   - Vite optimization: `vite build`
   - Output to `/dist` directory
3. **Deploy Phase**: Static files served from `/dist`

## Environment Variables

### Available Variables
- `PORT`: Platform-provided port (Vercel auto-sets this)
- `NODE_ENV`: Automatically set to `production` during build

### Configuration
Set environment variables in Vercel project settings:
- Dashboard → Settings → Environment Variables
- Add any application-specific variables (e.g., `VITE_API_URL`)

## Troubleshooting

### Port Already in Use (Local Development)
```bash
# Already fixed in vite.config.ts with strictPort: false
# Falls back to next available port (5200, 5201, etc.)
npm run dev
```

### Build Failures
1. **Check build logs**: `vercel logs --production`
2. **Test locally**: `npm run build && npm run preview`
3. **Verify Node version**: Vercel uses Node 18+ (check project settings)

### Deployment Errors
1. **Port conflict**: Now resolved by Vercel config
2. **Missing dependencies**: Clear cache and rebuild
3. **TypeScript errors**: Run `npm run build` locally to verify

## Production Optimizations

### Build Output
- **Bundle Size**: Minified and tree-shaken by Vite
- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Asset Optimization**: Images and fonts optimized
- **Sourcemaps**: Disabled in production (reduce size)

### Server Configuration
- **SPA Routing**: All routes fallback to `/index.html` for client-side routing
- **Static Hosting**: Optimized for Vercel's global CDN
- **Caching**: HTTP headers configured for optimal caching

## Verification Checklist

Before deployment, verify:

- [ ] `npm install` completes without errors
- [ ] `npm run build` creates `/dist` folder with `index.html`
- [ ] `npm run preview` runs on port 3000
- [ ] `npm run lint` passes without errors
- [ ] `vercel.json` exists in project root
- [ ] `.vercelignore` excludes unnecessary files
- [ ] vite.config.ts has proper environment handling
- [ ] All environment variables set in Vercel dashboard

## Post-Deployment

### Monitoring
- Check Vercel dashboard for deployment status
- Monitor Analytics for performance
- Review logs for any runtime errors

### Rollback
If deployment fails:
1. Vercel automatically keeps previous builds
2. Use Vercel dashboard to redeploy previous version
3. Fix issues locally and push new commit

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Vite Deployment Guide](https://vitejs.dev/guide/ssr.html)
- [React Router Deployment](https://reactrouter.com)

## Key Configuration Files

1. **vercel.json** - Vercel platform configuration
2. **.vercelignore** - Files to exclude from deployment
3. **vite.config.ts** - Build and dev server configuration
4. **package.json** - Scripts and dependencies
5. **tsconfig.json** - TypeScript configuration

## Summary

The deployment configuration has been optimized to:
✓ Prevent port conflicts during deployment
✓ Create optimized production builds
✓ Properly handle environment variables
✓ Exclude unnecessary files from deployment
✓ Enable fast, reliable deployments on Vercel
✓ Support both local development and production preview

The app will now deploy cleanly without port conflicts or build errors.
