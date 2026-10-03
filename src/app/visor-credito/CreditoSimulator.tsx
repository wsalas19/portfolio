"use client";

import { useState } from "react";
import { Banknote, Calculator, FileDown, Landmark } from "lucide-react";
import {
	FilaPesos,
	FilaUVR,
	Simulacion,
	simularPesos,
	simularUVR,
} from "@/lib/credito";
import AmortChart from "./AmortChart";
import {
	PESOS_DEFAULTS,
	PESOS_FIELDS,
	TIPS,
	UVR_DEFAULTS,
	UVR_FIELDS,
	cop,
	fmt,
} from "./data";
import { descargarPesos, descargarUVR, pesosParamsFrom, uvrParamsFrom } from "./logic";
import { COLS_PESOS, COLS_UVR, FormFields, Resultados, Stat } from "./ui";

export default function CreditoSimulator() {
	const [tab, setTab] = useState<"UVR" | "Pesos">("UVR");
	const [uvrValues, setUvrValues] = useState(UVR_DEFAULTS);
	const [pesosValues, setPesosValues] = useState(PESOS_DEFAULTS);
	const [uvrResult, setUvrResult] = useState<Simulacion<FilaUVR> | null>(null);
	const [pesosResult, setPesosResult] = useState<Simulacion<FilaPesos> | null>(null);
	const [error, setError] = useState<string | null>(null);

	const calcular = () => {
		setError(null);
		try {
			if (tab === "UVR") setUvrResult(simularUVR(uvrParamsFrom(uvrValues)));
			else setPesosResult(simularPesos(pesosParamsFrom(pesosValues)));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Error inesperado");
		}
	};

	const r = tab === "UVR" ? uvrResult : pesosResult;
	const fin = r
		? `Mes ${r.resumen.finCreditoMes} (${Math.floor(r.resumen.finCreditoMes / 12)}a ${r.resumen.finCreditoMes % 12}m)`
		: "";

	return (
		<div className="flex min-h-screen flex-col px-4 pb-24 pt-4 text-white md:px-6 lg:h-screen lg:overflow-hidden">
			<div className="flex min-h-0 flex-1 flex-col gap-4">
				<header className="shrink-0">
					<h1 className="text-3xl font-semibold tracking-[-0.02em]">
						Visor de Crédito Hipotecario Colombia
					</h1>
					<p className="mt-2 text-sm text-gray-400">
						Proyección de amortización, seguros y abonos a capital · Ley
						546/1999 · Tasas referencia FNA
					</p>
				</header>

				{/* Inputs a la izquierda (sticky, con tabs dentro) · chart + tabla a la derecha */}
				<div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[380px_minmax(0,1fr)]">
					<aside className="lg:flex lg:flex-col lg:min-h-0 lg:overflow-y-auto rounded-lg border border-white/10 bg-[#121212]/50 p-5">
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

						<div className="lg:flex-1">
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
						</div>

						<div className="mt-5 flex gap-2 *:flex-1">
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
										if (tab === "UVR" && uvrResult) descargarUVR(uvrResult);
										else if (pesosResult) descargarPesos(pesosResult);
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

					<section className="flex min-h-0 flex-col gap-4">
						{!r ? (
							<div className="flex min-h-[200px] md:min-h-0 flex-1 items-center justify-center rounded-lg border border-dashed border-white/10 text-sm text-gray-500">
								Configura los parámetros y presiona “Calcular Proyección”.
							</div>
						) : (
							<>
								{/* Stats compactos */}
								<div className="shrink-0 grid grid-cols-2 gap-2 lg:grid-cols-7">
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
										tipPlacement="bottom"
									/>
								</div>

								{/* Chart */}
								<div className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-3">
									<AmortChart data={r.chart} />
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

			<footer className="mt-8 shrink-0 text-center text-xs text-gray-600">
				Simulación informativa · No constituye cotización formal · Verifique tasas
				y seguros con su entidad financiera
			</footer>
		</div>
	);
}
