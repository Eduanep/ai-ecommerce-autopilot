/* ============ 4. VIEWS (add a new view = add an entry here + one nav item) ============ */
const VIEWS = {
  overview:{label:'Overview',icon:ico('<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="11" y="3" width="6" height="6" rx="1.5"/><rect x="3" y="11" width="6" height="6" rx="1.5"/><rect x="11" y="11" width="6" height="6" rx="1.5"/>'),
    render:()=>`<div class="row"><h2>Overview</h2>${demoTag}</div>${kpiCards()}
      <div style="height:12px"></div><div class="cols"><div class="grid">
        <div class="card"><h3>Last 7 days</h3>${chart()}</div></div>
        <div class="grid">${approvalCenter(2)}<button class="btn" data-go="approvals">See all approvals</button></div></div>`},
  hunter:{label:'Product Hunter',icon:ico('<circle cx="9" cy="9" r="5.5"/><path d="M13.5 13.5 17 17"/>'),
    render:()=>{
      const cats=['All',...new Set(DATA.products.map(p=>p.cat))];
      const rows=DATA.products.filter(p=>state.filter==='All'||p.cat===state.filter).map(p=>{
        const margin=Math.round((p.price-p.cost)/p.price*100), saved=state.shortlist.has(p.n);
        return `<div class="item"><div class="row" style="align-items:flex-start"><div><div class="t">${p.n}</div><div class="m">${p.cat} · ${p.sup}</div></div><span class="tag">${p.comp} competition</span></div>
        <div class="grid g2" style="margin-top:10px;font-size:13px"><div><span class="m">Cost → price</span><br><b>${money(p.cost)} → ${money(p.price)}</b></div><div><span class="m">Est. margin</span><br><b class="up">${margin}%</b></div></div>
        <div style="margin-top:10px"><div class="row m" style="font-size:12px"><span>Trend score (sample)</span><b>${p.trend}/100</b></div><div class="bar"><i style="width:${p.trend}%"></i></div></div>
        <div class="btns"><button class="btn ${saved?'':'p'}" data-act="short" data-n="${p.n}">${saved?'Remove from shortlist':'Add to shortlist'}</button></div></div>`}).join('');
      return `<div class="row"><h2>Product Hunter</h2>${demoTag}</div><p class="sub">Research workspace. Every product, price and score below is sample data. No live market lookup is connected.</p>
      <div class="switch">${cats.map(c=>`<button class="chip" data-act="filter" data-c="${c}" aria-pressed="${state.filter===c}">${c}</button>`).join('')}</div>
      <div class="card"><div class="list">${rows}</div></div>
      <div class="card" style="margin-top:12px"><h3>Shortlist (${state.shortlist.size})</h3><div class="m">${state.shortlist.size?[...state.shortlist].join(', '):'Nothing saved yet. Tap “Add to shortlist” on a product.'}</div></div>`}},
  suppliers:{label:'Suppliers',icon:ico('<path d="M2.5 6.5 10 3l7.5 3.5v7L10 17l-7.5-3.5z"/><path d="M2.5 6.5 10 10l7.5-3.5M10 10v7"/>'),
    render:()=>`<div class="row"><h2>Suppliers</h2>${demoTag}</div><p class="sub">Placeholder suppliers. No supplier account or feed is connected.</p>
      <div class="grid">${DATA.suppliers.map(s=>`<div class="card"><div class="row"><div class="t" style="font-weight:700">${s.n}</div><span class="tag">★ ${s.rate}</span></div><div class="m">${s.reg}</div>
      <div class="grid g2" style="margin-top:10px;font-size:13px"><div><span class="m">Shipping</span><br><b>${s.ship}</b></div><div><span class="m">Min. order</span><br><b>${s.moq} unit${s.moq>1?'s':''}</b></div></div>
      <div class="row m" style="font-size:12px;margin-top:10px"><span>On-time fulfilment</span><b>${s.fill}%</b></div><div class="bar"><i style="width:${s.fill}%"></i></div></div>`).join('')}</div>`},
  shopify:{label:'Shopify Manager',icon:ico('<path d="M4 6h12l-1 10H5zM7 6a3 3 0 0 1 6 0"/>'),
    render:()=>`<div class="row"><h2>Shopify Manager</h2><span class="tag no">Not connected</span></div>
      <div class="card"><h3>Connect your store</h3><p class="m">Store sync, listings and pricing will live here once a connection exists. This prototype does not contact Shopify.</p><div class="btns"><button class="btn p" data-act="soon">Connect Shopify</button></div></div>
      <div class="card" style="margin-top:12px"><div class="row"><h3>Draft listings</h3>${demoTag}</div><div class="list">
      ${['Foldable silicone dog bowl','Magnetic cable organiser set'].map(n=>`<div class="item row"><div><div class="t">${n}</div><div class="m">Draft · not published</div></div><span class="tag">Draft</span></div>`).join('')}</div></div>`},
  marketing:{label:'Marketing & Ads',icon:ico('<path d="M3 8v4l9 4V4zM12 7.5c2 .5 3 1.5 3 2.5s-1 2-3 2.5M5 12l1 4"/>'),
    render:()=>`<div class="row"><h2>Marketing & Ads</h2><span class="tag no">Not connected</span></div>
      <div class="card"><div class="row"><h3>Spend safety</h3>${demoTag}</div><p class="m">No ad account is linked and nothing can be spent. When ads are connected, every launch and budget change will go through the approval center.</p></div>
      <div class="card" style="margin-top:12px"><div class="row"><h3>Campaign drafts</h3>${demoTag}</div><div class="list">
      ${DATA.campaigns.map(c=>`<div class="item"><div class="row"><div class="t">${c.n}</div><span class="tag">Draft</span></div><div class="m">${c.ch} · proposed ${c.budget}</div></div>`).join('')}</div></div>`},
  orders:{label:'Orders',icon:ico('<rect x="4" y="3" width="12" height="14" rx="2"/><path d="M7.5 8h5M7.5 12h5"/>'),
    render:()=>`<div class="row"><h2>Orders</h2>${demoTag}</div><p class="sub">Sample orders. No store is connected and no supplier orders are placed.</p>
      <div class="card"><div class="list">${DATA.orders.map(o=>`<div class="item"><div class="row"><div class="t">${o.id}</div><span class="tag ${o.st}">${o.s}</span></div><div class="m">${o.c} · ${o.t}</div></div>`).join('')}</div></div>`},
  profit:{label:'Profit Analytics',icon:ico('<path d="M3 16V4M3 16h14M6 12l3-3 3 2 4-5"/>'),
    render:()=>{
      const rev=4286,ads=1042,cogs=1380,fees=546,profit=rev-ads-cogs-fees;
      const rows=[['Revenue',rev],['Product cost',-cogs],['Advertising',-ads],['Fees & shipping',-fees]];
      return `<div class="row"><h2>Profit Analytics</h2>${demoTag}</div>
      <div class="card"><h3>Daily revenue and profit</h3>${chart()}</div>
      <div class="card" style="margin-top:12px"><h3>Where the money goes (7 days)</h3><div class="list">
      ${rows.map(r=>`<div class="row"><span>${r[0]}</span><b class="${r[1]<0?'down':''}">${r[1]<0?'−':''}$${Math.abs(r[1]).toLocaleString()}</b></div>`).join('')}
      <div class="row"><b>Estimated profit</b><b class="up">$${profit.toLocaleString()}</b></div></div>
      <p class="m" style="font-size:12px;margin-bottom:0">Figures are illustrative and not tied to real sales.</p></div>`}},
  approvals:{label:'Approvals',hidden:1,
    render:()=>`<h2>Approval center</h2>${approvalCenter()}`},
  settings:{label:'Settings',icon:ico('<circle cx="10" cy="10" r="2.5"/><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4"/>'),
    render:()=>`<h2>Settings</h2>
      <div class="card"><h3>Integrations</h3><div class="list">${DATA.integrations.map(n=>`<div class="row"><span>${n}</span><span class="tag no">Not connected</span></div>`).join('')}</div></div>
      <div class="card" style="margin-top:12px"><h3>Safety rules</h3><div class="list">
        <div class="row"><span>Spending</span><span class="tag ok">Blocked in prototype</span></div>
        <div class="row"><span>Purchases</span><span class="tag ok">Blocked in prototype</span></div>
        <div class="row"><span>Actions needing approval</span><span class="tag">All</span></div></div></div>
      <div class="card" style="margin-top:12px"><h3>Appearance</h3><div class="btns" style="margin-top:0"><button class="btn" data-theme="light">Light</button><button class="btn" data-theme="dark">Dark</button><button class="btn" data-theme="auto">Match device</button></div></div>`}
};
