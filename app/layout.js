// app/layout.js

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Gestor de Clientes",
  description: "Formulario para crear nuevos clientes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className="flex flex-col min-h-full bg-background text-foreground">
        <Header />
        <main className="flex-grow py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}