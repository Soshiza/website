import type { Metadata } from "next";
import "./globals.css";
import { AuroraBackground } from "@/components/ui/aurora-background";


export const metadata: Metadata = {
  title: "Sōshiza - Agencia de Servicios Digitales en Chile",
  description:
    "Sōshiza es una agencia líder en marketing digital, publicidad online, redes sociales, desarrollo de páginas web, y fotografía para PYMEs y eventos en Chile. Ofrecemos soluciones personalizadas a nivel nacional, incluyendo ciudades como Santiago, Valparaíso, Concepción, Temuco, Punta Arenas, y más.",
  keywords: [
    "agencia de marketing digital Chile",
    "publicidad online Chile",
    "marketing en redes sociales",
    "fotografía PYMEs",
    "fotografía de productos",
    "fotografía de eventos",
    "desarrollo de páginas web",
    "marketing de contenido",
    "fotografía de bodas",
    "publicidad para pequeñas empresas",
    "SEO en Chile",
    "agencia de branding Chile",
    "estrategia digital para PYMEs",
    "desarrollo de ecommerce",
    "servicios de marketing digital Chile",
    "Santiago",
    "Valparaíso",
    "Viña del Mar",
    "Concepción",
    "Antofagasta",
    "Temuco",
    "Iquique",
    "La Serena",
    "Coquimbo",
    "Puerto Montt",
    "Chillán",
    "Talca",
    "Arica",
    "Rancagua",
    "Valdivia",
    "Coyhaique",
    "Punta Arenas"
  ],
  authors: [{ name: "Sōshiza", url: "https://www.soshiza.com" }],
  openGraph: {
    title: "Sōshiza - Agencia de Marketing Digital y Publicidad en Chile",
    description:
      "Somos Sōshiza, especialistas en marketing digital, publicidad online, redes sociales, desarrollo de páginas web y fotografía de PYMEs en todas las regiones de Chile, incluyendo Santiago, Valparaíso, Concepción, Temuco, Punta Arenas, y más.",
    type: "website",
    locale: "es_CL",
    siteName: "Sōshiza Agencia Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sōshiza - Agencia de Marketing Digital en Chile",
    description:
      "Marketing digital, redes sociales, desarrollo de páginas web y fotografía para PYMEs en Chile. Operamos en Santiago, Valparaíso, Concepción, Temuco, Punta Arenas, y más.",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuroraBackground>{children}</AuroraBackground>
      </body>
    </html>
  );
}
