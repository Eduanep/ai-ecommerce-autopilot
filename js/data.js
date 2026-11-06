/* ============ 1. DEMO DATA (replace with real services later) ============ */
const DATA = {
  kpis:[
    {l:'Revenue (7 days)',v:'$4,286',d:'+12.4%',up:1},
    {l:'Orders',v:'118',d:'+8.1%',up:1},
    {l:'Ad spend',v:'$1,042',d:'+19.6%',up:0},
    {l:'Estimated profit',v:'$1,318',d:'+5.2%',up:1}],
  daily:[{d:'Mon',r:480,s:130,p:150},{d:'Tue',r:560,s:150,p:170},{d:'Wed',r:520,s:140,p:160},{d:'Thu',r:690,s:170,p:230},{d:'Fri',r:740,s:165,p:260},{d:'Sat',r:690,s:150,p:230},{d:'Sun',r:606,s:137,p:118}],
  products:[
    {n:'Foldable silicone dog bowl',cat:'Pets',cost:2.9,price:17.99,trend:82,comp:'Medium',sup:'Demo Supplier A'},
    {n:'Magnetic cable organiser set',cat:'Home office',cost:3.4,price:19.5,trend:74,comp:'High',sup:'Demo Supplier B'},
    {n:'Portable neck fan, USB-C',cat:'Outdoor',cost:7.8,price:34.0,trend:68,comp:'High',sup:'Demo Supplier C'},
    {n:'Under-bed shoe slider',cat:'Home',cost:5.1,price:27.0,trend:61,comp:'Low',sup:'Demo Supplier A'},
    {n:'Mini lint shaver, rechargeable',cat:'Home',cost:4.2,price:21.9,trend:57,comp:'Medium',sup:'Demo Supplier B'}],
  suppliers:[
    {n:'Demo Supplier A',reg:'Shenzhen',rate:4.7,ship:'8–12 days',moq:1,fill:96},
    {n:'Demo Supplier B',reg:'Guangzhou',rate:4.5,ship:'9–14 days',moq:1,fill:92},
    {n:'Demo Supplier C',reg:'Yiwu',rate:4.2,ship:'10–16 days',moq:2,fill:88}],
  campaigns:[
    {n:'Dog bowl – prospecting',ch:'Meta (draft)',budget:'$25/day',roas:'—'},
    {n:'Cable set – search',ch:'Google Ads (draft)',budget:'$15/day',roas:'—'},
    {n:'Neck fan – retargeting',ch:'Meta (draft)',budget:'$10/day',roas:'—'}],
  orders:[
    {id:'#DEMO-1042',c:'A. Rivera',t:'$34.00',s:'Awaiting supplier',st:'warn'},
    {id:'#DEMO-1041',c:'J. Okafor',t:'$17.99',s:'Shipped',st:'ok'},
    {id:'#DEMO-1040',c:'M. Lindqvist',t:'$46.40',s:'Delivered',st:'ok'},
    {id:'#DEMO-1039',c:'S. Tanaka',t:'$21.90',s:'Refund requested',st:'no'},
    {id:'#DEMO-1038',c:'P. Moreau',t:'$27.00',s:'Shipped',st:'ok'}],
  integrations:['Shopify','Google Ads','Meta Ads','Supplier feeds','Payment provider']
};
const state = {
  view:'overview', paused:false, filter:'All',
  shortlist:new Set(),
  approvals:[
    {id:1,t:'Publish listing: Foldable silicone dog bowl',m:'Price $17.99 · est. margin 68%',risk:'Low',s:'pending'},
    {id:2,t:'Launch ad campaign: Dog bowl – prospecting',m:'Budget $25/day · max $175/week',risk:'Spend',s:'pending'},
    {id:3,t:'Reorder from Demo Supplier A (20 units)',m:'Est. cost $58 · requires payment',risk:'Spend',s:'pending'},
    {id:4,t:'Lower price on Under-bed shoe slider to $24.99',m:'Est. margin falls 68% → 61%',risk:'Low',s:'pending'}]
};
