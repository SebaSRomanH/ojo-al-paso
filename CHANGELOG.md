# Historial de cambios

## 0.9 — 2026-11-03

- **Botones 15 % más chicos:** sonido, pantalla completa, pausa, botones de texto y tarjetas de personajes (sin bajar de 44 px, el mínimo cómodo para un dedo).
- **Un pedo para cada personaje:** Baby Rafa agudito con un "pío", Seba apretado, Angie con guagua llorando, Pipe con risa, Francisco largo y variable, y Rafa y Vicky el clásico.
- **Baby Rafa redibujado** según una foto nueva: pelito corto café claro, cara redonda con oreja, ojos oscuros con brillo, babero-bandana azul y chaleco tejido crema con bordes rojos.
- **El doble de bolsas:** ahora sale una cada ~30 s de juego (antes ~1 minuto).
- **La velocidad sube más lento:** llega a ×6 a los 30 s (antes a los 20 s), así que las partidas duran más.
- **Monitos en más alta resolución:** 4 veces más detalle que el dibujo original (antes 2), bordes más suaves, contorno más parejo, sombreado en dos tonos y un brillito en los ojos. También mejoran los popós, Don Cochino, Bigote y las caras de asco.
- **Angie** más delgada, estilo Fido Dido, con su guatita de embarazada y más poto.

## 0.8 — 2026-11-03

- **Créditos finales** estilo película, con todo el elenco en pixel art y la moraleja del juego. Botón CRÉDITOS en el menú y al terminar.
- **Botón MENÚ** en la pausa y al terminar, para cambiar de personaje sin tener que perder.
- **Botones más claros:** el principal (JUGAR, SEGUIR, OTRA VEZ) es más grande y late; los demás son más chicos.
- **Salto guardado:** si tocas justo antes de caer, el salto sale apenas tocas el suelo.
- **Cada 100 puntos**, un "ding" y el número flotando.
- **Muerte más dramática:** temblor de pantalla, vibración (Android), "¡splat!", un "¡puaj!" con voz de 8 bits y una trompeta triste. Si hay récord, suena una fanfarria.
- Sonidos de aterrizaje y de clic en los botones.

## 0.7 — 2026-11-03

- **Bolsa salvadora:** más o menos cada minuto de juego aparece una bolsa. Al tomarla, el personaje se pone verde menta brillante y el próximo popó que toque lo mete en la bolsa y lo lanza a un basurero, en vez de morir. Después sigue corriendo normal.
- Sonidos nuevos al tomar la bolsa y al lanzarla a la basura.
- El ejemplo inicial avisa: "¿Ves una bolsa? Tómala: el próximo popó va a la basura."

## 0.6 — 2026-11-03

- **Se salta tocando la pantalla:** ya no hay botón de salto.
- **Ejemplo antes de partir:** un dedo animado toca la pantalla mientras el personaje salta, con el texto "¡Toca la pantalla para saltar!". Se empieza tocando.
- **Botón de sonido arriba a la izquierda**, lejos de donde se toca para jugar; los puntos se corrieron a su derecha.
- **Pantalla completa:** botón nuevo junto al sonido (tecla F en computador). En iPhone se usa "Agregar a pantalla de inicio".
- En la historia, el botón para pasarla ahora dice "OMITIR" (antes "SALTAR"), para no confundirlo con el salto.

## 0.5.1 — 2026-11-03

- **Botón de salto circular:** semitransparente para no tapar el juego, con un ícono de flecha hacia arriba en vez del texto "SALTAR".

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
