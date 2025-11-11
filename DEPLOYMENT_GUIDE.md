# 🌐 Deployment Guide

Complete guide to deploy your BlogApp to production.

## 📊 Deployment Architecture

```
┌─────────────────────────┐
│   Vercel/Netlify        │
│   (Frontend - Next.js)  │
└────────────┬────────────┘
             │
      ┌──────┴──────┐
      │ HTTPS/CORS  │
      │             │
┌─────v──────────────────┐
│  Render/Railway/Heroku  │
│   (Backend - Express)   │
└────────────┬────────────┘
             │
      ┌──────┴──────┐
      │ MongoDB URI │
      │             │
┌─────v──────────────────┐
│   MongoDB Atlas         │
│   (Database)            │
└─────────────────────────┘
```

---

## 🚀 Backend Deployment

### Option 1: Render (Recommended - Free Tier Available)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repo

3. **Configure Service**
   - Name: `blogapp-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start` (or `node src/index.js`)
   - Runtime: `Node`

4. **Set Environment Variables**
   - Add the following in Environment tab:
   ```
   PORT=7777
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=YourStrongSecretKey
   NODE_ENV=production
   CLIENT_URL=https://yourdomain.com
   ```

5. **Deploy**
   - Click "Deploy Service"
   - Wait for build to complete
   - You'll get a URL like: `https://blogapp-api.onrender.com`

### Option 2: Railway

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Connect Project**
   - Create new project
   - Select GitHub repo
   - Select the `/server` directory

3. **Add MongoDB**
   - Click "Add"
   - Select "MongoDB"
   - It will auto-configure the connection string

4. **Set Variables**
   ```
   JWT_SECRET=YourStrongSecretKey
   NODE_ENV=production
   CLIENT_URL=https://yourdomain.com
   ```

5. **Deploy**
   - Push to main branch
   - Railway auto-deploys
   - Get your API URL

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   brew tap heroku/brew && brew install heroku
   heroku login
   ```

2. **Create App**
   ```bash
   cd server
   heroku create blogapp-api
   ```

3. **Set Config Variables**
   ```bash
   heroku config:set MONGO_URI="mongodb+srv://..."
   heroku config:set JWT_SECRET="YourStrongSecretKey"
   heroku config:set NODE_ENV="production"
   heroku config:set CLIENT_URL="https://yourdomain.com"
   ```

4. **Deploy**
   ```bash
   git push heroku main
   heroku logs --tail
   ```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended - Official Next.js Host)

1. **Connect Repository**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo

2. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build
   - Get your domain: `yourdomain.vercel.app`

### Option 2: Netlify

1. **Connect Repository**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select GitHub repo

2. **Configure Build**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `.next/out` or `.next`

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

4. **Deploy**
   - Click "Deploy site"

### Option 3: GitHub Pages (Static Export)

Requires changing Next.js to export static HTML:

1. **Update next.config.mjs**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
   };
   export default nextConfig;
   ```

2. **Update client/.env.local**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

3. **Build**
   ```bash
   cd client
   npm run build
   ```

4. **Deploy to GitHub Pages**
   - Push the `out` folder to `gh-pages` branch

---

## 🔐 Security Checklist

- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS for all URLs
- [ ] Add MongoDB whitelist for your server IP
- [ ] Keep environment variables secret
- [ ] Add rate limiting to API
- [ ] Validate all inputs
- [ ] Use CORS properly with exact domain
- [ ] Implement HTTPS redirects
- [ ] Set secure cookie flags

---

## 🔄 Production Environment Variables

### Backend (.env)
```
PORT=7777
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogapp?retryWrites=true&w=majority
JWT_SECRET=SuperSecretKey123!@#RandomString$%^&*()
NODE_ENV=production
CLIENT_URL=https://yourblogapp.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.yourblogapp.com
```

---

## 📈 Performance Optimization

### Backend
1. **Enable GZIP compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add database indexing**
   ```javascript
   userSchema.index({ email: 1 });
   postSchema.index({ author: 1, createdAt: -1 });
   ```

3. **Implement caching**
   - Use Redis for session storage
   - Cache popular posts

4. **Monitor with**
   - Application logs
   - Error tracking (Sentry)
   - Performance monitoring (New Relic)

### Frontend
1. **Image optimization**
   - Use Next.js Image component
   - Compress images
   - Use WebP format

2. **Code splitting**
   - Dynamic imports
   - Route-based splitting

3. **Performance metrics**
   - Lighthouse CI
   - Web Vitals monitoring

---

## 🔗 Domain & DNS

1. **Buy Domain**
   - GoDaddy, Namecheap, Route53, etc.

2. **Configure DNS**
   - For Vercel: Use Vercel nameservers or CNAME
   - For Netlify: Similar process
   - For custom backend: Add A record or CNAME

3. **SSL Certificate**
   - Vercel/Netlify provide free HTTPS
   - Render/Railway provide free HTTPS

---

## 🚀 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd server && npm install
      - run: cd server && npm test
      - name: Deploy to Render
        run: |
          # Add your deployment script here

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📊 Monitoring & Logging

### Backend Monitoring
- Monitor error rates
- Track API response times
- Monitor database queries
- Set up alerts for downtime

Tools:
- Sentry (error tracking)
- LogRocket (session replay)
- New Relic (APM)
- Datadog (monitoring)

### Frontend Monitoring
- Track JavaScript errors
- Monitor performance
- User session tracking

Tools:
- Sentry
- Google Analytics
- Hotjar
- LogRocket

---

## 🔄 Database Backups

### MongoDB Atlas Backups
- Enable automatic backups
- Set retention policy
- Test restore procedures
- Export data regularly

```bash
# Export collection
mongodump --uri "mongodb+srv://..." --out ./backup

# Import collection
mongorestore --uri "mongodb+srv://..." ./backup
```

---

## 🛠️ Troubleshooting Deployment

### "CORS error" on production
- Check CLIENT_URL matches frontend domain
- Verify wildcard CORS for development
- Test API directly with curl

### "MongoDB connection timeout"
- Check IP whitelist in MongoDB Atlas
- Verify network connectivity
- Check connection string format
- Ensure cluster is running

### "Build fails on Vercel"
- Check build logs in Vercel dashboard
- Verify all dependencies installed
- Check for environment variable issues
- Ensure correct file paths

### "Frontend can't reach API"
- Verify NEXT_PUBLIC_API_URL is set
- Check API URL format (include /api)
- Test API with curl from frontend URL
- Check CORS headers

---

## 📞 Support Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## ✅ Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] SSL/HTTPS enabled
- [ ] CORS properly configured
- [ ] Error logging enabled
- [ ] Rate limiting implemented
- [ ] Security headers set
- [ ] Build tests pass
- [ ] Database indexes created
- [ ] Performance optimized

---

**Your app is ready for the world! 🌍🚀**
