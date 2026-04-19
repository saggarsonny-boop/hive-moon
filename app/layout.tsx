import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HiveMoon — Does the moon affect you?",
  description: "Log mood and energy each day. Find out if the lunar cycle affects you. Private, no account, free forever.",
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: { title: "HiveMoon", description: "Does the moon affect you? Find out.", type: "website" },
};

const NAV_STYLE: React.CSSProperties = { fontSize: "11px", color: "rgba(180,200,225,0.55)", textDecoration: "none" };
const DOT: React.CSSProperties = { color: "rgba(26,58,92,0.4)", fontSize: "11px" };
const TM: React.CSSProperties = { fontSize: "10px", color: "rgba(74,127,165,0.25)", lineHeight: 1.7, marginTop: 10 };

function HiveNav() {
  return (
    <header style={{ borderBottom: "1px solid rgba(13,31,53,0.7)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,4,8,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", position: "sticky", top: 0, zIndex: 50 }}>
      <a href="https://hive.baby" className="hive-planet" style={{ textDecoration: "none", fontSize: "22px", lineHeight: "1" }}>🌍</a>
      <nav style={{ display: "flex", gap: "14px", alignItems: "center" }}>
        <a href="https://hive.baby/about"      style={NAV_STYLE}>About</a>
        <span style={DOT}>·</span>
        <a href="https://hive.baby/contribute" style={NAV_STYLE}>Contribute</a>
        <span style={DOT}>·</span>
        <a href="https://hive.baby/patrons"    style={NAV_STYLE}>Patrons</a>
      </nav>
    </header>
  );
}

function HiveFooter() {
  return (
    <footer style={{ borderTop: "1px solid rgba(13,31,53,0.7)", padding: "24px 24px 32px", textAlign: "center" }}>
      <p style={{ fontSize: "11px", color: "rgba(26,58,92,0.5)", marginBottom: "14px", letterSpacing: "0.06em" }}>
        A social experiment · Free forever · No ads · No investors
      </p>
      <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "6px" }}>
        <a href="https://hive.baby"            style={NAV_STYLE}>hive.baby</a>
        <span style={DOT}>·</span>
        <a href="https://hive.baby/contribute" style={NAV_STYLE}>Contribute</a>
        <span style={DOT}>·</span>
        <a href="https://hive.baby/patrons"    style={NAV_STYLE}>Patrons</a>
        <span style={DOT}>·</span>
        <a href="https://hive.baby/privacy"    style={NAV_STYLE}>Privacy</a>
      </div>
      <p style={TM}>All data stays on your device. No account. No server. No tracking.</p>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col"><HiveNav />{children}<HiveFooter /></body>
    </html>
  );
}
