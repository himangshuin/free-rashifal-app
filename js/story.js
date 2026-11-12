// Plain-language weekly rashifal (no planets/houses) built from the same Gochar scores.
const WM={Sun:0,Moon:1,Mars:0,Mercury:0,Jupiter:0,Venus:0,Saturn:0,Rahu:0,Ketu:0};
const DW={as:['দেও','সোম','মঙ্গ','বুধ','বৃহ','শুক্ৰ','শনি'],en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']};
const DWF={as:['দেওবাৰ','সোমবাৰ','মঙলবাৰ','বুধবাৰ','বৃহস্পতিবাৰ','শুক্ৰবাৰ','শনিবাৰ'],en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']};
const AN={as:{h:'স্বাস্থ্য',w:'ধন-সম্পদ',c:'কৰ্ম',l:'প্ৰেম আৰু ভালপোৱা',f:'পৰিয়াল আৰু সম্পৰ্ক',m:'মন'},en:{h:'Health',w:'Money',c:'Work',l:'Love',f:'Family and relationships',m:'Mind'}};
const LF={as:['মৰম-ভালপোৱাত মিলাপ্ৰীতি','মনৰ মানুহৰ লগত সৰু-সুৰা ভুল বুজাবুজি'],en:['warmth and closeness','small misunderstandings with your partner']};
const TP={as:{p:['{A}ৰ ফালৰ পৰা শুভ — {p}ৰ সম্ভাৱনা আছে।','{A}ৰ ফালৰ পৰা শুভ সপ্তাহ।'],n:['{A}ত সাৱধান — {q}ৰ আশংকা আছে।','{A}ত সাৱধানে চলক।'],m:['{A}ত মিশ্ৰ ফল — {p}ৰ সম্ভাৱনা আছে, কিন্তু {q}ৰ ফালে চকু ৰাখক।','{A}ত মিশ্ৰ ফল।']},
en:{p:['{A}: favourable, {p} is likely.','{A}: a favourable week.'],n:['{A}: be careful, {q} is a risk.','{A}: go carefully.'],m:['{A}: mixed — {p} is possible, but watch for {q}.','{A}: mixed results.']}};
const LD={as:{g:['এই সপ্তাহ আপোনাৰ বাবে অনুকূল হ’ব।','সপ্তাহটো আগবঢ়াৰ সুযোগেৰে ভৰা।'],y:['সপ্তাহটোত ভাল-বেয়া দুয়োটা ফল পাব।','এই সপ্তাহ মিশ্ৰ ফলৰ।'],r:['এই সপ্তাহ অলপ সাৱধানে চলিব লাগিব।','সপ্তাহটোত ধৈৰ্যৰ প্ৰয়োজন হ’ব।']},
en:{g:['This week is in your favour.','A week full of chances to move ahead.'],y:['You will see both good and tough moments this week.','A week of mixed results.'],r:['Go a little carefully this week.','This week asks for patience.']}};
const TR={as:{u:'সপ্তাহৰ শেষফালে অৱস্থা আগতকৈ ভাল হ’ব।',d:'সপ্তাহৰ প্ৰথমভাগ ভাল, শেষফালে অলপ সাৱধান হওক।'},en:{u:'Things improve toward the end of the week.',d:'The first half is better; be careful toward the end.'}};
const AD={as:{g:'নতুন কাম আৰম্ভ কৰিবলৈ ভাল সময়।',y:'ধৈৰ্য ৰাখি আগবাঢ়ক।',r:'ডাঙৰ সিদ্ধান্ত আৰু আৰ্থিক লেনদেন ভালদৰে ভাবি-চিন্তি কৰক।'},en:{g:'A good time to begin something new.',y:'Move ahead with patience.',r:'Think twice before big decisions and money matters.'}};
const DL={as:['শুভ দিন','সাৱধানতাৰ দিন'],en:['Good days','Days for caution']};
const LG={as:'সেউজীয়া: শুভ, হালধীয়া: মিশ্ৰ, ৰঙা: সাৱধান',en:'Green: good, yellow: mixed, red: careful'};
function fillT(t,A,p,q){const T=TP[K()][t],ok=t=='p'?p:t=='n'?q:p&&q;return T[ok?0:1].replace('{A}','<b>'+A+'</b>').replace('{p}',p||'').replace('{q}',q||'')}
function story(i,r,pr,all){const ix=L=='as'?2:3,sd=Math.floor(pr.T0/7)+i,s=zStars((r.o-all.m)/all.sd),cs={};
 r.it.forEach(it=>it.c.c.forEach(x=>{const[a,sg]=TH[x];cs[a]=cs[a]||{};cs[a][x]=(cs[a][x]||0)+it.w*(it.ved&&sg>0?.25:1)*sg}));
 const nowJ=Date.now()/864e5+2440587.5,days=[...Array(7).keys()].map(d=>{const x=rate(i,pr.S,pr.T0+d,pr.T0+d+1,WM),o=x.o;
  return{o,ar:x.ar,dow:dtOf(pr.T0+d+.5).getUTCDay(),c:o>=.9?'g':o<=-.9?'r':'y',today:nowJ>=pr.T0+d&&nowJ<pr.T0+d+1}});
 const areas=AREAS.map(([a])=>{const z=(r.ar[a]-all.am[a][0])/all.am[a][1],c=cs[a]||{},ks=Object.keys(c),
  p=ks.filter(k=>c[k]>0).sort((x,y)=>c[y]-c[x])[0],q=ks.filter(k=>c[k]<0).sort((x,y)=>c[x]-c[y])[0],tone=z>.35?'p':z<-.35?'n':'m';
  const dv=days.map(d=>d.ar[a]);let di=-1;if(tone=='p'){const m=Math.max(...dv);if(m>.15)di=dv.indexOf(m)}else{const m=Math.min(...dv);if(m<-.15)di=dv.indexOf(m)}
  const hint=di<0?'':L=='as'?` (${DW.as[days[di].dow]})`:` (${DW.en[days[di].dow]})`;
  return{a,tone,txt:fillT(tone,AN[K()][a],p?TH[p][ix]:a=='l'&&tone!='n'?LF[K()][0]:null,q?TH[q][ix]:a=='l'&&tone!='p'?LF[K()][1]:null).replace(/(।|\.)$/,hint+'$1')}});
 const o1=rate(i,pr.S,pr.T0,pr.T0+3.5,pr.W).o,o2=rate(i,pr.S,pr.T0+3.5,pr.T1,pr.W).o,tr=o2-o1,band=s>=4?'g':s==3?'y':'r';
 const nmz=c=>days.filter(d=>d.c==c).sort((a,b)=>c=='g'?b.o-a.o:a.o-b.o).slice(0,2).map(d=>DWF[K()][d.dow]).join(', '),g=nmz('g'),rd=nmz('r');
 return{s,days,areas,lead:LD[K()][band][sd%2],trend:tr>.5?TR[K()].u:tr<-.5?TR[K()].d:'',advice:AD[K()][band],
  dayline:[g&&`${DL[K()][0]}: ${g}`,rd&&`${DL[K()][1]}: ${rd}`].filter(Boolean).join(' | ')}}
