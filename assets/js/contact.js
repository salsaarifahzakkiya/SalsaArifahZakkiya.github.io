/* Contacto: arma el mensaje y abre WhatsApp */
(function(){
const f=document.getElementById("waForm");if(!f)return;
f.addEventListener("submit",e=>{e.preventDefault();
  const name=document.getElementById("wName").value.trim(),sel=document.getElementById("wSvc"),msg=document.getElementById("wMsg").value.trim();
  const s=CDL.SERVICES.find(x=>x.id===sel.value);
  const motive=s?s[CDL.lang]:sel.options[sel.selectedIndex].text.split(" / ")[CDL.lang==="id"?0:1];
  const txt=CDL.t(`Hola Cristian, soy ${name}. Te escribo desde tu portafolio por: ${motive}.`,`Hi Cristian, I'm ${name}. Reaching out from your portfolio about: ${motive}.`)+(msg?"\n\n"+msg:"");
  window.open("https://wa.me/18492591279?text="+encodeURIComponent(txt),"_blank","noopener")});
})();
