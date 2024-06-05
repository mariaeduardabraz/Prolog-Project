'use client'

import { Locale } from '@/config/i18n.config';
import { getDictonaryUseClient } from '@/dictionaries/default-dictionary-use-client';
import Img from '@/public/mainImage.png'
import Image from 'next/image';
import { TypeAnimation } from "react-type-animation";
import {motion} from 'framer-motion';

export default function Intro({params}: {params: {lang: Locale}}) {
  const dict = getDictonaryUseClient(params.lang)

  return (
    <div className="flex flex-col justify-around items-center md:flex-row">
      <h1 className='flex items-center justify-center -mt-16 md:mt-0 h-screen w-1/2 md:ml-10 font-extrabold text-6xl md:text-7xl'>
        <TypeAnimation
          sequence={dict.sequence}
          wrapper='span'
          speed={50}
          style={{display: 'inline-block'}}
          repeat={Infinity}
        />
      </h1>

      <motion.div
        className='w-[365px] h-[365px] md:w-[700px] md:h-[700px] animate-[wiggle_1s_ease-in-out_infinite]'
        initial={{opacity: 0, scale: 0, rotate: 0}}
        animate={{opacity: 1, scale: 1, rotate: 360}}
        transition={{
          type: 'spring',
          stiffness: 125,
          delay: 0.2,
          duration: 0.7
        }}
      >
        <Image src={Img} alt='Imagem Intro' />
      </motion.div>
    </div>
  )
}
