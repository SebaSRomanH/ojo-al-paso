// Validación automática de ¡Ojo al paso!  —  uso:  node tests/validar.mjs [archivo.html]
// No necesita instalar nada. Lee index.html (u otro archivo) y revisa que:
//  1) todos los dibujos (sprites) estén bien formados y tengan sus colores;
//  2) los popós (simples y dobles) siempre se puedan saltar, con cada personaje;
//  3) ningún texto visible diga "caca" (en pantalla se dice "popó");
//  4) el juego no cargue nada de internet (un solo HTML autónomo).
// Sale con código 1 si algo falla (así GitHub marca la revisión con ❌).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const html = readFileSync(process.argv[2] || fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
const js = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
let fallas = 0;
const ok = (msg) => console.log(`✅ ${msg}`);
const falla = (msg) => { fallas++; console.log(`❌ ${msg}`); };

// Toma el valor de "const NOMBRE = [...]" o "{...}" del código y lo evalúa.
function constante(nombre) {
  const i = js.indexOf(`const ${nombre} = `);
  if (i < 0) throw new Error(`No encontré "const ${nombre}" en index.html`);
  let j = js.slice(i).search(/[[{]/) + i, nivel = 0, k = j;
  do {
    const c = js[k];
    if (c === '[' || c === '{') nivel++;
    if (c === ']' || c === '}') nivel--;
    k++;
  } while (nivel > 0);
  return js.slice(j, k);
}
const numero = (nombre) => {
  const m = js.match(new RegExp(`\\b${nombre} = ([^,;]+)[,;]`));
  if (!m) throw new Error(`No encontré el número ${nombre}`);
  return Function(`return ${m[1]}`)();
};

// ---------- 1) Dibujos ----------
const bloque = js.slice(js.indexOf('const LEGS = {'), js.indexOf('const PX = 3;'));
const { CHARACTERS, FACE_BASE } = Function(`${bloque}; return { CHARACTERS, FACE_BASE };`)();
const PX = 3;

function revisarFilas(nombre, filas, ancho) {
  const malas = filas.map((f, i) => [i, f]).filter(([, f]) => f.length !== ancho);
  if (malas.length) falla(`${nombre}: filas de largo distinto a ${ancho}: ${malas.map(([i, f]) => `#${i} (${f.length})`).join(', ')}`);
  return malas.length === 0;
}
function revisarColores(nombre, filas, paleta) {
  const usados = new Set(filas.join('').replace(/\./g, ''));
  const faltan = [...usados].filter((c) => !paleta[c]);
  if (faltan.length) falla(`${nombre}: letras sin color en la paleta: ${faltan.join(' ')}`);
  return faltan.length === 0;
}

let dibujosOk = revisarFilas('Base de la cara de asco', FACE_BASE, 16);
const BASE = { s: 1, e: 1, k: 1, g: 1, n: 1 };
for (const ch of CHARACTERS) {
  const piernas = ch.legs ? Object.values(ch.legs).flat() : Object.values(Function(`${bloque}; return LEGS;`)()).flat();
  dibujosOk = revisarFilas(`${ch.name} (cuerpo)`, [...ch.body, ...piernas], 14) && dibujosOk;
  dibujosOk = revisarColores(`${ch.name} (cuerpo)`, [...ch.body, ...piernas], { ...BASE, ...ch.pal }) && dibujosOk;
  dibujosOk = revisarFilas(`${ch.name} (gorro/pelo de la cara)`, ch.face.top, 16) && dibujosOk;
  for (const ov of ch.face.overlays || []) {
    dibujosOk = revisarFilas(`${ch.name} (lentes/barba)`, Object.values(ov), 12) && dibujosOk;
  }
}
const otros = [
  ['Popó', 'POOP', 10, 'POOP_PAL'],
  ['Bolsa', 'BAG_ROWS', 10, 'BAG_PAL'],
  ['Don Cochino', 'MAN_TOP', 10, 'MAN_PAL'],
  ['Bigote', 'DOG_TOP', 12, 'DOG_PAL'],
];
for (const [nombre, filas, ancho, paleta] of otros) {
  const f = Function(`return ${constante(filas)}`)();
  const p = Function(`return ${constante(paleta)}`)();
  dibujosOk = revisarFilas(nombre, f, ancho) && dibujosOk;
  dibujosOk = revisarColores(nombre, f, p) && dibujosOk;
}
if (dibujosOk) ok(`Dibujos bien formados: ${CHARACTERS.length} personajes, caras de asco, popó, bolsa, Don Cochino y Bigote`);

// ---------- 2) Saltabilidad ----------
// Si alguien cambia las cajas de choque, esta prueba debe actualizarse a la par.
const CAJA_PERSONAJE = 'const kx = KID_X + 10, ky = kid.y + 9, kw = 18, kh = KID_H - 12;';
const CAJA_POPO = 'const ox = o.x + o.w * 0.18, oyy = oy + o.h * 0.25, ow = o.w * 0.64, oh = o.h * 0.75;';
const DOBLE = /makePoop\(W \+ 10 \+ w1 \+ Math\.round\(rand\((\d+), (\d+)\)\)/;
if (!js.includes(CAJA_PERSONAJE) || !js.includes(CAJA_POPO) || !DOBLE.test(js)) {
  falla('Cambiaron las cajas de choque o la separación de los popós dobles: actualiza tests/validar.mjs');
} else {
  const GROUND = 250, KID_X = 90;
  const GRAVITY = numero('GRAVITY'), JV = numero('JUMP_VELOCITY'), STEP = Function(`return ${js.match(/STEP = ([^;]+);/)[1]}`)();
  const SPEED_START = numero('SPEED_START'), SPEED_MAX = numero('SPEED_MAX');
  const sepMax = Number(js.match(DOBLE)[2]);
  const choca = (ky, h, o) => {
    const kx = KID_X + 10, kyy = ky + 9, kw = 18, kh = h - 12;
    const oy = GROUND + 2 - o.h;
    const ox = o.x + o.w * 0.18, oyy = oy + o.h * 0.25, ow = o.w * 0.64, oh = o.h * 0.75;
    return kx < ox + ow && kx + kw > ox && kyy < oyy + oh && kyy + kh > oyy;
  };
  // ¿Existe algún momento para saltar que pase sin chocar? Devuelve la ventana en ms.
  function ventana(v, h, popos) {
    const suelo = GROUND - h;
    let buenos = 0;
    for (let salto = 0; salto < 3; salto += 0.002) {
      const obs = popos.map((p) => ({ ...p, x: 400 + p.dx }));
      let y = suelo, vy = 0, enSuelo = true, t = 0, vivo = true;
      for (let i = 0; i < 3000 && vivo; i++) {
        t += STEP;
        if (enSuelo && t >= salto) { vy = -JV; enSuelo = false; }
        if (!enSuelo) { vy += GRAVITY * STEP; y += vy * STEP; if (y >= suelo) { y = suelo; vy = 0; enSuelo = true; } }
        for (const o of obs) o.x -= v * STEP;
        if (obs.some((o) => choca(y, h, o))) vivo = false;
        if (obs.every((o) => o.x + o.w < KID_X)) break;
      }
      if (vivo) buenos++;
    }
    return buenos * 2;
  }
  const peorSimple = [{ dx: 0, w: 58, h: 46 }];
  const peorDoble = [{ dx: 0, w: 44, h: 40 }, { dx: 44 + sepMax, w: 44, h: 40 }];
  const alturas = [...new Set(CHARACTERS.map((c) => (c.body.length + 4) * PX))];
  const velocidades = [SPEED_START, 600, 1200, 1800, SPEED_MAX];
  let saltaOk = true, minimo = Infinity;
  for (const h of alturas) {
    for (const v of velocidades) {
      for (const [nombre, popos] of [['simple', peorSimple], ['doble', peorDoble]]) {
        const ms = ventana(v, h, popos);
        minimo = Math.min(minimo, ms);
        if (ms === 0) { saltaOk = false; falla(`Popó ${nombre} imposible de saltar a ${v} px/s con un personaje de ${h} px`); }
      }
    }
  }
  if (saltaOk) ok(`Popós simples y dobles siempre saltables (${alturas.length} alturas de personaje × ${velocidades.length} velocidades; ventana mínima ${minimo} ms)`);

  // Entre popós debe alcanzar a aterrizar: el intervalo mínimo supera el tiempo en el aire.
  const enElAire = (2 * JV) / GRAVITY;
  const minimos = [...js.matchAll(/return rand\((\d+(?:\.\d+)?), /g)].map((m) => Number(m[1]));
  const minGap = Math.min(...minimos);
  if (minGap > enElAire) ok(`Intervalo mínimo entre popós (${minGap} s) mayor que el tiempo de un salto (${enElAire.toFixed(2)} s)`);
  else falla(`Intervalo mínimo entre popós (${minGap} s) no alcanza para aterrizar (${enElAire.toFixed(2)} s)`);
}

// ---------- 3) Vocabulario: "popó", nunca "caca" en pantalla ----------
const sinCodigo = html.replace(/<script>[\s\S]*<\/script>/, '').replace(/<style>[\s\S]*<\/style>/, '').replace(/<!--[\s\S]*?-->/g, '');
const jsSinComentarios = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
const textosJs = [...jsSinComentarios.matchAll(/(['"`])((?:\\.|(?!\1)[^\\\n])*)\1/g)].map((m) => m[2]);
const conCaca = [...sinCodigo.matchAll(/[^<>]*caca[^<>]*/gi)].map((m) => m[0].trim())
  .concat(textosJs.filter((t) => /caca/i.test(t)));
if (conCaca.length) falla(`Textos visibles que dicen "caca": ${conCaca.map((t) => `"${t.slice(0, 60)}"`).join(', ')}`);
else ok('Ningún texto visible dice "caca"');

// ---------- 4) Nada externo ----------
const externos = [...html.matchAll(/(?:src|href)\s*=\s*["'](https?:)?\/\//gi)].length
  + [...js.matchAll(/\bfetch\(|import\(|new Worker\(/g)].length;
if (externos) falla(`El juego intenta cargar ${externos} recurso(s) externo(s)`);
else ok('No carga nada de internet: un solo HTML autónomo');

console.log(fallas ? `\n${fallas} problema(s) encontrado(s).` : '\nTodo en orden. 🎉');
process.exit(fallas ? 1 : 0);
