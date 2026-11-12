// Gochar (transit) rules from Jyotish Darpan, ch.13 "Gochar Phal" (pp.359-367).
// Each planet: 12 cells = houses counted from the janma rashi (Moon sign). Cell = "score:codes".
const GC={
Sun:"-2:rg gr dc cg-;-1:il dp rg;2:su ay sc;-1:rg qu ob;-2:rg an hu;2:ay jy su sc;-1:il rg cg-;-2:gr ac mi dg;-2:rg dp gr en;2:sc hn;2:ay gn su hn;-1:rg an dp tr",
Moon:"2:cm;-1:ob ex cr;2:su sc gn;-1:an tr;-2:dp gr rg;2:ay sc su jy;1:jy ay;-2:is an rg ls qu;-1:en an;2:ay sc;1:gs;-1:ex an",
Mars:"-2:rg tr en an;-1:ob cr ex;2:sc su;-1:tr an rg;-2:rg an dp gr;1:jy ay rg;1:ay jy;-2:rg is an ls;-1:en;2:ay sc;2:jy sc;-1:ex qu cr",
Mercury:"-1:fl mi;2:ay gn cm tl;-1:en gr;1:jy ay;-1:qu dp gr;2:sc ay;-2:sp qu dp;2:sc jy;-1:qu an rg;2:ay sc su;2:ay gn jy;-2:qu rg an hu",
Jupiter:"-2:hu an cg-;2:jy gn sc;-1:en;-2:gr ex an;2:sc hn ay cm;-2:ls rg an;2:sc;-2:rg gr hu tr ob;2:hn tl;-2:ls hu ob;2:ay gn hn;-2:sp ex dp",
Venus:"2:cm;2:jy ay sn;2:gn jy;2:cg+ jy;2:jy;-2:sp hu an;-1:lq an rg;2:ld gn lv jy;2:sc hn;-2:dp qu hu an;2:jy gn;2:cm",
Saturn:"-2:sp rg qu dg an;-2:rg ls tr qu an;2:sc gn tl jy;-2:rg an;-2:ls hu rg qu;2:sc vc gn;-2:sp tr ex rg;-2:ls hu gr an;-2:il ls mi;-2:rg hu tr;2:tl gn ay;-2:gr ex ac",
Rahu:"-2:rg tr en an;-1:ob cr ex;1:sc rg;-1:tr an rg;-2:rg an dp gr;2:jy ay su;2:gn jy;-2:rg is ls an;-1:en;2:ay sc;2:jy sc;-2:ex hu cr",
Ketu:"-2:sp rg en qu dg an;-2:rg ls tr qu an;2:sc tl jy;-2:rg gr an;-2:ls hu rg qu;2:sc vc gn;-2:sp tr ex rg;-2:ls hu gr an;-2:il ls mi;-2:rg hu tr;2:tl ay;-2:gr ex ac"};
// Vedha: planet in a favourable house is obstructed if another planet sits in the paired house (book p.366-367).
// Sun's 3rd pairs with the 9th (the supplied text reads "1st", which looks like a misprint).
const VD={Sun:{3:9,6:12,10:4,11:5},Moon:{1:5,3:9,6:12,7:2,10:4,11:8},Mars:{3:12,6:9,11:5},Mercury:{2:5,4:3,6:9,8:1,10:7,11:12},
Jupiter:{2:12,5:4,7:3,9:10,11:8},Venus:{1:8,2:7,3:1,4:10,5:9,8:5,9:11,11:6},Saturn:{3:12,6:9,11:5},Rahu:{3:12,6:9,11:5},Ketu:{3:12,6:9,11:5}};
// planets that never obstruct each other
const NOVD=[['Sun','Saturn'],['Moon','Mercury'],['Rahu','Ketu']];
// weight of each planet in a period (slow planets matter more)
const PW={Sun:1,Moon:.6,Mars:1,Mercury:.8,Jupiter:2,Venus:1,Saturn:2,Rahu:1.5,Ketu:1.2};
// weekly weights: the Moon moves ~3 signs in a week, so it leads; slow planets are the background
const PWW={Sun:2,Moon:6,Mars:1.2,Mercury:3,Venus:0,Jupiter:0,Saturn:0,Rahu:0,Ketu:0}; // weekly: Moon, then Mercury, Sun, Mars. Others count only if they change rashi/nakshatra that week
// theme code -> [area, sign, Assamese, English]; areas: h health, w wealth, c work/status, f family, m mind
const TH={
'su':['h',1,'সুস্বাস্থ্য','good health'],'rg':['h',-1,'ৰোগ-ব্যাধি','illness'],'is':['h',-1,'অনিদ্ৰা','sleeplessness'],'dg':['h',-1,'পেটৰ গণ্ডগোল','digestive upset'],'ac':['h',-1,'দুৰ্ঘটনাৰ আশংকা','risk of mishaps'],
'ay':['w',1,'আয়বৃদ্ধি','rising income'],'gn':['w',1,'অপ্ৰত্যাশিত লাভ','unexpected gains'],'ld':['w',1,'ভূ-সম্পত্তি লাভ','property gains'],'il':['w',-1,'আয় হ্ৰাস','falling income'],'ls':['w',-1,'ক্ষতি','losses'],'ex':['w',-1,'অতিৰিক্ত ব্যয়','heavy expenses'],
'sc':['c',1,'কামত সফলতা','success in efforts'],'vc':['c',1,'শত্ৰুৰ পৰাজয়','rivals defeated'],'hn':['c',1,'সন্মান আৰু ভাল সম্পৰ্ক','honour and good contacts'],'tl':['c',1,'প্ৰতিভাৰ স্বীকৃতি','talent recognised'],
'ob':['c',-1,'বাধা-বিঘিনি','obstacles and delays'],'fl':['c',-1,'অসফলতা','setbacks'],'hu':['c',-1,'অপমান বা মৰ্যাদাহানি','loss of face'],'cr':['c',-1,'সমালোচনা','criticism'],'dc':['c',-1,'সাময়িক অৱনতি','temporary decline'],
'jy':['f',1,'পাৰিবাৰিক সুখ','family comfort'],'cm':['f',1,'আৰাম, ভাল খাদ্য-বস্ত্ৰ','comfort, good food and clothes'],'sn':['f',1,'সন্তানৰ শুভ','good news about children'],'gs':['f',1,'অতিথিৰ আগমন','guests arriving'],'cg+':['f',1,'শুভ পৰিৱৰ্তন','a favourable change'],
'qu':['f',-1,'কাজিয়া-বিবাদ','quarrels'],'sp':['l',-1,'জীৱনসংগীৰ লগত মনোমালিন্য','strain with spouse'],'gr':['f',-1,'শোক-দুখ','grief or sorrow'],'cg-':['f',-1,'অপ্ৰিয় পৰিৱৰ্তন','an unwelcome change'],'lv':['l',1,'প্ৰেম-সম্পৰ্কত আনন্দ','joy in romance'],'lq':['l',-1,'প্ৰেম-সম্পৰ্কত কাজিয়া বা অস্থিৰতা','tension or restlessness in love'],'mi':['f',-1,'ভুল বুজাবুজি','misunderstandings'],
'an':['m',-1,'দুশ্চিন্তা','anxiety'],'dp':['m',-1,'হতাশা','despondency'],'en':['m',-1,'শত্ৰুভয়','fear of enemies'],'tr':['m',-1,'অযথা ভ্ৰমণ','aimless travel']};
const AREAS=[['h','স্বাস্থ্য','Health'],['w','ধন','Wealth'],['c','কৰ্ম','Work'],['l','প্ৰেম','Love'],['f','পৰিয়াল','Family'],['m','মন','Mind']];
const PL=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];
const PN={as:['ৰবি','চন্দ্ৰ','মঙ্গল','বুধ','বৃহস্পতি','শুক্ৰ','শনি','ৰাহু','কেতু'],en:PL};
const SGN={as:['মেষ','বৃষ','মিথুন','কৰ্কট','সিংহ','কন্যা','তুলা','বৃশ্চিক','ধনু','মকৰ','কুম্ভ','মীন'],en:['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrishchika','Dhanu','Makara','Kumbha','Meena']};
// what each house stands for (used in the birth-chart tab)
const HD={as:['ব্যক্তিত্ব আৰু স্বাস্থ্য','ধন আৰু পৰিয়াল','সাহস আৰু ভাই-ভগ্নী','ঘৰ আৰু মানসিক শান্তি','বিদ্যা আৰু সন্তান','ৰোগ আৰু প্ৰতিযোগিতা','দাম্পত্য আৰু অংশীদাৰী','আকস্মিক পৰিৱৰ্তন','ভাগ্য আৰু ধৰ্ম','কৰ্ম আৰু প্ৰতিষ্ঠা','আয় আৰু লাভ','ব্যয় আৰু বিদেশ'],
en:['self and health','money and family','courage and siblings','home and peace of mind','learning and children','health issues and rivals','marriage and partnerships','sudden change','luck and dharma','career and status','gains and networks','expenses and foreign ties']};
// what each natal planet signifies
const KR={as:['আত্মবল আৰু কৰ্তৃত্ব','মন আৰু মাতৃ','সাহস আৰু সম্পত্তি','বুদ্ধি আৰু ব্যৱসায়','জ্ঞান, সন্তান আৰু ধন','প্ৰেম আৰু সুখ-স্বাচ্ছন্দ্য','কৰ্ম আৰু শৃংখলা','আকাংক্ষা আৰু হঠাৎ ঘটনা','বৈৰাগ্য আৰু বিচ্ছেদ'],
en:['vitality and authority','mind and mother','courage and property','intellect and business','wisdom, children and wealth','love and comforts','work and discipline','ambition and sudden events','detachment and separation']};
const NK={as:['অশ্বিনী','ভৰণী','কৃত্তিকা','ৰোহিণী','মৃগশিৰা','আৰ্দ্ৰা','পুনৰ্বসু','পুষ্যা','অশ্লেষা','মঘা','পূৰ্বফাল্গুনী','উত্তৰফাল্গুনী','হস্তা','চিত্ৰা','স্বাতী','বিশাখা','অনুৰাধা','জ্যেষ্ঠা','মূলা','পূৰ্বাষাঢ়া','উত্তৰাষাঢ়া','শ্ৰৱণা','ধনিষ্ঠা','শতভিষা','পূৰ্বভাদ্ৰপদ','উত্তৰভাদ্ৰপদ','ৰেৱতী'],
en:['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati']};
