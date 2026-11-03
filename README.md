# ¡Ojo al paso!
Juego creado para mi sobrino. 

Juego de navegador para móvil (en horizontal): Rafa corre y salta popós. Supera tu récord y compártelo por WhatsApp.

Todo el juego está en `index.html`: gráficos pixel art y música chiptune generados con código, sin archivos externos.

## Jugar en tu computadora

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
python -m http.server 8081
```

y entra a http://localhost:8081.

## Controles

- **Saltar:** botón SALTAR, tocar la pantalla, Espacio o ↑
- **Pausa:** botón II o Esc
- **Sonido:** botón ♪ o M

## Revisar que todo esté bien

```bash
node tests/validar.mjs
```

Para probar el juego con herramientas extra, abre `index.html?prueba` (ver [CLAUDE.md](CLAUDE.md)).

## Documentación

- [Especificación de producto](docs/ESPECIFICACION.md)
- [Historial de cambios](CHANGELOG.md)

## Flujo de publicación

local → repo de pruebas (`ojo-al-paso-pruebas`) → producción (`ojo-al-paso`), ambos con GitHub Pages.
