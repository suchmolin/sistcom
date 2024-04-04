import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
export const metadata = {
  title: "SistCOM",
  description: "Sistema de Control de MM",
  manifest: "manifest.json",
  icons: {
    apple: "icon-192x192.png",
  },
  themeColor: "#0f766e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
