import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter } from "next/font/google";
import { Providers } from "@components/core";
import "@styles";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });
config.autoAddCss = false;

export const metadata = {
  title: "Boilerplate NextJS 13 App",
  description: "Built by Nick Canarelli",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "h-full bg-light")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
