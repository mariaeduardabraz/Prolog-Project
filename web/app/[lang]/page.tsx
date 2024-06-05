import { ArrowDown } from "@/components/ArrowDown";
import { Examples } from "@/components/Examples";
import Intro from "@/components/Intro";
import { Locale } from "@/config/i18n.config";

export default function Home({params}: {params: {lang: Locale}}) {
  return (
    <>
      <Intro params={params}/>
      <Examples params={params}/>
      <ArrowDown />
    </>
  );
}
