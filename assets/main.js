// 프로젝트 목록은 projects.json 한 곳에서 관리한다.
(async function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  const list = document.getElementById('projects');
  const filters = document.getElementById('filters');

  let projects = [];
  try {
    const res = await fetch('projects.json', { cache: 'no-cache' });
    projects = (await res.json()).filter(p => !p.hidden);
  } catch (e) {
    list.innerHTML = '<li>프로젝트 목록을 불러오지 못했습니다.</li>';
    return;
  }

  const kinds = ['전체', ...new Set(projects.map(p => p.kind).filter(Boolean))];
  let current = '전체';

  function render() {
    list.replaceChildren(...projects
      .filter(p => current === '전체' || p.kind === current)
      .map(card));
    for (const b of filters.children) b.setAttribute('aria-pressed', b.dataset.kind === current);
  }

  function card(p) {
    const li = document.createElement('li');
    li.className = 'card';
    const links = (p.links || [])
      .map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
      .join('');
    li.innerHTML = `
      ${p.kind ? `<span class="kind">${esc(p.kind)}</span>` : ''}
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description || '')}</p>
      ${links ? `<div class="card-links">${links}</div>` : ''}
      <div class="tags">${(p.tags || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>`;
    return li;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  if (kinds.length > 2) {
    for (const k of kinds) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = k;
      b.dataset.kind = k;
      b.onclick = () => { current = k; render(); };
      filters.append(b);
    }
  }
  render();
})();
