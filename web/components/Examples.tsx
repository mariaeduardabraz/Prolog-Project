'use client';

import batImage from '@/public/examples/Batman.jpg'
import harryPoter from '@/public/examples/harrypotter.jpg'
import interistelar from '@/public/examples/intereste.jpg'
import justiceLeague from '@/public/examples/JusticeLeague.jpg'
import moana from '@/public/examples/moana.jpg'
import rings from '@/public/examples/Rings.jpg'
import starWars from '@/public/examples/starwars.jpg';
import avangers from '@/public/examples/vingadores.jpg'

import { Locale } from "@/config/i18n.config";
import { getDictonaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { motion, Variants } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import 'tailwindcss/tailwind.css';

interface Props {
  image: StaticImport;
  hueA: number;
  hueB: number;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

function Card({ image, hueA, hueB }: Props) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="overflow-hidden flex items-center justify-center relative pt-5 mb-[-30px]"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0" style={{ background, clipPath: "path('M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z')" }} />
        <motion.div className="text-[164px] w-[300px] h-[430px] flex items-center justify-center bg-white rounded-[20px] shadow-card transform-origin-[10%_60%]" variants={cardVariants}>
          <Image src={image} alt="film Image" className='rounded-full'/>
        </motion.div>
    </motion.div>
  );
}

const food: [StaticImport, number, number, number][] = [
  [batImage, 340, 10, 1],
  [harryPoter, 20, 40, 2],
  [interistelar, 60, 90, 3],
  [justiceLeague, 80, 120, 4],
  [moana, 100, 140, 5],
  [rings, 205, 245, 6],
  [starWars, 260, 290, 7],
  [avangers, 290, 320, 8]
];

export function Examples({params}: {params: {lang: Locale}}) {
  const dict = getDictonaryUseClient(params.lang)

  return (
    <>
      <div className="flex w-full h-full justify-center items-center mb-10 mt-10 font-extrabold text-6xl">
        <h2>
          {dict.examples}
        </h2>
      </div>

      <div className="flex h-full w-full items-center justify-evenly flex-wrap gap-x-32 gap-y-10 mb-24">
        {food.map(([image, hueA, hueB, index]) => (
          <Card image={image} hueA={hueA} hueB={hueB} key={index} />
        ))}
      </div>
    </>
  );
}
