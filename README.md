# ¡Ojo al paso!

Juego de navegador para móvil (en horizontal): un niño corre y salta cacas. Supera tu récord y compártelo por WhatsApp.

Todo el juego está en `index.html`: gráficos pixel art y música chiptune generados con código, sin archivos externos.

## Jugar en tu computadora

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
python -m http.server 8080
```

y entra a http://localhost:8080.

## Controles

- **Saltar:** botón SALTAR, tocar la pantalla, Espacio o ↑
- **Pausa:** botón II o Esc
- **Sonido:** botón ♪ o M

## Flujo de publicación

local → repo de pruebas (`ojo-al-paso-pruebas`) → producción (`ojo-al-paso`), ambos con GitHub Pages.
