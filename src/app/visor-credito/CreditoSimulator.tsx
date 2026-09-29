"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Banknote, Calculator, FileDown, Landmark } from "lucide-react";
import {
	Chart,
	Filler,
	LineController,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import {
	BaseParams,
	FilaPesos,
	FilaUVR,
	Simulacion,
	UVRParams,
	simularPesos,
	simularUVR,
} from "@/lib/credito";

Chart.register(
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Filler,
	Tooltip,
	Title,
);

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");
const cop = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

// Texto del tool en serif (var del layout); los números van en mono.
const SERIF = "[font-family:var(--font-credito-serif),Georgia,serif]";
const MONO = "[font-family:var(--font-credito-mono),monospace]";

type Option = { value: string; label: string };
type Field = {
	id: string;
	label: string;
	note?: string;
	options?: Option[];
	step?: string;
	min?: string;
};

// Paleta del portafolio (src/lib/constants.ts)
const C_LIME = "#d4ff4d";
const C_PINK = "#fb8983";
const C_OLIVE = "#7d8300"; // línea punteada, oscurecida para que no compita con la lime

const siNo: Option[] = [
	{ value: "cuotaConstante", label: "Cuota Constante en UVR (creciente COP)" },
	{ value: "abonoConstante", label: "Abono Constante a Capital en UVR" },
];
const pct = (desde: number, hasta: number): Option[] => {
	const out: Option[] = [];
	for (let v = desde; v <= hasta; v += 10) out.push({ value: String(v), label: `${v}%` });
	return out;
};

const UVR_FIELDS: Field[] = [
	{ id: "valorInmueble", label: "Valor Total del Inmueble (COP)", step: "1000000" },
	{ id: "porcentajeCredito", label: "Porcentaje a Financiar", options: pct(50, 90) },
	{
		id: "plazoAnios",
		label: "Plazo del Crédito (Años)",
		options: [5, 10, 15, 20, 25, 30].map((a) => ({
			value: String(a),
			label: `${a} Años`,
		})),
	},
	{ id: "sistema", label: "Sistema de Amortización", options: siNo },
	{
		id: "valorUVR",
		label: "Valor actual de la UVR (COP)",
		step: "0.01",
		note: "Actualizable · UVR del día (Banco de la República)",
	},
	{
		id: "tasaBase",
		label: "Tasa Remuneratoria Base (% EA)",
		step: "0.1",
		note: 'Tasa sobre UVR · ej FNA cotiza "UVR + 8,1%"',
	},
	{
		id: "descuentoTasa",
		label: "Descuento Programa (% EA)",
		step: "0.1",
		min: "0",
		note: "Ej: FRECH disminuye puntos EA",
	},
	{
		id: "inflacion",
		label: "Inflación Proyectada Anual (%)",
		step: "0.1",
		note: "Proyección realista Banrep (meta 3% + margen)",
	},
	{
		id: "seguroVidaPct",
		label: "Seguro de Vida (% mensual s/ saldo)",
		step: "0.01",
		min: "0",
		note: "Disminuye con la deuda · típ. 0.03% – 0.08%",
	},
	{
		id: "seguroHogarPct",
		label: "Seguro Incendio/Terremoto (% mensual)",
		step: "0.01",
		min: "0",
		note: "Sobre 80% del inmueble (sin lote) · fijo, no baja con la deuda",
	},
	{
		id: "aporteExtra",
		label: "Aporte Adicional a Capital (COP/mes)",
		step: "100000",
		min: "0",
		note: "Abonos inteligentes (Ley 546/99) · solo Cuota Constante",
	},
];

const PESOS_FIELDS: Field[] = [
	{ id: "pValorInmueble", label: "Valor Total del Inmueble (COP)", step: "1000000" },
	{ id: "pPorcentajeCredito", label: "Porcentaje a Financiar", options: pct(50, 100) },
	{
		id: "pPlazoAnios",
		label: "Plazo del Crédito (Años)",
		options: [5, 10, 15, 19, 20, 25, 30].map((a) => ({
			value: String(a),
			label: `${a} Años`,
		})),
	},
	{
		id: "pSistema",
		label: "Sistema de Amortización",
		options: [
			{ value: "cuotaConstante", label: "Cuota Constante en Pesos" },
			{ value: "abonoConstante", label: "Abono Constante a Capital" },
		],
	},
	{
		id: "pTasaBase",
		label: "Tasa de Interés (% EA)",
		step: "0.1",
		note: "Tasa total en pesos · ej FNA línea pesos cotiza 12.6% EA",
	},
	{
		id: "pDescuentoTasa",
		label: "Descuento Programa (% EA)",
		step: "0.1",
		min: "0",
		note: "Ej: FRECH disminuye puntos EA",
	},
	{
		id: "pSeguroVidaPct",
		label: "Seguro de Vida (% mensual s/ saldo)",
		step: "0.01",
		min: "0",
		note: "Disminuye con la deuda · típ. 0.03% – 0.08%",
	},
	{
		id: "pSeguroHogarPct",
		label: "Seguro Incendio/Terremoto (% mensual)",
		step: "0.01",
		min: "0",
		note: "Sobre 80% del inmueble (sin lote) · fijo, no baja con la deuda",
	},
	{
		id: "pAporteExtra",
		label: "Aporte Adicional a Capital (COP/mes)",
		step: "100000",
		min: "0",
		note: "Abonos inteligentes (Ley 546/99) · solo Cuota Constante",
	},
];

const UVR_DEFAULTS: Record<string, string> = {
	valorInmueble: "484203128",
	porcentajeCredito: "70",
	plazoAnios: "20",
	sistema: "cuotaConstante",
	valorUVR: "395.50",
	tasaBase: "8.1",
	descuentoTasa: "0.0",
	inflacion: "5.0",
	seguroVidaPct: "0.05",
	seguroHogarPct: "0.03",
	aporteExtra: "0",
};

const PESOS_DEFAULTS: Record<string, string> = {
	pValorInmueble: "342174121",
	pPorcentajeCredito: "70",
	pPlazoAnios: "20",
	pSistema: "cuotaConstante",
	pTasaBase: "12.6",
	pDescuentoTasa: "0.0",
	pSeguroVidaPct: "0.05",
	pSeguroHogarPct: "0.03",
	pAporteExtra: "0",
};

const TIPS: Record<string, string> = {
	uvr: "UVR estimada del mes: crece con la inflación proyectada. Es la moneda indexada del crédito (Ley 546/99).",
	cuotaUVR:
		"Cuota exigida en UVR: fija en 'Cuota Constante'. En pesos crece con la inflación al pagarse con la UVR del mes.",
	interesUVR:
		"Saldo × tasa mensual. Solo la deuda genera interés; seguros e inflación no. Es la parte de la cuota que no amortiza.",
	abonoUVR:
		"Parte de la cuota que amortiza deuda: cuota − interés. Crece con el tiempo. No incluye el aporte extra.",
	saldoUVR:
		"Deuda pendiente en UVR tras el pago del mes. Base del interés del mes siguiente.",
	extra: "Abono voluntario a capital (Ley 546/99, sin penalización). Reduce saldo y plazo sin cambiar la cuota.",
	seguros:
		"Vida: % del saldo (baja al amortizar). Hogar: fijo, ~80% del inmueble. No generan interés.",
	cuotaTotal: "Lo que pagas este mes: (cuota + extra) × UVR del mes + seguros.",
	saldoCOP:
		"Saldo en UVR × UVR del mes. Puede subir con la inflación aunque amortices.",
	totalPagado:
		"Suma de todo lo desembolsado desde el mes 1 hasta el cierre del crédito: cuotas exigidas + aportes adicionales a capital + seguros, en pesos de cada mes de pago. Incluye capital, intereses remuneratorios y el ajuste por inflación de la UVR (por eso supera el monto prestado). No incluye gastos de origen (notaría, avalúo).",
	totalPagadoPesos:
		"Suma de todo lo desembolsado desde el mes 1 hasta el cierre del crédito: cuotas exigidas + aportes adicionales a capital + seguros, en pesos constantes (la cuota NO crece con el tiempo). Incluye capital e intereses. No incluye gastos de origen (notaría, avalúo).",
};

// Popover position:fixed para escapar del clip de los contenedores con scroll.
function Tip({ text }: { text: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

	return (
		<span
			ref={ref}
			className="ml-1.5 inline-flex h-[14px] w-[14px] cursor-help items-center justify-center rounded-full bg-palette-lime align-[1px] text-[10px] font-bold leading-none text-gray-900"
			onMouseEnter={() => {
				const r = ref.current!.getBoundingClientRect();
				setPos({
					left: Math.max(
						8,
						Math.min(r.left + r.width / 2 - 125, window.innerWidth - 258),
					),
					top: r.top - 8,
				});
			}}
			onMouseLeave={() => setPos(null)}
		>
			i
			{pos &&
				createPortal(
					<div
						style={{
							position: "fixed",
							left: pos.left,
							top: pos.top,
							width: 250,
							transform: "translateY(-100%)",
						}}
						className="z-[70] rounded-md border border-white/10 bg-[#2e3320] px-2.5 py-1.5 text-xs leading-relaxed text-gray-200 shadow-xl"
					>
						{text}
					</div>,
					document.body,
				)}
		</span>
	);
}

// Las fuentes del tool (next/font) viven en CSS vars del layout; el canvas no
// las hereda, se leen del elemento montado.
const cssFont = (el: HTMLElement, v: string) =>
	getComputedStyle(el).getPropertyValue(v) || "monospace";

function AmortChart({ data }: { data: Simulacion<unknown>["chart"] }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const chartRef = useRef<Chart<"line"> | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		const el = canvasRef.current;
		const mono = cssFont(el, "--font-credito-mono");
		const serif = cssFont(el, "--font-credito-serif") || "serif";

		chartRef.current?.destroy();
		chartRef.current = new Chart(el, {
			type: "line",
			data: {
				labels: data.labels,
				datasets: [
					{
						label: "Cuota Mensual (COP)",
						data: data.cuotas,
						borderColor: C_LIME,
						backgroundColor: "rgba(212, 255, 77, 0.12)",
						borderWidth: 2,
						pointRadius: 0,
						pointHoverRadius: 4,
						pointBackgroundColor: C_LIME,
						fill: true,
						tension: 0.3,
						yAxisID: "y",
					},
					{
						label: "Saldo Deuda (COP)",
						data: data.saldo,
						borderColor: C_PINK,
						borderWidth: 2,
						pointRadius: 0,
						tension: 0.3,
						yAxisID: "y1",
					},
					{
						label: "Intereses Pagados Acumulados (COP)",
						data: data.interesAcum,
						borderColor: C_OLIVE,
						borderWidth: 2,
						pointRadius: 0,
						borderDash: [6, 4],
						tension: 0.3,
						yAxisID: "y1",
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					tooltip: {
						callbacks: {
							label: (ctx) => "$" + Number(ctx.raw).toLocaleString("es-CO"),
						},
					},
					legend: {
						position: "bottom",
						labels: {
							usePointStyle: true,
							pointStyle: "line",
							font: { family: serif, size: 12 },
							color: "#d1d5db",
						},
					},
				},
				scales: {
					x: { ticks: { maxTicksLimit: 20, font: { family: mono, size: 10 } }, grid: { color: "#6f6f6f" }, },
					y: {
						position: "left",
						beginAtZero: false,
						grid: { color: "#6f6f6f" },
						title: { display: true, text: "Cuota mensual", font: { family: serif, size: 11 } },
						ticks: {
							maxTicksLimit: 15,
							font: { family: mono, size: 10 },
							callback: (v) => "$" + Number(v).toLocaleString("es-CO"),
						},
					},
					y1: {
						position: "right",
						beginAtZero: true,
						grid: { drawOnChartArea: false },
						title: {
							display: true,
							text: "Saldo / Intereses acumulados",
							font: { family: serif, size: 11 },
						},
						ticks: {
							maxTicksLimit: 15,
							font: { family: mono, size: 10 },
							callback: (v) => "$" + Number(v).toLocaleString("es-CO"),
						},
					},
				},
			},
		});
		return () => {
			chartRef.current?.destroy();
			chartRef.current = null;
		};
	}, [data]);

	return (
		<div className="relative h-[420px]">
			<canvas ref={canvasRef} />
		</div>
	);
}

function descargarCSV(nombre: string, encabezado: string, filas: unknown[][]) {
	// Separador ';' + BOM para que Excel es-CO abra las columnas correctamente
	const blob = new Blob(
		["﻿" + encabezado + "\n" + filas.map((f) => f.join(";")).join("\n")],
		{ type: "text/csv;charset=utf-8;" },
	);
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = nombre;
	a.click();
	URL.revokeObjectURL(a.href);
}

function FormFields({
	fields,
	values,
	onChange,
}: {
	fields: Field[];
	values: Record<string, string>;
	onChange: (id: string, v: string) => void;
}) {
	return (
		<div className="grid grid-cols-1 gap-4">
			{fields.map((f) => (
				<div key={f.id}>
					<label
						className="mb-1.5 block text-xs font-medium tracking-wide text-gray-400"
						htmlFor={f.id}
					>
						{f.label}
					</label>
					{f.options ? (
						<select
							id={f.id}
							className="w-full rounded-md border border-white/10 bg-[#121212] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-palette-lime"
							value={values[f.id]}
							onChange={(e) => onChange(f.id, e.target.value)}
						>
							{f.options.map((o) => (
								<option key={o.value} value={o.value}>
									{o.label}
								</option>
							))}
						</select>
					) : (
						<input
							type="number"
							id={f.id}
							step={f.step}
							min={f.min}
							className={`w-full rounded-md border border-white/10 bg-[#121212] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-palette-lime ${MONO}`}
							value={values[f.id]}
							onChange={(e) => onChange(f.id, e.target.value)}
						/>
					)}
					{f.note && (
						<p className="mt-1 text-[11px] text-gray-500">{f.note}</p>
					)}
				</div>
			))}
		</div>
	);
}

type Col<F> = {
	h: string;
	tip?: string;
	num?: boolean; // alineación derecha (números)
	cell: (f: F) => string;
};

const COLS_UVR: Col<FilaUVR>[] = [
	{ h: "Mes", cell: (f) => String(f.mes) },
	{ h: "Valor UVR (Est.)", tip: TIPS.uvr, num: true, cell: (f) => f.uvr.toFixed(2) },
	{ h: "Cuota (UVR)", tip: TIPS.cuotaUVR, num: true, cell: (f) => f.cuotaUVR.toFixed(2) },
	{ h: "Interés (UVR)", tip: TIPS.interesUVR, num: true, cell: (f) => f.interesUVR.toFixed(2) },
	{ h: "Abono Capital (UVR)", tip: TIPS.abonoUVR, num: true, cell: (f) => f.abonoCapitalUVR.toFixed(2) },
	{ h: "Saldo Capital (UVR)", tip: TIPS.saldoUVR, num: true, cell: (f) => f.saldoUVR.toFixed(2) },
	{ h: "Aporte Extra (COP)", tip: TIPS.extra, num: true, cell: (f) => fmt(f.aporteExtraCOP) },
	{ h: "Seguros (COP)", tip: TIPS.seguros, num: true, cell: (f) => fmt(f.segurosCOP) },
	{ h: "Cuota Total (COP)", tip: TIPS.cuotaTotal, num: true, cell: (f) => fmt(f.cuotaTotalCOP) },
	{ h: "Saldo Capital (COP)", tip: TIPS.saldoCOP, num: true, cell: (f) => fmt(f.saldoCOP) },
];

const COLS_PESOS: Col<FilaPesos>[] = [
	{ h: "Mes", cell: (f) => String(f.mes) },
	{
		h: "Cuota (COP)",
		tip: "Cuota exigida (sistema francés): constante todo el crédito, con tasa fija en pesos sin indexación.",
		num: true,
		cell: (f) => fmt(f.cuota),
	},
	{
		h: "Interés (COP)",
		tip: "Saldo × tasa mensual. Solo la deuda genera interés; los seguros no. Al inicio es lo mayor de la cuota.",
		num: true,
		cell: (f) => fmt(f.interes),
	},
	{ h: "Abono Capital (COP)", tip: TIPS.abonoUVR, num: true, cell: (f) => fmt(f.abonoCapital) },
	{
		h: "Saldo Capital (COP)",
		tip: "Deuda pendiente tras el pago del mes: saldo anterior − abono − extra. Base del interés del mes siguiente.",
		num: true,
		cell: (f) => fmt(f.saldo),
	},
	{ h: "Aporte Extra (COP)", tip: TIPS.extra, num: true, cell: (f) => fmt(f.aporteExtraCOP) },
	{ h: "Seguros (COP)", tip: TIPS.seguros, num: true, cell: (f) => fmt(f.segurosCOP) },
	{
		h: "Cuota Total (COP)",
		tip: "Lo que pagas este mes: cuota + aporte extra + seguros. Suma el 'Total Pagado' del resumen.",
		num: true,
		cell: (f) => fmt(f.cuotaTotalCOP),
	},
];

function Resultados<F>({ filas, cols }: { filas: F[]; cols: Col<F>[] }) {
	return (
		<div className="max-h-[460px] overflow-auto rounded-md border border-white/10">
			<table className="w-full border-collapse">
				<thead>
					<tr>
						{cols.map((c) => (
							<th
								key={c.h}
								className={`sticky top-0 z-[1] whitespace-nowrap border-b border-white/10 bg-[#121212] px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-gray-300 ${
									c.num ? "text-right" : "text-left"
								}`}
							>
								{c.h}
								{c.tip && <Tip text={c.tip} />}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filas.map((f, i) => (
						<tr key={i} className="transition-colors hover:bg-white/[0.04]">
							{cols.map((c) => (
								<td
									key={c.h}
									className={`whitespace-nowrap border-b border-white/5 px-4 py-2 text-[12.5px] [font-variant-numeric:tabular-nums] ${
										c.num
											? `text-right text-white ${MONO}`
											: "text-left text-gray-400"
									}`}
								>
									{c.cell(f)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

// Stat compacto: valor en una línea, sub opcional, acento por borde izquierdo.
function Stat({
	label,
	value,
	sub,
	accent = "border-l-white/20",
	tip,
}: {
	label: string;
	value: string;
	sub?: string;
	accent?: string;
	tip?: string;
}) {
	return (
		<div
			className={`rounded-md border border-white/10 border-l-[3px] bg-[#121212]/60 px-3 py-2 ${accent}`}
		>
			<span className="block text-[10px] font-medium uppercase tracking-wider text-gray-500">
				{label}
				{tip && <Tip text={tip} />}
			</span>
			<span
				className={`mt-0.5 block truncate text-sm font-semibold text-white ${MONO}`}
			>
				{value}
			</span>
			{sub && (
				<span className="block truncate text-[10px] text-gray-500">{sub}</span>
			)}
		</div>
	);
}

export default function CreditoSimulator() {
	const [tab, setTab] = useState<"UVR" | "Pesos">("UVR");
	const [uvrValues, setUvrValues] = useState(UVR_DEFAULTS);
	const [pesosValues, setPesosValues] = useState(PESOS_DEFAULTS);
	const [uvrResult, setUvrResult] = useState<Simulacion<FilaUVR> | null>(null);
	const [pesosResult, setPesosResult] = useState<Simulacion<FilaPesos> | null>(null);
	const [error, setError] = useState<string | null>(null);

	const calcular = () => {
		setError(null);
		const num = (v: Record<string, string>, id: string) =>
			parseFloat(v[id]);
		try {
			if (tab === "UVR") {
				const p: UVRParams = {
					valorInmueble: num(uvrValues, "valorInmueble"),
					porcentajeCredito: num(uvrValues, "porcentajeCredito"),
					plazoAnios: parseInt(uvrValues.plazoAnios),
					sistema: uvrValues.sistema as UVRParams["sistema"],
					tasaBaseEA: num(uvrValues, "tasaBase"),
					descuentoTasa: num(uvrValues, "descuentoTasa") || 0,
					seguroVidaPct: num(uvrValues, "seguroVidaPct") || 0,
					seguroHogarPct: num(uvrValues, "seguroHogarPct") || 0,
					aporteExtra: num(uvrValues, "aporteExtra") || 0,
					valorUVR: num(uvrValues, "valorUVR"),
					inflacionEA: num(uvrValues, "inflacion"),
				};
				setUvrResult(simularUVR(p));
			} else {
				const p: BaseParams = {
					valorInmueble: num(pesosValues, "pValorInmueble"),
					porcentajeCredito: num(pesosValues, "pPorcentajeCredito"),
					plazoAnios: parseInt(pesosValues.pPlazoAnios),
					sistema: pesosValues.pSistema as BaseParams["sistema"],
					tasaBaseEA: num(pesosValues, "pTasaBase"),
					descuentoTasa: num(pesosValues, "pDescuentoTasa") || 0,
					seguroVidaPct: num(pesosValues, "pSeguroVidaPct") || 0,
					seguroHogarPct: num(pesosValues, "pSeguroHogarPct") || 0,
					aporteExtra: num(pesosValues, "pAporteExtra") || 0,
				};
				setPesosResult(simularPesos(p));
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : "Error inesperado");
		}
	};

	const r = tab === "UVR" ? uvrResult : pesosResult;
	const activo = tab === "UVR" ? uvrResult : pesosResult;
	const fin = r
		? `Mes ${r.resumen.finCreditoMes} (${Math.floor(r.resumen.finCreditoMes / 12)}a ${r.resumen.finCreditoMes % 12}m)`
		: "";

	return (
		<div className={` px-4 pb-32 pt-10 text-white md:px-8 ${SERIF}`}>
			<div className="p-5 md:p-8">
				<header className="mb-6">
					<h1 className="text-3xl font-semibold tracking-[-0.02em]">
						Visor de Crédito Hipotecario Colombia
					</h1>
					<p className="mt-2 text-sm text-gray-400">
						Proyección de amortización, seguros y abonos a capital · Ley
						546/1999 · Tasas referencia FNA
					</p>
				</header>

				{/* Inputs a la izquierda (sticky, con tabs dentro) · chart + tabla a la derecha */}
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-[500px_minmax(0,1fr)]">
					<aside className="h-fit rounded-lg border border-white/10 bg-[#121212]/50 p-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
						{/* Tabs dentro de la tarjeta de inputs */}
						<div className="mb-5 flex gap-4 border-b border-white/10">
							{(["UVR", "Pesos"] as const).map((t) => (
								<button
									key={t}
									onClick={() => {
										setTab(t);
										setError(null);
									}}
									className={`flex items-center gap-1.5 border-b-2 pb-2 text-sm font-medium transition-colors ${
										tab === t
											? "border-palette-lime text-white"
											: "border-transparent text-gray-400 hover:text-white"
									}`}
								>
									{t === "UVR" ? (
										<Landmark size={15} className="shrink-0" />
									) : (
										<Banknote size={15} className="shrink-0" />
									)}
									{t}
								</button>
							))}
						</div>

						<FormFields
						fields={tab === "UVR" ? UVR_FIELDS : PESOS_FIELDS}
						values={tab === "UVR" ? uvrValues : pesosValues}
						onChange={(id, v) =>
							(tab === "UVR" ? setUvrValues : setPesosValues)((prev) => ({
								...prev,
								[id]: v,
							}))
						}
					/>

					<div className="mt-5 flex gap-3 w-full flex-1 *:flex-1">
						<button
							onClick={calcular}
							className="flex justify-center items-center gap-2 rounded-md bg-palette-lime px-4 py-2 text-sm font-bold text-gray-900 transition-colors hover:bg-palette-olive hover:text-white"
						>
							<Calculator size={16} />
							Calcular
						</button>
						{r && (
							<button
								onClick={() => {
									if (tab === "UVR" && uvrResult) {
										descargarCSV(
											"amortizacion_hipotecaria.csv",
											"Mes;Valor UVR;Cuota UVR;Interes UVR;Abono Capital UVR;Saldo Capital UVR;Aporte Extra COP;Seguros COP;Cuota Total COP;Saldo Capital COP",
											uvrResult.filas.map((f) => [
												f.mes,
												f.uvr.toFixed(2),
												f.cuotaUVR.toFixed(2),
												f.interesUVR.toFixed(2),
												f.abonoCapitalUVR.toFixed(2),
												f.saldoUVR.toFixed(2),
												Math.round(f.aporteExtraCOP),
												Math.round(f.segurosCOP),
												Math.round(f.cuotaTotalCOP),
												Math.round(f.saldoCOP),
											]),
										);
									} else if (pesosResult) {
										descargarCSV(
											"amortizacion_pesos.csv",
											"Mes;Cuota COP;Interes COP;Abono Capital COP;Saldo Capital COP;Aporte Extra COP;Seguros COP;Cuota Total COP",
											pesosResult.filas.map((f) => [
												f.mes,
												Math.round(f.cuota),
												Math.round(f.interes),
												Math.round(f.abonoCapital),
												Math.round(f.saldo),
												Math.round(f.aporteExtraCOP),
												Math.round(f.segurosCOP),
												Math.round(f.cuotaTotalCOP),
											]),
										);
									}
								}}
								className="flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-white/40"
							>
								<FileDown size={16} />
								Save CSV
							</button>
						)}
					</div>

					{error && (
						<p className="mt-4 rounded-md border border-palette-pink/40 bg-palette-pink/10 px-4 py-3 text-sm text-palette-pink">
							{error}
						</p>
					)}
				</aside>

				<section className="min-w-0">
					{!r ? (
						<div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-white/10 text-sm text-gray-500">
							Configura los parámetros y presiona “Calcular Proyección”.
						</div>
					) : (
						<>
							{/* Stats compactos */}
							<div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
								<Stat
									label="Monto a Financiar"
									value={fmt(r.resumen.montoCOP)}
									sub={
										tab === "UVR" && uvrResult
											? `${cop.format(Math.round(uvrResult.resumen.montoUVR ?? 0))} UVR`
											: undefined
									}
									accent="border-l-palette-pink"
								/>
								<Stat
									label="Tasa Efectiva Aplicada"
									value={`${r.resumen.tasaEA.toFixed(2)}% EA`}
								/>
								<Stat label="Cuota Mes 1" value={fmt(r.resumen.cuota1)} />
								<Stat
									label="Cuota Año 5"
									value={
										r.resumen.cuotaAnio5 !== null
											? fmt(r.resumen.cuotaAnio5)
											: r.resumen.cuotaAnio5Nota
									}
								/>
								<Stat label="Cuota Final" value={fmt(r.resumen.cuotaFinal)} />
								<Stat
									label="Fin del Crédito"
									value={fin}
									sub={r.resumen.finNota}
									accent="border-l-palette-olive"
								/>
								<Stat
									label="Total Pagado"
									value={fmt(r.resumen.totalPagado)}
									sub={`Incluye ${fmt(r.resumen.interesAcum)} de intereses`}
									accent="border-l-palette-lime"
									tip={tab === "UVR" ? TIPS.totalPagado : TIPS.totalPagadoPesos}
								/>
							</div>

							{/* Chart */}
							<div className="mb-6 rounded-lg border border-white/10 bg-white/[0.03] p-5">
								{activo && <AmortChart data={activo.chart} />}
							</div>

							{/* Tabla de amortización */}
							{tab === "UVR" && uvrResult ? (
								<Resultados filas={uvrResult.filas} cols={COLS_UVR} />
							) : (
								pesosResult && (
									<Resultados filas={pesosResult.filas} cols={COLS_PESOS} />
								)
							)}
						</>
					)}
				</section>
			</div>
			</div>

			<footer className="mt-8 text-center text-xs text-gray-600">
				Simulación informativa · No constituye cotización formal · Verifique tasas
				y seguros con su entidad financiera
			</footer>
		</div>
	);
}
