/* Metodología: proceso de pentest por fases y forma de practicar en labs/CTF (sin comandos ni payloads) */
(function(){
const root=document.getElementById("mRoot");if(!root)return;
const t=(a,b)=>CDL.t(a,b),p=x=>CDL.lang==="id"?x[0]:x[1];
const PHASES=[
 {id:"pre",n:"00",h:["Pre-acuerdo y alcance","Pre-engagement and scope"],
  goal:["Dejar claro qué se puede probar, cuándo y con qué límites. Sin autorización firmada no se toca nada.","Make clear what can be tested, when and within which limits. Nothing is touched without signed authorization."],
  check:[["Activos dentro y fuera del alcance","In-scope and out-of-scope assets"],["Ventanas de prueba y contactos de emergencia","Testing windows and emergency contacts"],["Reglas: qué está permitido y qué no","Rules: what's allowed and what isn't"],["Tipo de prueba: caja negra, gris o blanca","Test type: black, grey or white box"]],
  tools:[],out:["Carta de autorización y documento de alcance","Authorization letter and scope document"]},
 {id:"recon",n:"01",h:["Reconocimiento","Reconnaissance"],
  goal:["Entender la superficie expuesta antes de probar nada: qué hosts, puertos, servicios y tecnologías existen.","Understand the exposed surface before testing anything: which hosts, ports, services and technologies exist."],
  check:[["Puertos abiertos y versiones de servicios","Open ports and service versions"],["Tecnologías del sitio web y del servidor","Website and server technologies"],["Subdominios y hosts virtuales","Subdomains and virtual hosts"],["Información pública del objetivo","Public information about the target"]],
  tools:["Nmap","ffuf","WhatWeb","crt.sh"],out:["Inventario de activos y servicios","Asset and service inventory"]},
 {id:"enum",n:"02",h:["Enumeración","Enumeration"],
  goal:["Profundizar en cada servicio encontrado. Aquí es donde se gana o se pierde la mayoría de pruebas.","Dig into every service found. This is where most tests are won or lost."],
  check:[["Acceso anónimo en FTP, SMB y NFS","Anonymous access on FTP, SMB and NFS"],["Transferencias de zona DNS y SNMP con comunidades por defecto","DNS zone transfers and SNMP default communities"],["Bases de datos expuestas (MySQL, MSSQL)","Exposed databases (MySQL, MSSQL)"],["Rutas, parámetros y roles de la aplicación web","Web app paths, parameters and roles"]],
  tools:["smbclient","rpcclient","NetExec","ffuf","Burp Suite"],out:["Lista de posibles puntos de entrada","List of possible entry points"]},
 {id:"vuln",n:"03",h:["Análisis de vulnerabilidades","Vulnerability analysis"],
  goal:["Cruzar lo encontrado con fallos conocidos y revisar la lógica de la aplicación a mano.","Match what was found against known flaws and review the app's logic by hand."],
  check:[["Versiones contra CVE públicos","Versions against public CVEs"],["Control de acceso, autenticación e inyecciones (OWASP Top 10)","Access control, authentication and injections (OWASP Top 10)"],["Configuraciones débiles y archivos expuestos","Weak configurations and exposed files"],["Credenciales por defecto o reutilizadas","Default or reused credentials"]],
  tools:["Burp Suite","WPScan","searchsploit","NVD"],out:["Hallazgos candidatos priorizados","Prioritized candidate findings"]},
 {id:"val",n:"04",h:["Validación controlada","Controlled validation"],
  goal:["Confirmar que cada hallazgo es real y medir su impacto, con la mínima intrusión posible y sin afectar la operación.","Confirm each finding is real and measure its impact, as unintrusively as possible and without disrupting operations."],
  check:[["Prueba de concepto segura y reproducible","Safe, reproducible proof of concept"],["Evidencia: capturas, peticiones y respuestas","Evidence: screenshots, requests and responses"],["Nada de pruebas destructivas fuera de lo acordado","No destructive testing beyond what was agreed"]],
  tools:["Burp Suite","Metasploit","Impacket"],out:["Hallazgos confirmados con evidencia","Confirmed findings with evidence"]},
 {id:"post",n:"05",h:["Post-explotación","Post-exploitation"],
  goal:["Si el alcance lo permite, medir hasta dónde llegaría un atacante real: escalada de privilegios, movimiento y datos expuestos.","If the scope allows it, measure how far a real attacker would get: privilege escalation, movement and exposed data."],
  check:[["Permisos mal configurados y privilegios excesivos","Misconfigured permissions and excessive privileges"],["Credenciales guardadas o en historiales","Stored credentials or credentials in history files"],["Limpieza de todo lo que se haya dejado en el sistema","Cleanup of anything left on the system"]],
  tools:["GTFOBins","LinPEAS","John","Hashcat"],out:["Cadena de ataque completa y documentada","Full, documented attack chain"]},
 {id:"report",n:"06",h:["Reporte","Reporting"],
  goal:["Convertir lo técnico en decisiones. Un hallazgo que nadie entiende no se corrige.","Turn the technical into decisions. A finding nobody understands never gets fixed."],
  check:[["Resumen ejecutivo para la gerencia","Executive summary for management"],["Detalle técnico, severidad y evidencia por hallazgo","Technical detail, severity and evidence per finding"],["Pasos de remediación concretos","Concrete remediation steps"]],
  tools:["SysReptor","D-Luna Learning"],out:["Reporte técnico y ejecutivo","Technical and executive report"]},
 {id:"retest",n:"07",h:["Re-test","Retest"],
  goal:["Volver a probar lo corregido para confirmar que de verdad quedó cerrado.","Test the fixes again to confirm they actually closed the issue."],
  check:[["Cada hallazgo marcado como cerrado, parcial o abierto","Each finding marked closed, partial or open"],["Carta final de cierre","Final closure letter"]],
  tools:[],out:["Estado final de cada hallazgo","Final status of each finding"]}
];
const PRACTICE=[
 {c:"#4d8dff",h:["Servicios de red","Network services"],d:["FTP, SMB, NFS, DNS, SNMP y bases de datos. La base de la CJCA y de casi cualquier máquina.","FTP, SMB, NFS, DNS, SNMP and databases. The core of the CJCA and almost every machine."],tools:["Nmap","smbclient","NetExec"]},
 {c:"#5be3a0",h:["Aplicaciones web","Web applications"],d:["Mi área principal. Control de acceso, autenticación, inyecciones y CMS como WordPress.","My main area. Access control, authentication, injections and CMSs like WordPress."],tools:["Burp Suite","ffuf","WPScan"]},
 {c:"#ff5c7a",h:["Escalada de privilegios","Privilege escalation"],d:["Linux y Windows: permisos, servicios mal configurados y credenciales olvidadas.","Linux and Windows: permissions, misconfigured services and forgotten credentials."],tools:["GTFOBins","LinPEAS"]},
 {c:"#ffb547",h:["Cracking y criptografía","Cracking and crypto"],d:["Identificar hashes, codificaciones y archivos protegidos que aparecen en los retos.","Identifying hashes, encodings and protected files that show up in challenges."],tools:["John","Hashcat","CyberChef"]},
 {c:"#b48cff",h:["Forense","Forensics"],d:["Retos de análisis de archivos e imágenes, como los del bootcamp CTF del ITLA.","File and image analysis challenges, like the ones in ITLA's CTF bootcamp."],tools:["ExifTool","binwalk","strings"]},
 {c:"#7fd4ff",h:["Tráfico de red","Network traffic"],d:["Leer capturas, seguir conversaciones y encontrar lo que no debería viajar en claro.","Reading captures, following conversations and spotting what shouldn't travel in clear text."],tools:["Wireshark","tcpdump"]},
 {c:"#9cc2ff",h:["Defensa y SIEM","Defense and SIEM"],d:["Triage de alertas y logs. Ver el ataque desde el otro lado mejora mis reportes.","Alert and log triage. Seeing attacks from the other side improves my reports."],tools:["Elastic","Wazuh","TheHive"]},
 {c:"#ff8f5c",h:["Reporte","Reporting"],d:["Cada máquina termina en notas, writeup y flashcards para no olvidar lo aprendido.","Every machine ends in notes, a writeup and flashcards so nothing learned gets lost."],tools:["SysReptor","D-Luna Learning"]}
];
const LOOP=[["Enumerar todo","Enumerate everything","Antes de atacar nada, anoto cada puerto, servicio y versión.","Before attacking anything, I note every port, service and version."],
 ["Hipótesis","Hypothesis","Elijo el punto de entrada más probable y por qué.","I pick the most likely entry point and why."],
 ["Intentar primero","Try first","Me equivoco solo antes de buscar ayuda. Ahí es donde más aprendo.","I fail on my own before looking for help. That's where I learn the most."],
 ["Documentar","Document","Notas en tiempo real, luego writeup y flashcards.","Live notes, then a writeup and flashcards."],
 ["Repasar los gaps","Review the gaps","Lo que no dominé se convierte en práctica dirigida.","What I didn't master becomes targeted practice."]];
const PLAT=()=>["HTB Labs","HTB Academy","HTB Sherlocks","TryHackMe","LetsDefend","CyberDefenders",t("CTF del ITLA","ITLA CTF")];
let mode="pentest";
function pentest(){
  return `<div class="legal rv">${t("Todo lo que describe esta página se aplica solo con autorización por escrito y alcance definido, o en laboratorios y competencias creados para practicar.","Everything on this page is applied only with written authorization and a defined scope, or in labs and competitions built for practice.")}</div>
  <div class="plan rv" style="margin-bottom:28px">${[["01",["Reconocer","Discover"]],["02",["Enumerar","Enumerate"]],["03",["Analizar","Analyze"]],["04",["Validar","Validate"]],["06",["Reportar","Report"]]].map(([n,h])=>`<div class="spot"><code style="margin:0 0 6px;color:var(--blue)">${n}</code><h4>${p(h)}</h4><p>${p(PHASES.find(x=>x.n===n).out)}</p></div>`).join("")}</div>
  <div class="mlay">
    <nav class="mside" id="mside"><h4>${t("FASES","PHASES")}</h4>${PHASES.map(f=>`<a href="#ph-${f.id}" data-id="${f.id}"><span>${f.n}</span>${p(f.h)}</a>`).join("")}</nav>
    <div class="mmain">${PHASES.map((f,i)=>`<details class="phase rv" id="ph-${f.id}"${i<3?" open":""}>
      <summary><span class="num">${f.n}</span><h3>${p(f.h)}</h3><span class="cnt">${f.check.length} ${t("puntos","checks")}</span></summary>
      <div class="pbody">
        <p>${p(f.goal)}</p>
        <div class="sd-cols" style="margin-top:0">
          <div><h4>${t("Qué reviso","What I check")}</h4><ul class="checks">${f.check.map(c=>`<li>${p(c)}</li>`).join("")}</ul></div>
          <div>${f.tools.length?`<h4>${t("Herramientas","Tools")}</h4><div class="stack" style="margin-bottom:20px">${f.tools.map(x=>`<span>${x}</span>`).join("")}</div>`:""}
            <h4>${t("Criterio de salida","Exit criteria")}</h4><p style="color:var(--text)">${p(f.out)}</p></div>
        </div>
      </div></details>`).join("")}</div>
  </div>`}
function ctf(){
  return `<div class="ctf-hero rv"><h2>${t("Cómo <em>practico</em>","How I <em>practice</em>")}</h2><p>${t("Labs, máquinas y competencias. El mismo método que uso en un pentest, aplicado a entornos hechos para aprender.","Labs, machines and competitions. The same method I use on a pentest, applied to environments built for learning.")}</p></div>
  <div class="steps sweep rv" style="margin-bottom:46px">${LOOP.map(l=>`<div><h3>${CDL.lang==="id"?l[0]:l[1]}</h3><p>${CDL.lang==="id"?l[2]:l[3]}</p></div>`).join("")}</div>
  <div class="cat"><div class="cat-h"><span class="tag" style="--c:var(--blue)">${t("ÁREAS","AREAS")}</span><h3>${t("En qué entreno","What I train")}</h3></div>
    <div class="arsenal">${PRACTICE.map(a=>`<div class="spot rv" style="--c:${a.c}"><h4>${p(a.h)}</h4><p>${p(a.d)}</p><div class="stack">${a.tools.map(x=>`<span>${x}</span>`).join("")}</div></div>`).join("")}</div></div>
  <div class="cat"><div class="cat-h"><span class="tag" style="--c:var(--ok)">${t("PLATAFORMAS","PLATFORMS")}</span><h3>${t("Dónde practico","Where I practice")}</h3></div>
    <div class="stack" style="gap:10px">${PLAT().map(x=>`<span style="font-size:13px;padding:7px 12px">${x}</span>`).join("")}</div></div>`}
function render(){root.innerHTML=mode==="pentest"?pentest():ctf();CDL.bindFx(root);
  document.querySelectorAll("#mode button").forEach(b=>b.classList.toggle("on",b.dataset.m===mode));
  const side=document.getElementById("mside");
  if(side){side.querySelectorAll("a").forEach(a=>a.onclick=e=>{const d=document.getElementById("ph-"+a.dataset.id);d.open=true});
    const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){side.querySelectorAll("a").forEach(a=>a.classList.toggle("on",x.target.id==="ph-"+a.dataset.id))}}),{rootMargin:"-30% 0px -60% 0px"});
    root.querySelectorAll(".phase").forEach(d=>io.observe(d))}}
document.querySelectorAll("#mode button").forEach(b=>b.onclick=()=>{mode=b.dataset.m;render()});
CDL.onLang(render);
})();
