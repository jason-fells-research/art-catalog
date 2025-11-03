#!/bin/bash
# Build script for art catalog

# Generate artworks manifest
echo "Generating artworks manifest..."
ls content/artworks/*.md | xargs -n1 basename | jq -R -s -c 'split("\n") | map(select(length > 0))' > public/artworks-manifest.json

# Copy content to public
echo "Copying content to public..."
cp -r content public/

echo "Build complete!"
echo "Total artworks: $(cat public/artworks-manifest.json | jq length)"
