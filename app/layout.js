import Header from "@/components/Header";
import Footer from "@/components/Footer"; // 1. Importamos el Footer
import "./globals.css";

export const metadata = {
  title: "Mi Blog con Next.js", // Actualicemos el título también
  description: "Un blog de ejemplo creado con Next.js y Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className="flex flex-col min-h-full bg-gray-900">
        <Header />
        <main className="flex-grow py-8">{children}</main>
        <Footer /> 
      </body>
    </html>
  );
}