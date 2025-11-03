const SHEET_EDIT_URL = 'https://docs.google.com/spreadsheets/d/162jVgCuyf-OrtJppRu_41B2Uo12-cVay1UcDGdBX61A/edit?usp=sharing';
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCY59zBM3QZLCwnJR77OTw-K-axvlR0SORL36xFuaeqVgvukdarPUs-U5MHsWr_7CLcBezFjJeIAaK/pub?output=csv';

document.getElementById('editLink').href = SHEET_EDIT_URL;

function renderRow(r) {
  const img = r.image_url
    ? `<img src="${r.image_url}" alt="${r.title || ''}" style="width:100%;height:auto;border-radius:8px;">`
    : `<div style="aspect-ratio:4/3;border:1px dashed #ccc;border-radius:8px;display:grid;place-items:center;color:#999;">No Image</div>`;
  const receipt = r.receipt_url ? `<div style="margin-top:6px;"><a href="${r.receipt_url}" target="_blank" rel="noopener">Receipt/Certificate</a></div>` : '';
  const est = r.est_value ? `<div><strong>Est. Value:</strong> ${r.est_value}</div>` : '';
  const prov = r.provenance ? `<div><strong>Provenance:</strong> ${r.provenance}</div>` : '';
  const notes = r.notes ? `<div><strong>Notes:</strong> ${r.notes}</div>` : '';
  const meta = [r.artist, r.year, r.medium, r.dimensions].filter(Boolean).join(' · ');

  return `
    <div class="card">
      ${img}
      <div class="card-content">
        <span class="ref ${r.status === 'verified' ? '' : 'priority'}">${r.ref || 'N/A'}</span>
        <h3>${r.title || 'Untitled'}</h3>
        ${r.artist ? `<div class="artist">${r.artist}</div>` : ''}
        ${meta ? `<div class="meta">${meta}</div>` : ''}
        ${est}${prov}${notes}
        ${receipt}
      </div>
    </div>`;
}

function fetchCSV(url) {
  const bust = (url.includes('?') ? '&' : '?') + '_cb=' + Date.now();
  return url + bust;
}

// Helper to get value from object with multiple possible key names
function get(obj, ...keys) {
  for (const k of keys) {
    if (obj[k] != null && obj[k] !== '') return obj[k];
  }
  return '';
}

Papa.parse(fetchCSV(CSV_URL), {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: ({ data }) => {
    const rows = data.map(r => {
      // Normalize keys to lowercase for easier matching
      const lower = {};
      Object.keys(r).forEach(k => lower[k.toLowerCase().trim()] = r[k]);

      return {
        ref: get(lower, 'ref', 'reference', 'id', 'code'),
        title: get(lower, 'title', 'titolo', 'name', 'nome'),
        artist: get(lower, 'artist', 'autore', 'creator'),
        year: get(lower, 'year', 'anno', 'date'),
        medium: get(lower, 'medium', 'media', 'material'),
        dimensions: get(lower, 'dimensions', 'size', 'dimensioni'),
        provenance: get(lower, 'provenance', 'provenienza', 'where/when purchased', 'where when purchased', 'location'),
        receipt_url: get(lower, 'receipt_url', 'receipt', 'receipt (if available)', 'receipt url', 'certificate'),
        est_value: get(lower, 'est_value', 'value', 'valore', 'estimated value', 'price'),
        notes: get(lower, 'notes', 'note', 'description'),
        image_url: get(lower, 'image_url', 'image', 'image (brief description)', 'photo', 'foto', 'picture'),
        status: get(lower, 'status', 'stato', 'state') || 'unverified'
      };
    });

    document.getElementById('gallery').innerHTML = rows.map(renderRow).join('');
    document.getElementById('loading').style.display = 'none';
    document.getElementById('status').textContent = `Loaded ${rows.length} items • edits apply instantly via Google Sheets`;
  },
  error: (err) => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('status').textContent = 'Error loading catalog CSV.';
    console.error(err);
  }
});
