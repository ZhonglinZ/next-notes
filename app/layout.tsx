import Sidebar from "@/components/SideBar";
import "./style.css";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Providers>
            <Header />
            <div className="main">
              <Sidebar />
              <section className="col note-viewer">{children}</section>
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
