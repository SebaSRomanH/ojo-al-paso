# Historial de cambios

## 0.5 — 2026-11-03

- **Seis personajes nuevos de la familia:** Baby Rafa, Seba 80s, Vicky, Pipe, Angie y Francisco, cada uno con su cara de asco propia.
- El menú muestra los siete personajes y recuerda el que elegiste.
- Baby Rafa es más bajito, con una caja de colisión proporcional.
- **Gráficos estilo 16 bits (tipo Mario 3):** el doble de resolución, bordes redondeados, contorno oscuro y sombreado en todos los personajes, popós, Don Cochino, Bigote y las caras de asco. Los textos del lienzo también se ven más nítidos.

## 0.4 — 2026-11-03

- **Rafa:** nuevo personaje pixel art (jockey rojo, pelo largo, polerón negro con esqueletos), también en la viñeta de asco.
- **Selección de personaje** en la pantalla inicial: Rafa y dos personajes bloqueados.
- **Salto flatulento:** cada salto suena a pedo (distinto cada vez) y deja una nubecita verde.
- **Historia de intro** en dos pantallas: Don Cochino y su perro Bigote dejan las cacas sin recoger. Con música de susto en escala menor y golpes de terror. Se ve en la primera visita y se repite con el botón HISTORIA.
- **Misión** visible: juntar la mayor cantidad de puntos.
- **"Popó" en vez de "caca"** en todos los textos del juego (pantallas, historia, anuncios y mensaje al compartir).

## 0.3 — 2026-11-03

- **Reacción de asco al pisar una caca:** el niño se pone verde, aparece una viñeta con su cara de asco estilo manhwa y el texto "¡PUAJ!", con moscas y líneas de olor. La pantalla final aparece 1,4 s después.
- **Especificación documentada** en [docs/ESPECIFICACION.md](docs/ESPECIFICACION.md).

## 0.2 — 2026-11-03

- **Ranking local:** al terminar, si el puntaje entra al top 10 se guardan tus iniciales (3 letras). El ranking queda en el dispositivo.
- **Velocidad exponencial:** se multiplica por 6 a los 20 s (tope 3000 px/s). Una partida promedio dura unos 10 s.
- **Aviso de velocidad:** cada 5 s aparece "¡MÁS RÁPIDO!" con un sonido, y el HUD muestra `VEL x…`.
- **Aparición más aleatoria:** tramos seguidos (0,85–1,15 s), normales (1,15–2,2 s) y respiros (2,2–3 s), más un 18 % de cacas dobles que se saltan juntas. Comprobado con simulación que siempre son saltables.
- **Botones de sonido y pausa más grandes**, con íconos dibujados en vez de texto.
- Pantalla final: muestra cuántos segundos duraste.

Cambia lo definido en la spec MVP 0.1: RF-06 (velocidad máxima 520 px/s e intervalos de 1,35–1,90 s) y el ranking, que estaba fuera del MVP.

## 0.1 — 2026-11-03

- Primera versión: carrera, salto, cacas, récord local, pausa, compartir y música chiptune original.
