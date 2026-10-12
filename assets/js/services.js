/* Servicios: lista + panel de detalle, con WhatsApp prellenado por servicio */
(function(){
const S=CDL.SERVICES,list=document.getElementById("sdList"),panel=document.getElementById("sdPanel");
let cur=Math.max(0,S.findIndex(s=>s.id===location.hash.slice(1)));
const t=(a,b)=>CDL.t(a,b),pick=p=>CDL.lang==="id"?p[0]:p[1];
function renderList(){list.innerHTML=S.map((s,i)=>`<button type="button" data-i="${i}" class="${i===cur?"on":""}" aria-pressed="${i===cur}"><span>${String(i+1).padStart(2,"0")}</span>${s[CDL.lang]}</button>`).join("");
  list.querySelectorAll("button").forEach(b=>b.onclick=()=>{show(+b.dataset.i,true)})}
function show(i,user){cur=i;const s=S[i],l=CDL.lang;
  list.querySelectorAll("button").forEach((b,j)=>{b.classList.toggle("on",j===i);b.setAttribute("aria-pressed",j===i)});
  panel.innerHTML=`<div class="eyebrow">${t("Servicio","Service")} ${String(i+1).padStart(2,"0")} / 08</div>
  <h2>${s[l]}</h2><p class="desc">${l==="id"?s.des:s.den}</p>
  <div class="sd-cols">
    <div><h4>${t("Qué incluye","What's included")}</h4><ul class="checks">${s.inc.map(x=>`<li>${pick(x)}</li>`).join("")}</ul></div>
    <div><h4>${t("Qué recibes","What you get")}</h4><ul class="checks">${s.ent.map(x=>`<li>${pick(x)}</li>`).join("")}</ul>
      <h4 style="margin-top:22px">${t("Ideal para","Best for")}</h4><ul class="checks">${s.ideal.map(x=>`<li>${pick(x)}</li>`).join("")}</ul></div>
  </div>
  <div class="sd-cta">
    <a class="btn wa mag" href="${CDL.waLink(s[l])}" target="_blank" rel="noopener">${CDL.WA_SVG} ${t("Contratar este servicio","Hire this service")}</a>
    <a class="btn line mag" href="contact.html">${t("Otras formas de contacto","Other ways to reach me")}</a>
    <small>${t("Se abre WhatsApp con un mensaje listo sobre este servicio. La cotización depende del alcance.","WhatsApp opens with a ready message about this service. Pricing depends on scope.")}</small>
  </div>`;
  panel.classList.remove("swap");void panel.offsetWidth;panel.classList.add("swap");CDL.bindFx(panel);
  if(user){history.replaceState(null,"","#"+s.id);if(innerWidth<900)panel.scrollIntoView({behavior:"smooth",block:"start"})}}
addEventListener("hashchange",()=>{const i=S.findIndex(s=>s.id===location.hash.slice(1));if(i>=0)show(i)});
CDL.onLang(()=>{renderList();show(cur)});
})();
