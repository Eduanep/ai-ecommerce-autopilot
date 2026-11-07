/* ============ 2. HELPERS ============ */
const $ = s => document.querySelector(s);
const money = n => '$' + n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const pending = () => state.approvals.filter(a => a.s === 'pending').length;
let toastTimer;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}
const demoTag = '<span class="tag demo-t">Demo data</span>';
const ico = p => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
