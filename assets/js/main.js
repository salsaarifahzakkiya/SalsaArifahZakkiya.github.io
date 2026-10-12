/* cdeluna.sec · lógica compartida de todas las páginas */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = { get(k, d) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : d } catch (e) { return d } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)) } catch (e) { } } };
  const WA = "18492591279"; //ganti no wa 
  const fine = matchMedia("(pointer:fine)").matches;
  const root = document.documentElement;
  let lang = root.dataset.lang || "id";
  const t = (es, en) => lang === "id" ? es : en;
  window.CDL = { t: (es, en) => t(es, en), get lang() { return lang } };

  /* ---------- servicios (compartidos por home, servicios y terminal) ---------- */
  const SERVICES = [
    {
      id: "escaneo", es: "Vulnerability Assessment", en: "Vulnerability scanning",
      ses: "Saya meninjau port, layanan, dan kerentanan infrastruktur web/internal Anda, serta memberikan laporan risiko yang terstruktur.",
      sen: "I review exposed ports, services, and vulnerabilities in your web/internal infrastructure, delivering a structured risk report.",
      des: "Saya menggabungkan pemindaian otomatis (seperti Nessus & Burp Suite) dengan verifikasi manual untuk menghilangkan false-positive. Anda akan mengetahui persis apa yang dilihat oleh penyerang saat memindai jaringan atau aplikasi Anda.",
      den: "I combine automated scanning (like Nessus & Burp Suite) with manual verification to eliminate false positives. You will know exactly what an attacker sees when scanning your network or application.",

      inc: [
        ["Penemuan port dan layanan", "Port and service discovery"],
        ["Deteksi kerentanan dan CVE", "Vulnerability and CVE detection"],
        ["Verificación manual de hallazgos", "Manual verification of findings"],
        ["Verifikasi manual untuk false-positive", "Manual false-positive verification"]],
      ent: [
        ["Laporan PDF dengan temuan teknis", "PDF report with technical findings"],
        ["Daftar rekomendasi remediasi (SOP)", "Remediation recommendation list (SOP)"]
      ],
      ideal: [
        ["Aplikasi internal dan portal akademik", "Internal applications and academic portals"],
        ["Sebelum merilis sistem baru", "Before launching a new system"]
      ]
    },
    {
      id: "auditoria-web",
      es: "Audit Keamanan & Kepatuhan GRC",
      en: "Security Audit & GRC Compliance",
      ses: "Tinjauan arsitektur keamanan, gap analysis, dan evaluasi kepatuhan berdasarkan standar industri.",
      sen: "Security architecture review, gap analysis, and compliance evaluation based on industry standards.",
      des: "Saya melakukan tinjauan tata kelola keamanan TI dan arsitektur aplikasi Anda untuk memastikan pemenuhan kerangka kerja seperti NIST CSF 2.0 dan standar OWASP. Ini memastikan sistem Anda tidak hanya aman, tetapi juga patuh terhadap regulasi.",
      den: "I conduct IT security governance and application architecture reviews to ensure compliance with frameworks like NIST CSF 2.0 and OWASP standards. This ensures your systems are not only secure but completely compliant.",
      inc: [["Gap analysis tata kelola keamanan", "Security governance gap analysis"], ["Tinjauan kepatuhan standar (NIST, CMMI)", "Standard compliance review (NIST, CMMI)"], ["Integrasi Secure SDLC", "Secure SDLC integration"], ["Evaluasi kebijakan keamanan", "Security policy evaluation"]],
      ent: [["Laporan audit komprehensif", "Comprehensive audit report"], ["Peta jalan perbaikan (Roadmap)", "Remediation roadmap"], ["Presentasi eksekutif", "Executive presentation"]],
      ideal: [["Instansi & Perusahaan Enterprise", "Agencies & Enterprise companies"], ["Persiapan sertifikasi ISO", "ISO certification preparation"]]
    },
    {
      id: "pentest-web",
      es: "Vulnerability Assessment & Pentest",
      en: "Vulnerability Assessment & Pentest",
      ses: "Pengujian penetrasi mendalam pada Web, API, dan aplikasi Mobile menggunakan analisis manual dan otomatis.",
      sen: "In-depth penetration testing on Web, API, and Mobile apps using manual and automated analysis.",
      des: "Saya mencari celah yang terlewat oleh pemindai otomatis menggunakan metodologi standar industri (seperti OWASP MASVS/MASTG). Fokus pada kelemahan logika bisnis, kontrol akses, dan injeksi tingkat lanjut menggunakan alat bantu (Burp Suite, sqlmap, MobSF, Dalfox).",
      den: "I look for flaws automated scanners miss using industry-standard methodologies (like OWASP MASVS/MASTG). Focused on business logic flaws, access control, and advanced injections using tools (Burp Suite, sqlmap, MobSF, Dalfox).",
      inc: [["Web & API Vulnerability Assessment", "Web & API Vulnerability Assessment"], ["Mobile App Security (Android)", "Mobile App Security (Android)"], ["Bypass kontrol akses & IDOR", "Access control bypass & IDOR"], ["Validasi keamanan manual", "Manual security validation"]],
      ent: [["Laporan teknis dan eksekutif", "Technical and executive report"], ["Proof of Concept (PoC) temuan", "Proof of Concept (PoC) for findings"], ["Verifikasi perbaikan (Re-test)", "Remediation verification (Re-test)"]],
      ideal: [["Aplikasi Publik & Internal", "Public & Internal Applications"], ["Portal kampus & layanan e-Gov", "Campus portals & e-Gov services"]]
    },
    {
      id: "cloud",
      es: "Data Privacy & Kepatuhan UU PDP",
      en: "Data Privacy & UU PDP Compliance",
      ses: "Penilaian Dampak Perlindungan Data (DPIA), manajemen PII, dan kepatuhan regulasi privasi Indonesia.",
      sen: "Data Protection Impact Assessment (DPIA), PII management, and Indonesian privacy regulatory compliance.",
      des: "Menjaga data sensitif adalah kewajiban hukum. Saya membantu perusahaan memetakan siklus hidup data (RoPA), mengidentifikasi risiko pada penanganan PII, dan menyusun dokumen DPIA untuk memastikan operasional Anda sejalan dengan Undang-Undang Perlindungan Data Pribadi (UU PDP).",
      den: "Protecting sensitive data is a legal obligation. I help companies map their data lifecycle (RoPA), identify PII handling risks, and construct DPIA documents to ensure your operations align with data protection laws.",
      inc: [["Penyusunan dokumen DPIA", "DPIA document creation"], ["Identifikasi pemrosesan data (RoPA)", "Data processing identification (RoPA)"], ["Tinjauan tata kelola PII", "PII governance review"], ["Evaluasi kontrol privasi", "Privacy control evaluation"]],
      ent: [["Laporan risiko privasi data", "Data privacy risk report"], ["Rekomendasi kontrol teknis", "Technical control recommendations"]],
      ideal: [["Perusahaan pemroses data pelanggan", "Companies processing customer data"], ["Kepatuhan hukum & operasional", "Legal & operational compliance"]]
    },
    {
      id: "hardening",
      es: "Keamanan Infrastruktur & Pemantauan",
      en: "Infrastructure Security & Monitoring",
      ses: "Implementasi sistem pemantauan (SIEM/EDR) dan konfigurasi pengamanan tingkat jaringan.",
      sen: "Monitoring system implementation (SIEM/EDR) and network-level security configuration.",
      des: "Pertahanan aktif (Blue/Purple Team) sangat penting. Saya merancang dan mengevaluasi konfigurasi pemantauan keamanan menggunakan alat seperti Wazuh SIEM, Sangfor EDR, Microsoft Intune, dan aturan Firewall untuk deteksi ancaman secara proaktif.",
      den: "Active defense (Blue/Purple Team) is crucial. I design and evaluate security monitoring configurations using tools like Wazuh SIEM, Sangfor EDR, Microsoft Intune, and Firewall rules for proactive threat detection.",
      inc: [["Konfigurasi Wazuh SIEM & Log", "Wazuh SIEM & Log configuration"], ["Manajemen kebijakan EDR", "EDR policy management"], ["Tinjauan aturan akses jaringan", "Network access rule review"], ["Pemantauan di lingkungan kontainer (Docker)", "Container environment monitoring (Docker)"]],
      ent: [["Rekomendasi konfigurasi pertahanan", "Defense configuration recommendations"], ["Peningkatan visibilitas jaringan", "Network visibility enhancement"]],
      ideal: [["Pusat data & jaringan kampus", "Data centers & campus networks"], ["Infrastruktur Proxmox", "Proxmox infrastructure"]]
    },
    {
      id: "reportes",
      es: "Manajemen Kerentanan & Pelaporan",
      en: "Vulnerability Management & Reporting",
      ses: "Evaluasi kerentanan, triase temuan, dan penyusunan laporan teknis serta eksekutif.",
      sen: "Vulnerability evaluation, finding triage, and technical/executive report generation.",
      des: "Sebuah celah keamanan tidak akan diperbaiki jika tidak dipahami. Saya mengelola siklus kerentanan dari evaluasi hingga remediasi, memastikan setiap temuan diverifikasi secara manual dan disajikan dengan langkah perbaikan yang jelas bagi tim teknis maupun manajemen.",
      den: "A security flaw won't be fixed if it isn't understood. I manage the vulnerability lifecycle from evaluation to remediation, ensuring every finding is manually verified and presented with clear fix steps for both technical teams and management.",
      inc: [["Triase temuan keamanan", "Security finding triage"], ["Verifikasi kerentanan (Tanpa False-Positive)", "Vulnerability verification (No False-Positives)"], ["Tinjauan laporan audit", "Audit report review"], ["Pelacakan status remediasi", "Remediation status tracking"]],
      ent: [["Laporan teknis detail", "Detailed technical report"], ["Ringkasan eksekutif untuk manajemen", "Executive summary for management"]],
      ideal: [["Tim IT & Pengembang", "IT & Development teams"], ["Manajemen Risiko Perusahaan", "Enterprise Risk Management"]]
    },
    {
      id: "desarrollo-web",
      es: "Security Automation & Scripting",
      en: "Security Automation & Scripting",
      ses: "Pengembangan skrip khusus untuk mengotomatiskan pemindaian dan agregasi data kerentanan.",
      sen: "Development of custom scripts to automate scanning and vulnerability data aggregation.",
      des: "Saya membangun alat keamanan kustom (seperti Hybrid VAPT Scanner) menggunakan Python dan PostgreSQL yang diintegrasikan dengan alat open-source (Nuclei, Nikto, Trivy). Layanan ini membantu tim keamanan mengotomatiskan tugas berulang dan mengumpulkan hasil pemindaian dalam satu format tersentralisasi.",
      den: "I build custom security tools (like Hybrid VAPT Scanners) using Python and PostgreSQL integrated with open-source tools (Nuclei, Nikto, Trivy). This service helps security teams automate repetitive tasks and aggregate scan results into a centralized format.",
      inc: [["Pembuatan skrip Python keamanan", "Python security scripting"], ["Otomatisasi pemindai (Nuclei, Nikto)", "Scanner automation (Nuclei, Nikto)"], ["Desain database kerentanan (PostgreSQL)", "Vulnerability database design (PostgreSQL)"], ["Agregasi hasil pemindaian", "Scan result aggregation"]],
      ent: [["Kode sumber alat (Script)", "Tool source code (Script)"], ["Panduan instalasi dan penggunaan", "Installation and usage documentation"]],
      ideal: [["Tim Red/Blue Team internal", "Internal Red/Blue Teams"], ["Perusahaan dengan proses audit manual", "Companies with manual audit processes"]]
    },
    {
      id: "sistemas",
      es: "Pelatihan Kesadaran Keamanan",
      en: "Security Awareness Training",
      ses: "Program pelatihan internal mengenai budaya keamanan siber dasar dan tata cara penanganan PII.",
      sen: "Internal training programs on basic cybersecurity culture and PII handling procedures.",
      des: "Manusia adalah garis pertahanan terakhir. Saya merancang dan menyampaikan materi presentasi interaktif terkait Security Awareness dan identifikasi Penangan Data Pribadi (PII Handler) untuk meningkatkan budaya keamanan tim internal Anda.",
      den: "Humans are the last line of defense. I design and deliver interactive presentations regarding Security Awareness and PII Handler identification to improve the security culture of your internal teams.",
      inc: [["Pembuatan materi pelatihan kustom", "Custom training material creation"], ["Pelatihan PII Handler", "PII Handler training"], ["Edukasi ancaman rekayasa sosial", "Social engineering threat education"], ["Evaluasi pemahaman staf", "Staff understanding evaluation"]],
      ent: [["Modul presentasi (PDF/Slide)", "Presentation modules (PDF/Slide)"], ["Peningkatan kepatuhan kebijakan", "Policy compliance improvement"], ["Dukungan pembentukan budaya keamanan", "Security culture formation support"]],
      ideal: [["Staf internal perusahaan", "Internal corporate staff"], ["Penguatan fondasi GRC", "GRC foundation strengthening"]]
    }
  ];
  window.CDL.SERVICES = SERVICES;
  function waLink(serviceName) {
    // Teks di bawah ini akan otomatis dikirimkan pengguna saat membuka WhatsApp Anda
    const msg = serviceName ? t(`Halo Salsa, saya melihat portofolio Anda dan tertarik dengan layanan ${serviceName}. Apakah kita bisa berdiskusi?`, `Hi Salsa, I saw your portfolio and I'm interested in your ${serviceName} service. Can we talk?`)
      : t("Halo Salsa, saya melihat portofolio Anda dan ingin berdiskusi lebih lanjut.", "Hi Salsa, I saw your portfolio and I'd like to talk.");
    return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  }
  window.CDL.waLink = waLink;

  // WA_SVG adalah kode untuk ikon logo WhatsApp, biarkan saja seperti ini
  const WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.33.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.02 2.6c.13.17 1.77 2.7 4.29 3.79 1.6.69 2.22.75 3.02.63.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>';
  window.CDL.WA_SVG = WA_SVG;

  /* ---------- idioma ---------- */
  const hooks = [];
  window.CDL.onLang = f => { hooks.push(f); f(lang) };
  function setLang(l) {
    lang = l; root.dataset.lang = l; root.lang = l; try { localStorage.setItem("cdl-lang", l) } catch (e) { }
    const b = $("#langBtn"); if (b) b.textContent = l === "id" ? "EN" : "ID";
    $$("[data-wa]").forEach(a => a.href = waLink(a.dataset.wa ? (SERVICES.find(s => s.id === a.dataset.wa) || {})[l] : ""));
    hooks.forEach(f => f(l));
    if (tOn) tvBtn.textContent = t("Vista normal", "Normal view")
  }
  $("#langBtn") && ($("#langBtn").onclick = () => setLang(lang === "id" ? "en" : "id"));

  /* ---------- navegación ---------- */
  const page = document.body.dataset.page;
  $$("#links a").forEach(a => { if (a.dataset.k === page) a.classList.add("on", "cur-page"), a.setAttribute("aria-current", "page") });
  $("#menuBtn") && ($("#menuBtn").onclick = () => $("#links").classList.toggle("open"));

  /* ---------- typed ---------- */
  const tEl = $("#typed");
  if (tEl) {
    const R = { es: ["Pentester Junior", "Auditor de Seguridad Web", "HTB CJCA", "Desarrollador Full Stack"], en: ["Junior Pentester", "Web Security Auditor", "HTB CJCA", "Full Stack Developer"] };
    let ri = 0, ch = 0, del = false; (function tick() {
      const w = R[lang][ri % R[lang].length];
      if (!del) { ch++; tEl.textContent = w.slice(0, ch); if (ch >= w.length) { del = true; return setTimeout(tick, 1600) } }
      else { ch--; tEl.textContent = w.slice(0, ch); if (ch <= 0) { del = false; ri++ } }
      setTimeout(tick, del ? 40 : 85)
    })()
  }

  /* ---------- glitch ---------- */
  const gl = $$(".glitch");
  if (gl.length) {
    const fire = () => gl.forEach((g, i) => { g.classList.remove("gx"); void g.offsetWidth; setTimeout(() => g.classList.add("gx"), i * 110) });
    setTimeout(fire, 600); setInterval(fire, 5200); gl.forEach(g => g.addEventListener("mouseenter", fire))
  }

  /* ---------- avatar 3D ---------- */
  const av = $("#avatar"), avIn = $("#avIn"), heroEl = $(".hero");
  if (av && avIn && fine) {
    heroEl.addEventListener("mousemove", e => {
      const r = av.getBoundingClientRect(); const x = (e.clientX - (r.left + r.width / 2)) / r.width, y = (e.clientY - (r.top + r.height / 2)) / r.height;
      avIn.style.transform = `rotateY(${Math.max(-1, Math.min(1, x)) * 16}deg) rotateX(${Math.max(-1, Math.min(1, -y)) * 16}deg)`
    });
    heroEl.addEventListener("mouseleave", () => { avIn.style.transform = "" })
  }

  /* ---------- red de partículas ---------- */
  const cv = $("#net");
  if (cv) {
    const x = cv.getContext("2d"), host = cv.parentElement; let W, H, pts = [], m = { x: -999, y: -999 }; const dpr = Math.min(devicePixelRatio || 1, 2);
    function size() {
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, W * H / 14000)); pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }))
    }
    size(); addEventListener("resize", size);
    host.addEventListener("mousemove", e => { const r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top });
    host.addEventListener("mouseleave", () => { m.x = m.y = -999 });
    (function draw() {
      x.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy); if (d < 130 && d > 0) { p.x += dx / d * 1.6; p.y += dy / d * 1.6 }
        x.fillStyle = "rgba(120,170,255,.7)"; x.fillRect(p.x - 1, p.y - 1, 2, 2)
      }
      for (let i = 0; i < pts.length; i++)for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { x.strokeStyle = `rgba(77,141,255,${(1 - d / 120) * .28})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke() }
      }
      for (const p of pts) { const d = Math.hypot(p.x - m.x, p.y - m.y); if (d < 170) { x.strokeStyle = `rgba(156,194,255,${(1 - d / 170) * .55})`; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(m.x, m.y); x.stroke() } }
      requestAnimationFrame(draw)
    })()
  }

  /* ---------- efectos ---------- */
  function bindFx(scope = document) {
    $$(".spot", scope).forEach(el => { if (el._spot) return; el._spot = 1; el.addEventListener("mousemove", e => { const r = el.getBoundingClientRect(); el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px") }) });
    if (fine) $$(".mag", scope).forEach(b => { if (b._mag) return; b._mag = 1; b.addEventListener("mousemove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)` }); b.addEventListener("mouseleave", () => { b.style.transform = "" }) });
  }
  window.CDL.bindFx = bindFx; bindFx();
  if ("IntersectionObserver" in window) {
    const els = $$(".rv"), vh = innerHeight; els.forEach(e => { if (e.getBoundingClientRect().top > vh) e.classList.add("pre") });
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.remove("pre"); io.unobserve(x.target) } }), { threshold: .1 }); els.forEach(e => io.observe(e));
    const io3 = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("lit"); io3.unobserve(x.target) } }), { threshold: .3 }); $$(".sweep").forEach(e => io3.observe(e));
  }

  /* ---------- copiar ---------- */
  async function copyText(text, btn, okES = "copiado ✓", okEN = "copied ✓") {
    const prev = btn.textContent;
    try { await navigator.clipboard.writeText(text); btn.textContent = t(okES, okEN); btn.classList.add("ok") }
    catch (e) { btn.textContent = t("selecciona y copia", "select and copy") }
    setTimeout(() => { btn.textContent = prev; btn.classList.remove("ok") }, 1600)
  }
  window.CDL.copyText = copyText;
  const cm = $("#copyMail"); if (cm) cm.onclick = () => copyText("cdeluna.sec@gmail.com", $("#copyLbl"));

  /* ---------- testimonios ---------- */
  const tForm = $("#tForm");
  if (tForm) {
    $("#tBtn").onclick = () => { tForm.hidden = !tForm.hidden; if (!tForm.hidden) $("#tName").focus() };
    tForm.addEventListener("submit", e => { e.preventDefault(); $("#tNote").textContent = t("Vista previa: todavía no se guarda. Se activa al conectar la base de datos.", "Preview: not saved yet. It goes live once the database is connected.") })
  }

  /* ---------- bot Selene ---------- */
  const BOT = {
    es: {
      hi: "Hola, soy Selene. Te guío por el portafolio de Cristian. ¿Qué quieres saber?", q: [
        ["¿Quién es Cristian?", "Cristian De Luna es estudiante de Ciberseguridad en ITLA, certificado CJCA de Hack The Box, y desarrollador. Su enfoque es el pentesting de aplicaciones web.", "about.html"],
        ["¿Qué servicios ofrece?", "Escaneo de vulnerabilidades, auditorías web, pentesting autorizado, revisión de configuración cloud, hardening, reportes, desarrollo web y sistemas a medida. Cada uno tiene su botón para contratarlo por WhatsApp.", "services.html"],
        ["¿Cómo lo contacto?", "Lo más rápido es WhatsApp. También por correo: cdeluna.sec@gmail.com.", "contact.html"],
        ["Certificaciones", "HTB CJCA (oct 2026), CCNA: Introduction to Networks e IT Essentials de Cisco NetAcad, y Ciberseguridad Nivel Intermedio de INDOTEL. Su próximo objetivo es la CPTS y luego la OSCP.", "certificates.html"],
        ["¿Busca empleo?", "Sí, está abierto a puestos de seguridad en Santo Domingo o remoto, y a proyectos freelance.", "contact.html"],
        ["Proyectos", "Su proyecto principal es D-Luna Learning. También CJCA Trainer, DL-Stock y PWNotes.", "projects.html"]]
    },
    en: {
      hi: "Hi, I'm Selene. I'll guide you through Cristian's portfolio. What would you like to know?", q: [
        ["Who is Cristian?", "Cristian De Luna is a cybersecurity student at ITLA, Hack The Box CJCA certified, and a developer focused on web application pentesting.", "about.html"],
        ["What services?", "Vulnerability scanning, web audits, authorized pentesting, cloud config review, hardening, reports, web development and custom systems. Each one has a WhatsApp button to hire it.", "services.html"],
        ["How to contact?", "WhatsApp is the fastest. Or email: cdeluna.sec@gmail.com.", "contact.html"],
        ["Certifications", "HTB CJCA (Oct 2026), CCNA: Introduction to Networks and IT Essentials from Cisco NetAcad, and INDOTEL Intermediate Cybersecurity. Next targets: CPTS, then OSCP.", "certificates.html"],
        ["Open to work?", "Yes, open to security roles in Santo Domingo or remote, and to freelance projects.", "contact.html"],
        ["Projects", "His main project is D-Luna Learning, plus CJCA Trainer, DL-Stock and PWNotes.", "projects.html"]]
    }
  };
  const bot = $("#bot"), msgs = $("#botMsgs"), chips = $("#botChips");
  function say(h, who) { const d = document.createElement("div"); d.className = "m " + who; d.innerHTML = h; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight }
  function resetBot() {
    if (!bot) return; msgs.innerHTML = ""; chips.innerHTML = ""; say(BOT[lang].hi, "b");
    BOT[lang].q.forEach(([q, a, href]) => { const b = document.createElement("button"); b.textContent = q; b.onclick = () => { say(q, "u"); setTimeout(() => say(a + ` <a href="${href}">${t("Ver más →", "See more →")}</a>`, "b"), 350) }; chips.appendChild(b) })
  }
  if (bot) { window.CDL.onLang(resetBot); $("#botBtn").onclick = () => { bot.hidden = !bot.hidden }; $("#botX").onclick = () => { bot.hidden = true } }

  /* ---------- MODO TERMINAL (persiste entre páginas) ---------- */
  const dock = $("#tdock"), out = $("#tOut"), inp = $("#tIn"), boot = $("#tboot"), tvBtn = $("#tvBtn");
  const ROUTES = { home: ["index.html", "Home"], about: ["about.html", "About"], projects: ["projects.html", "Projects"], services: ["services.html", "Services"], methodology: ["methodology.html", "Methodology"], writeups: ["writeups.html", "Writeups"], certificates: ["certificates.html", "Certificates"], testimonials: ["about.html#testimonios", "Testimonials"], contact: ["contact.html", "Contact"] };
  const ALIAS = { index: "home", "~": "home", "..": "home", "/": "home", certs: "certificates", certifications: "certificates", hire: "contact", "hire-me": "contact", services: "services", sobre: "about", proyectos: "projects", servicios: "services", metodologia: "methodology", contacto: "contact", testimonios: "testimonials" };
  const LS = Object.keys(ROUTES);
  const CMDS = ["help", "hints", "ls", "cd", "pwd", "whoami", "certs", "projects", "services", "contact", "hire", "history", "lang", "clear", "date", "echo", "sudo", "exit"];
  let st = store.get("cdl-term", { on: false, out: "", hist: [], pending: null });
  let tOn = false, hi = st.hist.length;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function save() { st.out = out.innerHTML.slice(-30000); store.set("cdl-term", st) }
  function w(h) { out.insertAdjacentHTML("beforeend", h + "\n"); out.scrollTop = out.scrollHeight; save() }
  function promptLine(c) { w('<span class="prm">┌──(deluna㉿kali)-[~/portfolio]\n└─$</span> <span class="c">' + esc(c) + '</span>') }
  function lines(arr, i = 0) { if (i >= arr.length) return; w(arr[i]); setTimeout(() => lines(arr, i + 1), 70) }
  function granted(name, target) {
    const el = target ? document.getElementById(target) : null;
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); el.classList.remove("hit"); void el.offsetWidth; el.classList.add("hit") }
    else { const s = $("main section, main .phero"); if (s) { s.classList.remove("hit"); void s.offsetWidth; s.classList.add("hit") } }
    const g = document.createElement("div"); g.className = "granted"; g.innerHTML = "<span>ACCESS GRANTED</span>"; document.body.appendChild(g); setTimeout(() => g.remove(), 1150);
    w('<span class="big">' + t("Acceso concedido a " + name + ".", "Access Granted to " + name + " Page.") + '</span>')
  }
  function enterT(silent) {
    tOn = true; st.on = true; document.body.classList.add("tmode"); dock.hidden = false; tvBtn.textContent = t("Vista normal", "Normal view");
    if (!silent && !out.innerHTML) {
      boot.hidden = false; boot.classList.remove("out"); boot.innerHTML = "";
      const bl = lang === "id" ? ["Modo terminal activado.", "Escribe <b>help</b> para ver los comandos.", "Escribe <b>hints</b> para ejemplos de navegación.", "Escribe <b>cd &lt;página&gt;</b> para visitar una página."] : ["Terminal mode enabled.", "Type <b>help</b> to see commands.", "Type <b>hints</b> to see navigation examples.", "Type <b>cd &lt;page&gt;</b> to visit a page in terminal style."];
      bl.forEach((l, i) => setTimeout(() => boot.insertAdjacentHTML("beforeend", l + "<br>"), i * 260));
      setTimeout(() => { boot.classList.add("out"); setTimeout(() => boot.hidden = true, 600) }, 4200)
    }
    save(); setTimeout(() => inp.focus({ preventScroll: true }), 50)
  }
  function exitT() { tOn = false; st.on = false; save(); document.body.classList.remove("tmode"); document.body.style.paddingBottom = ""; document.body.style.removeProperty("--tw"); dock.hidden = true; boot.hidden = true; tvBtn.textContent = "Terminal" }
  function cd(arg) {
    let k = (arg || "home").toLowerCase().replace(/^\.?\//, "").replace(/\.html$/, ""); k = ALIAS[k] || k;
    if (!ROUTES[k]) { w('<span class="y">cd: ' + esc(arg) + t(": no existe esa página. Usa ls.", ": no such page. Try ls.") + '</span>'); return }
    const [href, name] = ROUTES[k]; const [file, hash] = href.split("#");
    w('<span class="dim">' + t("Accediendo a la página " + name + " ...", "Accessing " + name.toLowerCase() + " page ...") + '</span>');
    const here = (location.pathname.split("/").pop() || "index.html");
    if (file === here || (file === "index.html" && here === "")) { setTimeout(() => granted(name, hash), 500) }
    else { st.pending = { name, hash: hash || null }; save(); setTimeout(() => { location.href = href }, 550) }
  }
  function run(c) {
    promptLine(c); c = c.trim(); if (c) { st.hist.push(c); st.hist = st.hist.slice(-80); hi = st.hist.length }
    const [cmd, ...rest] = c.split(/\s+/); const arg = rest.join(" ");
    switch ((cmd || "").toLowerCase()) {
      case "": break;
      case "help": w(t(
        "<b>help</b>              muestra esta ayuda\n<b>hints</b>             ejemplos de navegación\n<b>ls</b>                lista las páginas\n<b>cd &lt;página&gt;</b>      visita una página\n<b>pwd</b>               página actual\n<b>whoami</b>            quién soy\n<b>certs</b>             certificaciones\n<b>projects</b>          proyectos\n<b>services</b>          servicios\n<b>hire &lt;n&gt;</b>          contratar un servicio por WhatsApp\n<b>contact</b>           datos de contacto\n<b>history</b>           comandos usados\n<b>lang es|en</b>        cambia el idioma\n<b>clear</b>             limpia la terminal\n<b>exit</b>              vuelve a la vista normal\n<span class='dim'>Tab autocompleta · ↑ ↓ historial · Esc sale</span>",
        "<b>help</b>              show this help\n<b>hints</b>             navigation examples\n<b>ls</b>                list pages\n<b>cd &lt;page&gt;</b>         visit a page\n<b>pwd</b>               current page\n<b>whoami</b>            who I am\n<b>certs</b>             certifications\n<b>projects</b>          projects\n<b>services</b>          services\n<b>hire &lt;n&gt;</b>          hire a service on WhatsApp\n<b>contact</b>           contact info\n<b>history</b>           command history\n<b>lang es|en</b>        switch language\n<b>clear</b>             clear terminal\n<b>exit</b>              back to normal view\n<span class='dim'>Tab autocompletes · ↑ ↓ history · Esc exits</span>")); break;
      case "hints": w("cd about\ncd services\ncd methodology\ncd certificates\ncd contact\ncd .."); break;
      case "ls": w('<span class="ls">' + LS.join("   ") + '</span>   <span class="g">hire</span>\n<span class="dim">' + t("hire &lt;1-8&gt; abre WhatsApp con el servicio elegido. Usa services para ver la lista.", "hire &lt;1-8&gt; opens WhatsApp with the chosen service. Use services to see the list.") + '</span>'); break;
      case "pwd": w("/home/deluna/portfolio/" + (location.pathname.split("/").pop() || "index.html")); break;
      case "cd": cd(arg); break;
      case "whoami": lines(["cristian de luna", "<span class='dim'>role    :</span> " + t("pentester junior · developer", "junior pentester · developer"), "<span class='dim'>cert    :</span> HTB CJCA (HTBCERT-1EEEAABC33)", "<span class='dim'>focus   :</span> web application pentesting", "<span class='dim'>next    :</span> HTB CPTS → OSCP", "<span class='dim'>base    :</span> Santo Domingo, RD"]); break;
      case "certs": lines(["<span class='g'>[✓]</span> HTB CJCA            HTBCERT-1EEEAABC33   06 Oct 2026", "<span class='g'>[✓]</span> CCNA ITN            Cisco NetAcad        Apr 2026", "<span class='g'>[✓]</span> IT Essentials       Cisco NetAcad        Apr 2026", "<span class='g'>[✓]</span> " + t("Ciberseguridad Int.", "Cybersecurity Int. ") + " INDOTEL · 80h        May 2026", "<span class='y'>[→]</span> HTB CPTS            " + t("siguiente", "next"), "<span class='y'>[→]</span> OSCP                " + t("después", "after that")]); break;
      case "projects": lines(["D-Luna Learning     delunalearning.do", "CJCA Trainer        cjca-trainer.lovable.app", "DL-Stock            " + t("próximamente", "coming soon"), "PWNotes             " + t("uso privado", "private use")]); break;
      case "services": lines(SERVICES.map((s, i) => String(i + 1).padStart(2, "0") + "  " + s[lang]).concat(["<span class='dim'>" + t("usa: hire &lt;número&gt;", "use: hire &lt;number&gt;") + "</span>"])); break;
      case "hire": {
        const n = parseInt(arg, 10); const s = SERVICES[n - 1]; if (!s) { w(t("uso: hire 1-8 (mira services)", "usage: hire 1-8 (see services)")); break }
        w(t("Abriendo WhatsApp para: ", "Opening WhatsApp for: ") + "<b>" + s[lang] + "</b>"); w('<a href="' + waLink(s[lang]) + '" target="_blank" rel="noopener">' + t("Si no abrió, toca aquí ↗", "If it didn't open, tap here ↗") + '</a>'); window.open(waLink(s[lang]), "_blank", "noopener"); break
      }
      case "contact": lines(["email     cdeluna.sec@gmail.com", "linkedin  linkedin.com/in/cristian-de-luna-a615993aa", "github    github.com/cdelunasec", "whatsapp  " + t("usa: hire &lt;n&gt; o cd contact", "use: hire &lt;n&gt; or cd contact")]); break;
      case "history": w(st.hist.map((h, i) => String(i + 1).padStart(3) + "  " + esc(h)).join("\n")); break;
      case "lang": if (arg === "es" || arg === "en") { setLang(arg); w("ok") } else w("lang es|en"); break;
      case "clear": out.innerHTML = ""; save(); break;
      case "date": w(new Date().toString()); break;
      case "echo": w(esc(arg)); break;
      case "sudo": w('<span class="y">[sudo] ' + t("contraseña para visitante: ", "password for guest: ") + '\n' + t("visitante no está en el archivo sudoers. Este incidente será reportado.", "guest is not in the sudoers file. This incident will be reported.") + '</span>'); break;
      case "rm": w('<span class="y">rm: ' + t("permiso denegado. Buen intento.", "permission denied. Nice try.") + '</span>'); break;
      case "exit": case "normal": exitT(); break;
      default: w('<span class="y">' + esc(cmd) + t(": comando no encontrado. Escribe help.", ": command not found. Type help.") + '</span>')
    }
  }
  if (dock) {
    tvBtn.onclick = () => tOn ? exitT() : enterT();
    inp.addEventListener("keydown", e => {
      if (e.key === "Enter") { const c = inp.value; inp.value = ""; run(c) }
      else if (e.key === "ArrowUp") { if (hi > 0) { hi--; inp.value = st.hist[hi] } e.preventDefault() }
      else if (e.key === "ArrowDown") { if (hi < st.hist.length - 1) { hi++; inp.value = st.hist[hi] } else { hi = st.hist.length; inp.value = "" } e.preventDefault() }
      else if (e.key === "Tab") {
        e.preventDefault(); const p = inp.value.split(/\s+/);
        if (p.length === 1) { const m = CMDS.filter(c => c.startsWith(p[0])); if (m.length === 1) inp.value = m[0] + " "; else if (m.length) w('<span class="dim">' + m.join("   ") + '</span>') }
        else if (p[0] === "cd") { const m = LS.filter(c => c.startsWith(p[1] || "")); if (m.length === 1) inp.value = "cd " + m[0]; else if (m.length) w('<span class="dim">' + m.join("   ") + '</span>') }
      }
      else if (e.key === "Escape") exitT()
    });
    dock.addEventListener("click", e => { if (getSelection().toString()) return; inp.focus({ preventScroll: true }) });
    const g = $("#grip"); let drag = false;
    g.addEventListener("pointerdown", e => { drag = true; g.setPointerCapture(e.pointerId) });
    g.addEventListener("pointermove", e => {
      if (!drag) return;
      if (innerWidth > 900) { const wd = Math.max(300, Math.min(innerWidth * .7, innerWidth - e.clientX)); dock.style.width = wd + "px"; document.body.style.setProperty("--tw", wd + "px") }
      else { const h = Math.max(140, Math.min(innerHeight * .85, innerHeight - e.clientY)); dock.style.height = h + "px"; document.body.style.paddingBottom = h + "px" }
    });
    g.addEventListener("pointerup", () => { drag = false });
    // restaurar al cambiar de página
    if (st.on) {
      out.innerHTML = st.out || ""; enterT(true);
      if (st.pending) { const p = st.pending; st.pending = null; save(); setTimeout(() => granted(p.name, p.hash), 250) }
      out.scrollTop = out.scrollHeight
    }
  }
  setLang(lang);
})();
