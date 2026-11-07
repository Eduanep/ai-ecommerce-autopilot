/* ============ 5. SHELL ============ */
function renderNav(){
  const items = Object.entries(VIEWS).filter(([,v])=>!v.hidden);
  const order = ['overview','hunter','suppliers','shopify','marketing','orders','profit','settings'];
  $('#nav').innerHTML = `<div class="brand"><div class="logo">AI</div><div>E-Commerce<br>Autopilot</div></div>` +
    order.map(k=>{const v=VIEWS[k];return `<button data-go="${k}" ${state.view===k?'aria-current="page"':''}>${v.icon}<span>${v.label}</span></button>`}).join('') +
    `<button data-go="approvals" ${state.view==='approvals'?'aria-current="page"':''}>${ico('<path d="M4 10.5 8 14.5 16 5.5"/>')}<span>Approvals</span>${pending()?`<span class="badge">${pending()}</span>`:''}</button>` +
    `<div class="foot">Prototype v0.1<br>Demo data only. No integrations connected.</div>`;
}
function render(){
  const v = VIEWS[state.view];
  $('#title').textContent = v.label;
  document.title = v.label + ' · AI E-Commerce Autopilot';
  $('#app').classList.toggle('paused', state.paused);
  $('#pauseLbl').textContent = state.paused ? 'Paused' : 'Automation on';
  $('#pause').setAttribute('aria-pressed', state.paused);
  $('#main').innerHTML =
    `<div class="demo">Prototype with demo data. Nothing here is connected to Shopify, Google Ads or suppliers, and no money can be spent.</div>` +
    (state.paused ? '<div class="pausebar">All automation is paused. No automated action will run until you resume.</div>' : '') +
    v.render();
  renderNav();
}
function go(k){state.view=k;closeNav();render();window.scrollTo(0,0);if(location.hash!=='#'+k)history.replaceState(null,'','#'+k)}
function openNav(){$('#nav').classList.add('open');$('#scrim').classList.add('open')}
function closeNav(){$('#nav').classList.remove('open');$('#scrim').classList.remove('open')}
/* ============ 6. EVENTS ============ */
document.addEventListener('click',e=>{
  const el = e.target.closest('[data-go],[data-act],[data-theme],#menu,#pause,#scrim');
  if(!el) return;
  if(el.id==='menu') return openNav();
  if(el.id==='scrim') return closeNav();
  if(el.id==='pause'){state.paused=!state.paused;render();return toast(state.paused?'Automation paused':'Automation resumed')}
  if(el.dataset.go) return go(el.dataset.go);
  if(el.dataset.theme){const t=el.dataset.theme;if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t);return}
  const a = el.dataset.act;
  if(a==='approve'||a==='reject'){
    const it=state.approvals.find(x=>x.id==el.dataset.id);
    if(a==='approve'&&state.paused)return;
    it.s = a==='approve'?'approved':'rejected';render();
    return toast(a==='approve'?'Approved. Demo only, no action was taken.':'Rejected.');
  }
  if(a==='short'){const n=el.dataset.n;state.shortlist.has(n)?state.shortlist.delete(n):state.shortlist.add(n);return render()}
  if(a==='filter'){state.filter=el.dataset.c;return render()}
  if(a==='soon') return toast('Integrations are not available in this prototype.');
});
const h = location.hash.slice(1); if(VIEWS[h]) state.view=h;
render();
