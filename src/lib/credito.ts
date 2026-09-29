// Motor de amortización hipotecaria (Colombia · Ley 546/1999).
// Portado 1:1 desde visor-credito-col/app.js — la lógica es idéntica, solo
// se separó del DOM para que sea pura y testeable.

export type SistemaAmortizacion = "cuotaConstante" | "abonoConstante";

export interface BaseParams {
	valorInmueble: number;
	porcentajeCredito: number; // 50..100
	plazoAnios: number;
	sistema: SistemaAmortizacion;
	tasaBaseEA: number; // % EA
	descuentoTasa: number; // % EA
	seguroVidaPct: number; // % mensual s/ saldo
	seguroHogarPct: number; // % mensual s/ construcción
	aporteExtra: number; // COP/mes (solo cuota constante)
}

export interface UVRParams extends BaseParams {
	valorUVR: number; // COP
	inflacionEA: number; // % EA
}

export interface FilaUVR {
	mes: number;
	uvr: number;
	cuotaUVR: number;
	interesUVR: number;
	abonoCapitalUVR: number; // programado (sin aporte extra)
	saldoUVR: number;
	aporteExtraCOP: number;
	segurosCOP: number;
	cuotaTotalCOP: number;
	saldoCOP: number;
}

export interface FilaPesos {
	mes: number;
	cuota: number;
	interes: number;
	abonoCapital: number; // programado (sin aporte extra)
	saldo: number;
	aporteExtraCOP: number;
	segurosCOP: number;
	cuotaTotalCOP: number;
}

export interface Resumen {
	montoCOP: number;
	montoUVR: number | null;
	tasaEA: number; // % EA aplicada
	cuota1: number;
	cuotaAnio5: number | null; // null => ver cuotaAnio5Nota
	cuotaAnio5Nota: string;
	cuotaFinal: number;
	finCreditoMes: number;
	finNota: string;
	totalPagado: number;
	interesAcum: number;
}

export interface Simulacion<F> {
	filas: F[];
	resumen: Resumen;
	chart: {
		labels: string[];
		cuotas: number[];
		saldo: number[];
		interesAcum: number[];
	};
}

const EARaMensual = (ea: number) => Math.pow(1 + ea, 1 / 12) - 1;

// Cuota del sistema francés (mes 1..n con tasa mensual equivalente)
const cuotaFrancesa = (monto: number, i: number, n: number) =>
	i > 0 ? monto * ((i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)) : monto / n;

function resumenComun(
	p: BaseParams,
	tasaFinalEA: number,
	n: number,
	cuota1: number,
	cuotaAnio5: number,
	cuotaFinal: number,
	mesFinCredito: number,
	totalPagado: number,
	interesAcum: number,
): Resumen {
	let cuotaAnio5Nota = "";
	let cuotaAnio5Val: number | null = cuotaAnio5;
	if (p.plazoAnios < 5) {
		cuotaAnio5Val = null;
		cuotaAnio5Nota = "N/A (Plazo menor)";
	} else if (mesFinCredito < 60) {
		cuotaAnio5Val = null;
		cuotaAnio5Nota = "N/A (Cancelado antes)";
	}

	return {
		montoCOP: p.valorInmueble * (p.porcentajeCredito / 100),
		montoUVR: null,
		tasaEA: tasaFinalEA * 100,
		cuota1,
		cuotaAnio5: cuotaAnio5Val,
		cuotaAnio5Nota,
		cuotaFinal,
		finCreditoMes: mesFinCredito,
		finNota:
			mesFinCredito < n
				? `Cancela ${n - mesFinCredito} meses antes`
				: p.aporteExtra > 0
					? "Sin efecto"
					: "Plazo contratado",
		totalPagado,
		interesAcum,
	};
}

function muestrear(
	chart: Simulacion<unknown>["chart"],
	mes: number,
	n: number,
	paso: number,
	cuota: number,
	saldo: number,
	interesAcum: number,
) {
	if (mes === 1 || mes === n || (mes - 1) % paso === 0) {
		chart.labels.push(`Mes ${mes}`);
		chart.cuotas.push(Math.round(cuota));
		chart.saldo.push(Math.round(saldo));
		chart.interesAcum.push(Math.round(interesAcum));
	}
}

// Punto final exacto: el cierre puede caer entre las muestras del paso
function cerrarMuestreo(
	chart: Simulacion<unknown>["chart"],
	ultimoMes: number,
	cuota: number,
	saldo: number,
	interesAcum: number,
) {
	const last = chart.labels[chart.labels.length - 1];
	if (chart.labels.length === 0 || last !== `Mes ${ultimoMes}`) {
		chart.labels.push(`Mes ${ultimoMes}`);
		chart.cuotas.push(Math.round(cuota));
		chart.saldo.push(Math.round(saldo));
		chart.interesAcum.push(Math.round(interesAcum));
	}
}

export function simularUVR(p: UVRParams): Simulacion<FilaUVR> {
	if (!(p.valorInmueble > 0) || !(p.valorUVR > 0) || isNaN(p.tasaBaseEA) || isNaN(p.inflacionEA)) {
		throw new Error(
			"Revise los campos: valor del inmueble, valor UVR, tasa e inflación deben ser válidos.",
		);
	}

	const aporteExtra = p.sistema === "cuotaConstante" ? Math.max(0, p.aporteExtra || 0) : 0;
	const valorConstruible = p.valorInmueble * 0.8;
	const tasaFinalEA = Math.max(0, (p.tasaBaseEA - p.descuentoTasa) / 100);

	const n = p.plazoAnios * 12;
	const montoUVR = p.valorInmueble * (p.porcentajeCredito / 100) / p.valorUVR;
	const iMensual = EARaMensual(tasaFinalEA);
	const infMensual = EARaMensual(p.inflacionEA / 100);
	const cuotaUVRFija =
		p.sistema === "cuotaConstante" ? cuotaFrancesa(montoUVR, iMensual, n) : 0;
	const abonoConstanteUVR = montoUVR / n;
	const paso = Math.max(1, Math.ceil(n / 60));

	let saldoUVR = montoUVR;
	let uvrActual = p.valorUVR;
	let mesFinCredito = n;
	let totalPagado = 0;
	let interesAcum = 0;
	let cuota1 = 0;
	let cuotaAnio5 = 0;
	let cuotaFinal = 0;
	let lastCuota = 0;
	let lastSaldo = 0;

	const filas: FilaUVR[] = [];
	const chart = { labels: [] as string[], cuotas: [] as number[], saldo: [] as number[], interesAcum: [] as number[] };

	for (let mes = 1; mes <= n; mes++) {
		const interesUVR = saldoUVR * iMensual;
		let cuotaUVR = 0;
		let aporteExtraUVR = 0;
		let abonoCapitalUVR: number;

		if (p.sistema === "cuotaConstante") {
			const abonoBase = Math.min(cuotaUVRFija - interesUVR, saldoUVR);
			const abonoTotalUVR = Math.min(
				cuotaUVRFija + aporteExtra / uvrActual,
				interesUVR + saldoUVR,
			);
			abonoCapitalUVR = abonoTotalUVR - interesUVR;
			aporteExtraUVR = Math.max(0, abonoCapitalUVR - abonoBase);
			cuotaUVR = interesUVR + abonoBase; // cuota exigida (parcial si cierra este mes)
		} else {
			abonoCapitalUVR = abonoConstanteUVR;
			cuotaUVR = abonoCapitalUVR + interesUVR;
		}

		saldoUVR -= abonoCapitalUVR;
		if (saldoUVR < 0.01) saldoUVR = 0; // corrección de redondeo final
		if (saldoUVR === 0 && mes < n) mesFinCredito = mes;
		const abonoProgramadoUVR = abonoCapitalUVR - aporteExtraUVR;

		interesAcum += interesUVR * uvrActual;

		const segurosCOP =
			saldoUVR * uvrActual * (p.seguroVidaPct / 100) +
			valorConstruible * (p.seguroHogarPct / 100);
		const cuotaCOP = (cuotaUVR + aporteExtraUVR) * uvrActual + segurosCOP;
		const saldoCOP = saldoUVR * uvrActual;
		totalPagado += cuotaCOP;

		if (mes === 1) cuota1 = cuotaCOP;
		if (mes === 60 && saldoUVR > 0) cuotaAnio5 = cuotaCOP;
		cuotaFinal = cuotaCOP;
		lastCuota = cuotaCOP;
		lastSaldo = saldoCOP;

		muestrear(chart, mes, n, paso, cuotaCOP, saldoCOP, interesAcum);

		filas.push({
			mes,
			uvr: uvrActual,
			cuotaUVR,
			interesUVR,
			abonoCapitalUVR: abonoProgramadoUVR,
			saldoUVR,
			aporteExtraCOP: aporteExtraUVR * uvrActual,
			segurosCOP,
			cuotaTotalCOP: cuotaCOP,
			saldoCOP,
		});

		// La UVR crece DESPUÉS del pago, con la inflación proyectada
		uvrActual *= 1 + infMensual;

		if (saldoUVR === 0) break; // cerrado por aportes adicionales
	}

	cerrarMuestreo(chart, filas.length, lastCuota, lastSaldo, interesAcum);

	const resumen = resumenComun(
		{ ...p, aporteExtra }, tasaFinalEA, n, cuota1, cuotaAnio5, cuotaFinal,
		mesFinCredito, totalPagado, interesAcum,
	);
	resumen.montoUVR = montoUVR;
	return { filas, resumen, chart };
}

export function simularPesos(p: BaseParams): Simulacion<FilaPesos> {
	if (!(p.valorInmueble > 0) || isNaN(p.tasaBaseEA)) {
		throw new Error("Revise los campos: valor del inmueble y tasa deben ser válidos.");
	}

	const aporteExtra = p.sistema === "cuotaConstante" ? Math.max(0, p.aporteExtra || 0) : 0;
	const valorConstruible = p.valorInmueble * 0.8;
	const tasaFinalEA = Math.max(0, (p.tasaBaseEA - p.descuentoTasa) / 100);

	const n = p.plazoAnios * 12;
	const montoCOP = p.valorInmueble * (p.porcentajeCredito / 100);
	const iMensual = EARaMensual(tasaFinalEA);
	const cuotaFija = p.sistema === "cuotaConstante" ? cuotaFrancesa(montoCOP, iMensual, n) : 0;
	const abonoConstanteCOP = montoCOP / n;
	const paso = Math.max(1, Math.ceil(n / 60));

	let saldo = montoCOP;
	let mesFinCredito = n;
	let totalPagado = 0;
	let interesAcum = 0;
	let cuota1 = 0;
	let cuotaAnio5 = 0;
	let cuotaFinal = 0;
	let lastCuota = 0;
	let lastSaldo = 0;

	const filas: FilaPesos[] = [];
	const chart = { labels: [] as string[], cuotas: [] as number[], saldo: [] as number[], interesAcum: [] as number[] };

	for (let mes = 1; mes <= n; mes++) {
		const interes = saldo * iMensual;
		let cuota = 0;
		let aporteExtraCOP = 0;
		let abonoCapital: number;

		if (p.sistema === "cuotaConstante") {
			const abonoBase = Math.min(cuotaFija - interes, saldo);
			const abonoTotal = Math.min(cuotaFija + aporteExtra, interes + saldo);
			abonoCapital = abonoTotal - interes;
			aporteExtraCOP = Math.max(0, abonoCapital - abonoBase);
			cuota = interes + abonoBase; // cuota exigida (parcial si cierra este mes)
		} else {
			abonoCapital = abonoConstanteCOP;
			cuota = abonoCapital + interes;
		}
		const abonoProgramado = abonoCapital - aporteExtraCOP;

		saldo -= abonoCapital;
		if (saldo < 0.01) saldo = 0;
		if (saldo === 0 && mes < n) mesFinCredito = mes;

		interesAcum += interes; // los seguros NO generan interés

		const segurosCOP =
			saldo * (p.seguroVidaPct / 100) + valorConstruible * (p.seguroHogarPct / 100);
		const cuotaTotalCOP = cuota + aporteExtraCOP + segurosCOP;
		totalPagado += cuotaTotalCOP;

		if (mes === 1) cuota1 = cuotaTotalCOP;
		if (mes === 60 && saldo > 0) cuotaAnio5 = cuotaTotalCOP;
		cuotaFinal = cuotaTotalCOP;
		lastCuota = cuotaTotalCOP;
		lastSaldo = saldo;

		muestrear(chart, mes, n, paso, cuotaTotalCOP, saldo, interesAcum);

		filas.push({
			mes,
			cuota,
			interes,
			abonoCapital: abonoProgramado,
			saldo,
			aporteExtraCOP,
			segurosCOP,
			cuotaTotalCOP,
		});

		if (saldo === 0) break;
	}

	cerrarMuestreo(chart, filas.length, lastCuota, lastSaldo, interesAcum);

	return {
		filas,
		resumen: resumenComun(
			{ ...p, aporteExtra }, tasaFinalEA, n, cuota1, cuotaAnio5, cuotaFinal,
			mesFinCredito, totalPagado, interesAcum,
		),
		chart,
	};
}
