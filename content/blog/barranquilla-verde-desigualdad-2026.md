---
title: "El equipamiento natural de Barranquilla: qué puede usar cada habitante"
date: 2026-10-08
excerpt: "Una ciudad es el equipo que sus habitantes pueden usar. Medí el verde de las 7.761 manzanas de Barranquilla y lo crucé con el estrato. El satélite ve más verde donde vive la gente con menos recursos. Esa misma gente tiene menos verde al que entrar."
tags: ["Barranquilla", "análisis espacial", "equipamiento urbano", "datos abiertos"]
author: "William Salas"
---

Una ciudad se mide por su equipo. Las vías, los colegios, los hospitales y los parques son lo que una ciudad le entrega a quien vive en ella. Sin equipo, una ciudad es solo un montón de casas juntas.

El verde también es equipo. Un parque, un bulevar arbolado y una cancha con sombra son **equipamiento natural**: infraestructura que la ciudad pone al servicio de sus habitantes. Un lote vacío con maleza no es equipo. Nadie lo usa.

Este trabajo mide el equipamiento natural de Barranquilla, manzana por manzana, con imágenes de satélite y con los datos que publica la propia ciudad. La pregunta es una sola: **¿qué calidad de equipo natural recibe cada habitante?**

---

## Un mapa, tres respuestas

![](/images/blog/barranquilla-verde-desigualdad-2026/09_00-verde-de-papel.webp)

Este mapa resume el trabajo entero. Cada una de las 7.761 manzanas de la ciudad cae en una de tres clases.

**Verde oscuro: verde que se camina.** Se llega a un espacio público con vegetación en cinco minutos a pie.

**Naranja: verde de papel.** El satélite ve vegetación. Pero no hay a dónde caminar.

**Gris: sin verde.** Ni se camina ni se ve desde arriba.

El naranja es el hallazgo. En el estrato 1 cubre el **46%** de las manzanas. En el estrato 6, apenas el **3%**.

El verde que sí se camina sigue la línea contraria. En el estrato 1, solo el **26%** de las manzanas llegan a verde plantado en cinco minutos a pie. En el estrato 6, el **84%**.

Barranquilla no reparte su equipamiento natural por igual. Y no es que le falte verde. Es que el verde no está donde la gente puede entrar.

El mapa se dibuja sobre la mancha urbana continua. El resto del municipio aparece en las fuentes y en el repositorio.

> **Fuente y método.** El verde de papel es la manzana sin acceso a pie a verde plantado en cinco minutos, pero con NDVI igual o mayor a la mediana de la ciudad (0.23). El verde que se camina usa las calles de OpenStreetMap a 4.8 km/h. La clasificación tiene un corte, la mediana, y la cifra depende de él.

## Cantidad no es calidad

El satélite mide vegetación y nada más. No distingue un parque de un lote vacío con maleza. Por eso el NDVI de una manzana pobre puede ser alto sin que esa manzana tenga un solo banco.

Los números lo confirman. La manzana promedio del estrato 1 tiene un NDVI de 0.27. La del estrato 6 tiene 0.18. Pesa más la vegetación en los barrios pobres.

Pero esa vegetación es, en buena parte, suelo sin construir. El estrato 1 tiene el **4.9%** de su área en esa categoría. El estrato 2 tiene el **0.85%**. Es verde espontáneo: lotes, patios y orillas. Verde de arriba, sin puerta de entrada.

Un estudio de la Universidad del Norte llegó a la misma idea desde la biología. Rastreó una rana invasora por toda la ciudad. La rana solo vive en los estratos 4, 5 y 6, donde hay zonas verdes cuidadas. El verde que mide el satélite no explicaba dónde estaba la rana. El cuidado del espacio, sí.

La lección es la misma en los dos casos. El NDVI mide cantidad. Un habitante necesita calidad.

## El espacio público, medido por persona

Los promedios por manzana tratan igual a una manzana de 30 habitantes y a una de 3.000. Para saber qué equipo tiene la persona promedio, hay que pesar por población. Este es el resultado:

| Estrato | Espacio público por habitante |
| --- | --- |
| 1 | 0.27 m² |
| 2 | 0.23 m² |
| 3 | 0.40 m² |
| 4 | 2.54 m² |
| 5 | 2.21 m² |
| 6 | 2.05 m² |

El corte está entre los estratos 3 y 4. Una persona del estrato 4 tiene casi nueve veces más espacio público que una del estrato 1.

> **Fuente y método.** La población por manzana es el censo de 2018, con estimación de WorldPop donde el censo no llega. Pesar por población significa que la manzana de 3.000 personas cuenta cien veces más que la de 30.

## El riesgo también es equipo

![Red de arroyos sobre el estrato que atraviesa](/images/blog/barranquilla-verde-desigualdad-2026/08_arroyos.webp)

Un arroyo no es un río. Es un canal de agua de lluvia. Cuando no está canalizado, el agua corre por la calle cuando llueve.

El rojo es un canal abierto. El negro es un canal cubierto o canalizado. El resultado es el más contundente de este trabajo:

- El **90%** del arroyo abierto de la ciudad pasa por el estrato 1. Son 56 de los 62 km.
- El estrato 1 concentra el 54% de toda la red, esté abierta o no.
- La proporción de canales ya atendidos sube con el estrato: 62% en el 1, 85% en el 2, 99% en el 3, y 100% en los estratos 4, 5 y 6.

Un canal abierto no es solo un riesgo. También es equipo que falta. Donde la ciudad no canalizó, tampoco hay andén, ni arboleda, ni paso seguro.

Y el riesgo es real, no retórico. El estudio de amenaza por inundación de la ciudad coincide con este mapa: de las 470 manzanas que la ciudad marca en amenaza alta, **458 son estrato 1**. En los estratos 4, 5 y 6 no hay ninguna.

> **Fuente y método.** La red y su estado son el levantamiento de arroyos de la ciudad. Cuentan como atendidos los canales cubiertos o canalizados. Esta es la única capa del trabajo que mide una **decisión** de la ciudad y no una condición del terreno. El cruce con la amenaza de inundación usa el estudio de 2024 del portal de la ciudad.

## Los niños: el futuro de la ciudad y del Caribe

![Residentes menores de diez años y acceso a verde plantado, por estrato](/images/blog/barranquilla-verde-desigualdad-2026/07_ninos_y_verde.webp)

Barranquilla es la ciudad más grande de la costa Caribe colombiana. Lo que pase con sus niños marca lo que pase con la región. Y la ciudad de 2050 la van a construir los niños que hoy tienen menos de diez años.

Esos niños son el **17.4%** de la población del estrato 1. En el estrato 6 son el 9.3%. La ciudad más joven está en la parte de la ciudad con menos equipo.

El espacio público por niño es de **1.55 m²** en el estrato 1 y de **26.08 m²** en el estrato 4. Casi diecisiete veces más. La diferencia es mayor que la de por habitante, porque los estratos bajos tienen más niños por persona **y** menos espacio por persona.

Los niños también caminan peor. De todos los niños de la ciudad, solo el **45.9%** llegan a verde plantado en cinco minutos a pie.

Aquí está el punto. Un niño que crece sin un parque cerca no aprende a usar la ciudad. En veinte años, esa costumbre se convierte en una ciudad que nadie cuida. El déficit de hoy es la ciudad de 2050.

> **Fuente y método.** La proporción de menores de diez años sale del censo de 2018 (edades de 0 a 9). Se calcula manzana por manzana y luego se suma por estrato, para que una manzana pequeña no pese lo mismo que una grande. Los niños se concentran en el sur de la ciudad. El estrato, en el norte.

## Limitaciones

Estos datos tienen límites. Los enumero porque un mapa sin límites declarados invita a leerlo de más.

- **El espacio público solo cuenta lo registrado.** La capa oficial no incluye patios privados, antejardines ni lotes cerrados, aunque sean verdes y la gente los use.
- **La comparación por estrato tiene seis puntos.** Las diferencias entre estratos son descriptivas. No prueban causa.
- **La capa de arroyos no tiene fechas.** Muestra dónde está el riesgo hoy, no en qué orden la ciudad hizo las obras. No puedo afirmar a quién atendió primero. Busqué la fecha en tres fuentes y ninguna la da. El registro de parques trae fecha de inauguración, pero solo para 49 de 533 parques. Los contratos de SECOP II tienen fecha, pero no tienen geometría. Y la capa de obra vial del portal es de 2019 y no es de canalización de arroyos.
- **Las capas son de años distintos.** El estrato y el censo son de 2018. El verde, de 2023 y 2024.
- **El verde bajo no es solo de barrios ricos.** Las 959 manzanas de poca vegetación tienen estrato promedio 2.09. La falta de verde también existe dentro de los barrios pobres.

## Conclusión

Barranquilla tiene verde. El satélite lo confirma, y lo encuentra sobre todo en los barrios pobres.

Pero ese verde no es equipo. Es suelo sin construir: lotes, patios y orillas. Cuenta desde arriba y no sirve para nada desde la calle.

Cuando se mide lo que un habitante puede usar, el orden se invierte. El espacio público por persona, el acceso a pie y el verde plantado a cinco minutos favorecen a los estratos altos. El estrato 1 queda último en los tres. Y en los arroyos abiertos queda muy por encima del resto, con el 90% del canal sin canalizar y con 458 de las 470 manzanas de amenaza alta.

El problema no es de color. Es de equipo. Una ciudad que deja a sus niños sin parque les pasa la cuenta por adelantado.

## Fuentes

- **Nuñez, Hoyos y Arellana (2023).** «High land surface temperatures (LSTs) disproportionately affect vulnerable socioeconomic groups in Barranquilla, Colombia», *Urban Climate* 52: 101757. Misma ciudad, misma manzana censal, y la pregunta al revés: el calor en lugar del verde. [Artículo en Elsevier](https://doi.org/10.1016/j.uclim.2023.101757)
- **Bustamante-Narváez et al. (2026).** «Socioeconomic Barriers Shape the Urban Distribution of an Invasive Frog: A Case Study from Barranquilla, Colombia», *Research Square* (preprint). Universidad del Norte. Confirma desde la ecología que el NDVI no distingue el verde cuidado del verde cualquiera. [Preprint](https://doi.org/10.21203/rs.3.rs-9476737/v1)
- **Sentinel-2 L2A** (`COPERNICUS/S2_SR_HARMONIZED`) — mediana de las estaciones secas 2023–2024, 10 m. De aquí sale todo el NDVI. [Catálogo](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)
- **ESA WorldCover v200** — cobertura del suelo a 10 m, 2021. Separa el verde plantado del espontáneo. [esa-worldcover.org](https://esa-worldcover.org/en)
- **Portal Mi Ciudad** (Gerencia de Gestión Catastral) — la estratificación por manzana, el censo de 2018, el Espacio Público Efectivo con corredores verdes y la red de arroyos con su estado. [miciudad.barranquilla.gov.co](https://miciudad.barranquilla.gov.co/) · [Servicio ArcGIS](https://services3.arcgis.com/oGYAc07w6wsvgUYr/arcgis/rest/services)
- **Estudio de amenaza por inundación, 2024** — nivel de amenaza (alta, media, baja) y clase de profundidad. [Ver capa](https://services3.arcgis.com/oGYAc07w6wsvgUYr/arcgis/rest/services/completa_AMENAZA_INUNDACI%C3%93N_ESTUDIO_2024/FeatureServer/0)
- **Red vial de OpenStreetMap** — sobre ella se calcula el tiempo real de caminata. [openstreetmap.org](https://www.openstreetmap.org/) · [OSMnx](https://github.com/gboeing/osmnx)
- **Repositorio `green-bq`** — código, figuras y tablas de resultados. El código está bajo licencia MIT. El texto y las figuras son de uso reservado, y se pueden citar y reproducir con atribución. [github.com/wsalas19/green-bq](https://github.com/wsalas19/green-bq)
