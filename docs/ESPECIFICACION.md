# Especificación de producto — v1.2

Estado: v0.9 en producción; v1.2 en desarrollo local (incluye la v1.0 y la v1.1). Fecha: 2026-11-03. Propietario de producto: Sebastián. Nombre de trabajo: **¡Ojo al paso!**.

Entornos:

| Entorno | Dónde | URL |
|---|---|---|
| Local | `C:\Users\Usuario\ojo-al-paso` | http://localhost:8081 |
| Pruebas | repo `SebaSRomanH/ojo-al-paso-pruebas` + GitHub Pages | https://sebasromanh.github.io/ojo-al-paso-pruebas/ |
| Producción | repo `SebaSRomanH/ojo-al-paso` + GitHub Pages | https://sebasromanh.github.io/ojo-al-paso/ |

Flujo: local → pruebas (se verifica en teléfono) → producción.

## Objetivo

Ofrecer una partida corta, inmediata y rejugable en el navegador móvil horizontal: saltar obstáculos, superar el récord propio y compartir el enlace por WhatsApp. Inspirarse en la mecánica del dinosaurio de Chrome sin copiar su código o sus recursos.

**Misión del jugador:** llegar a **9999 puntos** sin pisar ningún popó y darle su merecido a Don Cochino (RF-27).

**Vocabulario en pantalla:** todos los textos que ve o escucha el jugador dicen **"popó"** (masculino: "el popó", "lo pisaste"), nunca "caca". Este documento usa "caca" como término técnico interno.

**Historia:** cada noche, Don Cochino pasea a su perro Bigote mirando el celular y nunca recoge sus cacas. El barrio quedó minado y Rafa tiene que cruzarlo corriendo.

## Alcance funcional

| ID | Requisito y criterio de aceptación | Desde |
|---|---|---|
| RF-01 | **Rafa** corre de izquierda a derecha en un mundo que se desplaza. Su sprite (14×18 celdas) se inspira en el sobrino del propietario: jockey rojo con visera negra plana, pelo café largo, polerón negro con esqueletos y etiqueta naranja con su nombre, buzo gris. Comenzar requiere una acción explícita. | 0.1 · 0.4 |
| RF-02 | **Tocar cualquier parte de la pantalla de juego** inicia un salto si el personaje está en el suelo; no hay botón de salto. Espacio/Flecha arriba funcionan en computador. No existe doble salto. Cada salto suena a **pedo**, distinto según el personaje, y deja una nubecita verde: Rafa y Vicky, pedo clásico (tono y duración al azar); Baby Rafa, agudito con un "pío" al final; Seba, apretado ("pfft-t-t"); Angie, pedo y una guagua llorando; Pipe, pedo y risa "ja ja ja ja"; Francisco, largo y de tono variable. La nubecita también es propia: Rafa verde, Baby Rafa rosada y chica, Seba mostaza y chica, Vicky menta, Pipe naranja, Angie lavanda y Francisco humo gris grande y duradero. | 0.1 · 0.4 · 0.6 · 0.9 |
| RF-03 | Aparecen cacas con altura de 34–46 y ancho de 38–58 píxeles lógicos. No hay otro tipo de enemigo. Un 18 % de las apariciones son **cacas dobles** (dos pequeñas, 38–44 × 34–40, separadas 6–16 px) que se esquivan con un solo salto. | 0.1 · 0.2 |
| RF-04 | Chocar termina la carrera y congela la puntuación. Primero se muestra la **reacción de asco** (RF-13) durante 1,4 s y luego la pantalla final, que ofrece reinicio sin recargar la página. La caja de colisión es menor que el dibujo para dar margen al jugador. | 0.1 · 0.3 |
| RF-05 | Puntaje = piso(distancia / 3), con tope en 9999 (hasta v1.0 era distancia / 12); aumenta solo corriendo. El marcador muestra 4 dígitos. Se muestra récord local no decreciente entre partidas y recargas. Sin almacenamiento disponible, se puede seguir jugando. La pantalla final muestra puntos y segundos de duración. | 0.1 · 0.2 |
| RF-06 | **Velocidad exponencial:** v(t) = 300 · e^(k·t) px/s con k = ln(6)/30, es decir ×6 a los 30 s, con **tope de 1500 px/s (×5)**, que se alcanza a los ~27 s; ahí el aviso "¡MÁS RÁPIDO!" deja de repetirse. (Hasta v1.0 el tope era 3000 px/s.) Referencias: ×1,8 a los 10 s, ×3,3 a los 20 s. Objetivo: partida promedio ≈15 s; a los 30 s es casi imposible. (Hasta v0.8: ×6 a los 20 s.) | 0.2 · 0.9 |
| RF-07 | Pausa manual mediante botón o Esc. Pérdida de foco, pestaña oculta y orientación vertical móvil también pausan. Retomar exige SEGUIR, Espacio o Flecha arriba. | 0.1 |
| RF-08 | En pantallas de hasta 900 px de ancho en vertical se bloquea el inicio y se indica girar el dispositivo. En horizontal la zona de juego cabe en el alto disponible y contempla safe areas. No se fuerza una API de bloqueo de orientación. | 0.1 |
| RF-09 | Gráficos originales pixel art de estética años 80. Sin logos, sprites, música ni personajes de Mario o Chrome Dino. Cacas caricaturescas sin contenido gráfico. **Acabado estilo 16 bits** (inspirado en el look de Mario 3, sin copiar sus sprites): los dibujos se escriben a baja resolución y al cargar se procesan con Scale2x dos veces (4× de detalle, curvas y diagonales suavizadas), contorno oscuro redondeado de 2 celdas, sombreado en dos niveles (luz arriba-izquierda, sombra abajo-derecha) y brillo blanco en los ojos (no en las caras de asco). Se pintan pixel a pixel con ImageData (~0,25 s de carga en computador). El lienzo tiene el doble de pixeles reales (1600×600) con la misma lógica de 800×300. | 0.1 · 0.5 · 0.9 |
| RF-10 | En URL pública, COMPARTIR usa Web Share API o copia el enlace; cancelación sin error visible. En local informa que primero hace falta publicar. No realiza envíos sin intervención del usuario. | 0.1 |
| RF-11 | Un único HTML autónomo que no solicita fuentes, imágenes, audio ni scripts externos al jugar. | 0.1 |
| RF-12 | **Música y sonido:** tema chiptune original de estilo heavy metal de los 80 (bajo y guitarras galopantes, dos guitarras armonizadas en Mi menor, 160 BPM, 32 compases ≈48 s) generado con Web Audio. Debe sonar continuo en loop: la última sección termina en Si y resuelve en el Mi inicial. No reproduce melodías de terceros (p. ej. *The Trooper*); solo se inspira en el estilo. Efectos de salto, choque y aumento de velocidad. Suena al jugar y se detiene en pausa y al chocar. | 0.2 |
| RF-13 | **Reacción de asco al pisar:** el niño se pone verde; aparece una viñeta con su cara de asco estilo manhwa coreano (ojos > <, rayas azules en la frente, cachetes verdes, boca ondulada y lengua afuera) y el texto "¡PUAJ!"; moscas revolotean alrededor del niño y líneas de olor verdes suben ondulando desde la caca pisada. | 0.3 |
| RF-14 | **Ranking local:** top 10 guardado en el dispositivo. Si el puntaje entra, se pide un nombre **estilo arcade de hasta 5 caracteres**: A–Z, Ñ, 0–9 y los símbolos . - ! ? & + * ♥ ★, en mayúsculas y sin tildes, en amarillo espaciado sobre negro (antes: 3 iniciales) y se recuerdan para la próxima vez. La fila guardada se resalta. En teléfono el teclado no se abre automáticamente. | 0.2 |
| RF-15 | **Aparición aleatoria de cacas:** tras cada caca simple, el siguiente intervalo es seguido (0,85–1,15 s) con 30 %, normal (1,15–2,2 s) con 55 % o respiro (2,2–3,0 s) con 15 %. Tras una doble, 1,2–2,2 s. El mínimo supera el tiempo de un salto (0,63 s). | 0.2 |
| RF-16 | **Aviso de velocidad:** cada 5 s aparece parpadeando "¡MÁS RÁPIDO! x…" con un sonido y un anuncio accesible. El HUD muestra siempre `VEL x…`. | 0.2 |
| RF-17 | **Controles** con íconos de 14,5 % del alto del juego (mínimo 44 px CSS, el mínimo cómodo para un dedo): **sonido y pantalla completa arriba a la izquierda**, **pausa arriba a la derecha**, lejos de la zona donde se toca para saltar; tocarlos no hace saltar. Los puntos se dibujan a la derecha de los botones de la izquierda. Silenciar se recuerda entre visitas; teclas M (sonido) y F (pantalla completa) en computador. | 0.2 · 0.6 |
| RF-18 | **Historia de intro** en dos pantallas animadas, con texto y botones SIGUIENTE/SALTAR (Espacio avanza, Esc salta). (1) Don Cochino pasea a Bigote mirando el celular; Bigote hace caca y él sigue diciendo "…nadie me vio". (2) La vereda llena de cacas con moscas y olor; Rafa se asusta (!) y se presenta la misión. Música de susto en Mi menor armónica a 72 BPM (latido, trémolo, melodía lenta) y un golpe disonante en cada momento clave. Se muestra en la primera visita tras "TOCA PARA EMPEZAR" (el navegador exige un toque para sonar); después se puede repetir con el botón HISTORIA. | 0.4 |
| RF-28 | **Pantallas estilo 70s + 2020s** (clase `ui`): menú, "toca para empezar", historia, ejemplo del dedo, pausa, pantalla final con ranking, créditos, avisos y "gira tu teléfono". El juego en sí y sus botones de sonido, pantalla completa y pausa mantienen el estilo pixel. Paleta setentera cálida (crema, mostaza, naranjo, óxido); títulos en cursiva gruesa con sombra en capas, sobre tres franjas (`stripes`); fondos de vidrio esmerilado; esquinas redondeadas; botón principal como píldora con degradado naranjo–óxido y secundarios como píldoras con contorno crema. Ranking en tarjeta de vidrio con el top 3 en mostaza y la fila recién guardada en una píldora mostaza; el nombre arcade se mantiene amarillo sobre negro, con borde mostaza redondeado. La barra de la historia lleva un borde inferior en degradado setentero. | 1.1 · 1.2 |
| RF-19 | **Selección de personaje** en la pantalla inicial: una tarjeta por personaje con su dibujo y nombre; la elegida se marca en amarillo y se recuerda entre visitas. Muestra la misión, el récord y los botones JUGAR, HISTORIA y COMPARTIR. | 0.4 · 0.5 |
| RF-21 | **Ejemplo de cómo saltar:** al tocar JUGAR (o Espacio en el menú) aparece una pantalla con un dedo animado que toca la pantalla cada 1,2 s, con una onda en el punto de toque; el personaje corre y salta en sincronía, y se lee "¡Toca la pantalla para saltar!". La partida empieza al tocar la pantalla o con Espacio. "OTRA VEZ" reinicia directo, sin el ejemplo. | 0.6 |
| RF-22 | **Pantalla completa:** botón con ícono de esquinas (cambia al salir), en navegadores que la permiten (Android, computador). Al entrar intenta fijar la orientación horizontal; si el navegador no lo permite, se ignora. En iPhone el botón se oculta (Safari no permite pantalla completa en páginas); al agregar el juego a la pantalla de inicio se abre sin barras del navegador. | 0.6 |
| RF-23 | **Bolsa (escudo de un uso):** aparece una bolsa flotando en el camino (con destello) cada 25–35 s de **juego acumulado** entre partidas (la primera a los 12–22 s; hasta v0.8 era el doble de espera); no aparece encima de un popó recién salido. Al tocarla, el personaje se tiñe verde menta con contorno brillante, suena un arpegio, aparece "¡BOLSA!" y un ícono junto a los puntos. **El próximo popó que toque** no lo mata: se embolsa, vuela en arco a un basurero que aparece a la izquierda ("¡A LA BASURA!" y sonido de lanzamiento), el personaje recupera su color y sigue corriendo; 0,35 s de gracia (parpadeo) para no morir en la segunda caca de un par. Si salta los popós, conserva la bolsa; tomar otra bolsa no acumula. Se pierde al terminar la partida. Verificado: tomar bolsa → embolsar → morir en el popó siguiente. | 0.7 |
| RF-24 | **Créditos finales** (desde 1.2.1, "Tío Seba"; en GitHub: "Creado por Seba, potenciado por Claude"): botón CRÉDITOS en el menú y en la pantalla final. Rollo de texto que sube (~38 s) con la música del juego: título, dedicatoria a Rafa, idea y dirección (Tío Seba), programación y arte (Tío Seba y Claude), protagonista y elenco con sus sprites (Seba figura como "Tío Seba 80s"), villanos (Don Cochino y Bigote), música, efectos, agradecimientos, la moraleja "Si sacas a pasear a tu perro, ¡recoge su popó!" y "¡Gracias por jugar!". Al terminar, al tocar, con CERRAR, Espacio o Esc vuelve al menú. | 0.8 |
| RF-25 | **Navegación:** botón MENÚ en la pausa y en la pantalla final (y Esc en la final) para volver a elegir personaje sin tener que perder. Jerarquía de botones: el principal (JUGAR, SEGUIR, OTRA VEZ) es más grande y late suavemente; los secundarios son más chicos. Clic sonoro en todos los botones. | 0.8 |
| RF-26 | **Sensación de juego:** salto guardado de 0,13 s (si se toca justo antes de aterrizar, salta al tocar el suelo); "ding" y número flotante cada 1000 puntos; sonido suave al aterrizar; al morir, temblor de pantalla, vibración en Android, "¡splat!" + "¡puaj!" con voz de 8 bits, y luego trompeta triste o, si hay récord, una fanfarria original. Las animaciones se desactivan si el teléfono pide reducir el movimiento. | 0.8 |
| RF-27 | **Meta y final (9999 puntos):** el puntaje tiene tope en 9999. Al alcanzarlo dejan de salir popós y la bolsa, el mundo frena en 1,2 s y aparece "¡LLEGASTE A LA META!"; Don Cochino (mirando el celular) y Bigote entran caminando desde la derecha, mirando hacia el personaje. A los 2,6 s el personaje lanza una bolsa de popó que vuela en arco hasta la cara de Don Cochino (sonido "fiuuu"); a los 3,3 s, "¡PLAF!" (y vibración): la cara queda cubierta de popó que chorrea, con olor y moscas, y las gotas salpican a Bigote y al suelo. A los 3,5 s Bigote, Don Cochino y el personaje dicen "¡PUAJ!" en globos de diálogo, con voces de 8 bits (ladrido agudo, voz grave y voz media). A los 6,4 s aparece la pantalla final con el título "¡GANASTE!", el mensaje "Don Cochino aprendió la lección: ¡el popó se recoge!", la fanfarria, el ranking y los botones de siempre. Tiempo estimado para llegar: **~34 s** (1000 pts ≈ 8 s, 3000 ≈ 17 s, 5000 ≈ 23 s); un piloto automático llegó a 9999 en 33,6 s. En modo prueba, `?meta=150` acerca la meta. | 1.0 |
| RF-20 | **Personajes de la familia** (inspirados en fotos del propietario; las fotos no se incluyen en el juego): **Rafa**; **Baby Rafa** (bebé en vista de tres cuartos según foto de referencia: pelito corto café claro, cara redonda con oreja, dos ojos oscuros con brillo, boquita chica; babero-bandana azul con puntitos blancos y chaleco tejido crema con bordes rojos y botones; más bajo: 51 px en vez de 54 y caja de colisión proporcional); **Seba 80s** (el propietario de niño: pelo negro, chaleco gris con cuello amarillo, jeans, botas); **Vicky** (pelo ondulado largo, lentes de sol rosados, polera tropical); **Pipe** (jockey naranjo, lentes espejados, barba, camisa con flamencos); **Angie** (embarazada, delgadita estilo Fido Dido: pelo largo, lentes, polera blanca con guatita hacia adelante, poto marcado hacia atrás, piernas finas); **Francisco** (metalero: jockey negro hacia atrás, lentes oscuros, polera negra con emblema dorado sin logos de bandas). Cada uno tiene su propia cara de asco (RF-13) con su gorro, pelo, lentes o barba. La historia (RF-18) siempre muestra a Rafa. | 0.5 |

## Historias de usuario

| ID | Historia | Aceptación relacionada |
|---|---|---|
| HU-01 | Como jugador, quiero entender qué hacer antes de comenzar para jugar sin instrucciones largas. | Portada con botón, objetivo y controles; RF-01/02. |
| HU-02 | Como jugador móvil, quiero saltar con una mano para esquivar los obstáculos, y que me muestren cómo antes de partir. | Toque en cualquier parte; RF-02/08/21. |
| HU-03 | Como jugador, quiero una dificultad creciente y sorpresiva, con partidas cortas e intensas. | RF-03/06/15/16; saltabilidad comprobada con simulación. |
| HU-04 | Como jugador, quiero conservar mi récord, ver un ranking y repetir rápidamente. | RF-04/05/14. |
| HU-05 | Como jugador, quiero atender otra app sin perder la partida. | Pausa por interrupción, reanudación explícita; RF-07. |
| HU-06 | Como jugador, quiero enviar el juego por WhatsApp. | Enlace público compartible y HTML autocontenido; RF-10/11. |
| HU-07 | Como propietario, quiero cambiar imágenes y ampliar el juego sin rehacer sus reglas. | Constantes de reglas agrupadas al inicio del script; sprites como texto editable. |
| HU-08 | Como jugador, quiero música con energía que acompañe la carrera y poder silenciarla. | RF-12/17. |
| HU-09 | Como jugador, quiero que pisar una caca sea gracioso y no solo un "game over". | RF-13. |
| HU-10 | Como jugador, quiero entender por qué hay cacas en la calle y cuál es mi misión. | RF-18. |
| HU-11 | Como jugador, quiero elegir con quién juego entre los personajes de mi familia. | RF-19/20. |
| HU-12 | Como jugador, quiero de vez en cuando una ayuda que me salve de un popó, y que se vea cómo lo recojo y lo boto. | RF-23. |
| HU-13 | Como jugador, quiero una meta que me haga sentir que gané, y ver a Don Cochino recibir su merecido. | RF-27. |

## Verificación

- Saltabilidad de la caca doble en el peor caso (44 + 16 + 44 px, alto 40): la ventana para saltar es de ≈450 ms a 300 px/s, ≈230 ms a 1200 px/s, ≈140 ms a 1800 px/s y ≈76 ms a 3000 px/s. Siempre es posible; a alta velocidad, humanamente muy difícil (intencional).
- Probado en navegador de computador con vista horizontal de teléfono (780×360) y vertical (375×812), y aprobado por el propietario en su teléfono antes de pasar a producción (2026-11-03). **Pendiente:** probar en más modelos (Android e iPhone).

## Requisitos no funcionales

- Renderizado objetivo 60 FPS en un móvil moderno; **pendiente de medir en dispositivos físicos**.
- Delta limitado a 100 ms y simulación en pasos de hasta 1/120 s. El tope de 3000 px/s evita atravesar cacas entre pasos.
- Validación automática sin dependencias (`node tests/validar.mjs`): dibujos bien formados, popós simples y dobles saltables con cada altura de personaje, ningún texto visible con "caca" y ningún recurso externo. Corre en GitHub Actions en cada subida, con permisos de solo lectura.
- **Modo prueba** (`?prueba`): bucle con temporizador (funciona con la pestaña oculta), sin historia, con `window.juego` para leer y controlar el estado; `?bolsa=ya` hace aparecer la bolsa al tiro. Muestra la etiqueta "MODO PRUEBA". No afecta el juego normal.
- La vibración solo se intenta después de que la persona tocó la página (el navegador la bloquea antes).
- Controles HTML con nombres accesibles, foco visible, teclado y anuncios de cambio de estado. El juego depende de percepción visual y reflejos; no se afirma accesibilidad integral ni certificación WCAG.
- Cero recursos de terceros en runtime. Sin telemetría, cookies, login ni datos personales. Datos guardados solo en el navegador: récord, ranking (iniciales y puntaje), últimas iniciales, preferencia de sonido, historia vista y personaje elegido.
- Las fotos de referencia de los personajes no se incluyen en el repositorio ni en el juego; solo se usaron para diseñar los sprites.
- Sin funciones de pago ni servicios por uso. Alojamiento en GitHub Pages (repos públicos).

## Fuera del alcance actual

Agacharse, doble salto, enemigos aéreos, niveles, personajes desbloqueables, multijugador, cuentas, compras, **ranking global compartido**, instalación nativa y seguimiento de jugadores.

## Evolución propuesta (sin compromiso de fecha)

1. Prueba con usuarios y dispositivos reales; ajustar tamaño, timing, dificultad y arte final.
2. Catálogo de personajes y obstáculos, animaciones por spritesheet.
3. Biomas y modos definidos mediante datos versionados; retos diarios reproducibles con semilla.
4. Solo si aporta valor: ranking global con servidor y validación. Un puntaje enviado por un navegador no es confiable por sí solo.

## Historial de la especificación

| Versión | Cambios |
|---|---|
| 0.1 | MVP inicial (documento original). |
| 0.2 | Música (RF-12), ranking local (RF-14), velocidad exponencial (RF-06), aparición aleatoria y cacas dobles (RF-03/15), aviso de velocidad (RF-16), controles grandes (RF-17). |
| 0.3 | Reacción de asco con moscas y olor (RF-13); el fin de partida espera la reacción (RF-04). |
| 0.4 | Personaje Rafa (RF-01), salto flatulento (RF-02), historia de intro con música de susto (RF-18), selección de personaje (RF-19), misión e historia en el objetivo. Vocabulario en pantalla: "popó". |
| 0.5 | Seis personajes nuevos de la familia con sus caras de asco (RF-20); la selección se recuerda (RF-19). Acabado estilo 16 bits con doble resolución, contorno y sombreado (RF-09). |
| 0.5.1 | Botón de salto circular y semitransparente con ícono (RF-02). |
| 0.6 | Sin botón de salto: se toca la pantalla (RF-02); ejemplo animado antes de partir (RF-21); sonido y pantalla completa arriba a la izquierda (RF-17/22). |
| 0.7 | Bolsa como escudo de un uso que manda el próximo popó a la basura (RF-23); pista en el ejemplo inicial. |
| 0.8 | Créditos finales (RF-24); botón MENÚ y jerarquía de botones (RF-25); salto guardado, hitos de puntos y nuevos sonidos de muerte, récord, aterrizaje y clic (RF-26). |
| 0.9 | Botones y tarjetas 15 % más chicos (RF-17); pedo personalizado por personaje (RF-02); Baby Rafa redibujado según foto y Angie más delgada (RF-20); sprites con 4× de detalle, contorno de 2 celdas y brillo en los ojos (RF-09); el doble de bolsas (RF-23) y velocidad que sube más lento: ×6 a los 30 s (RF-06). |
| 0.9.1 | Herramientas de calidad: modo prueba, validación automática local y en GitHub Actions, y CLAUDE.md con las reglas del proyecto. Sin cambios de jugabilidad. |
| 1.0 | Meta de 9999 puntos con escena final: bolsa de popó en la cara de Don Cochino, salpicadura a Bigote, "¡PUAJ!" a coro y pantalla "¡GANASTE!" (RF-27). Textos de misión actualizados. |
| 1.1 | Meta alcanzable: puntos ×4 (distancia / 3) y tope de velocidad ×5, ~34 s para llegar (RF-05/06/27); "ding" cada 1000 puntos (RF-26); botones de texto más chicos; menú principal 70s + 2020s (RF-28); nombres arcade de 5 caracteres (RF-14). |
| 1.2 | Estilo 70s + 2020s en todas las pantallas menos el juego (RF-28); color y tamaño de la nubecita del pedo por personaje (RF-02). |
| 1.2.1 | Créditos: "Tío Seba" en el juego y "Creado por Seba, potenciado por Claude" en GitHub (RF-24). |

Todo cambio funcional debe actualizar este documento, el [historial de cambios](../CHANGELOG.md), las pruebas afectadas y la versión.
