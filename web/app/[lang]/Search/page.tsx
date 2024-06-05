import { DefaultSeletc } from '@/components/DefaultSelect';
import { Locale } from '@/config/i18n.config';
import { getDictonaryServerOnly } from '@/dictionaries/default-dictionary-server-only';
import { gener, styleMovie } from '@/lib/data';

export default function Home({params}: {params: {lang: Locale}}) {
  const dict = getDictonaryServerOnly(params.lang)

  return (
    <div className="flex w-full h-full flex-col gap-16 items-center justify-center">
      <h2 className="font-extrabold text-6xl mt-10">
        {dict.select.recomender}
      </h2>

      <div>
        <DefaultSeletc gener={gener} styleMovie={styleMovie} params={params}/>
      </div>
    </div>
  );
}
