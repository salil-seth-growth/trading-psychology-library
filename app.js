// app.js — Pure Vanilla JS, no React, no Babel, no CDN dependencies

const B = window.BOOKS;
const G = window.GAP_BRIDGES;
const SY = window.SYNTHESIS;

let S = { view:'book', book:'dt', section:null, gap:null };

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const nl2br = s => esc(s).replace(/\n/g,'<br>');

window.setBook    = id => { S = {view:'book',book:id,section:null,gap:null}; render(); };
window.setView    = v  => { S = {...S,view:v,section:null}; render(); };
window.setSection = id => { S.section = id; render(); };
window.toggleGap  = id => { S.gap = S.gap===id ? null : id; render(); };

function render() {
  $('nav').innerHTML = navHTML();
  const sb = $('sidebar'), ct = $('content');
  if (S.view === 'book') {
    sb.style.display = 'block';
    sb.innerHTML = sidebarHTML();
    ct.innerHTML = S.section ? sectionHTML() : bookHomeHTML();
  } else {
    sb.style.display = 'none';
    ct.innerHTML = S.view === 'gaps' ? gapsHTML() : synthHTML();
  }
}

function navHTML() {
  const books = Object.values(B).map(b => {
    const on = S.view==='book' && S.book===b.id;
    return `<button class="nb ${on?'on':''}" onclick="setBook('${b.id}')" style="${on?'border-bottom-color:'+b.color:''}">
      <div class="tag" style="color:${b.color}">${b.tag}</div>
      <div class="nm">${esc(b.title)}</div>
      <div class="au">${esc(b.author)}</div>
    </button>`;
  }).join('');
  const ga = S.view==='gaps', sa = S.view==='synthesis';
  return books
    + `<button class="nb ${ga?'on':''}" onclick="setView('gaps')" style="${ga?'border-bottom-color:#E88060':''}">
        <div class="tag" style="color:#E88060">REPAIR</div>
        <div class="nm">Gap Bridge</div><div class="au">Douglas + Faith → Tendler</div>
       </button>`
    + `<button class="nb ${sa?'on':''}" onclick="setView('synthesis')" style="${sa?'border-bottom-color:#9B7EC8':''}">
        <div class="tag" style="color:#9B7EC8">CROSS-BOOK</div>
        <div class="nm">Synthesis</div><div class="au">5 unified themes</div>
       </button>`;
}

function sidebarHTML() {
  const bk = B[S.book];
  const items = bk.sections.map((s,i) => {
    const on = S.section === s.id;
    return `<button class="sbn ${on?'on':''}" onclick="setSection('${s.id}')" style="${on?'border-left-color:'+bk.color:''}">
      <div class="n" style="color:${bk.color}">${String(i+1).padStart(2,'0')}</div>
      <div class="t">${esc(s.title)}</div>
    </button>`;
  }).join('');
  return `<div class="sp">
    <div class="lbl" style="color:${bk.color}">PREMISE</div>
    <p>${esc(bk.premise.substring(0,110))}...</p>
  </div><div style="padding:0 5px">${items}</div>`;
}

function bookHomeHTML() {
  const bk = B[S.book];
  const cards = bk.sections.map((s,i) =>
    `<button class="cc" onclick="setSection('${s.id}')" onmouseover="this.style.borderColor='${bk.color}'" onmouseout="this.style.borderColor='#1A1A1E'">
      <div class="n" style="color:${bk.color}">${String(i+1).padStart(2,'0')}</div>
      <div class="t">${esc(s.title)}</div>
    </button>`).join('');
  return `<div class="bh">
    <div class="tag" style="color:${bk.color}">${bk.tag} · ${bk.year}</div>
    <h2>${esc(bk.title)}</h2>
    <div class="au">by ${esc(bk.author)}</div>
  </div>
  <div class="pb" style="border-left:3px solid ${bk.color}">
    <div class="lbl" style="color:${bk.color}">CORE PREMISE</div>
    <p>"${esc(bk.premise)}"</p>
  </div>
  <div class="cn">${bk.sections.length} CONCEPTS — SELECT FROM SIDEBAR OR BELOW</div>
  <div class="g2">${cards}</div>`;
}

function block(label, color, text) {
  const cs = {
    gold:   {bg:'#141210',bd:'#2A2010',left:'#C8A96E',txt:'#D4C4A0'},
    blue:   {bg:'#0F1218',bd:'#1A2430',left:'#6E9EC8',txt:'#B0C4D8'},
    green:  {bg:'#0F1410',bd:'#1A2A1A',left:'#7EC8A0',txt:'#B0CEB8'},
    purple: {bg:'#140F18',bd:'#2A1A30',left:'#C87EC8',txt:'#D4B0D8'},
    neutral:{bg:'#141418',bd:'#2A2A2E',left:'#555',   txt:'#AAA'}
  };
  const c = cs[color] || cs.neutral;
  return `<div class="bl" style="background:${c.bg};border-color:${c.bd};border-left-color:${c.left}">
    <div class="lbl" style="color:${c.left}">${label}</div>
    <div class="body" style="color:${c.txt}">${nl2br(text)}</div>
  </div>`;
}

function sectionHTML() {
  const bk = B[S.book];
  const idx = bk.sections.findIndex(s => s.id === S.section);
  const sec = bk.sections[idx];
  if (!sec) return '';
  const ck = {dt:'gold',titz:'blue',turtle:'green',tendler:'purple'}[S.book];
  const prev = bk.sections[idx-1], next = bk.sections[idx+1];
  return `<div class="ch">
    <button class="back" onclick="setSection(null)">← ALL CONCEPTS</button>
    <div class="pos" style="color:${bk.color}">${bk.tag} · CONCEPT ${String(idx+1).padStart(2,'0')} OF ${String(bk.sections.length).padStart(2,'0')}</div>
    <h2>${esc(sec.title)}</h2>
  </div>
  ${block('CORE INSIGHT', ck, sec.insight)}
  ${block('DEEP DIVE', 'neutral', sec.deepDive)}
  ${block('FROM THE BOOK — EXAMPLE & CONTEXT', 'blue', sec.bookExample)}
  ${block('FUTURES TRADING IMPACT', 'green', sec.futuresImpact)}
  ${block('KEY TAKEAWAY — ACTIONABLE', ck, sec.keyTakeaway)}
  <div class="np">
    ${prev ? `<button class="npb" onclick="setSection('${prev.id}')"><div class="d">← PREVIOUS</div><div class="pt">${esc(prev.title)}</div></button>` : ''}
    ${next ? `<button class="npb r" onclick="setSection('${next.id}')"><div class="d">NEXT →</div><div class="pt">${esc(next.title)}</div></button>` : ''}
  </div>`;
}

function gapsHTML() {
  const cards = G.map((gb,i) => {
    const open = S.gap === gb.id;
    const body = open ? `<div class="gbody">
      <div class="gbl" style="background:#141210;border-left-color:#C8A96E">
        <div class="lbl" style="color:#C8A96E">WHAT DOUGLAS / FAITH SAID</div>
        <div class="txt" style="color:#D4C4A0;font-style:italic">"${nl2br(gb.douglasQuote)}"</div>
      </div>
      <div class="gbl" style="background:#141018;border-left-color:#E88060">
        <div class="lbl" style="color:#E88060">THE GAP — WHAT'S MISSING</div>
        <div class="txt" style="color:#D4B8A8">${nl2br(gb.douglasGap)}</div>
      </div>
      <div class="gbl" style="background:#140F18;border-left-color:#C87EC8">
        <div class="lbl" style="color:#C87EC8">TENDLER'S BRIDGE — THE REPAIR MECHANIC</div>
        <div class="txt" style="color:#D4B0D8">${nl2br(gb.tendlerBridge)}</div>
      </div>
      <div class="gbl" style="background:#0A100A;border-left-color:#7EC8A0">
        <div class="lbl" style="color:#7EC8A0">ACTIONABLE — DO THIS NOW</div>
        <div class="txt" style="color:#B0CEB8">${nl2br(gb.actionable)}</div>
      </div>
    </div>` : '';
    const tags = gb.books.map(b=>`<span class="btag">${esc(b)}</span>`).join('')
               + `<span class="ttag">→ ${esc(gb.tendlerConcept)}</span>`;
    return `<div class="gc ${open?'op':''}" id="gc-${gb.id}">
      <button class="gb2" onclick="toggleGap('${gb.id}')">
        <div class="m"><div class="gn">GAP ${String(i+1).padStart(2,'0')}</div><div class="ar">${open?'▾':'▸'}</div></div>
        <div style="flex:1"><div class="gq">${esc(gb.gap)}</div><div class="gtags">${tags}</div></div>
      </button>${body}
    </div>`;
  }).join('');
  return `<div id="gv">
    <div class="pt" style="color:#E88060">WHAT DOUGLAS + FAITH IDENTIFIED BUT DIDN'T SOLVE</div>
    <h2>The Gap Bridge</h2>
    <p class="ds">Douglas and Faith diagnose the problems with precision. Tendler provides the repair mechanics. This section maps every major unresolved gap to its specific Tendler solution — with actionable protocols for each.</p>
    ${cards}
  </div>`;
}

function synthHTML() {
  const cards = SY.map(s => {
    const cols = [
      {key:'dt',    label:'DISCIPLINED TRADER', color:'#C8A96E'},
      {key:'tz',    label:'IN THE ZONE',         color:'#6E9EC8'},
      {key:'turtle',label:'WAY OF TURTLE',       color:'#7EC8A0'},
      {key:'tendler',label:'MENTAL GAME',        color:'#C87EC8'}
    ].map(c => `<div class="scol">
      <div class="cl" style="color:${c.color}">${c.label}</div>
      <p>${esc(s.columns[c.key])}</p>
    </div>`).join('');
    return `<div class="sc">
      <div class="sh"><span class="ic">${s.icon}</span><span class="th">${esc(s.theme)}</span></div>
      <div class="scols">${cols}</div>
      <div class="sapp"><div class="lbl">FUTURES APPLICATION</div><p>${esc(s.futuresApplication)}</p></div>
    </div>`;
  }).join('');
  return `<div id="sv">
    <div class="pt" style="color:#9B7EC8">WHERE ALL FOUR BOOKS CONVERGE</div>
    <h2>Unified Framework — 5 Core Themes</h2>
    <p class="ds">Douglas builds the philosophy. Faith operationalizes it into a complete mechanical system. Tendler provides the repair mechanics when the system meets the human.</p>
    ${cards}
  </div>`;
}

render();
