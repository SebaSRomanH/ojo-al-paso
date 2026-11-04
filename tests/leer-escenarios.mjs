// Lee el HTML que entrega Chrome sin pantalla (--dump-dom) de tests/escenarios.html
// y muestra cada escenario con ✅/❌. Sale con código 1 si alguno falló.
// Uso: node tests/leer-escenarios.mjs resultado.html
import { readFileSync } from 'node:fs';

const html = readFileSync(process.argv[2], 'utf8');
const m = html.match(/<pre id="resultado">([\s\S]*?)<\/pre>/);
const texto = m && m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
let datos = null;
try { datos = JSON.parse(texto); } catch { /* no terminó */ }
if (!datos) {
  console.log(`❌ Los escenarios no terminaron. Estado: ${texto ? texto.slice(0, 80) : 'sin resultado'}`);
  process.exit(1);
}
for (const r of datos.resultados) console.log(`${r.ok ? '✅' : '❌'} ${r.nombre}${r.detalle ? ` — ${r.detalle}` : ''}`);
console.log(datos.ok ? '\nEscenarios en orden. 🎉' : '\nAlgún escenario falló.');
process.exit(datos.ok ? 0 : 1);
