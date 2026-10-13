// Chequeos del motor de amortización (COP y UVR).
//
//   node --test tests/credito.test.mjs
//
// Igual que `admin-auth.test.mjs`: .mjs para quedar fuera del `include` de
// tsconfig.json y poder importar el .ts directo (Node 25 ya hace type stripping).
// Solo módulos puros: `project-images.ts` y `twitter/parser.ts` importan
// "server-only" y además usan el alias `@/`, así que no se pueden cargar acá sin
// montar un resolver — quedan para otro tipo de prueba.
import assert from "node:assert/strict";
import test from "node:test";
import { simularPesos, simularUVR } from "../src/lib/credito.ts";

// Parámetros de referencia de una hipoteca típica en pesos.
const PESOS = {
	valorInmueble: 300_000_000,
	porcentajeCredito: 70,
	plazoAnios: 20,
	sistema: "cuotaConstante",
	tasaBaseEA: 12,
	descuentoTasa: 0,
	seguroVidaPct: 0.05,
	seguroHogarPct: 0.03,
	aporteExtra: 0,
};

const UVR = {
	...PESOS,
	valorUVR: 400,
	inflacionEA: 4,
};

const N = PESOS.plazoAnios * 12;

test("pesos · cuota constante: cierra el crédito en el plazo y sin saldo", () => {
	const { filas, resumen } = simularPesos(PESOS);

	assert.equal(filas.length, N);
	assert.equal(filas[0].saldo > 0, true);
	assert.equal(filas.at(-1).saldo, 0);
	assert.equal(resumen.finCreditoMes, N);
	assert.equal(resumen.finNota, "Plazo contratado");
});

test("pesos · los totales son coherentes (se paga más que el principal)", () => {
	const { resumen } = simularPesos(PESOS);
	const monto = PESOS.valorInmueble * (PESOS.porcentajeCredito / 100);

	assert.ok(resumen.montoCOP === monto);
	assert.ok(resumen.cuota1 > 0);
	assert.ok(resumen.interesAcum > 0);
	assert.ok(resumen.totalPagado > monto, "total > principal por los intereses");
	// El principal se amortiza completo, así que el total supera al monto por los
	// intereses (ya no por saldo pendiente).
	assert.ok(resumen.totalPagado - resumen.interesAcum >= monto * 0.98);
});

test("pesos · abono constante: el abono a capital no cambia mes a mes", () => {
	const { filas } = simularPesos({ ...PESOS, sistema: "abonoConstante" });
	const abono = filas[0].abonoCapital;

	for (const fila of filas.slice(0, -1)) {
		assert.ok(Math.abs(fila.abonoCapital - abono) < 1e-6, `mes ${fila.mes}`);
	}
	assert.equal(filas.at(-1).saldo, 0);
});

test("pesos · un aporte extra cancela antes del plazo", () => {
	const base = simularPesos(PESOS);
	const conExtra = simularPesos({ ...PESOS, aporteExtra: 1_000_000 });

	assert.ok(conExtra.resumen.finCreditoMes < base.resumen.finCreditoMes);
	assert.match(conExtra.resumen.finNota, /Cancela/);
	assert.ok(conExtra.resumen.interesAcum < base.resumen.interesAcum);
	// En abono constante el aporte extra no aplica (el sistema no lo admite).
	const abonoCte = simularPesos({ ...PESOS, sistema: "abonoConstante", aporteExtra: 1_000_000 });
	assert.equal(abonoCte.resumen.finCreditoMes, N);
});

test("pesos · un descuento de tasa baja los intereses", () => {
	const sinDescuento = simularPesos(PESOS);
	const conDescuento = simularPesos({ ...PESOS, descuentoTasa: 2 });

	assert.ok(conDescuento.resumen.tasaEA < sinDescuento.resumen.tasaEA);
	assert.ok(conDescuento.resumen.interesAcum < sinDescuento.resumen.interesAcum);
});

test("pesos · valida las entradas", () => {
	assert.throws(() => simularPesos({ ...PESOS, valorInmueble: 0 }));
	assert.throws(() => simularPesos({ ...PESOS, tasaBaseEA: NaN }));
});

test("uvr · cierra el crédito y reporta monto en UVR", () => {
	const { filas, resumen } = simularUVR(UVR);

	assert.equal(filas.length, N);
	assert.equal(filas.at(-1).saldoUVR, 0);
	assert.ok(resumen.montoUVR !== null && resumen.montoUVR > 0);
	assert.ok(resumen.totalPagado > 0);
	// La UVR crece con la inflación, así que la primera UVR es la de entrada.
	assert.equal(filas[0].uvr, UVR.valorUVR);
	assert.ok(filas.at(-1).uvr > filas[0].uvr);
});

test("uvr · valida valor UVR y tasa", () => {
	assert.throws(() => simularUVR({ ...UVR, valorUVR: 0 }));
	assert.throws(() => simularUVR({ ...UVR, inflacionEA: NaN }));
});
