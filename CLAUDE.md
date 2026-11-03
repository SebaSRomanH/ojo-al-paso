# CLAUDE.md — ¡Ojo al paso!

Instrucciones permanentes para Claude en este proyecto.

## Quién y cómo
- El dueño es **Seba**, nuevo en programación (no sabe DevOps ni MLOps). Habla español de Chile.
- Responder **siempre en español**, simple, con tablas o listas cortas. Explicar la jerga técnica la primera vez que aparece.
- Seba decide con frases cortas como "Sí, sube a pruebas" o "Funciona, a producción". Antes de guardar o subir, preguntarle con una pregunta concreta.
- El juego es un regalo para su sobrino Rafa. Los personajes son de su familia y se basan en fotos que él comparte. **Las fotos nunca se guardan en el repo ni en el juego.**

## El proyecto
- Todo el juego está en **`index.html`** (HTML + CSS + JS, sin dependencias ni archivos externos). Los gráficos (pixel art) y el audio (Web Audio) se generan con código.
- `docs/ESPECIFICACION.md`: requisitos (RF-xx), historias (HU-xx) e historial de la especificación.
- `CHANGELOG.md`: cambios por versión, escritos para Seba (no técnico).
- `tests/validar.mjs`: validación automática (sin instalar nada).
- `.github/workflows/validar.yml`: corre la validación en GitHub en cada subida.

## Flujo de trabajo: local → pruebas → producción
| Entorno | Dónde | Remote de git |
|---|---|---|
| Local | `C:\Users\Usuario\ojo-al-paso`, servidor en http://localhost:8081 | — |
| Pruebas | https://sebasromanh.github.io/ojo-al-paso-pruebas/ | `pruebas` |
| Producción | https://sebasromanh.github.io/ojo-al-paso/ | `produccion` |

1. Hacer el cambio en local y probarlo (ver "Cómo probar").
2. Actualizar **`docs/ESPECIFICACION.md`** (requisito afectado + fila en el historial) y **`CHANGELOG.md`**. Es obligatorio en todo cambio funcional.
3. Correr `node tests/validar.mjs`. Si falla, arreglar antes de seguir.
4. Preguntar a Seba antes de hacer commit y push a **pruebas**. Se trabaja en la rama `main`, en los dos repos.
5. **Solo cuando Seba diga que funciona en su teléfono**, subir lo mismo a **producción** (`git push produccion main`), esperar la publicación y marcar en la especificación "vX publicada en producción" (subir ese cambio de documentación a los dos repos).
6. Se usan **dos repos separados** a propósito; Seba decidió no unificarlos.

Antes de subir, `git fetch` del remote: Seba a veces edita en la web de GitHub (por ejemplo, el README). Integrar sus cambios con `git rebase`, nunca forzar.

Commits en español, terminando con:
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

**Créditos:** en GitHub (README u otros textos) el proyecto se firma **"Creado por Seba, potenciado por Claude"**. Dentro de los créditos del juego, Seba aparece como **"Tío Seba"** (idea y dirección; programación y arte con Claude; en el elenco, "Tío Seba 80s"). En el menú de personajes la tarjeta sigue diciendo "SEBA 80s".

## Herramientas
- GitHub CLI: `"/c/Program Files/GitHub CLI/gh.exe"` (no está en el PATH del shell). Cuenta: `SebaSRomanH`.
- Ver si GitHub Pages terminó de publicar:
  `gh run list -R SebaSRomanH/<repo> --limit 1 --json status,conclusion,headSha`
- Si una publicación queda "en cola" mucho rato, suele ser una publicación anterior trabada: revisar con `gh run view <id> --log-failed` y volver a subir un commit nuevo.
- Crear repos públicos u otras acciones públicas pueden estar bloqueadas por permisos: en ese caso, darle a Seba el comando para que lo ejecute él.

## Cómo probar
- Servidor local: configuración `ojo-al-paso` de `.claude/launch.json` (puerto 8081). Si muestra una versión vieja, agregar `?v=<algo>` a la dirección o reiniciar el servidor.
- **Modo prueba**: abrir `http://localhost:8081/?prueba`. El juego corre aunque el panel del navegador esté oculto (sin modo prueba se pone muy lento), se salta la historia y expone `window.juego`:
  - Lectura: `juego.estado`, `puntos`, `segundos`, `velocidad`, `tieneBolsa`, `bolsaEnPantalla`, `altura` (0 = en el suelo), `personaje`, `personajes`, `popos`.
  - Acciones: `juego.elegir('angie')`, `jugar()`, `saltar()`, `pausar()`, `seguir()`, `menu()`, `creditos()`, `bolsaYa()`.
  - `?prueba&bolsa=ya` hace salir la bolsa de inmediato.
  - Los anuncios del `aria-live` (`#live`) sirven para seguir los eventos: "¡Tomaste una bolsa!", "¡Puaj!", "Fin de la carrera".
- Probar en vista de teléfono horizontal (780×360) y revisar que la consola no tenga errores.
- **Claude no puede escuchar**: los sonidos los valida Seba en su teléfono. Decirlo explícitamente.

## Reglas del juego y del contenido
- En pantalla se dice **"popó"** (masculino: "el popó", "lo pisaste"), **nunca "caca"**. En el código y en la especificación, "caca" se usa solo como término interno.
- **No copiar melodías, sprites ni logos con derechos.** La música es original "al estilo" metal de los 80 (no The Trooper), y la fanfarria de récord es original (no Final Fantasy). La polera de Francisco no lleva el logo de Iron Maiden.
- Los popós (simples y dobles) siempre deben ser saltables: `tests/validar.mjs` lo simula. Si se cambian las cajas de choque o los tamaños, actualizar también el test.
- Los dibujos se escriben como filas de letras (14 de ancho para los cuerpos, 16 para las caras de asco) y `makeSprite` los mejora (Scale2x ×2, contorno, sombreado y brillo en los ojos).
- Botones de al menos 44 px CSS (mínimo cómodo para un dedo).
