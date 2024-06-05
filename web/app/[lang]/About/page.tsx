'use client';

import { Locale } from "@/config/i18n.config";
import { getDictonaryServerOnly } from "@/dictionaries/default-dictionary-server-only";

export default function Home({params}: {params: {lang: Locale}}) {
  const dict = getDictonaryServerOnly(params.lang);

  return(
    <div className="flex w-full h-full flex-col gap-16 items-center justify-center">
      <h2 className="font-extrabold text-6xl mt-10">
        {dict.about.title}
      </h2>

      <div className="w-[80%] h-full flex flex-col gap-16 items-center justify-center">
        <div>
          <h3 className="font-extrabold text-2xl">{dict.about.subtitle}</h3>
          <span>{dict.about.describe}</span>
        </div>

        <div>
          <h3 className="font-extrabold text-2xl">{dict.about.subtitleWhatMake}</h3>
          <span>{dict.about.whatMake}</span>
        </div>

        <div>
          <h3 className="font-extrabold text-2xl">{dict.about.subtitleHowItWorks}</h3>
          <ul>
            {dict.about.faq.map((item, index) => (
              <li key={index}>
                {index + 1}- {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
