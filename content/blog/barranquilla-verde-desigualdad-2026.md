---
title: "Barranquilla: el verde que ve el satélite no es el verde que se camina"
date: 2026-10-06
excerpt: "Medí la vegetación de las 7.761 manzanas de Barranquilla y la crucé con el estrato socioeconómico. El satélite ve más verde donde vive la gente con menos recursos. Esa misma gente tiene menos verde a la mano. Este texto explica por qué las dos frases son ciertas a la vez."
tags: ["Barranquilla", "análisis espacial", "verde urbano", "datos abiertos"]
author: "William Salas"
---

Barranquilla es una ciudad verde y también es una ciudad desigual. Este trabajo mide las dos cosas a la vez, manzana por manzana, con imágenes de satélite y con los datos que publica la propia ciudad. Y encuentra una contradicción: el satélite ve más verde donde vive la gente con menos recursos, pero esa misma gente tiene menos verde a la mano.

Las dos frases son ciertas. La diferencia radica en qué cuenta como verde.

---

## El punto de partida: dos mapas que no coinciden

![Estrato socioeconómico y NDVI promedio por manzana, Barranquilla](/images/blog/barranquilla-verde-desigualdad-2026/01_estrato_y_ndvi.webp)

El mapa de la izquierda ordena las 7.761 manzanas de la ciudad por estrato. El azul claro es el estrato 1 y el azul oscuro es el estrato 6. El estrato 1 ocupa casi todo el sur y el occidente: son 3.480 manzanas y 476.550 personas, cerca del 43% de la ciudad. El punto negro marca la Plaza de la Paz, para que pueda ubicarse.

El mapa de la derecha mide la vegetación. Más verde oscuro significa más vegetación.

Los dos mapas no coinciden. La manzana promedio del estrato 1 tiene un NDVI de 0.27. La del estrato 6 tiene 0.18. Cuanto más pobre la manzana, más verde la ve el satélite.

Esa relación es débil, y no es nueva. Nuñez, Hoyos y Arellana (2023) compararon el verde entre grupos vulnerables y no vulnerables en Barranquilla, con otro satélite y la misma manzana del censo. Encontraron diferencias mínimas. Este trabajo llega al mismo punto y sigue desde ahí.

> **Fuente y método.** El verde sale de imágenes Sentinel-2 de las estaciones secas de 2023 y 2024, a 10 metros por píxel. El NDVI es una medida estándar de vegetación: va de 0 a 1 y sube con la cantidad de plantas verdes. El estrato por manzana es la capa oficial de 2018. De 7.799 manzanas se analizan 7.761; 38 quedan fuera por agua o por falta de dato.

## ¿Dónde se concentra el verde?

![Conglomerados LISA de NDVI promedio](/images/blog/barranquilla-verde-desigualdad-2026/02_conglomerados_lisa.webp)

Un promedio no dice si el patrón es real o es casualidad. Este segundo mapa busca manzanas que se parecen a sus vecinas, y con eso responde la pregunta.

El resultado es claro. Hay un núcleo rojo y continuo en el centro-sur: 700 manzanas verdes rodeadas de manzanas igual de verdes. El estrato promedio de ese núcleo es 1.02. También hay 959 manzanas azules de poca vegetación, igual de agrupadas, con estrato promedio 2.09.

El verde alto se agrupa en los barrios más pobres. El verde bajo también. La ciudad no se parte en dos mitades limpias.

> **Fuente y método.** Es un índice de Moran local (LISA): mide si una manzana se parece a las que la rodean, con 999 simulaciones para descartar la casualidad. Rojo = verde alto entre vecinos verdes; azul = lo contrario. La tabla completa por estrato está en `lisa_cluster_by_stratum.csv`.

## ¿Baldíos o parques?

![Suelo vegetado sin construir, por píxel de 10 m](/images/blog/barranquilla-verde-desigualdad-2026/03_verde_baldio.webp)

Un píxel verde no dice quién puede usar ese verde. El satélite mide vegetación, y no distingue un parque de un lote vacío con maleza.

Para separarlos usé la cobertura del suelo:

- **Vegetado y sin construir.** Lotes vacíos, patios, orillas de arroyo. Verde desde arriba, pero no es un lugar a donde uno vaya.
- **Espacio público.** Parques, plazas y canchas.
- **Agua y humedal.** También verde desde arriba. No es verde urbano.

Este mapa colorea solo el suelo vegetado y sin construir, píxel por píxel. El color no marca la manzana: marca el baldío. El estrato 1 tiene el 4.9% de su área en esa categoría; el estrato 2, el 0.85%. Ese es el verde espontáneo, y se concentra en el sur.

Un estudio reciente de la Universidad del Norte llega a la misma idea desde otro ángulo. Rastreó una rana invasora por toda la ciudad y encontró que solo vive en los estratos 4, 5 y 6, donde hay zonas verdes cuidadas. El verde que mide el satélite no explicaba dónde estaba la rana. El cuidado del espacio, sí.

> **Fuente y método.** La cobertura del suelo es ESA WorldCover (2021, 10 m). Cuenta como vegetado lo que el satélite clasifica como árboles, arbustos, pastos y cultivos. El mapa recorta al área de estudio: sin ese recorte, el río y la Ciénaga aparecerían como "verde".

![Suelo vegetado sin construir dentro del tejido urbano construido](/images/blog/barranquilla-verde-desigualdad-2026/04_verde_baldio_urbano.webp)

El mapa anterior usa todo el territorio del municipio, que incluye la Ciénaga, el río y el occidente rural. La ciudad donde vive la gente es más pequeña.

Este segundo mapa se limita a la ciudad construida. El gris queda fuera. El resultado cambia: casi todo el verde espontáneo aparece en manzanas pequeñas y dispersas del sur, no en grandes extensiones. Además, el 44% de ese suelo está en solo 31 manzanas de más de 5 hectáreas. No es un jardín. Es una franja de las afueras.

> **Fuente y método.** "Ciudad construida" es la mancha urbana continua, sin los fragmentos sueltos que arrastra el límite del municipio. El corte de 5 hectáreas está en la figura porque el resultado depende de él: una manzana más grande es borde o industria, no una manzana de ciudad.

## La distancia que sí importa

![Manzanas que llegan a verde plantado en 5 minutos a pie](/images/blog/barranquilla-verde-desigualdad-2026/05_caminata_verde.webp)

Un círculo de 400 metros en un mapa no es un paseo. La gente camina por calles, y las calles dan vueltas.

La diferencia es enorme. Medida con círculos, el 89% de las manzanas del estrato 1 quedan "cubiertas" por algún espacio público. Medida caminando de verdad por las calles, solo el 26% llegan a verde plantado en 5 minutos. En el estrato 6 la cifra es 84%.

En toda la ciudad, el 48% de las manzanas llegan a verde plantado en 5 minutos a pie. El estrato 1 es la excepción: los demás están entre el 56% y el 84%.

> **Fuente y método.** El tiempo de caminata sale de las calles de OpenStreetMap, a 4.8 km/h. "Verde plantado" es un espacio público oficial con vegetación de verdad: de 370 espacios, 262 son verdes y 108 son plazas duras. Las 160 manzanas que ya son el espacio público se marcan aparte, porque estar parado en un parque no es tener acceso a uno.

## El verde de la persona promedio

![Verdor ponderado de tres formas, y cobertura del suelo no construido](/images/blog/barranquilla-verde-desigualdad-2026/06_verde_por_persona.webp)

Los promedios por manzana tratan igual a una manzana de 30 habitantes y a una de 3.000. Para saber qué verde tiene la persona promedio, hay que pesar por población.

El resultado mantiene la contradicción. La persona promedio del estrato 1 vive en una manzana con NDVI 0.28; la del estrato 6, con 0.16. Otra vez: más verde alrededor en los estratos bajos.

Pero el verde alrededor no es espacio público. El espacio público efectivo por habitante cuenta otra historia:

| Estrato | Espacio público por habitante |
| --- | --- |
| 1 | 0.27 m² |
| 2 | 0.23 m² |
| 3 | 0.40 m² |
| 4 | 2.54 m² |
| 5 | 2.21 m² |
| 6 | 2.05 m² |

El corte está entre los estratos 3 y 4. Una persona del estrato 4 tiene casi 9 veces más espacio público que una del estrato 1.

> **Fuente y método.** La población por manzana es el censo de 2018, con estimación de WorldPop donde el censo no llega. Pesar por población significa que la manzana de 3.000 personas cuenta cien veces más que la de 30.

## Los niños

![Residentes menores de diez años y acceso a verde plantado, por estrato](/images/blog/barranquilla-verde-desigualdad-2026/07_ninos_y_verde.webp)

Los menores de diez años son el 17.4% de la población del estrato 1 y el 9.3% del estrato 6. Viven donde está el verde del satélite y donde no está el verde que se puede usar.

El espacio público por niño es de 1.55 m² en el estrato 1 y de 26.08 m² en el estrato 4: casi 17 veces más. La diferencia es mayor que la de por habitante porque los estratos bajos tienen más niños por persona **y** menos espacio por persona.

Los niños también caminan peor. De todos los niños de la ciudad, el 45.9% llegan a verde plantado en 5 minutos a pie.

> **Fuente y método.** La proporción de menores de diez años sale del censo de 2018 (edades de 0 a 9). Se calcula manzana por manzana y luego se suma por estrato, para que una manzana pequeña no pese lo mismo que una grande. Los niños se concentran en el sur de la ciudad; el estrato, en el norte.

## Los arroyos: la decisión de la ciudad

![Red de arroyos sobre el estrato que atraviesa](/images/blog/barranquilla-verde-desigualdad-2026/08_arroyos.webp)

Un arroyo no es un río. Es un canal de agua de lluvia. Cuando no está canalizado, el agua corre por la calle cuando llueve. Ese es el riesgo, y se puede ver en el mapa.

El rojo es un canal abierto. El negro es un canal cubierto o canalizado. El resultado es el más contundente de este trabajo:

- El 90% del arroyo abierto de la ciudad pasa por el estrato 1. Son 56 de los 62 km.
- El estrato 1 concentra el 54% de toda la red, esté abierta o no.
- La proporción de canales ya atendidos sube con el estrato: 62% en el 1, 85% en el 2, 99% en el 3, y 100% en los estratos 4, 5 y 6.

La ciudad ha resuelto el riesgo donde está el dinero. También hay obra en curso: 4.34 km en el estrato 1 y 0.20 km en el estrato 2. En el resto, nada.

> **Fuente y método.** La red y su estado son el levantamiento de arroyos de la ciudad. Cuentan como atendidos los canales cubiertos o canalizados. Esta es la única capa del trabajo que mide una **decisión** de la ciudad y no una condición del terreno.

## Limitaciones

Estos datos tienen límites. Los enumero porque un mapa sin límites declarados invita a leerlo de más.

- **El espacio público solo cuenta lo registrado.** La capa oficial no incluye patios privados, antejardines ni lotes cerrados, aunque sean verdes y la gente los use.
- **La comparación por estrato tiene seis puntos.** Las diferencias entre estratos son descriptivas. No prueban causa.
- **No hay datos de inundaciones.** Que el efecto de un arroyo abierto sea peor en los estratos bajos es razonable, pero no lo puedo probar: no hay registro de daños.
- **La capa de arroyos no tiene fechas.** Muestra dónde está el riesgo hoy, no en qué orden la ciudad hizo las obras. No puedo afirmar a quién atendió primero.
- **Las capas son de años distintos.** El estrato y el censo son de 2018; el verde, de 2023 y 2024.
- **El verde bajo no es solo de barrios ricos.** Las 959 manzanas de poca vegetación tienen estrato promedio 2.09. La falta de verde también existe dentro de los barrios pobres.

## Conclusión

La contradicción del principio se sostiene, y ahora sé por qué.

El satélite ve más vegetación en los barrios pobres de Barranquilla. Esa vegetación es, en buena parte, suelo sin construir: lotes vacíos, patios, orillas. Cuenta como verde desde arriba y no es un lugar donde un niño juegue.

Cuando se mide lo que sí se puede usar, el orden se invierte. El espacio público por habitante, el acceso caminando y el verde plantado a cinco minutos favorecen a los estratos altos. El estrato 1 queda último en los tres, y en los arroyos abiertos queda muy por encima del resto.

El mapa no mide el color de la ciudad. Mide quién puede usarla.

## Fuentes

- **Nuñez, Hoyos y Arellana (2023).** «High land surface temperatures (LSTs) disproportionately affect vulnerable socioeconomic groups in Barranquilla, Colombia», *Urban Climate* 52: 101757. Antecedente directo de este trabajo: misma ciudad, misma manzana censal y la misma pregunta al revés, desde el calor en lugar del verde. Su área de estudio es la conurbación Barranquilla–Soledad; la de este trabajo es Barranquilla sola. [Artículo en Elsevier](https://doi.org/10.1016/j.uclim.2023.101757)
- **Bustamante-Narváez et al. (2026).** «Socioeconomic Barriers Shape the Urban Distribution of an Invasive Frog: A Case Study from Barranquilla, Colombia», *Research Square* (preprint). Universidad del Norte. Confirma desde la ecología lo que este trabajo encuentra desde el satélite: el NDVI no distingue el verde cuidado del verde cualquiera. [Preprint](https://doi.org/10.21203/rs.3.rs-9476737/v1)
- **Sentinel-2 L2A** (`COPERNICUS/S2_SR_HARMONIZED`) — composición de mediana de las estaciones secas 2023–2024, 10 m de resolución. De aquí sale el NDVI de todas las figuras. [Catálogo de Google Earth Engine](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)
- **ESA WorldCover v200** — cobertura del suelo a 10 m, versión de 2021. Separa el verde construido del verde espontáneo (figuras 3 y 4) y el agua del suelo desnudo. [esa-worldcover.org](https://esa-worldcover.org/en)
- **WorldPop** — estimación modelada de población donde el censo de 2018 no llega. [worldpop.org](https://www.worldpop.org/)
- **Portal Mi Ciudad** (Gerencia de Gestión Catastral) — de aquí salen cuatro de las capas de este trabajo: la estratificación socioeconómica por manzana, el censo de población de 2018, el Espacio Público Efectivo con corredores verdes y la red de arroyos con su estado de canalización. [miciudad.barranquilla.gov.co](https://miciudad.barranquilla.gov.co/) · [Servicio ArcGIS de las capas](https://services3.arcgis.com/oGYAc07w6wsvgUYr/arcgis/rest/services)
- **Inventario de árboles en espacio público, 2017** — silvicultura urbana del Distrito. [Barranquilla Verde](https://barranquillaverde.gov.co/)
- **Red vial de OpenStreetMap** — sobre ella se calcula el tiempo real de caminata de la figura 5. [openstreetmap.org](https://www.openstreetmap.org/) · [OSMnx](https://github.com/gboeing/osmnx)
- **Imágenes a nivel de calle de Mapillary** — índice de vista verde. [mapillary.com](https://www.mapillary.com/)
- **Repositorio `green-bq`** — código, figuras y tablas de resultados. Sin URL pública todavía.
