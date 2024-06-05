import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import ThemeContextProvider from '@/context/theme-context';
import { i18n } from "@/config/i18n.config";

const font = Nunito({ subsets: ["latin"] });

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({lang}));

  return languages
}

export const metadata: Metadata = {
  title: "Screen Scripts",
  description: "Web site development by next",
};

export default function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: {
    lang: "en-US" | "pt-BR"
  }
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${font.className} dark:bg-[#000] dark:text-white bg-[#FFFAE6] custom-scrollbar`}>
      <div className='absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#e22626] bg-slate-400'></div>
        <ThemeContextProvider>
          <Header params={params}/>
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
