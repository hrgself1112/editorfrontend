import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProviderr } from "@/components/theme-provider";
import ReduxProvider from "@/redux/store/provider";
import { Toaster } from "@/components/ui/toaster"
import { MenubarHomePage } from "@/components/header/menu-bar";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
export const metadata = {
  title: "Astrosage Article Editor",
  description: "Editor made to work easy ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <ThemeProviderr
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body className={inter.className}>
           <NextTopLoader  showSpinner={false} />
           <MenubarHomePage/>
             {children}
          <Toaster />
          </body>
        </ThemeProviderr>
      </ReduxProvider>
    </html>
  );
}
