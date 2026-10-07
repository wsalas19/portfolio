---
title: "Barranquilla: el verde que ve el satélite no es el verde que se camina"
date: 2026-10-06
excerpt: "Medí la vegetación de las 7.761 manzanas de Barranquilla y la cruzé con el estrato socioeconómico. El satélite ve más verde donde vive la gente con menos recursos. Esa misma gente tiene menos verde a la mano. Este texto explica por qué las dos frases son ciertas a la vez."
tags: ["Barranquilla", "análisis espacial", "verde urbano", "datos abiertos"]
author: "William Salas"
---

Barranquilla es una ciudad verde. También es una ciudad desigual. Este trabajo mide las dos cosas al mismo tiempo, manzana por manzana, con imágenes satelitales y con las capas que publica la propia ciudad. El resultado es una contradicción. El satélite ve más verde donde vive la gente con menos recursos, pero esa gente tiene menos verde a la mano.

Las dos frases son ciertas. La diferencia está en qué cuenta como verde.

---

## El punto de partida: dos mapas que no coinciden

![Estrato socioeconómico y NDVI promedio por manzana, Barranquilla](/images/blog/barranquilla-verde-desigualdad-2026/01_estrato_y_ndvi.webp)

El mapa de la izquierda ordena las 7.761 manzanas de la ciudad por estrato. El azul claro es el estrato 1. El azul oscuro es el estrato 6. El estrato 1 ocupa casi todo el sur y el occidente: son 3.480 manzanas y 476.550 personas, cerca del 43% de la población de la ciudad.

El mapa de la derecha mide la vegetación. El verde oscuro significa más vegetación.

Los dos mapas no coinciden. La manzana promedio del estrato 1 tiene un NDVI de 0.27. La del estrato 6 tiene 0.18. Cuanto más pobre la manzana, más verde la ve el satélite.

Esa relación es débil, y no es nueva. Nuñez, Hoyos y Arellana (2023) compararon el NDVI entre grupos vulnerables y no vulnerables en Barranquilla, con otro sensor y la misma manzana censal. Encontraron diferencias marginales. Este trabajo llega al mismo punto y lo continúa.

> **Fuente y método.** La vegetación sale de Sentinel-2 (colección `S2_SR_HARMONIZED`), en composición de mediana sobre las estaciones secas de diciembre a marzo de 2023 y 2024, a 10 metros de resolución. El NDVI es `(B8 - B4) / (B8 + B4)`; los píxeles con nube, sombra o agua se enmascaran con la banda SCL. El estrato por manzana es la capa oficial de estratificación (2018). Todo se mide en el sistema de coordenadas nacional EPSG:9377. De 7.799 manzanas se analizan 7.761; 38 se excluyen por agua o por falta de dato. La relación entre estrato y NDVI por manzana tiene un coeficiente de Spearman de −0.183 (p = 2.1 × 10⁻⁵⁹).

## Dónde se concentra el verde?

![Conglomerados LISA de NDVI promedio](/images/blog/barranquilla-verde-desigualdad-2026/02_conglomerados_lisa.webp)

El mapa anterior muestra un promedio. No muestra si el patrón es real o si es casualidad. Un análisis de autocorrelación espacial responde esa pregunta: busca manzanas que se parecen a sus vecinas.

El resultado es claro. Hay un núcleo rojo y continuo en el centro-sur de la ciudad. Son 700 manzanas con vegetación alta rodeadas de manzanas igual de verdes. El estrato promedio de ese núcleo es 1.02. Hay además 959 manzanas azules con vegetación baja, también agrupadas. Su estrato promedio es 2.09.

El verde alto se agrupa en los barrios más pobres. El verde bajo también. La ciudad no se parte en dos mitades limpias.

> **Fuente y método.** Índice local de Moran (LISA) sobre el NDVI promedio por manzana, con 999 permutaciones. La contigüidad se calcula con 8 vecinos más cercanos y no por fronteras compartidas: las manzanas están separadas por el eje de la vía, así que el 97% no comparte borde con ninguna otra. Los valores p se corrigen por FDR al 5%. Alto-Alto significa una manzana verde entre vecinas verdes; Bajo-Bajo, lo contrario. El cruce completo de conglomerado contra estrato está en `lisa_cluster_by_stratum.csv`.

## Baldíos o parques?

![Suelo vegetado sin construir, por píxel de 10 m](/images/blog/barranquilla-verde-desigualdad-2026/03_verde_baldio.webp)

Un píxel verde no dice quién puede usar ese verde. El satélite mide vegetación. No distingue un parque de un lote vacío con maleza.

Para separarlos usé la cobertura del suelo:

- **Vegetado y sin construir.** Lotes vacíos, patios, orillas de arroyo. Verde desde la órbita, pero no es un lugar al que uno vaya.
- **Espacio público.** Parques, plazas y canchas.
- **Agua y humedal.** También verde desde la órbita. No es verde urbano.

El mapa de arriba colorea solo el suelo vegetado y sin construir, píxel por píxel. El color no es la manzana: es el baldío. Estrato 1 tiene 4.9% de su área en esa categoría. Estrato 2 tiene 0.85%. Ese es el verde espontáneo, y se concentra en el sur.

> **Fuente y método.** La cobertura del suelo es ESA WorldCover v200 (10 m, 2021). Cuentan como vegetado y sin construir las clases 10, 20, 30 y 40: árboles, arbustos, pastos y cultivos. El NDVI de la figura se calcula solo sobre esos píxeles, y solo dentro de manzanas del estudio. El raster cubre un rectángulo, y el rectángulo alrededor de Barranquilla incluye la Ciénaga, el río y el occidente rural: sin ese recorte, el 90% de los píxeles verdes del rectángulo están fuera del área de estudio.

![Suelo vegetado sin construir dentro del tejido urbano construido](/images/blog/barranquilla-verde-desigualdad-2026/04_verde_baldio_urbano.webp)

El mapa anterior usa todo el territorio municipal. Ese territorio incluye la Ciénaga, el río y el occidente rural. La ciudad donde vive la gente es más pequeña.

El segundo mapa limita el dibujo al tejido urbano continuo. El gris queda fuera. El resultado cambia de forma: casi todo el verde espontáneo aparece en manzanas pequeñas y dispersas del sur, no en grandes extensiones. Además, 44% de ese suelo está en solo 31 manzanas mayores de 5 hectáreas. No es un jardín. Es una franja periurbana.

> **Fuente y método.** El tejido urbano continuo se obtiene al unir todas las manzanas con un margen de 60 metros y quedarse con el componente conectado más grande. Así se descartan los fragmentos sueltos que arrastra el límite municipal. El umbral de 5 hectáreas está escrito en la figura porque el resultado depende de él: una manzana más grande que eso es borde o industria, no una manzana de ciudad.

## La distancia que sí importa

![Manzanas que llegan a verde plantado en 5 minutos a pie](/images/blog/barranquilla-verde-desigualdad-2026/05_caminata_verde.webp)

Un círculo de 400 metros en el mapa no es un paseo. Las personas caminan por calles, y las calles dan rodeos.

La diferencia es enorme. Si medimos con círculos, 89% de las manzanas del estrato 1 quedan "cubiertas" por algún espacio público. Si medimos caminando de verdad por la red de calles, solo 26% de esas manzanas llegan a verde plantado en 5 minutos. En el estrato 6 la cifra es 84%.

En toda la ciudad, 48% de las manzanas llegan a verde plantado en 5 minutos a pie. El estrato 1 es la excepción: los demás estratos están entre 56% y 84%.

> **Fuente y método.** El tiempo de viaje sale de la red de calles de OpenStreetMap, construida con OSMnx. Se modela una caminata a 4.8 km/h. "Verde plantado" es un espacio público oficial cuya vegetación supera un NDVI de 0.30 en su interior: de 370 espacios registrados, 262 son verdes y 108 son plazas duras. La comparación es entre la distancia euclidiana de 400 m y el tiempo real por la red. Las 160 manzanas que son ellas mismas el espacio público se dibujan con contorno negro y se excluyen del porcentaje, porque una caminata de cero minutos a un parque donde ya estás no es acceso.

## El verde de la persona promedio

![Verdor ponderado de tres formas, y cobertura del suelo no construido](/images/blog/barranquilla-verde-desigualdad-2026/06_verde_por_persona.webp)

Los promedios por manzana pesan igual una manzana con 30 habitantes que una con 3.000. Para saber qué verde tiene la persona promedio, hay que pesar por población.

El resultado mantiene la contradicción. La persona promedio del estrato 1 vive en una manzana con NDVI 0.28. La del estrato 6, con 0.16. Otra vez: más verde alrededor en los estratos bajos.

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

> **Fuente y método.** La población por manzana es el censo de 2018 de la ciudad, con estimación modelada de WorldPop donde el censo no llega. El NDVI ponderado por población reparte el valor de cada manzana entre sus habitantes: la manzana con 3.000 personas pesa cien veces más que la de 30. El panel derecho muestra la proporción del área de cada estrato que es suelo vegetado y sin construir, agua o suelo desnudo. Lo construido se omite porque es cerca del 97% de todos los estratos y aplastaría las tres barras.

## Los niños

![Residentes menores de diez años y acceso a verde plantado, por estrato](/images/blog/barranquilla-verde-desigualdad-2026/07_ninos_y_verde.webp)

Los menores de diez años son el 17.4% de la población del estrato 1 y el 9.3% del estrato 6. Viven donde está el verde del satélite y donde no está el verde usable.

El espacio público por niño es 1.55 m² en el estrato 1 y 26.08 m² en el estrato 4. Es una diferencia de casi 17 veces. Es mayor que la diferencia por habitante porque los estratos bajos tienen más niños por residente **y** menos espacio por residente.

Los niños también caminan peor. De todos los niños de la ciudad, 45.9% llegan a verde plantado en 5 minutos a pie. Entre las manzanas, la cifra general es 49.7%.

> **Fuente y método.** La proporción de menores de diez años sale de la banda de edad 0 a 9 del censo de 2018, dividida entre la población total de cada manzana. Se calcula manzana por manzana y luego se agrega por estrato, para que una manzana de 30 personas no pese lo mismo que una de 3.000. La proporción de niños crece hacia el sur de la ciudad (Spearman −0.29 contra la coordenada norte) y el estrato crece hacia el norte (+0.40). El porcentaje de acceso de los niños pondera cada manzana por su población infantil, no por su área; los 49.7% del texto son el promedio por manzana y por eso no son exactamente comparables.

## Los arroyos: la decisión de la ciudad

![Red de arroyos sobre el estrato que atraviesa](/images/blog/barranquilla-verde-desigualdad-2026/08_arroyos.webp)

Un arroyo no es un río. Es un canal de aguas de lluvia. Cuando no está canalizado, el agua corre por la calle cuando llueve. Ese es el riesgo, y se puede ver.

El mapa muestra la red de arroyos sobre el estrato que atraviesa. El rojo es un canal abierto. El negro es un canal cubierto o canalizado.

El resultado es el más contundente de este trabajo:

- 90% del arroyo abierto de la ciudad pasa por el estrato 1. Son 56 de los 62 km.
- El estrato 1 concentra 54% de toda la red, esté abierta o no.
- La proporción de canales atendidos sube con el estrato: 62% en el estrato 1, 85% en el 2, 99% en el 3, y 100% en los estratos 4, 5 y 6.

La ciudad ha resuelto el riesgo donde está el dinero. También hay obra en curso: 4.34 km en ejecución en el estrato 1 y 0.20 km en el estrato 2. En el resto, ninguna.

> **Fuente y método.** La red y su estado son el levantamiento de arroyos de la ciudad, con el campo `estado` de cada canal. Cuentan como atendidos los estados `Canalizado_abierto`, `Canalizado_cerrado`, `Canalizado_natural` y `Viacanal`; `No_canalizado` no lo está. Los kilómetros se atribuyen a la manzana que el canal atraviesa. Esta es la única capa del trabajo que mide una **decisión** de la ciudad y no una condición del terreno.

## Limitaciones

Estos datos tienen límites. Los enumero porque un mapa sin límites declarados invita a leerlo de más.

- **El espacio público solo cuenta lo registrado.** La capa de espacio público efectivo no incluye patios privados, antejardines ni lotes cerrados, aunque sean verdes y aunque la gente los use.
- **La comparación por estrato tiene seis puntos.** Las diferencias entre estratos son descriptivas. No son una prueba de causa.
- **No hay datos de inundaciones.** La idea de que el efecto de un arroyo abierto es peor en los estratos bajos es razonable. No la puedo probar con estas capas, porque no hay registro de daños ni de inundaciones.
- **La capa de arroyos no tiene fechas.** El estado actual muestra dónde está el riesgo hoy. No muestra en qué orden la ciudad hizo las obras, así que no puedo afirmar quién fue atendido primero.
- **Las capas son de años distintos.** El estrato y el censo son de 2018, el NDVI de 2023 y 2024, y el inventario de árboles de 2017.
- **El verde bajo no es solo de barrios ricos.** Los 959 bloques de vegetación baja tienen estrato promedio 2.09. La falta de verde también existe dentro de los barrios pobres.

## Conclusión

La contradicción del principio se sostiene, y ahora sé por qué.

El satélite ve más vegetación en los barrios pobres de Barranquilla. Esa vegetación es, en buena parte, suelo sin construir: lotes vacíos, patios, orillas. Cuenta como verde desde la órbita y no es un lugar donde un niño juegue.

Cuando se mide lo que sí se puede usar, el orden se invierte. El espacio público efectivo por habitante, el acceso caminando y el verde plantado a cinco minutos favorecen a los estratos altos. El estrato 1 queda solo en el último lugar en los tres, y en los arroyos abiertos queda muy por encima del resto.

El mapa no mide el color de la ciudad. Mide quién puede usarla.

## Fuentes

- **Nuñez, Hoyos y Arellana (2023).** «High land surface temperatures (LSTs) disproportionately affect vulnerable socioeconomic groups in Barranquilla, Colombia», *Urban Climate* 52: 101757. Antecedente directo de este trabajo: misma ciudad, misma manzana censal y la misma pregunta al revés, desde el calor en lugar del verde. Su área de estudio es la conurbación Barranquilla–Soledad; la de este trabajo es Barranquilla sola. [Artículo en Elsevier](https://doi.org/10.1016/j.uclim.2023.101757)
- **Sentinel-2 L2A** (`COPERNICUS/S2_SR_HARMONIZED`) — composición de mediana de las estaciones secas 2023–2024, 10 m de resolución. De aquí sale el NDVI de todas las figuras. [Catálogo de Google Earth Engine](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)
- **ESA WorldCover v200** — cobertura del suelo a 10 m, versión de 2021. Separa el verde construido del verde espontáneo (figuras 3 y 4) y el agua del suelo desnudo. [esa-worldcover.org](https://esa-worldcover.org/en)
- **WorldPop** — estimación modelada de población donde el censo de 2018 no llega. [worldpop.org](https://www.worldpop.org/)
- **Portal Mi Ciudad** (Gerencia de Gestión Catastral) — de aquí salen cuatro de las capas de este trabajo: la estratificación socioeconómica por manzana, el censo de población de 2018, el Espacio Público Efectivo con corredores verdes y la red de arroyos con su estado de canalización. [miciudad.barranquilla.gov.co](https://miciudad.barranquilla.gov.co/) · [Servicio ArcGIS de las capas](https://services3.arcgis.com/oGYAc07w6wsvgUYr/arcgis/rest/services)
- **Inventario de árboles en espacio público, 2017** — silvicultura urbana del Distrito. [Barranquilla Verde](https://barranquillaverde.gov.co/)
- **Red vial de OpenStreetMap** — sobre ella se calcula el tiempo real de caminata de la figura 5. [openstreetmap.org](https://www.openstreetmap.org/) · [OSMnx](https://github.com/gboeing/osmnx)
- **Imágenes a nivel de calle de Mapillary** — índice de vista verde. [mapillary.com](https://www.mapillary.com/)
- **Repositorio `green-bq`** — código, figuras y tablas de resultados. Sin URL pública todavía.
