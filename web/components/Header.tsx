'use client'

import logo from '@/public/icon.svg'
import Image from 'next/image'
import { FiGithub } from "react-icons/fi";
import { MdNightlight } from "react-icons/md";
import { PiSunBold } from "react-icons/pi";
import { IoLanguage, IoDocumentAttachOutline } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { BsInfoLg } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/theme-context';
import Link from 'next/link';
import { Locale } from '@/config/i18n.config';
import { getDictonaryUseClient } from '@/dictionaries/default-dictionary-use-client';
import { motion} from 'framer-motion';


export default function Header({params}: {params: {lang: Locale}}) {
  const { toggleDarkTheme, toggleLightTheme} = useTheme();

  const dict = getDictonaryUseClient(params.lang)

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notIsMobile, setIsNotMobile] = useState(false);


  const langIsPtBR = params.lang === 'pt-BR';

  useEffect(() => {
    const handleResize = () => {
      setIsNotMobile(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`w-full h-20 flex ${notIsMobile ? 'justify-between' : 'justify-center'} items-center p-4`}>
      <div className="flex items-center ml-6">
      {notIsMobile && (
        <>
          <motion.div
            whileHover={{scale: 1.2, rotate: 90}}
            whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%"}}
          >
            <Link href={`/${params.lang}`}>
              <Image
                src={logo}
                alt='Logotipo'
                className='h-14 w-14'
              />
            </Link>
          </motion.div>

          <motion.div
            className='ml-4'
            initial={{y: -100, x:'-50%', opacity: 0 }}
            animate={{y: 0, x: '0%', opacity: 1}}
          >
            <ul className='flex justify-center items-center font-extrabold uppercase gap-7'>
              {dict.header.map((item) => {
                let link;

                if(langIsPtBR){

                  if(item.phrase === 'Sobre') {
                    link = 'About'
                  } else if(item.phrase === 'Pesquisar') {
                    link = 'Search'
                  } else {
                    link = 'Documentation'
                  }
                }

                return (
                <Link
                  className='cursor-pointer transition-all ease-in-out  hover:bg-gray-950 flex dark:hover:bg-zinc-500 hover:text-white hover:p-3 rounded-full'
                  key={item.id} href={`/${params.lang}/${link || item.phrase}`}
                >
                  {item.phrase}
                </Link>
                )
              })}
            </ul>
          </motion.div>
        </>
        )}
      </div>

      <div className="flex items-center gap-4 mr-6">
        <Link className='group text-white p-4 flex items-center gap-2 text-[1.35rem] cursor-pointer rounded-full transition-all ease-in-out bg-black hover:bg-gray-500 dark:text-zinc-50 w-auto dark:bg-zinc-700 hover:scale-110 hover:text-black dark:hover:bg-zinc-500 dark:border-2 dark:border-white' href='https://github.com/CAIOZIn1/Prolog-Next' target='_blank'>
          <FiGithub />
        </Link>

        <div
          className='flex items-center justify-between w-[125px] rounded-full border-2 border-black dark:border-white'>
          <button className='group text-zinc-50 p-4 flex items-center gap-2 text-[1.50rem] cursor-pointer rounded-full transition-all ease-in-out bg-black dark:bg-transparent' onClick={toggleLightTheme}>
            <PiSunBold className='text-2xl'/>
          </button>

          <button className='group dark:text-zinc-50 text-black p-4 flex items-center gap-2 cursor-pointer rounded-full transition-all ease-in-out dark:bg-zinc-700' onClick={toggleDarkTheme}>
            <MdNightlight className='text-2xl'/>
          </button>
        </div>

        <Link className='group text-white p-4 flex items-center gap-2 text-[1.35rem] cursor-pointer rounded-full transition-all ease-in-out bg-black hover:bg-gray-500 dark:text-zinc-50 w-auto dark:bg-zinc-700 hover:scale-110 hover:text-black dark:hover:bg-zinc-500 dark:border-2 dark:border-white' href={langIsPtBR ? '/en-US' : '/pt-BR'}>
          <IoLanguage className='text-2xl' />
        </Link>
      </div>

      { !notIsMobile && (
        <>
          {isMenuOpen && (
            <div className='group text-white p-4 flex flex-col items-center gap-11 mt-2 text-[1.35rem] cursor-pointer rounded-full bg-black dark:text-zinc-50 w-auto dark:bg-zinc-700 hover:scale-110 hover:text-black hover:bg-zinc-500 dark:border-2 dark:border-white absolute right-[42px] bottom-[29px] h-[250px] min-w-[54px] transition-all ease-in-out delay-700' >
              <button className='mt-1'>
                <BsInfoLg />
              </button>

              <button>
                <MdOutlineSearch />
              </button>

              <button>
                <IoDocumentAttachOutline />
              </button>
            </div>
          )}

          <button className='group fixed text-white p-4 flex items-center gap-2 text-[1.35rem] cursor-pointer rounded-full transition-all ease-in-out bg-black dark:text-zinc-50 w-auto dark:bg-zinc-700 hover:scale-110 hover:text-black hover:bg-zinc-500 dark:border-2 dark:border-white right-10 bottom-7 border-2 ' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CgClose className='font-bold'/> : <GiHamburgerMenu />}
          </button>
        </>
      )}
    </header>
  );
}
