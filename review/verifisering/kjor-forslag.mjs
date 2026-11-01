import * as m from './bundle_1p.mjs'; import fs from 'fs';
const T=JSON.parse(fs.readFileSync('/tmp/forslag-tests.json','utf8')); let bad=0,n=0;
for(const t of T){ for(const a of t.acc){ n++; let ok; try{ok=m.sjekk.sjekkSluttsvar(a,t.spec);}catch(e){ok='ERR '+e.message} if(ok!==true){bad++;console.log('AVVIST riktig',t.id,JSON.stringify(a),ok);} }
 for(const a of t.rej){ n++; let ok; try{ok=m.sjekk.sjekkSluttsvar(a,t.spec);}catch(e){ok='ERR'} if(ok!==false){bad++;console.log('GODTATT feil',t.id,JSON.stringify(a),ok);} } }
console.log(n,'tester',bad,'avvik');
