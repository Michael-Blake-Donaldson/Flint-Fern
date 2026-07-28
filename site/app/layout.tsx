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
      default: "WildAtlas — The outdoors, understood.",
      template: "%s · WildAtlas",
    },
    description:
      "A trusted, interconnected encyclopedia for the skills, species, tools, hazards, and systems that shape the wild.",
    applicationName: "WildAtlas",
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
      title: "WildAtlas — The outdoors, understood.",
      description: "Trusted outdoor knowledge, built for discovery and the field.",
      siteName: "WildAtlas",
      images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1734, height: 907, alt: "WildAtlas — The outdoors, understood, over a calm mountain wilderness and controlled campfire." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "WildAtlas — The outdoors, understood.",
      description: "Trusted outdoor knowledge, built for discovery and the field.",
      images: [new URL("/og.png", metadataBase).toString()],
    },
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

