import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Bakbone — The outdoors, understood.",
      template: "%s · Bakbone",
    },
    description:
      "A trusted, interconnected encyclopedia for the skills, species, tools, hazards, and systems that shape the wild.",
    applicationName: "Bakbone",
    keywords: [
      "outdoor encyclopedia",
      "field guide",
      "camping skills",
      "wildlife identification",
      "firecraft",
      "navigation",
    ],
    openGraph: {
      type: "website",
      title: "Bakbone — The outdoors, understood.",
      description: "Trusted outdoor knowledge, built for discovery and the field.",
      siteName: "Bakbone",
      images: [{ url: new URL("/og-bakbone.png", metadataBase).toString(), width: 1727, height: 911, alt: "Bakbone — The outdoors, understood, over a calm mountain wilderness and controlled campfire." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bakbone — The outdoors, understood.",
      description: "Trusted outdoor knowledge, built for discovery and the field.",
      images: [new URL("/og-bakbone.png", metadataBase).toString()],
    },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
