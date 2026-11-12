// Engine: sidereal positions from the supplied daily ephemeris (1930-2061), transit segments, Gochar scoring.
const J0=Date.UTC(1930,0,1)/864e5+2440587.5;
let E=null,N=0;
const wr=u=>((u+648000)%1296000+1296000)%1296000-648000;
function initEph(buf){E=new Int32Array(buf);N=E.length/10}
const inRange=jd=>jd-J0>=2&&jd-J0<N-4;
// r[0]=ayanamsha, r[1..9]=Sun..Ketu sidereal longitude (degrees)
function pos(jd){const x=jd-J0,i=Math.floor(x),f=x-i,w=[-f*(f-1)*(f-2)/6,0,-(f+1)*f*(f-2)/2,(f+1)*f*(f-1)/6],r=new Array(10);
 for(let k=0;k<10;k++){const b=E[i*10+k];let s=b;for(const j of[-1,1,2]){const u=E[(i+j)*10+k]-b;s+=w[j+1]*(k?wr(u):u)}r[k]=k?((s%1296000+1296000)%1296000)/3600:s/3600}
 return r}
const jdOf=(y,m,d,h=0,mi=0,tz=5.5)=>Date.UTC(y,m-1,d,h,mi)/864e5+2440587.5-tz/24;
const dtOf=(jd,tz=5.5)=>new Date((jd-2440587.5+tz/24)*864e5); // read with getUTC*
const sgn=(k,jd)=>Math.floor(pos(jd)[k+1]/30);
const signs=jd=>pos(jd).slice(1).map(l=>Math.floor(l/30));
function retro(k,jd){const a=pos(jd-.25)[k+1],b=pos(jd+.25)[k+1];let d=b-a;if(d>180)d-=360;if(d<-180)d+=360;return d<0}
// For [t0,t1] (JD): per planet a list of {a,b,s} segments of constant sign
function segs(t0,t1){const S=PL.map(()=>[]),prev=signs(t0),st=PL.map(()=>t0);
 for(let t=t0+.1;;t+=.1){const tt=Math.min(t,t1),s=signs(tt);
  for(let k=0;k<9;k++)if(s[k]!=prev[k]){let lo=tt-.1,hi=tt;for(let i=0;i<20;i++){const m=(lo+hi)/2;if(sgn(k,m)==prev[k])lo=m;else hi=m}
   S[k].push({a:st[k],b:hi,s:prev[k]});st[k]=hi;prev[k]=s[k]}
  if(tt>=t1)break}
 for(let k=0;k<9;k++)S[k].push({a:st[k],b:t1,s:prev[k]});return S}
const sgAt=(S,k,t)=>{for(const g of S[k])if(t<=g.b)return g.s;return S[k][S[k].length-1].s};
const GCP={};PL.forEach(P=>GCP[P]=GC[P].split(';').map(c=>{const[s,x]=c.split(':');return{s:+s,c:x.split(' ')}}));
const BEN=['Jupiter','Venus','Mercury'];
// Score one moon sign (ms 0..11) over [T0,T1]
function rate(ms,S,T0,T1,W=PW){
 const len=T1-T0,ar={h:0,w:0,c:0,l:0,f:0,m:0},it=[];let num=0,den=0;
 PL.forEach((P,k)=>{const fr=(W._fr||{})[P]||0;for(const g0 of S[k]){const g={a:Math.max(g0.a,T0,fr),b:Math.min(g0.b,T1),s:g0.s},f=(g.b-g.a)/len;if(f<=1e-6)continue;
  const h=(g.s-ms+12)%12+1,c=GCP[P][h-1],w=W[P]*f;let ved=0;
  if(c.s>0&&VD[P][h]){const vh=VD[P][h],mid=(g.a+g.b)/2;
   ved=PL.some((Q,q)=>q!=k&&!NOVD.some(x=>x.includes(P)&&x.includes(Q))&&(sgAt(S,q,mid)-ms+12)%12+1==vh)?1:0}
  const m=ved?.25:1;num+=w*(c.s>0?c.s*m:c.s);den+=w;
  if(P=='Venus'||P=='Moon')ar.l+=c.s*(P=='Venus'?.5:.3)*w*(c.s>0?m:1); // love also follows Venus (and the Moon) overall
  c.c.forEach(x=>{const[a,sg]=TH[x];ar[a]+=sg*w*(sg>0?m:1)});
  it.push({P,k,h,g,c,ved,w:w*Math.abs(c.s)})}});
 for(const a in ar)ar[a]/=den;
 return{o:num/den,ar,it}}
const stars=o=>Math.max(1,Math.min(5,Math.round(3+o*1.5)));
const pct=v=>Math.max(6,Math.min(94,50+v*60));
// Tropical ascendant -> sidereal lagna (degrees)
function lagnaDeg(jd,lat,lon,ay){const T=(jd-2451545)/36525,g=280.46061837+360.98564736629*(jd-2451545)+.000387933*T*T,
 ra=(((g+lon)%360+360)%360)*Math.PI/180,e=(23.4392911-.0130042*T)*Math.PI/180,p=lat*Math.PI/180;
 let a=Math.atan2(Math.cos(ra),-(Math.sin(ra)*Math.cos(e)+Math.tan(p)*Math.sin(e)))*180/Math.PI;return(((a-ay)%360)+360)%360}
// Birth chart: natal = {Lagna:sign|null, Sun..Ketu: sign}, plus lons
function natal(jdUT,lat,lon,withLagna){const p=pos(jdUT),n={lons:p.slice(1)};PL.forEach((P,k)=>n[P]=Math.floor(p[k+1]/30));
 n.Lagna=withLagna?Math.floor(lagnaDeg(jdUT,lat,lon,p[0])/30):null;return n}
// Natal contacts: transiting planet in the same sign as a natal planet / lagna
function contacts(n,S,T0,T1){const len=T1-T0,out=[];let adj=0;
 PL.forEach((P,k)=>{if(P=='Moon')return;for(const g of S[k]){const f=(g.b-g.a)/len;if(f<=.02)continue;
  [...(n.Lagna!=null?['Lagna']:[]),...PL].forEach(B=>{if((B=='Lagna'?n.Lagna:n[B])!=g.s)return;
   const ben=BEN.includes(P),w=PW[P]*f*(B=='Lagna'||B=='Moon'?1.3:1);adj+=(ben?.2:-.2)*w;out.push({P,k,B,g,ben,w})})}});
 out.sort((a,b)=>b.w-a.w);return{list:out,adj:Math.max(-.4,Math.min(.4,adj))}}

// Rashi / nakshatra changes of the non-Moon planets inside [T0,T1], with how long the new position lasts (days)
const nakOf=(k,jd)=>Math.floor(pos(jd)[k+1]/(360/27));
function stay(k,t,type){const f=type=='r'?j=>sgn(k,j):j=>nakOf(k,j),v=f(t+.01);for(let d=1;d<1500;d++){const j=t+d;if(!inRange(j+3))return null;if(f(j)!=v)return d}return null}
function events(S,T0,T1){const ev=[];
 PL.forEach((P,k)=>{if(k==1)return;S[k].forEach((g,i)=>{if(i)ev.push({k,P,type:'r',t:g.a,s:g.s})});
  if(k>=4){let prev=nakOf(k,T0);for(let t=T0+.5;;t+=.5){const tt=Math.min(t,T1),c=nakOf(k,tt);
   if(c!=prev){let lo=tt-.5,hi=tt;for(let j=0;j<18;j++){const m=(lo+hi)/2;if(nakOf(k,m)==prev)lo=m;else hi=m}
    if(!ev.some(x=>x.k==k&&x.type=='r'&&Math.abs(x.t-hi)<.05))ev.push({k,P,type:'n',t:hi,nak:c,s:sgn(k,hi)});prev=c}
   if(tt>=T1)break}}});
 ev.forEach(x=>x.days=stay(x.k,x.t,x.type));return ev.sort((a,b)=>a.t-b.t)}
