// Ilustraciones de flores (tulipanes y margaritas) para /planes.
// Devuelven SVG como texto. Las usan la página y las imágenes de Cartera.
(function (raiz) {
  'use strict';
  const TALLO = '#6aa87a', HOJA_1 = '#8cc89b', HOJA_2 = '#a9dab5';
  // Colores de tulipán (sin rosa): [pétalo claro, pétalo oscuro]
  const TULIPANES = [
    ['#ffe28f', '#f5c654'],   // amarillo
    ['#d9c9fc', '#b9a2f0'],   // lavanda
    ['#fffaf0', '#e9dec6'],   // blanco
    ['#ffd2b0', '#f6b083'],   // melocotón
    ['#cfe8ff', '#9ecdf3'],   // azul cielo
    ['#fff3a6', '#eeda5f'],   // limón
  ];

  // Generador pseudoaleatorio con semilla (para que el dibujo no cambie al repintar).
  function azar(semilla) {
    let a = semilla >>> 0;
    return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }

  // Un tulipán de 40×100 con la base del tallo en (20, 100).
  function tulipan(x, y, escala, giro, color) {
    const [c1, c2] = TULIPANES[((color % TULIPANES.length) + TULIPANES.length) % TULIPANES.length];
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${giro.toFixed(1)}) scale(${escala.toFixed(3)}) translate(-20 -100)">
      <path d="M20 100 C20 82 21 62 20 40" fill="none" stroke="${TALLO}" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M20 92 C7 82 5 66 9 55 C14 66 18 77 20 86 Z" fill="${HOJA_1}"/>
      <path d="M20 80 C31 71 35 58 31 49 C27 60 23 69 20 75 Z" fill="${HOJA_2}"/>
      <path d="M11.5 29 C9.5 17 15.5 7 20 3 C24.5 7 30.5 17 28.5 29 C27 40 13 40 11.5 29 Z" fill="${c1}"/>
      <path d="M20 42 C9.5 42 5.5 30 8.5 16.5 C13 21 17 27.5 20 34 Z" fill="${c2}"/>
      <path d="M20 42 C30.5 42 34.5 30 31.5 16.5 C27 21 23 27.5 20 34 Z" fill="${c2}" opacity=".85"/>
      <path d="M16 12 C17 9 18.5 7 20 5.5" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
    </g>`;
  }

  // Una margarita de radio ~20 con el tallo hacia abajo (base en x, y).
  function margarita(x, y, escala, giro) {
    let petalos = '';
    for (let i = 0; i < 12; i++) petalos += `<ellipse cx="20" cy="9" rx="3.6" ry="9" transform="rotate(${i * 30} 20 20)" fill="#ffffff" stroke="#e8e6dc" stroke-width=".8"/>`;
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${giro.toFixed(1)}) scale(${escala.toFixed(3)}) translate(-20 -100)">
      <path d="M20 100 C20 80 19 60 20 36" fill="none" stroke="${TALLO}" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 86 C9 80 7 70 10 62 C14 70 17 77 20 82 Z" fill="${HOJA_1}"/>
      <g transform="translate(0 16)">${petalos}<circle cx="20" cy="20" r="6" fill="#ffd45c"/><circle cx="18.5" cy="18.5" r="2" fill="#fff2b3"/></g>
    </g>`;
  }

  // Un jardín de flores a lo ancho (para pies de página, entrar, Cartera).
  function jardin({ ancho = 400, alto = 120, n = 9, semilla = 7, tipo = 'tulipanes', desde = 0, hasta = 1 } = {}) {
    const r = azar(semilla);
    let g = '';
    const items = [];
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? .5 : i / (n - 1);
      const x = ancho * (desde + (hasta - desde) * t) + (r() - .5) * (ancho / n) * .7;
      const esc = (alto / 100) * (.62 + r() * .38);
      items.push({ x, esc, giro: (r() - .5) * 16, color: Math.floor(r() * 6), flor: tipo === 'mezcla' ? (r() < .35 ? 'm' : 't') : (tipo === 'margaritas' ? 'm' : 't') });
    }
    items.sort((a, b) => a.esc - b.esc);
    for (const it of items) g += it.flor === 'm' ? margarita(it.x, alto + 2, it.esc, it.giro) : tulipan(it.x, alto + 2, it.esc, it.giro, it.color);
    return `<svg viewBox="0 0 ${ancho} ${alto}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMax meet">${g}</svg>`;
  }

  // Ramito para la esquina de una entrada.
  function ramo(tipo, semilla = 3) {
    if (tipo === 'ninguna') return '';
    const r = azar(semilla);
    let g = '';
    const flores = tipo === 'margaritas'
      ? [margarita(26, 94, .62, -14), margarita(46, 94, .78, 4), margarita(64, 94, .56, 16)]
      : [tulipan(24, 94, .66, -15, Math.floor(r() * 6)), tulipan(44, 94, .82, 3, Math.floor(r() * 6)), tulipan(62, 94, .6, 17, Math.floor(r() * 6))];
    g = flores.join('');
    return `<svg viewBox="0 0 86 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g}</svg>`;
  }

  // Estrella de cuatro puntas para los destellos.
  const ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.9 7.6 16.4 11.1 24 12 16.4 12.9 12.9 16.4 12 24 11.1 16.4 7.6 12.9 0 12 7.6 11.1 11.1 7.6 12 0Z"/></svg>';

  // Tulipán suelto como icono (marca).
  function icono(color = 1) {
    return `<svg viewBox="0 0 40 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${tulipan(20, 100, 1, 0, color)}</svg>`;
  }

  raiz.FLORES = { tulipan, margarita, jardin, ramo, icono, ESTRELLA, TULIPANES, azar };
})(typeof window !== 'undefined' ? window : globalThis);
