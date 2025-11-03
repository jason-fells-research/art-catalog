# Art Catalog — Family Collection

Provenance and value documentation for the Prohaska family art collection.

## Features

- **Static Site**: No backend server required, hosted on Netlify
- **Netlify CMS**: Family members can edit artwork details through `/admin`
- **Git-Based**: All changes tracked in version control
- **Mobile Friendly**: Responsive design works on all devices

## Editing the Collection

1. Go to [https://art-catalog-live.netlify.app/admin/](https://art-catalog-live.netlify.app/admin/)
2. Sign in with your email (must be invited first)
3. Click "Artworks" in the sidebar
4. Edit any artwork or create new entries
5. Click "Save" to publish changes

## For Administrators

### Inviting New Editors

1. Go to Netlify dashboard → Identity
2. Click "Invite users"
3. Enter email address
4. User will receive invitation email

### Local Development

```bash
# Serve locally
python3 -m http.server 8000 --directory public

# Open browser
open http://localhost:8000
```

## Structure

```
art-catalog/
├── content/artworks/     # Markdown files for each artwork
├── public/
│   ├── admin/           # Netlify CMS admin interface
│   ├── photos/          # Artwork images
│   ├── css/             # Styles
│   ├── js/              # Gallery JavaScript
│   └── index.html       # Main gallery page
├── build.sh             # Build script
└── netlify.toml         # Netlify configuration
```

## Contact

For access or questions, contact Jason at sjasonprohaska@gmail.com

---

© 2025 Prohaska Family · Managed via ETHRAEON Systems
