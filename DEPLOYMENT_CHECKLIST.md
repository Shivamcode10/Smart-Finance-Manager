# Smart Finance Manager - Deployment Checklist

## Backend (Render)
- [ ] Set environment variables in Render dashboard
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
- [ ] Verify CORS origins include Vercel domain
- [ ] Test API endpoints with Vercel frontend domain
- [ ] Monitor logs for connection errors

## Frontend (Vercel)
- [ ] Create `vercel.json` with SPA rewrites ✅ DONE
- [ ] Create/update `manifest.json` ✅ DONE
- [ ] Set environment variables in Vercel dashboard:
  - [ ] `REACT_APP_API_URL=https://your-backend.onrender.com`
  - [ ] `REACT_APP_ENV=production`
- [ ] Create `.env` file locally (never commit) ✅ DONE
- [ ] Build locally: `npm run build`
- [ ] Test build: `npm run start`
- [ ] Push to GitHub and trigger Vercel deployment
- [ ] Test preview deployments
- [ ] Test production deployment
  - [ ] All API calls work
  - [ ] Socket.IO connections work
  - [ ] Page refresh doesn't cause 404
  - [ ] Manifest.json loads correctly
  - [ ] No CORS errors in console

## Testing
- [ ] Login/Register on preview
- [ ] Create transaction on preview
- [ ] Create goal on preview
- [ ] Budgets functionality works
- [ ] Income streams functionality works
- [ ] Real-time updates via Socket.IO
- [ ] Check Network tab for duplicate `/api` paths
- [ ] Verify no hardcoded `localhost` URLs
- [ ] Voice commands work (if applicable)
- [ ] Data export works

## Configuration Summary
- API Utility: `frontend/src/utils/api.js` ✅ DONE
- Environment Variables: `frontend/.env` ✅ DONE
- Vercel Config: `frontend/vercel.json` ✅ DONE
- Manifest: `frontend/public/manifest.json` ✅ DONE