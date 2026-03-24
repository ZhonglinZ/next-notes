import Sidebar from "@/components/SideBar";
import "./style.css";
import { routing } from "../i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <div className="container">
          <NextIntlClientProvider>
            <div className="main">
              <Sidebar />
              <section className="col note-viewer">{children}</section>
            </div>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
