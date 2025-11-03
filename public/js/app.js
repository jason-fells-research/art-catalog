const SHEET_EDIT_URL = 'https://docs.google.com/spreadsheets/d/162jVgCuyf-OrtJppRu_41B2Uo12-cVay1UcDGdBX61A/edit?usp=sharing';
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCY59zBM3QZLCwnJR77OTw-K-axvlR0SORL36xFuaeqVgvukdarPUs-U5MHsWr_7CLcBezFjJeIAaK/pub?output=csv';

document.getElementById('editLink').href = SHEET_EDIT_URL;

function renderRow(r) {
  const img = r.image_url ? `<img src="${r.image_url}" alt="${r.title || ''}" style="width:100%;height:auto;border-radius:8px;">` : '';
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

Papa.parse(fetchCSV(CSV_URL), {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: ({ data }) => {
    const rows = data.map(r => ({
      ref: r.ref || '',
      title: r.title || '',
      artist: r.artist || '',
      year: r.year || '',
      medium: r.medium || '',
      dimensions: r.dimensions || '',
      provenance: r.provenance || '',
      receipt_url: r.receipt_url || '',
      est_value: r.est_value || '',
      notes: r.notes || '',
      image_url: r.image_url || '',
      status: r.status || 'unverified'
    }));

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
