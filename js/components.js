/* ============ 3. COMPONENTS ============ */
function kpiCards(){return `<div class="grid g4">${DATA.kpis.map(k=>`<div class="card kpi"><div class="l">${k.l}</div><div class="v">${k.v}</div><div class="d ${k.up?'up':'down'}">${k.d} vs last week</div></div>`).join('')}</div>`}

function chart(){
  const max = 800, w = 320, h = 150, bw = 26, gap = (w - 7*bw)/8;
  const bars = DATA.daily.map((x,i)=>{
    const X = gap + i*(bw+gap), rh = x.r/max*110, ph = x.p/max*110;
    return `<rect x="${X}" y="${125-rh}" width="${bw}" height="${rh}" rx="5" fill="var(--surface2)"/>
      <rect x="${X}" y="${125-ph}" width="${bw}" height="${ph}" rx="5" fill="var(--good)"/>
      <text x="${X+bw/2}" y="143" text-anchor="middle" font-size="10" fill="var(--muted)">${x.d}</text>`}).join('');
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Daily revenue and estimated profit, demo data">${bars}</svg>
  <div class="row" style="justify-content:flex-start;gap:14px;font-size:12px;color:var(--muted)"><span>▇ Revenue</span><span style="color:var(--good)">▇ Est. profit</span></div>`;
}

function approvalItem(a){
  const done = a.s !== 'pending';
  const tag = a.s==='approved' ? '<span class="tag ok">Approved (demo)</span>' : a.s==='rejected' ? '<span class="tag no">Rejected</span>' : `<span class="tag">${a.risk==='Spend'?'Involves spend':'Low risk'}</span>`;
  return `<div class="item"><div class="row" style="align-items:flex-start"><div><div class="t">${a.t}</div><div class="m">${a.m}</div></div>${tag}</div>
  ${done?'':`<div class="btns"><button class="btn p" data-act="approve" data-id="${a.id}" ${state.paused?'disabled':''}>Approve</button><button class="btn" data-act="reject" data-id="${a.id}">Reject</button></div>`}</div>`;
}
function approvalCenter(limit){
  const items = limit ? state.approvals.filter(a=>a.s==='pending').slice(0,limit) : state.approvals;
  return `<div class="card"><div class="row"><h3>Approval center</h3>${demoTag}</div>
  <p class="m sub" style="margin:0 0 10px">Nothing runs without your permission. Approving here takes no real action yet.</p>
  <div class="list">${items.length?items.map(approvalItem).join(''):'<div class="m">No pending approvals. New requests will appear here.</div>'}</div>
  ${state.paused&&pending()?'<div class="m" style="margin-top:10px;color:var(--warn);font-weight:700">Approvals are on hold while automation is paused.</div>':''}</div>`;
}
