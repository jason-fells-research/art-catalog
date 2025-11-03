// Simple frontmatter parser
function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: text };

  const frontmatter = match[1];
  const content = match[2];

  const data = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      data[key] = value;
    }
  });

  return { data, content };
}

// Load and display artworks
async function loadGallery() {
  try {
    const response = await fetch('/artworks-manifest.json');
    const manifest = await response.json();

    const gallery = document.getElementById('gallery');
    const loading = document.getElementById('loading');

    // Load all artworks
    const artworks = await Promise.all(
      manifest.map(async (filename) => {
        try {
          const res = await fetch(`/content/artworks/${filename}`);
          const text = await res.text();
          const parsed = parseFrontmatter(text);
          return { ...parsed.data, body: parsed.content, filename };
        } catch (err) {
          console.error(`Failed to load ${filename}:`, err);
          return null;
        }
      })
    );

    // Filter out failures and sort
    const validArtworks = artworks
      .filter(a => a !== null)
      .sort((a, b) => {
        const aPrio = parseInt(a.priority) || 0;
        const bPrio = parseInt(b.priority) || 0;
        if (aPrio !== bPrio) return bPrio - aPrio;
        return (a.ref || '').localeCompare(b.ref || '');
      });

    // Render cards
    validArtworks.forEach(artwork => {
      const card = document.createElement('div');
      card.className = 'card';

      const photoSrc = artwork.photo
        ? `/photos/${artwork.photo}`
        : '/photos/placeholder.jpg';

      const isPriority = (parseInt(artwork.priority) || 0) > 50;

      card.innerHTML = `
        <img src="${photoSrc}"
             alt="${artwork.title || 'Untitled'}"
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22320%22%3E%3Crect fill=%22%23e5e5e5%22 width=%22400%22 height=%22320%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22%3ENo Image Available%3C/text%3E%3C/svg%3E'">
        <div class="card-content">
          <span class="ref ${isPriority ? 'priority' : ''}">${artwork.ref || 'N/A'}</span>
          <h3>${artwork.title || 'Untitled'}</h3>
          ${artwork.artist ? `<div class="artist">${artwork.artist}</div>` : ''}
          ${artwork.year ? `<div class="meta"><strong>Year:</strong> ${artwork.year}</div>` : ''}
          ${artwork.medium ? `<div class="meta"><strong>Medium:</strong> ${artwork.medium}</div>` : ''}
          ${artwork.dimensions ? `<div class="meta"><strong>Dimensions:</strong> ${artwork.dimensions}</div>` : ''}
          ${artwork.est_value ? `<div class="value">Estimated Value: ${artwork.est_value}</div>` : ''}
          ${artwork.body ? `<div class="notes">${marked.parse(artwork.body)}</div>` : ''}
        </div>
      `;

      gallery.appendChild(card);
    });

    loading.style.display = 'none';

  } catch (err) {
    console.error('Failed to load gallery:', err);
    document.getElementById('loading').textContent = 'Failed to load collection. Please refresh.';
  }
}

// Load on page ready
loadGallery();
