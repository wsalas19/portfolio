"use client";

// Piezas presentacionales del visor: tooltip, tarjetas de stat, formulario y
// tabla de amortización. Sin lógica de negocio ni chart.js.

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import { FilaPesos, FilaUVR } from "@/lib/credito";
import { Field, MONO, TIPS, fmt } from "./data";

// Popover position:fixed para escapar del clip de los contenedores con scroll.
// placement decide si el popover va por encima ("top") o por debajo ("bottom").
export function Tip({
	text,
	placement = "top",
}: {
	text: string;
	placement?: "top" | "bottom";
}) {
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
					top: placement === "bottom" ? r.bottom + 8 : r.top - 8,
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
							transform: placement === "bottom" ? undefined : "translateY(-100%)",
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

// Stat compacto: valor en una línea, sub opcional, acento por borde izquierdo.
export function Stat({
	label,
	value,
	sub,
	accent = "border-l-white/20",
	tip,
	tipPlacement,
}: {
	label: string;
	value: string;
	sub?: string;
	accent?: string;
	tip?: string;
	tipPlacement?: "top" | "bottom";
}) {
	return (
		<div
			className={`rounded-md border border-white/10 border-l-[3px] bg-[#121212]/60 px-3 py-2 ${accent}`}
		>
			<span className="block text-[10px] font-medium uppercase tracking-wider text-gray-500">
				{label}
				{tip && <Tip text={tip} placement={tipPlacement} />}
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

export function FormFields({
	fields,
	values,
	onChangeAction,
}: {
	fields: Field[];
	values: Record<string, string>;
	onChangeAction: (id: string, v: string) => void;
}) {
	return (
		<div className="grid grid-cols-1 gap-4 gap-x-4 sm:grid-cols-2">
			{fields.map((f, i) => (
				<div
					key={f.id}
					className={
						fields.length % 2 === 1 && i === fields.length - 1
							? "sm:col-span-2"
							: ""
					}
				>
					<label
						className="mb-1.5 block text-xs font-medium tracking-wide text-gray-400"
						htmlFor={f.id}
					>
						{f.label}
					</label>
					{f.options ? (
						<select
							id={f.id}
							className={`w-full rounded-md border border-white/10 bg-[#121212] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-palette-lime ${MONO}`}
							value={values[f.id]}
							onChange={(e) => onChangeAction(f.id, e.target.value)}
						>
							{f.options.map((o) => (
								<option key={o.value} value={o.value}>
									{o.label}
								</option>
							))}
						</select>
					) : (
						<Input
							type="number"
							id={f.id}
							step={f.step}
							min={f.min}
							className={`hide-spinners h-10 w-full border-white/10 bg-[#121212] text-sm text-white focus-visible:ring-palette-lime ${MONO}`}
							value={values[f.id]}
							onChange={(e) => onChangeAction(f.id, e.target.value)}
						/>
					)}
					{f.note && (
						<p className="mt-1 text-[11px] leading-snug text-gray-500">
							{f.note}
						</p>
					)}
				</div>
			))}
		</div>
	);
}

export type Col<F> = {
	h: string;
	tip?: string;
	num?: boolean; // alineación derecha (números)
	mo?: boolean; // visible en móvil; el resto se oculta bajo el breakpoint sm
	cell: (f: F) => string;
};

export const COLS_UVR: Col<FilaUVR>[] = [
	{ h: "Mes", mo: true, cell: (f) => String(f.mes) },
	{ h: "Valor UVR", tip: TIPS.uvr, num: true, cell: (f) => f.uvr.toFixed(2) },
	{ h: "Cuota (UVR)", tip: TIPS.cuotaUVR, num: true, cell: (f) => f.cuotaUVR.toFixed(2) },
	{ h: "Interés (UVR)", tip: TIPS.interesUVR, num: true, cell: (f) => f.interesUVR.toFixed(2) },
	{ h: "Abono (UVR)", tip: TIPS.abonoUVR, num: true, cell: (f) => f.abonoCapitalUVR.toFixed(2) },
	{ h: "Saldo (UVR)", tip: TIPS.saldoUVR, num: true, cell: (f) => f.saldoUVR.toFixed(2) },
	{ h: "Aporte (COP)", tip: TIPS.extra, num: true, mo: true, cell: (f) => fmt(f.aporteExtraCOP) },
	{ h: "Seguros (COP)", tip: TIPS.seguros, num: true, cell: (f) => fmt(f.segurosCOP) },
	{ h: "Cuota Total", tip: TIPS.cuotaTotal, num: true, mo: true, cell: (f) => fmt(f.cuotaTotalCOP) },
	{ h: "Saldo (COP)", tip: TIPS.saldoCOP, num: true, cell: (f) => fmt(f.saldoCOP) },
];

export const COLS_PESOS: Col<FilaPesos>[] = [
	{ h: "Mes", mo: true, cell: (f) => String(f.mes) },
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
	{ h: "Abono (COP)", tip: TIPS.abonoUVR, num: true, cell: (f) => fmt(f.abonoCapital) },
	{
		h: "Saldo (COP)",
		tip: "Deuda pendiente tras el pago del mes: saldo anterior − abono − extra. Base del interés del mes siguiente.",
		num: true,
		cell: (f) => fmt(f.saldo),
	},
	{ h: "Aporte (COP)", tip: TIPS.extra, num: true, mo: true, cell: (f) => fmt(f.aporteExtraCOP) },
	{ h: "Seguros (COP)", tip: TIPS.seguros, num: true, cell: (f) => fmt(f.segurosCOP) },
	{
		h: "Cuota Total",
		tip: "Lo que pagas este mes: cuota + aporte extra + seguros. Suma el 'Total Pagado' del resumen.",
		num: true,
		mo: true,
		cell: (f) => fmt(f.cuotaTotalCOP),
	},
];

export function Resultados<F>({ filas, cols }: { filas: F[]; cols: Col<F>[] }) {
	return (
		<div className="min-h-0 flex-1 overflow-auto max-h-[70vh] lg:max-h-none rounded-md border border-white/10">
			<table className="w-full border-collapse">
				<thead>
					<tr>
						{cols.map((c, i) => (
							<th
								key={c.h}
								className={`sticky top-0 z-[1] whitespace-nowrap border-b border-white/10 bg-[#121212] px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-gray-300 ${
									c.num ? "text-right" : "text-left"
								} ${i === 0 ? "pl-4" : ""} ${c.mo ? "" : "hidden sm:table-cell"}`}
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
							{cols.map((c, j) => (
								<td
									key={c.h}
									className={`px-2 py-1.5 whitespace-nowrap border-b border-white/5 text-[12px] [font-variant-numeric:tabular-nums] ${
										c.num
											? `text-right text-white ${MONO}`
											: "text-left text-gray-400"
									} ${j === 0 ? "pl-4" : ""} ${c.mo ? "" : "hidden sm:table-cell"}`}
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
