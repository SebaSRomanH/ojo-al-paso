# Especificación de producto — v0.4

Estado: v0.4 publicada en producción (aprobada por el propietario en su teléfono). Fecha: 2026-11-03. Propietario de producto: Sebastián. Nombre de trabajo: **¡Ojo al paso!**.

Entornos:

| Entorno | Dónde | URL |
|---|---|---|
| Local | `C:\Users\Usuario\ojo-al-paso` | http://localhost:8081 |
| Pruebas | repo `SebaSRomanH/ojo-al-paso-pruebas` + GitHub Pages | https://sebasromanh.github.io/ojo-al-paso-pruebas/ |
| Producción | repo `SebaSRomanH/ojo-al-paso` + GitHub Pages | https://sebasromanh.github.io/ojo-al-paso/ |

Flujo: local → pruebas (se verifica en teléfono) → producción.

## Objetivo

Ofrecer una partida corta, inmediata y rejugable en el navegador móvil horizontal: saltar obstáculos, superar el récord propio y compartir el enlace por WhatsApp. Inspirarse en la mecánica del dinosaurio de Chrome sin copiar su código o sus recursos.

**Misión del jugador:** juntar la mayor cantidad de puntos sin pisar ningún popó.

**Vocabulario en pantalla:** todos los textos que ve o escucha el jugador dicen **"popó"** (masculino: "el popó", "lo pisaste"), nunca "caca". Este documento usa "caca" como término técnico interno.

**Historia:** cada noche, Don Cochino pasea a su perro Bigote mirando el celular y nunca recoge sus cacas. El barrio quedó minado y Rafa tiene que cruzarlo corriendo.

## Alcance funcional

| ID | Requisito y criterio de aceptación | Desde |
|---|---|---|
| RF-01 | **Rafa** corre de izquierda a derecha en un mundo que se desplaza. Su sprite (14×18 celdas) se inspira en el sobrino del propietario: jockey rojo con visera negra plana, pelo café largo, polerón negro con esqueletos y etiqueta naranja con su nombre, buzo gris. Comenzar requiere una acción explícita. | 0.1 · 0.4 |
| RF-02 | Tocar SALTAR o el escenario libre inicia un salto si el personaje está en el suelo. Espacio/Flecha arriba funcionan en computador. No existe doble salto. Cada salto suena a **pedo** (tono y duración al azar) y deja una nubecita verde. | 0.1 · 0.4 |
| RF-03 | Aparecen cacas con altura de 34–46 y ancho de 38–58 píxeles lógicos. No hay otro tipo de enemigo. Un 18 % de las apariciones son **cacas dobles** (dos pequeñas, 38–44 × 34–40, separadas 6–16 px) que se esquivan con un solo salto. | 0.1 · 0.2 |
| RF-04 | Chocar termina la carrera y congela la puntuación. Primero se muestra la **reacción de asco** (RF-13) durante 1,4 s y luego la pantalla final, que ofrece reinicio sin recargar la página. La caja de colisión es menor que el dibujo para dar margen al jugador. | 0.1 · 0.3 |
| RF-05 | Puntaje = piso(distancia / 12); aumenta solo corriendo. Se muestra récord local no decreciente entre partidas y recargas. Sin almacenamiento disponible, se puede seguir jugando. La pantalla final muestra puntos y segundos de duración. | 0.1 · 0.2 |
| RF-06 | **Velocidad exponencial:** v(t) = 300 · e^(k·t) px/s con k = ln(6)/20, es decir ×6 a los 20 s (≈1800 px/s), con tope técnico de 3000 px/s. Objetivo: partida promedio ≈10 s; a los 20 s es casi imposible. | 0.2 |
| RF-07 | Pausa manual mediante botón o Esc. Pérdida de foco, pestaña oculta y orientación vertical móvil también pausan. Retomar exige SEGUIR, Espacio o Flecha arriba. | 0.1 |
| RF-08 | En pantallas de hasta 900 px de ancho en vertical se bloquea el inicio y se indica girar el dispositivo. En horizontal la zona de juego cabe en el alto disponible y contempla safe areas. No se fuerza una API de bloqueo de orientación. | 0.1 |
| RF-09 | Gráficos originales pixel art de estética años 80. Sin logos, sprites, música ni personajes de Mario o Chrome Dino. Cacas caricaturescas sin contenido gráfico. | 0.1 |
| RF-10 | En URL pública, COMPARTIR usa Web Share API o copia el enlace; cancelación sin error visible. En local informa que primero hace falta publicar. No realiza envíos sin intervención del usuario. | 0.1 |
| RF-11 | Un único HTML autónomo que no solicita fuentes, imágenes, audio ni scripts externos al jugar. | 0.1 |
| RF-12 | **Música y sonido:** tema chiptune original de estilo heavy metal de los 80 (bajo y guitarras galopantes, dos guitarras armonizadas en Mi menor, 160 BPM, 32 compases ≈48 s) generado con Web Audio. Debe sonar continuo en loop: la última sección termina en Si y resuelve en el Mi inicial. No reproduce melodías de terceros (p. ej. *The Trooper*); solo se inspira en el estilo. Efectos de salto, choque y aumento de velocidad. Suena al jugar y se detiene en pausa y al chocar. | 0.2 |
| RF-13 | **Reacción de asco al pisar:** el niño se pone verde; aparece una viñeta con su cara de asco estilo manhwa coreano (ojos > <, rayas azules en la frente, cachetes verdes, boca ondulada y lengua afuera) y el texto "¡PUAJ!"; moscas revolotean alrededor del niño y líneas de olor verdes suben ondulando desde la caca pisada. | 0.3 |
| RF-14 | **Ranking local:** top 10 guardado en el dispositivo. Si el puntaje entra, se piden iniciales (3 caracteres, letras o números, en mayúsculas) y se recuerdan para la próxima vez. La fila guardada se resalta. En teléfono el teclado no se abre automáticamente. | 0.2 |
| RF-15 | **Aparición aleatoria de cacas:** tras cada caca simple, el siguiente intervalo es seguido (0,85–1,15 s) con 30 %, normal (1,15–2,2 s) con 55 % o respiro (2,2–3,0 s) con 15 %. Tras una doble, 1,2–2,2 s. El mínimo supera el tiempo de un salto (0,63 s). | 0.2 |
| RF-16 | **Aviso de velocidad:** cada 5 s aparece parpadeando "¡MÁS RÁPIDO! x…" con un sonido y un anuncio accesible. El HUD muestra siempre `VEL x…`. | 0.2 |
| RF-17 | **Controles de sonido y pausa** de al menos 52 px CSS, con íconos (parlante y dos barras). Silenciar se recuerda entre visitas; tecla M en computador. | 0.2 |
| RF-18 | **Historia de intro** en dos pantallas animadas, con texto y botones SIGUIENTE/SALTAR (Espacio avanza, Esc salta). (1) Don Cochino pasea a Bigote mirando el celular; Bigote hace caca y él sigue diciendo "…nadie me vio". (2) La vereda llena de cacas con moscas y olor; Rafa se asusta (!) y se presenta la misión. Música de susto en Mi menor armónica a 72 BPM (latido, trémolo, melodía lenta) y un golpe disonante en cada momento clave. Se muestra en la primera visita tras "TOCA PARA EMPEZAR" (el navegador exige un toque para sonar); después se puede repetir con el botón HISTORIA. | 0.4 |
| RF-19 | **Selección de personaje** en la pantalla inicial: tarjeta de Rafa (seleccionada) y dos tarjetas bloqueadas "???" para futuros personajes. Muestra la misión, el récord y los botones JUGAR, HISTORIA y COMPARTIR. | 0.4 |

## Historias de usuario

| ID | Historia | Aceptación relacionada |
|---|---|---|
| HU-01 | Como jugador, quiero entender qué hacer antes de comenzar para jugar sin instrucciones largas. | Portada con botón, objetivo y controles; RF-01/02. |
| HU-02 | Como jugador móvil, quiero saltar con una mano para esquivar los obstáculos. | Botón visible ≥44 px CSS de alto; RF-02/08. |
| HU-03 | Como jugador, quiero una dificultad creciente y sorpresiva, con partidas cortas e intensas. | RF-03/06/15/16; saltabilidad comprobada con simulación. |
| HU-04 | Como jugador, quiero conservar mi récord, ver un ranking y repetir rápidamente. | RF-04/05/14. |
| HU-05 | Como jugador, quiero atender otra app sin perder la partida. | Pausa por interrupción, reanudación explícita; RF-07. |
| HU-06 | Como jugador, quiero enviar el juego por WhatsApp. | Enlace público compartible y HTML autocontenido; RF-10/11. |
| HU-07 | Como propietario, quiero cambiar imágenes y ampliar el juego sin rehacer sus reglas. | Constantes de reglas agrupadas al inicio del script; sprites como texto editable. |
| HU-08 | Como jugador, quiero música con energía que acompañe la carrera y poder silenciarla. | RF-12/17. |
| HU-09 | Como jugador, quiero que pisar una caca sea gracioso y no solo un "game over". | RF-13. |
| HU-10 | Como jugador, quiero entender por qué hay cacas en la calle y cuál es mi misión. | RF-18. |
| HU-11 | Como jugador, quiero elegir con quién juego (por ahora Rafa) y saber que vendrán más. | RF-19. |

## Verificación

- Saltabilidad de la caca doble en el peor caso (44 + 16 + 44 px, alto 40): la ventana para saltar es de ≈450 ms a 300 px/s, ≈230 ms a 1200 px/s, ≈140 ms a 1800 px/s y ≈76 ms a 3000 px/s. Siempre es posible; a alta velocidad, humanamente muy difícil (intencional).
- Probado en navegador de computador con vista horizontal de teléfono (780×360) y vertical (375×812), y aprobado por el propietario en su teléfono antes de pasar a producción (2026-11-03). **Pendiente:** probar en más modelos (Android e iPhone).

## Requisitos no funcionales

- Renderizado objetivo 60 FPS en un móvil moderno; **pendiente de medir en dispositivos físicos**.
- Delta limitado a 100 ms y simulación en pasos de hasta 1/120 s. El tope de 3000 px/s evita atravesar cacas entre pasos.
- Controles HTML con nombres accesibles, foco visible, teclado y anuncios de cambio de estado. El juego depende de percepción visual y reflejos; no se afirma accesibilidad integral ni certificación WCAG.
- Cero recursos de terceros en runtime. Sin telemetría, cookies, login ni datos personales. Datos guardados solo en el navegador: récord, ranking (iniciales y puntaje), últimas iniciales, preferencia de sonido e historia vista.
- La foto de referencia del personaje no se incluye en el repositorio ni en el juego; solo se usó para diseñar el sprite.
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

Todo cambio funcional debe actualizar este documento, el [historial de cambios](../CHANGELOG.md), las pruebas afectadas y la versión.
