/* Lógica de la invitación. Los datos se editan en js/config.js */
{
  const C = window.INVITACION;
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Invitado personalizado: ?i=BASE64("Nombre|pases") ---------- */
  function leerInvitado() {
    try {
      const p = new URLSearchParams(location.search).get('i');
      if (!p) return null;
      const bin = atob(p.replace(/-/g, '+').replace(/_/g, '/'));
      const txt = new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
      const [nombre, pases] = txt.split('|');
      const n = parseInt(pases, 10);
      return { nombre: (nombre || '').trim(), pases: Number.isFinite(n) && n > 0 ? n : null };
    } catch (e) { return null; }
  }
  const invitado = leerInvitado();

  /* ---------- Textos simples ---------- */
  document.querySelectorAll('[data-campo]').forEach((n) => { const v = C[n.dataset.campo]; if (v) n.textContent = v; });
  document.title = `${C.titulo} · ${C.nombre}`;

  /* ---------- Fotos con marco de respaldo ---------- */
  function ponerFoto(cont, src, alt, etiqueta) {
    cont.classList.add('foto');
    cont.dataset.etiqueta = etiqueta || 'Tu foto aquí';
    if (!src) { cont.classList.add('vacia'); return; }
    const img = new Image();
    img.alt = alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.onerror = () => { img.remove(); cont.classList.add('vacia'); };
    img.src = src;
    cont.appendChild(img);
  }
  ponerFoto($('[data-foto="portada"]'), C.fotoPortada, `${C.nombre}`, 'Foto de portada');
  ponerFoto($('[data-foto="final"]'), C.fotoFinal, `${C.nombre}`, 'Foto final');

  /* ---------- Estrellitas de fondo ---------- */
  if (!reducido) {
    const cielo = $('.cielo');
    for (let k = 0; k < 18; k++) {
      const i = el('i');
      i.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--t:${6 + Math.random() * 9}px;--d:${5 + Math.random() * 5}s;--r:${-Math.random() * 8}s`;
      i.innerHTML = '<svg><use href="#i-estrella"/></svg>';
      cielo.appendChild(i);
    }
  }

  /* ---------- 1. Portada ---------- */
  const portada = $('#portada');
  const sobre = $('#abrir');
  if (invitado && invitado.nombre) {
    const para = $('#portadaPara');
    para.textContent = `Para: ${invitado.nombre}`;
    para.hidden = false;
  }
  let abierta = false;
  function abrir() {
    if (abierta) return;
    abierta = true;
    encenderMusica(); // aprovecha este toque: es el único momento en que el navegador deja sonar el audio
    const t = reducido ? [0, 0, 0] : [0, 750, 1700];
    setTimeout(() => sobre.classList.add('abierto'), t[0]);
    setTimeout(() => sobre.classList.add('sacar'), t[1]);
    setTimeout(() => {
      portada.classList.add('fuera');
      document.body.classList.remove('bloqueado');
      window.scrollTo(0, 0);
      mostrarMusica();
      $('#guia').hidden = false; actualizarGuia();
      setTimeout(() => portada.remove(), 1000);
    }, t[2]);
  }
  sobre.addEventListener('click', abrir);

  /* ---------- Invitado en la portada interior ---------- */
  if (invitado && invitado.nombre) {
    const inv = $('#invitado');
    inv.textContent = invitado.pases
      ? `Invitación para ${invitado.nombre} · ${invitado.pases}\u00a0${invitado.pases === 1 ? 'pase' : 'pases'}`
      : `Invitación para ${invitado.nombre}`;
    inv.hidden = false;
  }

  /* ---------- 2. Mensaje ---------- */
  const caja = $('#textoMensaje');
  C.mensaje.forEach((p) => caja.appendChild(el('p', null, p)));

  /* ---------- 3. Cuenta regresiva ---------- */
  const meta = new Date(C.fechaISO).getTime();
  const celdas = {};
  document.querySelectorAll('#contador [data-u]').forEach((b) => { celdas[b.dataset.u] = b; });
  const dos = (n) => String(n).padStart(2, '0');
  let timer;
  function tic() {
    let r = Math.max(0, meta - Date.now());
    const d = Math.floor(r / 864e5); r -= d * 864e5;
    const h = Math.floor(r / 36e5); r -= h * 36e5;
    const m = Math.floor(r / 6e4); r -= m * 6e4;
    const s = Math.floor(r / 1e3);
    celdas.d.textContent = dos(d); celdas.h.textContent = dos(h); celdas.m.textContent = dos(m); celdas.s.textContent = dos(s);
    if (meta - Date.now() <= 0) { $('#contadorFin').hidden = false; clearInterval(timer); }
  }
  tic();
  timer = setInterval(tic, 1000);

  /* ---------- 4. Familia ---------- */
  function personas(lista, cont) {
    lista.forEach((p) => {
      const card = el('div', 'persona');
      card.append(el('small', null, p.rol), el('strong', null, p.nombre));
      cont.appendChild(card);
    });
  }
  personas(C.padres, $('#padres'));
  const hermanos = C.hermanos || [];
  if (hermanos.length) {
    hermanos.forEach((h) => {
      const card = el('div', 'persona persona-hermano');
      if (h.nombre) card.append(el('small', null, h.rol), el('strong', null, h.nombre));
      else card.append(el('strong', null, h.rol));
      if (h.detalle) card.append(el('span', 'detalle', h.detalle));
      $('#hermanos').appendChild(card);
    });
  } else {
    $('#bloqueHermanos').remove();
  }
  if (C.padrinos && C.padrinos.length) personas(C.padrinos, $('#padrinos'));
  else $('#bloquePadrinos').remove();

  /* ---------- 5. Galería ---------- */
  const carrusel = $('#carrusel');
  const puntos = $('#puntos');
  const slides = C.galeria.map((f, i) => {
    const b = el('button', 'slide');
    b.type = 'button';
    b.setAttribute('aria-label', `Ver foto ${i + 1} de ${C.galeria.length}`);
    const marco = el('div');
    ponerFoto(marco, f.src, f.alt, `Foto ${i + 1}`);
    b.appendChild(marco);
    b.addEventListener('click', () => {
      const img = marco.querySelector('img');
      if (!img) return;
      $('#visorImg').src = img.src; $('#visorImg').alt = img.alt;
      $('#visor').hidden = false;
    });
    carrusel.appendChild(b);
    const d = el('button');
    d.type = 'button';
    d.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
    d.addEventListener('click', () => ir(i));
    puntos.appendChild(d);
    return b;
  });
  let actual = 0;
  function marcar(i) {
    actual = i;
    slides.forEach((s, k) => s.classList.toggle('activa', k === i));
    [...puntos.children].forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
  }
  function ir(i) {
    const n = (i + slides.length) % slides.length;
    slides[n].scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    marcar(n);
  }
  const obsSlides = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting && e.intersectionRatio > 0.6) marcar(slides.indexOf(e.target)); });
  }, { root: carrusel, threshold: [0.6] });
  slides.forEach((s) => obsSlides.observe(s));
  marcar(0);
  $('#prev').addEventListener('click', () => ir(actual - 1));
  $('#next').addEventListener('click', () => ir(actual + 1));
  carrusel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(actual + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); ir(actual - 1); }
  });
  const cerrarVisor = () => { $('#visor').hidden = true; };
  $('#visorCerrar').addEventListener('click', cerrarVisor);
  $('#visor').addEventListener('click', (e) => { if (e.target.id === 'visor') cerrarVisor(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarVisor(); });

  /* ---------- 5b. Momentos de mi corazón ---------- */
  const especiales = C.momentosEspeciales || [];
  if (especiales.length) {
    especiales.forEach((m) => {
      const card = el('article', 'especial' + (m.cielo ? ' especial-cielo' : ''));
      const marco = el('div', 'especial-foto');
      ponerFoto(marco, m.foto, m.titulo, '');
      if (m.cielo) {
        const halo = el('span', 'halo');
        halo.innerHTML = '<svg aria-hidden="true"><use href="#i-alas"/></svg>';
        card.appendChild(halo);
      }
      card.append(marco, el('h3', null, m.titulo), el('p', null, m.texto));
      $('#especiales').appendChild(card);
    });
  } else {
    $('#corazon').remove();
  }

  /* ---------- 6 y 7. Ceremonia y celebración ---------- */
  $('#cerLugar').textContent = C.ceremonia.lugar;
  $('#cerZona').textContent = C.ceremonia.zona;
  $('#cerTexto').textContent = C.ceremonia.texto;
  $('#celTitulo').textContent = C.celebracion.titulo;
  if (C.celebracion.lugar) $('#celLugar').textContent = C.celebracion.lugar; else $('#celLugar').remove();
  const pasos = C.celebracion.pasos || [];
  if (pasos.length) {
    pasos.forEach((p, i) => {
      const li = el('li', 'paso');
      li.append(el('span', 'paso-num', String(i + 1)), el('strong', null, p.titulo), el('span', 'paso-texto', p.texto));
      $('#celPasos').appendChild(li);
    });
  } else {
    $('#celPasos').remove();
  }
  if (C.celebracion.direccion) $('#celDireccion').textContent = C.celebracion.direccion; else $('#celDireccion').remove();
  $('#celNota').textContent = C.celebracion.nota;
  C.celebracion.texto.forEach((p) => $('#celTexto').appendChild(el('p', null, p)));

  /* ---------- 8. Ubicación ---------- */
  Object.values(C.mapas).forEach((m) => {
    const card = el('div', 'ubic');
    card.innerHTML = '<svg aria-hidden="true"><use href="#i-pin"/></svg>';
    card.append(el('small', null, m.titulo), el('strong', null, m.lugar), el('p', null, m.direccion));
    let btn;
    if (m.url) {
      btn = el('a', 'btn-mapa', 'Abrir en Google Maps');
      btn.href = m.url; btn.target = '_blank'; btn.rel = 'noopener';
    } else {
      btn = el('span', 'btn-mapa pendiente', 'Ubicación por confirmar');
      btn.setAttribute('aria-disabled', 'true');
    }
    card.appendChild(btn);
    $('#ubicaciones').appendChild(card);
  });

  /* ---------- 10. Final ---------- */
  $('#finalTexto').textContent = C.mensajeFinal;
  if (C.posdata) { $('#posdata').textContent = C.posdata; $('#posdata').hidden = false; }

  /* ---------- Aparición al desplazarse ---------- */
  const obsRevelar = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obsRevelar.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.revelar').forEach((s) => obsRevelar.observe(s));

  /* ---------- Música: suena sola al abrir el sobre ----------
     Los navegadores del celular no dejan que una página empiece a sonar por su
     cuenta: solo permiten el audio que nace de un toque de la persona. Por eso
     la canción se lanza desde el mismo toque que abre el sobre (ver abrir()),
     y no hace falta tocar el botón. El botón queda para silenciarla.
     Si algún navegador aun así lo impide, el botón sigue estando ahí.          */
  const audio = $('#audio');
  const btnM = $('#btnMusica');
  if (C.musica) {
    audio.preload = 'auto'; // descargada de antemano, para que no tarde en sonar
    audio.src = C.musica;
  }
  audio.volume = 0.6;
  function marcarBoton() {
    const sonando = !audio.paused;
    btnM.setAttribute('aria-pressed', sonando ? 'true' : 'false');
    btnM.setAttribute('aria-label', sonando ? 'Silenciar la música' : 'Poner la música');
  }
  function encenderMusica() {
    if (!C.musica) return;
    Promise.resolve(audio.play()).catch(() => {}).then(marcarBoton);
  }
  function mostrarMusica() {
    if (!C.musica) return;
    btnM.hidden = false;
    marcarBoton();
    const p = $('#pistaMusica');
    p.textContent = audio.paused ? 'Toca para escuchar música' : 'Toca para silenciar la música';
    p.hidden = false;
    setTimeout(() => p.classList.add('ver'), 300);
    setTimeout(() => p.classList.remove('ver'), 5200);
    setTimeout(() => { p.hidden = true; }, 6000);
  }
  btnM.addEventListener('click', async () => {
    $('#pistaMusica').hidden = true;
    if (audio.paused) { try { await audio.play(); } catch (e) { /* el navegador no permitió reproducir */ } }
    else { audio.pause(); }
    marcarBoton();
  });

  /* ---------- Flecha guía: lleva a la siguiente sección ---------- */
  const guia = $('#guia');
  const paradas = () => [...document.querySelectorAll('main > header, main > section')];
  function actualizarGuia() {
    const fin = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120;
    guia.classList.toggle('oculta', fin);
  }
  guia.addEventListener('click', () => {
    const y = window.scrollY + 60;
    const sig = paradas().find((s) => s.getBoundingClientRect().top + window.scrollY > y);
    if (sig) sig.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
  });
  window.addEventListener('scroll', actualizarGuia, { passive: true });
}
