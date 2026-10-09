import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
	title: "Admin | William Salas",
	// Panel privado detrás de contraseña: fuera del índice y fuera del sitemap.
	robots: { index: false, follow: false },
};

// Esta página no lee nada en el servidor a propósito: el HTML que se manda a un
// anónimo no puede traer contenido. La frontera real es la cookie, que la
// verifican las rutas de /api/admin.
export default function AdminPage() {
	return <AdminPanel />;
}
