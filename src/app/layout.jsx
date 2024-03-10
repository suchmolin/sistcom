import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
export const metadata = {
  title: "SistCOM",
  description: "Sistema de Control de MM",
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
