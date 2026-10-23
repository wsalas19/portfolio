---
title: "PHP2Shell en Colombia: 48 sitios ya tenían el parche y 36 no podrán tenerlo"
date: "2026-10-23"
excerpt: "Medí 610 dominios del Estado colombiano y 300 subdominios dos días después de PHP2Shell. El 46% de los que publican su versión de PHP ya había actualizado. Otros 36 corren ramas que ya no reciben parches."
tags: ["Seguridad", "PHP", "Colombia", "Infraestructura", "Datos abiertos"]
author: "William Salas"
---

El 21 de octubre de 2026, el proyecto PHP lanzó parches de emergencia para dos vulnerabilidades que permiten ejecutar código en cualquier servidor PHP sin autenticarse. Las dos tienen CVSS 9.2. El embargo se rompió un día antes y watchTowr reportó explotación activa.

Dos días después medí 610 dominios del Estado colombiano y una muestra de 300 subdominios. Hice una petición HTTP a cada uno y guardé las cabeceras. Sin escáner y sin exploit. El resultado principal: de los sitios que publican su versión de PHP, el 46% ya había instalado el parche.

---

## Qué es PHP2Shell

CVE-2026-109618 y CVE-2026-109619 comparten causa. PHP puede dejar la memoria corrupta cuando una petición termina de forma anormal, y la siguiente petición en el mismo worker usa datos que ya se liberaron.

* **109618** se activa con una petición multipart, el formato de cualquier formulario de contacto o de subida de archivos.
* **109619** aprovecha una ruta que está activa por defecto y no necesita que la aplicación llame a `session_start()`.

Las versiones con parche son 8.5.12, 8.4.27, 8.3.36 y 8.2.35. En `mod_php` de Apache el ataque se ejecuta antes del código de la aplicación, así que el middleware y la validación de entrada no participan.

---

## Cómo se midió?

Tomé 2.530 hostnames de los registros de Certificate Transparency para `.gov.co`, los reduje a 610 dominios base y añadí 300 subdominios de una lista de 704, priorizando los prefijos sensibles (`preprod`, `test`, `dev`, `admin`, `api`). Pedí la portada de cada host una sola vez con un user agent normal de navegador. No probé rutas ni envié payloads.

Un servidor solo publica su versión de PHP por la cabecera `X-Powered-By`:

```bash
curl -sI https://example.gov.co | grep -i "x-powered-by"
# X-Powered-By: PHP/8.4.17
```

Eso es todo el paso de detección. No hay autenticación ni herramientas especiales.

---

## El 46% de los sitios que publican su versión ya tenía el parche

Respondieron 606 hosts. De esos, 105 publican su versión:

| Estado | Sitios | Porcentaje |
| :--- | :--- | :--- |
| Con el parche (8.3.36 / 8.4.27 / 8.2.35 / 8.5.12) | 48 | 46% |
| Vulnerables (versión anterior) | 21 | 20% |
| Fuera de soporte (no hay parche) | 36 | 34% |

Cuarenta y ocho administradores instalaron una versión que llevaba menos de 48 horas publicada. Donde alguien tenía la responsabilidad, la respuesta fue rápida.

---

## Dos grupos que fallan por razones distintas

Los 21 sitios con una versión anterior al parche tuvieron la solución disponible. La lista incluye **transmilenio.gov.co** y **sitp.gov.co**, la plataforma de transporte público de Bogotá, en PHP 8.4.17, siete versiones atrás.

Los 36 fuera de soporte no tienen a dónde actualizar. Tres subdominios de Patrimonio Medellín siguen en **PHP 4.6.6** y la Personería de Cartagena en **5.6.40**. Estos no se parchan: hay que reconstruirlos, porque la aplicación no corre en una versión soportada. Eso implica presupuesto, contratación y migración.

---

## La lista: 57 sitios con versión publicada y sin el parche

| Versión | Estado | Nº | Sitios |
| :--- | :--- | :--- | :--- |
| 4.6.6 | Sin soporte | 3 | agenda.patrimoniomedellin.gov.co, archivo.patrimoniomedellin.gov.co, landing.patrimoniomedellin.gov.co |
| 5.6.40 | Sin soporte | 2 | personeriacartagena.gov.co, joomla.iduvichia.gov.co |
| 6.1.1 | Sin soporte | 1 | mentes.corporaciongilbertoecheverri.gov.co |
| 6.2.0 | Sin soporte | 1 | actas.gobernaciondelmagdalena.gov.co |
| 7.2.34 | Sin soporte | 1 | contraloriacasanare.gov.co |
| 7.3.20 | Sin soporte | 1 | yoaprendoturismo.gov.co |
| 7.3.33 | Sin soporte | 1 | formacionvirtual.colombiacompra.gov.co |
| 7.4.16 | Sin soporte | 1 | aula.mindeporte.gov.co |
| 7.4.33 | Sin soporte | 20 | caldas.gov.co, contraloriabarrancabermeja.gov.co, corpoamazonia.gov.co, corponor.gov.co, corvivienda.gov.co, cpip.gov.co, domolleno.gov.co, esecolombia.gov.co, esehospitalcimitarra.gov.co, frigorificozipaquira.gov.co, haciendafusagasuga.gov.co, metroplus.gov.co, museocasadelamemoria.gov.co, personeriaitagui.gov.co, saludpereira.gov.co, sanmiguel.gov.co, portal.idear.gov.co, campusvirtual.cancer.gov.co, documentos.esemorenoyclavijo.gov.co, malware.edeso.gov.co |
| 8.1.27 | Sin soporte | 1 | emaafesp.gov.co |
| 8.1.34 | Sin soporte | 4 | bogotanitos.gov.co, bogotasabeacentro.gov.co, fiestadebogota.gov.co, hospitalmunicipalsanroque.gov.co |
| 8.2.30 | Vulnerable | 2 | redsaludarmenia.gov.co, redsaludarmeniaese.gov.co |
| 8.2.34 | Vulnerable | 7 | academiadehistoriadeltolima.gov.co, hospitalma.gov.co, indecho.gov.co, invama.gov.co, redu.gov.co, aerocivil.aldesarrollo.gov.co, censo.esehospicaldas.gov.co |
| 8.3.22 | Vulnerable | 1 | medata.gov.co |
| 8.3.31 | Vulnerable | 1 | and.gov.co |
| 8.3.35 | Vulnerable | 3 | metrosalud.gov.co, sedsanandres.gov.co, transcaribe.gov.co |
| 8.4.17 | Vulnerable | 2 | sitp.gov.co, transmilenio.gov.co |
| 8.4.25 | Vulnerable | 2 | observando.gov.co, onadcolombia.gov.co |
| 8.5.11 | Vulnerable | 3 | fomdear.gov.co, hus.gov.co, villavicencio.gov.co |

La cifra de 57 es un piso. Hay **229 sitios con evidencia de PHP** y **124 de ellos no publican versión**, así que no aparecen en la tabla. Para esos 124, la exposición no es medible desde afuera, ni por un investigador ni probablemente por la entidad.

---

## Por qué pasa: quién administra el hosting

Los datos se agrupan por proveedor. De los 21 sitios vulnerables, **9 están en un solo hosting de bajo costo**, Hostinger. Del otro lado, 20 sitios anuncian el panel Plesk: de los 13 que publican versión, **12 tienen el parche y uno está fuera de soporte**. Ninguno quedó vulnerable.

El patrón no depende de la capacidad técnica de la entidad. Depende de quién opera el panel. Donde hay un administrador que aplica actualizaciones, la respuesta llega en horas. Donde el sitio quedó en un hosting de autoservicio y nadie asumió esa tarea, la versión sigue donde estaba.

Las cabeceras muestran el mismo patrón en otras cosas. **44 de 610 dominios no validan el certificado TLS**: 23 envían una cadena incompleta, 15 tienen un certificado emitido para otro hostname y 2 están vencidos. Son minutos de trabajo, anteriores a esta CVE y todavía en producción.

---

## Qué mostró el laboratorio

Reconstruí el entorno en local con dos contenedores. En PHP 8.5.5 con `mod_php` se abren las cuatro precondiciones que describe el aviso: versión sin parche, `session.upload_progress` activo, `fatal_error_backtraces` activo y `memory_limit` fijo. La imagen con 8.5.12 reporta cero.

No escribí ni ejecuté un exploit contra sistemas de terceros. No hizo falta: las precondiciones son configuración por defecto y una sola cabecera identifica quién las tiene.

---

## Los límites de esta medición

* **Una cadena de versión no indica el nivel de parche.** Las distribuciones aplican correcciones manteniendo la versión base. Las lecturas 8.3.36 y 8.4.27 son seguras porque son las versiones upstream del parche; una cadena de distribución no permitiría concluir nada.
* **El SAPI no se determina desde afuera.** Que estos 57 sean explotables es una inferencia a partir de la versión, no una ruta confirmada.
* **La muestra de subdominios es parcial:** 300 de 704. Los dominios base están completos.
* **No publicar la versión no significa no tener PHP.**

---

## Qué cambiaría el resultado

1. **Actualizar el runtime** a 8.2.35, 8.3.36, 8.4.27 o 8.5.12.
2. **Salir de `mod_php`** hacia FPM. No reemplaza el parche, pero evita que el ataque se ejecute antes del código de la aplicación.
3. **Desactivar `session.upload_progress` y `fatal_error_backtraces`.**
4. **Migrar los 36 sitios fuera de soporte**, con partida presupuestal y fecha. No se van a parchar solos.
5. **Construir un inventario y poner la obligación de parchar en el contrato de hosting.**

---

**Fuentes:**
- [The PHP Foundation: Today's PHP Security Release](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security)
- [PHP.net: archivo de versiones, octubre de 2026](https://www.php.net/archive/2026.php)
- [CERT-EU: Security Advisory 2026-018](https://cert.europa.eu/publications/security-advisories/2026-018)
- [watchTowr: PHP2Shell Intelligence](https://watchtowr.com/intelligence/php-remote-code-execution-php2shell/)
- [BleepingComputer: PHP ships emergency patches for critical PHP2Shell flaws](https://www.bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws)
- [Zscaler ThreatLabz: CVE-2026-109618 and CVE-2026-109619, PHP2Shell](https://www.zscaler.com/blogs/security-research/cve-2026-109618-cve-2026-109619-php-vulnerable-unauthenticated-rce)
- [Rapid7: PHP2Shell FAQ](https://www.rapid7.com/blog/post/etr-cve-2026-109618-and-cve-2026-109619-critical-unauthenticated-remote-code-execution-in-php)
