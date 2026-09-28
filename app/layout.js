import "./globals.css";
import Topbar from "@/components/Topbar";
import SiteHeader from "@/components/SiteHeader";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import PageTransition from "@/components/PageTransition";
import { getSettings } from "@/lib/site-data";

export const metadata = {
  title: "ECT · Electronics × Computer Technology · NSS College Rajakumari",
  description: "Department of Electronics with Computer Technology at NSS College Rajakumari.",
};

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  return (
    <html lang="en">
      <body className="min-h-[100dvh]">
        <Topbar settings={settings} />
        <SiteHeader />
        <NavBar />
        <main><PageTransition>{children}</PageTransition></main>
        <SiteFooter />
      </body>
    </html>
  );
}
