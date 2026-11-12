// Rashifal app UI. Assamese (default) and English.
const $=id=>document.getElementById(id);
let L='as',tab='everyone',cs='e',ws=0,meKind='w',meData=null,places=[],SG=SGN.as,TXM='';
const AB={};
const ABS={as:['ল','ৰ','চ','ম','বু','বৃ','শু','শ','ৰা','কে'],en:['As','Su','Mo','Ma','Me','Ju','Ve','Sa','Ra','Ke']};
const tx=()=>TXM;
const now=new Date(Date.now()+5.5*36e5);
const A={y:now.getUTCFullYear(),m:now.getUTCMonth()+1,d:now.getUTCDate(),hh:now.getUTCHours(),mm:now.getUTCMinutes()};
const MON={as:['','জানুৱাৰী','ফেব্ৰুৱাৰী','মাৰ্চ','এপ্ৰিল','মে','জুন','জুলাই','আগষ্ট','ছেপ্টেম্বৰ','অক্টোবৰ','নৱেম্বৰ','ডিচেম্বৰ'],en:['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
const ORD={as:['১ম','২য়','৩য়','৪ৰ্থ','৫ম','৬ষ্ঠ','৭ম','৮ম','৯ম','১০ম','১১শ','১২শ'],en:['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']};
const TT={
as:{title:'ৰাশিফল',sub:'প্ৰতিটো সপ্তাহৰ বাবে সহজ ভাষাত ৰাশিফল, লগতে জ্যোতিষীৰ বাবে গোচৰ চক্ৰ আৰু বিশ্লেষণ',chart:'গোচৰ চক্ৰ',week:'সাপ্তাহিক',month:'মাহিলী',moon:'চন্দ্ৰ (২ দিন)',me:'মোৰ ৰাশিফল',
every:'সাধাৰণ ৰাশিফল',evT:'গ্ৰহ পৰিৱৰ্তন',evR:'{s} ৰাশিলৈ গৈছে।',evN:'{s} নক্ষত্ৰলৈ গৈছে।',evD:'প্ৰায় {d} দিন ইয়াৰ ফল দেখা যাব।',good:'আপোনাৰ বাবে শুভ',bad:'আপোনাৰ বাবে সাৱধান',today:'আজি',mine:'মোৰ ৰাশি',copy:'কপি',copied:'কপি হ’ল',best:'সৰ্বাধিক শুভ',care:'বেছি সাৱধান',expand:'সকলো বিৱৰণ',date:'তাৰিখ',time:'সময় (IST)',planet:'গ্ৰহ',rashi:'ৰাশি',deg:'অংশ',retro:'বক্ৰী',house:'স্থান',ved:'(বেধৰ বাবে ফল দুৰ্বল)',strong:'আগবঢ়া ক্ষেত্ৰ',watch:'সাৱধান ক্ষেত্ৰ',more:'গ্ৰহৰ বিৱৰণ',
v5:'অতি শুভ সময়',v4:'শুভ সময়',v3:'মিশ্ৰ ফল',v2:'সাৱধানে চলক',v1:'ধৈৰ্য ৰাখক',chartT:'গোচৰ',moonsign:'চন্দ্ৰ ৰাশি',lagna:'লগ্ন',
moonin:'চন্দ্ৰ এতিয়া',inr:'ৰাশিত',from:'ৰ পৰা',to:'লৈ',ing:'ৰাশি সঞ্চাৰ',retros:'বক্ৰী গ্ৰহ',none:'নাই',
name:'নাম (ঐচ্ছিক)',dob:'জন্ম তাৰিখ',tob:'জন্ম সময়',notime:'সময় নাজানো',place:'জন্মস্থান',go:'ৰাশিফল চাওক',bchart:'জন্মকুণ্ডলী',janma:'জন্মৰাশি',
cont:'জন্মকুণ্ডলীৰ গ্ৰহৰ লগত গোচৰৰ সংযোগ',slow:'ধীৰগতিৰ গ্ৰহ',sade:'শনি আপোনাৰ জন্মৰাশিৰ {h} স্থানত: সাড়ে-সাতী কাল। নিয়মীয়া কাম আৰু ধৈৰ্যই সহায় কৰে।',ash:'শনি আপোনাৰ জন্মৰাশিৰ ৮ম স্থানত: ডাঙৰ সিদ্ধান্তত লৰালৰি নকৰিব।',
amb:'সেই দিনা চন্দ্ৰই ৰাশি সলনি কৰিছিল; সঠিক ফলৰ বাবে জন্ম সময় দিয়ক (ইয়াত দুপৰীয়া ১২টা ধৰা হৈছে)।',out:'এই তাৰিখৰ তথ্য নাই (১৯৩০–২০৬০ ৰ ভিতৰত দিয়ক)।',
note:'গোচৰ ফল জ্যোতিষ দৰ্পণ (ত্ৰয়োদশ অধ্যায়) ৰ নিয়ম অনুসৰি জন্মৰাশিৰ পৰা গণনা কৰা হৈছে; গ্ৰহৰ গুৰুত্ব আৰু তাৰকা-মান এই এপৰ নিজা গণনা। ই কেৱল দিশ-নিৰ্দেশনাৰ বাবে।',
ws:'সপ্তাহ আৰম্ভ',sun:'দেওবাৰ',mon:'সোমবাৰ',lang:'English',c1:'জন্ম-{b}ৰ ওপৰেদি {p}ৰ গোচৰ: {k}ৰ ক্ষেত্ৰত {t}।',lg:'লগ্ন',
t_b:'সহায় আৰু উন্নতিৰ সম্ভাৱনা',t_Saturn:'ধীৰ কিন্তু পৰীক্ষামূলক চাপ, ধৈৰ্যই ফল দিয়ে',t_Mars:'উত্তাপ, তাড়াহুৰা আৰু সংঘৰ্ষ',t_Sun:'মনযোগ আৰু কামৰ চাপ',t_Rahu:'আকস্মিক মোড় আৰু অস্থিৰতা',t_Ketu:'আকস্মিক মোড় আৰু অস্থিৰতা'},
en:{title:'Rashifal',sub:'Plain-language weekly rashifal for everyone, plus transit chart and analysis for astrologers',chart:'Transit chart',week:'Weekly',month:'Monthly',moon:'Moon (2 days)',me:'My rashifal',
every:'For everyone',evT:'Planet changes',evR:'moves into {s}.',evN:'moves into {s} nakshatra.',evD:'Its effect will be seen for about {d} days.',good:'For you: favourable',bad:'For you: be careful',today:'Today',mine:'My rashi',copy:'Copy',copied:'Copied',best:'Most favourable',care:'Most careful',expand:'Expand all',date:'Date',time:'Time (IST)',planet:'Planet',rashi:'Rashi',deg:'Degree',retro:'R',house:'house',ved:'(weakened by vedha)',strong:'Strongest',watch:'Watch',more:'Planet details',
v5:'Very favourable',v4:'Favourable',v3:'Mixed results',v2:'Go carefully',v1:'Be patient',chartT:'Gochar',moonsign:'Moon sign',lagna:'Lagna',
moonin:'The Moon is now in',inr:'',from:'from',to:'to',ing:'Sign changes',retros:'Retrograde',none:'none',
name:'Name (optional)',dob:'Date of birth',tob:'Time of birth',notime:'I don\u2019t know the time',place:'Birth place',go:'Show my rashifal',bchart:'Birth chart',janma:'Janma rashi',
cont:'Transits touching your birth planets',slow:'Slow planets',sade:'Saturn is in the {h} from your Moon sign: Sade Sati phase. Steady routines and patience help.',ash:'Saturn is in the 8th from your Moon sign: avoid rushing big decisions.',
amb:'The Moon changed sign on your birth date; enter the birth time for an exact result (12:00 noon is assumed here).',out:'No data for this date (use 1930\u20132060).',
note:'Transit results follow the rules of Jyotish Darpan (ch. 13) counted from the janma rashi; planet weights and star ratings are this app\u2019s own calculation. For guidance only.',
ws:'Week starts',sun:'Sunday',mon:'Monday',lang:'\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE',c1:'Transit {p} over your natal {b}: {t} around {k}.',lg:'lagna',
t_b:'support and growth',t_Saturn:'slow, testing pressure that rewards patience',t_Mars:'heat, urgency and friction',t_Sun:'spotlight and pressure to act',t_Rahu:'sudden turns and restlessness',t_Ketu:'sudden turns and restlessness'}};
const GL=['\u2648','\u2649','\u264A','\u264B','\u264C','\u264D','\u264E','\u264F','\u2650','\u2651','\u2652','\u2653'].map(g=>g+'\uFE0E');
let PIN=-1;try{PIN=+(localStorage.getItem('rp')??-1)}catch(e){}
function toast(m){const e=$('toast');e.textContent=m;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1600)}
const T=()=>TT[L],K=()=>L=='as'?'as':'en';
const n=s=>L=='as'?String(s).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d]):String(s);
const p2=x=>String(x).padStart(2,'0');
const fd=(jd,t)=>{const d=dtOf(jd);return`${n(d.getUTCDate())} ${MON[K()][d.getUTCMonth()+1]}`+(t?`, ${n(p2(d.getUTCHours())+':'+p2(d.getUTCMinutes()))}`:'')};
const nm=(a,i)=>a[K()][i];
const ord=h=>ORD[K()][h-1];
const ancJd=()=>jdOf(A.y,A.m,A.d,A.hh,A.mm);
function setAnc(jd){const d=dtOf(jd);A.y=d.getUTCFullYear();A.m=d.getUTCMonth()+1;A.d=d.getUTCDate();A.hh=d.getUTCHours();A.mm=d.getUTCMinutes()}
function shift(days){setAnc(ancJd()+days)}
function shiftMonth(k){const d=new Date(Date.UTC(A.y,A.m-1+k,1));A.y=d.getUTCFullYear();A.m=d.getUTCMonth()+1;A.d=Math.min(A.d,new Date(Date.UTC(A.y,A.m,0)).getUTCDate())}
// ---- period + scoring -------------------------------------------------
function periodOf(kind,jd0){
 jd0=jd0||ancJd();let T0,T1,label;
 kind=kind=='e'?'w':kind;if(kind=='w'){const off=(new Date(Date.UTC(A.y,A.m-1,A.d)).getUTCDay()-ws+7)%7;T0=jdOf(A.y,A.m,A.d-off);T1=T0+7;label=fd(T0)+' \u2013 '+fd(T1-.01)}
 else if(kind=='m'){T0=jdOf(A.y,A.m,1);T1=jdOf(A.y,A.m+1,1);label=`${MON[K()][A.m]} ${n(A.y)}`}
 else{if(!inRange(jd0-4)||!inRange(jd0+4))return{bad:1};const g=segs(jd0-3.5,jd0+3.5)[1].find(g=>jd0<=g.b);T0=g.a;T1=g.b;label=`${nm(SGN,g.s)}: ${fd(T0,1)} \u2013 ${fd(T1,1)}`}
 if(!inRange(T0-1)||!inRange(T1+1))return{bad:1};
 const S=segs(T0,T1);let W=kind=='c'?{...PW,Moon:3}:kind=='w'?{...PWW}:PW,ev=[];
 if(kind=='w'){ev=events(S,T0,T1);const fr={};ev.forEach(x=>{if(x.k>=4){W[x.P]=Math.max(W[x.P],x.type=='r'?1:.5);fr[x.P]=Math.min(fr[x.P]??1e9,x.t)}});W._fr=fr}
 return{T0,T1,label,S,W,kind,ev}}
function all12(pr){
 const rs=[...Array(12).keys()].map(ms=>rate(ms,pr.S,pr.T0,pr.T1,pr.W)),st=a=>{const m=a.reduce((x,y)=>x+y,0)/12;return[m,Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/12)||1]};
 const[m,sd]=st(rs.map(r=>r.o)),am={};AREAS.forEach(([a])=>am[a]=st(rs.map(r=>r.ar[a])));return{rs,m,sd,am}}
const zStars=z=>Math.max(1,Math.min(5,Math.round(3+z*1.1)));
const starsHtml=s=>`<span class="st" aria-label="${s}/5">${'\u2605'.repeat(s)}<i>${'\u2605'.repeat(5-s)}</i></span>`;
function bars(ar,am){return`<ul class="ar">${AREAS.map(([a,as,en])=>{const z=(ar[a]-am[a][0])/am[a][1],p=Math.max(8,Math.min(94,50+z*22));
 return`<li><span>${L=='as'?as:en}</span><b><u class="${p>=50?'g':'r'}" style="width:${p.toFixed(0)}%"></u></b></li>`}).join('')}</ul>`}
function lineTxt(it,pr){const full=it.g.a<=pr.T0+.01&&it.g.b>=pr.T1-.01,t=T(),ph=it.c.c.map(x=>TH[x][L=='as'?2:3]).join(', ');
 return`<b>${nm(PN,it.k)}</b> ${ord(it.h)} ${t.house}${full?'':` (${fd(it.g.a)}\u2013${fd(it.g.b)})`}: ${ph}${it.ved?` <i>${t.ved}</i>`:''}`}
function pick(r,pr){r={it:r.it.filter(i=>i.w>1e-9)};const o=r.it.filter(i=>i.k!=1).sort((x,y)=>y.w-x.w),m=r.it.filter(i=>i.k==1).sort((x,y)=>y.w-x.w);
 return(pr.kind=='c'?[m[0],...o]:pr.kind=='w'?[...m.slice(0,2),...o]:o).slice(0,5)}
function verdict(s,ar,am){const t=T(),z=AREAS.map(([a,as,en])=>[(ar[a]-am[a][0])/am[a][1],L=='as'?as:en]).sort((x,y)=>y[0]-x[0]);
 const e=L=='as'?'।':'.';return`${t['v'+s]}${e} ${t.strong}: ${z[0][1]}${e} ${t.watch}: ${z[z.length-1][1]}${e}`}
function evBox(i,pr,lim){if(pr.kind!='w'||!pr.ev||!pr.ev.length)return'';const t=T(),ix=L=='as'?2:3;
 const li=pr.ev.slice(0,lim||5).map(e=>{const h=(e.s-i+12)%12+1,c=GCP[e.P][h-1],ph=c.c.slice(0,3).map(x=>TH[x][ix]).join(', '),
  what=(e.type=='r'?t.evR.replace('{s}',nm(SGN,e.s)):t.evN.replace('{s}',nm(NK,e.nak)));
  return`<li><b>${nm(PN,e.k)}</b> (${fd(e.t)}) ${what}${e.days?' '+t.evD.replace('{d}',n(e.days)):''} <em class="${c.s>0?'g':'r'}">${c.s>0?t.good:t.bad}: ${ph}</em></li>`}).join('');
 return`<div class="evb"><h5>${t.evT}</h5><ul>${li}</ul></div>`}
function cardHtml(i,r,all,pr){const s=zStars((r.o-all.m)/all.sd),t=T();
 return`<article class="rc${PIN==i?' pin':''}" id="rc${i}"><header><h3><span class="gl">${GL[i]}</span>${nm(SGN,i)}</h3>${starsHtml(s)}</header><p class="vd">${verdict(s,r.ar,all.am)}</p>${bars(r.ar,all.am)}<details><summary>${t.more}</summary><ul>${pick(r,pr).map(it=>`<li>${lineTxt(it,pr)}</li>`).join('')}</ul></details>${evBox(i,pr)}
 <div class="acts"><button data-pin="${i}" aria-pressed="${PIN==i}">${PIN==i?'\u2605':'\u2606'} ${t.mine}</button><button data-copy="${i}">${t.copy}</button></div></article>`}
function ingress(pr){const t=T(),ev=[];pr.S.forEach((a,k)=>{if(k==1)return;a.forEach((g,i)=>{if(i)ev.push([g.a,`${nm(PN,k)} \u2192 ${nm(SGN,g.s)}`])})});
 ev.sort((x,y)=>x[0]-y[0]);const mid=(pr.T0+pr.T1)/2,rt=[2,3,4,5,6].filter(k=>retro(k,mid)).map(k=>nm(PN,k));
 return`<div class="ing"><h4>${t.ing}</h4>${ev.length?`<ul>${ev.map(e=>`<li><time>${fd(e[0],1)}</time> ${e[1]}</li>`).join('')}</ul>`:`<p>${t.none}</p>`}<p class="rt">${t.retros}: ${rt.length?rt.join(', '):t.none}</p></div>`}
function navRow(label){return`<div class="nav"><button data-nav="-1" aria-label="prev">\u2039</button><h2>${label}</h2><button data-nav="1" aria-label="next">\u203A</button></div>`}
// ---- views ---------------------------------------------------------------
function setAB(lg){ABS[K()].forEach((a,i)=>AB[i?PL[i-1]:'Lagna']=a);AB.Lagna=lg||''}
function vChart(){const t=T(),jd=ancJd();if(!inRange(jd-4)||!inRange(jd+4))return`<p class="bad">${t.out}</p>`;
 const p=pos(jd),sg=p.slice(1).map(l=>Math.floor(l/30));setAB('');TXM=t.moonsign;SG=SGN[K()];
 const svg=drawChart(cs,k=>k=='Lagna'?sg[1]:sg[PL.indexOf(k)],t.chartT);
 const rows=PL.map((P,k)=>{const l=p[k+1],d=l%30;return`<tr><td>${nm(PN,k)}</td><td>${nm(SGN,sg[k])}</td><td>${n(Math.floor(d))}\u00B0${n(p2(Math.floor(d%1*60)))}\u2032</td><td>${retro(k,jd)?t.retro:''}</td></tr>`}).join('');
 const g=segs(jd-3.5,jd+3.5)[1].find(g=>jd<=g.b);
 return`<div class="hero"><div class="cw"><div class="seg">${['e','n','s'].map((c,i)=>`<button data-cs="${c}" class="${cs==c?'on':''}">${L=='as'?['পূব','উত্তৰ','দক্ষিণ'][i]:['East','North','South'][i]}</button>`).join('')}</div>${svg}</div>
 <div><table class="pt"><thead><tr><th>${t.planet}</th><th>${t.rashi}</th><th>${t.deg}</th><th></th></tr></thead><tbody>${rows}</tbody></table>
 <p class="mw">${t.moonin} <b>${nm(SGN,g.s)}</b> ${t.inr}<br>${fd(g.a,1)} \u2013 ${fd(g.b,1)}</p></div></div>`}
function vPeriod(kind){const t=T(),pr=periodOf(kind);if(pr.bad)return`<p class="bad">${t.out}</p>`;const all=all12(pr),sr=all.rs.map(r=>zStars((r.o-all.m)/all.sd)),mx=Math.max(...sr),mn=Math.min(...sr),nmz=v=>sr.map((x,i)=>x==v?nm(SGN,i):'').filter(Boolean).slice(0,3).join(', ');
 const order=[...Array(12).keys()].sort((a,b)=>(b==PIN)-(a==PIN)||a-b);
 return`${navRow(pr.label)}<p class="sum"><b>${t.best}:</b> ${nmz(mx)} <span>|</span> <b>${t.care}:</b> ${nmz(mn)}</p>
 <div class="chips">${[...Array(12).keys()].map(i=>`<button data-jump="${i}" class="${PIN==i?'on':''}">${GL[i]} ${nm(SGN,i)}</button>`).join('')}<button data-all="1" class="ex">${t.expand}</button></div>
 ${kind=='c'?'':ingress(pr)}<div class="grid">${order.map(i=>cardHtml(i,all.rs[i],all,pr)).join('')}</div>`}
function cardE(i,r,all,pr){const t=T(),S=story(i,r,pr,all);
 return`<article class="rc e${PIN==i?' pin':''}" id="rc${i}"><div class="fr"><header><h3><span class="gl">${GL[i]}</span>${nm(SGN,i)}</h3>${starsHtml(S.s)}</header>
 <div class="story"><p class="lead">${S.lead} ${S.trend}</p><ol class="days" title="${LG[K()]}">${S.days.map(d=>`<li class="${d.c}${d.today?' now':''}" title="${DWF[K()][d.dow]}"><b>${DW[K()][d.dow]}</b><i></i></li>`).join('')}</ol>
 ${S.dayline?`<p class="dl">${S.dayline}</p>`:''}<ul class="ap">${S.areas.map(x=>`<li class="${x.tone}${x.a=='l'?' love':''}">${x.a=='l'?'\u2665 ':''}${x.txt}</li>`).join('')}</ul><p class="adv">${S.advice}</p>${evBox(i,pr,2)}</div></div>
 <div class="acts"><button data-pin="${i}" aria-pressed="${PIN==i}">${PIN==i?'\u2605':'\u2606'} ${t.mine}</button><button data-copy="${i}">${t.copy}</button></div></article>`}
function vEvery(){const t=T(),pr=periodOf('w');if(pr.bad)return`<p class="bad">${t.out}</p>`;const all=all12(pr),sr=all.rs.map(r=>zStars((r.o-all.m)/all.sd)),mx=Math.max(...sr),mn=Math.min(...sr),nmz=v=>sr.map((x,i)=>x==v?nm(SGN,i):'').filter(Boolean).slice(0,3).join(', ');
 const order=[...Array(12).keys()].sort((a,b)=>(b==PIN)-(a==PIN)||a-b);
 return`${navRow(pr.label)}<p class="sum"><b>${t.best}:</b> ${nmz(mx)} <span>|</span> <b>${t.care}:</b> ${nmz(mn)}</p>
 <div class="chips">${[...Array(12).keys()].map(i=>`<button data-jump="${i}" class="${PIN==i?'on':''}">${GL[i]} ${nm(SGN,i)}</button>`).join('')}</div><p class="lgd">${LG[K()]}</p>
 <div class="grid">${order.map(i=>cardE(i,all.rs[i],all,pr)).join('')}</div>`}
function vMe(){const t=T(),f=JSON.parse((()=>{try{return localStorage.getItem('rf')}catch(e){}})()||'{}');
 const opts=places.map((p,i)=>`<option value="${i}"${i==(f.pl||0)?' selected':''}>${p.name}</option>`).join('');
 return`<form id="mf" class="mf"><label>${t.name}<input id="fn" value="${f.nm||''}"></label><label>${t.dob}<input id="fd" type="date" required value="${f.dob||''}" min="1930-01-03" max="2060-12-01"></label>
 <label>${t.tob}<input id="ft" type="time" value="${f.tob||''}"></label><label>${t.place}<select id="fp">${opts}</select></label><button class="go">${t.go}</button></form><div id="mo">${meHtml()}</div>`}
function calcMe(){const t=T(),v=x=>$(x).value,dob=v('fd');if(!dob)return;
 try{localStorage.setItem('rf',JSON.stringify({nm:v('fn'),dob,tob:v('ft'),pl:+v('fp')}))}catch(e){}
 const[y,m,d]=dob.split('-').map(Number),P=places[+v('fp')],known=!!v('ft');let h=12,mi=0;if(known)[h,mi]=v('ft').split(':').map(Number);
 const jd=jdOf(y,m,d,h,mi,P.tz);if(!inRange(jd-1)||!inRange(jd+1)){meData={bad:1};return}
 meData={n:natal(jd,P.lat,P.lon,known),known,name:v('fn'),amb:!known&&sgn(1,jdOf(y,m,d,0,0,P.tz))!=sgn(1,jdOf(y,m,d+1,0,0,P.tz))}}
function meHtml(){const t=T(),D=meData;if(!D)return'';if(D.bad)return`<p class="bad">${t.out}</p>`;
 const pr=periodOf(meKind);if(pr.bad)return`<p class="bad">${t.out}</p>`;
 const all=all12(pr),r=rate(D.n.Moon,pr.S,pr.T0,pr.T1,pr.W),c=contacts(D.n,pr.S,pr.T0,pr.T1),s=zStars((r.o+c.adj-all.m)/all.sd);
 SG=SGN[K()];setAB(D.known?ABS[K()][0]:'');TXM=D.known?t.lagna:t.moonsign;
 const svg=drawChart(cs,k=>k=='Lagna'?(D.n.Lagna??D.n.Moon):D.n[k],t.bchart);
 const ms=D.n.Moon,hl=sg=>D.n.Lagna!=null?(sg-D.n.Lagna+12)%12+1:0;
 const cl=c.list.slice(0,6).map(x=>{const hs=hl(x.g.s),b=x.B=='Lagna'?t.lg:nm(PN,PL.indexOf(x.B)),tone=x.ben?t.t_b:t['t_'+x.P],k=x.B=='Lagna'?(L=='as'?'ব্যক্তিত্ব আৰু স্বাস্থ্য':'self and health'):nm(KR,PL.indexOf(x.B));
  return`<li>${t.c1.replace('{p}',nm(PN,x.k)).replace('{b}',b).replace('{k}',k).replace('{t}',tone)}${hs?` <em>(${ord(hs)} ${t.house}: ${nm(HD,hs-1)})</em>`:''} ${(x.g.a<=pr.T0+.01&&x.g.b>=pr.T1-.01)?'':`<small>${fd(x.g.a)}\u2013${fd(x.g.b)}</small>`}</li>`}).join('');
 const sh=(sgAt(pr.S,6,pr.T0)-ms+12)%12+1,slow=[4,6,7,8].map(k=>{const g=sgAt(pr.S,k,pr.T0),a=(g-ms+12)%12+1;return`<li><b>${nm(PN,k)}</b> ${nm(SGN,g)}: ${ord(a)} ${t.house} (${t.moonsign})${D.n.Lagna!=null?`, ${ord(hl(g))} ${t.house} (${t.lagna}: ${nm(HD,hl(g)-1)})`:''}</li>`}).join('');
 const sd=[12,1,2].includes(sh)?`<p class="sd">${t.sade.replace('{h}',ord(sh))}</p>`:sh==8?`<p class="sd">${t.ash}</p>`:'';
 const tabs=['w','m','c'].map(k=>`<button data-mk="${k}" class="${meKind==k?'on':''}">${t[{w:'week',m:'month',c:'moon'}[k]]}</button>`).join('');
 return`<div class="me"><div class="seg">${tabs}</div>${navRow(pr.label)}${D.amb?`<p class="bad">${t.amb}</p>`:''}
 <div class="hero"><div class="cw">${svg}</div><div><h3>${D.name?D.name+' \u2013 ':''}${t.janma}: ${nm(SGN,ms)}${D.n.Lagna!=null?`, ${t.lagna}: ${nm(SGN,D.n.Lagna)}`:''}</h3>
 <p class="big">${starsHtml(s)} <span>${t['v'+s]}</span></p>${bars(r.ar,all.am)}${sd}</div></div>
 <h4>${t.more}</h4><ul class="ln">${pick(r,pr).map(it=>`<li>${lineTxt(it,pr)}</li>`).join('')}</ul>
 ${cl?`<h4>${t.cont}</h4><ul class="ln">${cl}</ul>`:''}<h4>${t.slow}</h4><ul class="ln">${slow}</ul>${ingress(pr)}</div>`}
// ---- shell ---------------------------------------------------------------
function fit(){document.querySelectorAll('.fr').forEach(f=>{let k=1.5;f.style.setProperty('--k',k);while(f.scrollHeight>f.clientHeight+1&&k>.55){k-=.04;f.style.setProperty('--k',k.toFixed(2))}})}
addEventListener('resize',()=>requestAnimationFrame(fit));document.fonts&&document.fonts.addEventListener('loadingdone',fit);document.fonts&&document.fonts.ready.then(fit);
function render(){const t=T();document.documentElement.lang=K()=='as'?'as':'en';SG=SGN[K()];
 $('ttl').textContent=t.title;$('sub').textContent=t.sub;$('note').textContent=t.note;$('lg').textContent=t.lang;
 $('tabs').innerHTML=[['every'],['chart'],['week'],['month'],['moon'],['me']].map(([k])=>`<button data-tab="${k=='every'?'everyone':k}" class="${tab==(k=='every'?'everyone':k)?'on':''}">${t[k]}</button>`).join('');
 const dv=`${A.y}-${p2(A.m)}-${p2(A.d)}`,tv=`${p2(A.hh)}:${p2(A.mm)}`;
 $('ctl').innerHTML=tab=='me'?'':`<label>${t.date}<input type="date" id="cd" value="${dv}" min="1930-01-10" max="2060-12-01"></label>${tab=='chart'?`<label>${t.time}<input type="time" id="ct" value="${tv}"></label>`:''}<button id="td">${t.today}</button>${tab=='week'||tab=='everyone'?`<label>${t.ws}<select id="ws"><option value="0"${ws==0?' selected':''}>${t.sun}</option><option value="1"${ws==1?' selected':''}>${t.mon}</option></select></label>`:''}`;
 $('v').innerHTML=tab=='everyone'?vEvery():tab=='chart'?vChart():tab=='week'?vPeriod('w'):tab=='month'?vPeriod('m'):tab=='moon'?vPeriod('c'):vMe();
 if(tab=='me'){$('mf').onsubmit=e=>{e.preventDefault();calcMe();$('mo').innerHTML=meHtml();$('mo').scrollIntoView({behavior:'smooth'})};if(!meData&&$('fd').value){calcMe();$('mo').innerHTML=meHtml()}}
 requestAnimationFrame(fit);
 $('th').textContent=document.documentElement.dataset.theme=='light'?'\u263E':'\u2600'}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.tab){tab=b.dataset.tab;render()}
 else if(b.dataset.cs){cs=b.dataset.cs;if(tab=='me')$('mo').innerHTML=meHtml();else render()}
 else if(b.dataset.mk){meKind=b.dataset.mk;$('mo').innerHTML=meHtml()}
 else if(b.dataset.nav){const d=+b.dataset.nav,k=tab=='me'?meKind:{everyone:'w',week:'w',month:'m',moon:'c'}[tab];
  if(k=='w')shift(7*d);else if(k=='m')shiftMonth(d);else{const pr=periodOf('c');if(!pr.bad)setAnc(d>0?pr.T1+.02:pr.T0-.02)}
  if(tab=='me')$('mo').innerHTML=meHtml();else render()}
 else if(b.id=='td'){const d=new Date(Date.now()+5.5*36e5);Object.assign(A,{y:d.getUTCFullYear(),m:d.getUTCMonth()+1,d:d.getUTCDate(),hh:d.getUTCHours(),mm:d.getUTCMinutes()});render()}
 else if(b.dataset.pin){const i=+b.dataset.pin;PIN=PIN==i?-1:i;try{localStorage.setItem('rp',PIN)}catch(e){}render();if(PIN>=0)$('rc'+PIN)?.scrollIntoView({block:'center'})}
 else if(b.dataset.copy){const c=b.closest('.rc');navigator.clipboard?.writeText(`${c.querySelector('h3').textContent.trim()} (${document.querySelector('.nav h2').textContent})\n`+(c.querySelector('.story')?c.querySelector('.story').innerText:c.querySelector('.vd').textContent+'\n'+[...c.querySelectorAll('details li')].map(l=>'- '+l.textContent).join('\n'))).then(()=>toast(T().copied)).catch(()=>{})}
 else if(b.dataset.jump){const c=$('rc'+b.dataset.jump);c.scrollIntoView({behavior:'smooth',block:'center'});const dt=c.querySelector('details');if(dt)dt.open=true}
 else if(b.dataset.all){const d=[...document.querySelectorAll('.rc details')],o=!d.every(x=>x.open);d.forEach(x=>x.open=o)}
 else if(b.id=='th'){const l=document.documentElement.dataset.theme=='light'?'dark':'light';document.documentElement.dataset.theme=l;try{localStorage.setItem('rt',l)}catch(e){}b.textContent=l=='light'?'\u263E':'\u2600'}
 else if(b.id=='lg'){L=L=='as'?'en':'as';try{localStorage.setItem('rl',L)}catch(e){}render()}});
document.addEventListener('change',e=>{const i=e.target;
 if(i.id=='cd'&&i.value){[A.y,A.m,A.d]=i.value.split('-').map(Number);render()}
 else if(i.id=='ct'&&i.value){[A.hh,A.mm]=i.value.split(':').map(Number);render()}
 else if(i.id=='ws'){ws=+i.value;render()}});
function tzOf(s){s=s.trim();return s=='Asia/Dhaka'?6:s=='Asia/Kathmandu'?5.75:isNaN(+s)?5.5:+s}
{let th;try{th=localStorage.getItem('rt')}catch(e){}document.documentElement.dataset.theme=th||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}
Promise.all([fetch('data/eph.bin').then(r=>r.arrayBuffer()),fetch('data/places.csv').then(r=>r.text())]).then(([b,c])=>{
 initEph(b);places=c.split('\n').slice(1).filter(Boolean).map(l=>{const q=l.split(',');return{name:q[0],lat:+q[1],lon:+q[2],tz:tzOf(q[3]||'')}});
 try{L=localStorage.getItem('rl')||'as'}catch(e){}render()}).catch(()=>{$('v').textContent='Could not load data/eph.bin. Serve this folder over http (e.g. GitHub Pages).'});
