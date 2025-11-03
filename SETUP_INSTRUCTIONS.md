# Art Catalog Setup Instructions

## ✅ COMPLETED

1. ✅ Exported 63 artworks from SQLite to markdown files
2. ✅ Created static site with Netlify CMS
3. ✅ Pushed to GitHub: https://github.com/jason-fells-research/art-catalog
4. ✅ Deployed to Netlify: https://art-catalog-live.netlify.app

## 🔧 MANUAL STEPS REQUIRED (Jason)

### Step 1: Enable Netlify Identity (5 minutes)

1. Open https://app.netlify.com/projects/art-catalog-live/settings/identity
2. Click **"Enable Identity"**
3. Under "Registration preferences", select **"Invite only"**
4. Under "External providers", you can optionally enable Google/GitHub auth
5. Click **"Save"**

### Step 2: Enable Git Gateway (1 minute)

1. On the same Identity settings page, scroll to **"Services"**
2. Click **"Enable Git Gateway"**
3. This allows Netlify CMS to commit changes directly to GitHub

### Step 3: Link GitHub Repository (2 minutes)

1. Go to https://app.netlify.com/projects/art-catalog-live/settings/deploys
2. Under "Build settings", click **"Link repository"**
3. Select **GitHub** → **jason-fells-research/art-catalog**
4. Branch: **main**
5. Build command: `bash build.sh`
6. Publish directory: `public`
7. Click **"Save"**

### Step 4: Invite April and Mom (3 minutes each)

1. Go to https://app.netlify.com/projects/art-catalog-live/identity
2. Click **"Invite users"**
3. Enter April's email address
4. Click **"Send invite"**
5. Repeat for Mom's email address

They will receive an email with a link to set their password.

### Step 5: Test Editing

1. Go to https://art-catalog-live.netlify.app/admin/
2. Sign in with invited email
3. Click "Artworks" in sidebar
4. Click any artwork to edit
5. Make a test change
6. Click **"Save"** (this commits to GitHub)
7. Wait 1-2 minutes for automatic deploy
8. Refresh the main gallery to see changes

## 📧 EMAIL TO APRIL

**Subject:** Art Catalog is Ready - You Can Now Edit

Hi April,

I've set up the art catalog with an editing interface. You and Mom can now add provenance details, values, and notes for each piece.

**How to Edit:**
1. Go to: https://art-catalog-live.netlify.app/admin/
2. You'll receive an email invitation to set your password
3. Once logged in, click "Artworks" in the sidebar
4. Click any artwork to edit its details
5. Click "Save" when done - changes publish automatically

**What You Can Edit:**
- Title, Artist, Year
- Medium and Dimensions
- Estimated Value (e.g., "$10,000 - $60,000")
- Location / Provenance (where/when purchased)
- Notes (condition, certificates, etc.)

All changes are saved to our family archive and can be tracked over time.

Let me know if you have any questions!

Jason

---

**View Catalog:** https://art-catalog-live.netlify.app  
**Edit Catalog:** https://art-catalog-live.netlify.app/admin/

## 🔍 TROUBLESHOOTING

**Issue:** Can't access /admin
- Make sure Netlify Identity is enabled (Step 1 above)

**Issue:** "Unable to locate site configuration" 
- Make sure Git Gateway is enabled (Step 2 above)

**Issue:** Can't sign in
- Make sure user was invited through Netlify dashboard (Step 4 above)

**Issue:** Changes not appearing
- Changes take 1-2 minutes to build and deploy
- Check build status: https://app.netlify.com/projects/art-catalog-live/deploys

