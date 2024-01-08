import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProviderr } from "@/components/theme-provider";
import ReduxProvider from "@/redux/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <body className={inter.className}>{children}</body>
        </ThemeProviderr>
      </ReduxProvider>
    </html>
  );
}
