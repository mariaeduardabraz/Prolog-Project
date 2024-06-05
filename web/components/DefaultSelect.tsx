'use client';

import 'dotenv/config'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa6';
import { LuLoader2 } from 'react-icons/lu';
import { Locale } from '@/config/i18n.config';
import { getDictonaryUseClient } from '@/dictionaries/default-dictionary-use-client';
import { Movie, MoviesRecomender } from '@/utils/backupRequest';

interface itemProps {
  phrase: string;
  value: string;
}

interface DefaultSeletcProps {
  gener: itemProps[];
  styleMovie: itemProps[];
  params: { lang: Locale }
}

export function DefaultSeletc({ gener, styleMovie, params }: DefaultSeletcProps) {
  const dict = getDictonaryUseClient(params.lang);

  const [isOpenGener, setIsOpenGener] = useState(false);
  const [isOpenStyleMovie, setIsOpenGenerStyleMovie] = useState(false);
  const [generValue, setGenerValue] = useState(gener[0]);
  const [styleMovieValue, setstyleMovieValue] = useState(styleMovie[0]);

  const [load, setLoad] = useState(false);
  const [hasMovies, setHasMovies] = useState(false);

  const [infoMovies, setInfoMovies] = useState<any>({});

  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  const handleSubmit = async () => {
    let recommendations = [];

    setLoad(true);
    try {
      const res = await fetch('http://localhost:8000/recomendacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genero: generValue.value, estilo: styleMovieValue.value }),
      });

      const data = await res.json();
      recommendations = data.recomendacoes;
      setRecommendations(recommendations);
    } catch (err) {
      const loadedRecommendations = MoviesRecomender(generValue.value, styleMovieValue.value);
      recommendations = loadedRecommendations || [];
      setRecommendations(recommendations);
    } finally {
      if (recommendations.length > 0) {
        const randomNum: number = Math.floor(Math.random() * recommendations.length);
        const movieName = recommendations[randomNum].nome;

        const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY || '7a5f170e'}&t=${encodeURIComponent(movieName)}`);
        const info = await response.json();

        setInfoMovies(info);
        setHasMovies(false);
      } else {
        setHasMovies(true);
      }

      setLoad(false);
    }
  };

  return (
    <>
      <nav className='flex flex-col gap-14 items-center justify-evenly'>
        <div className='flex justify-center gap-3'>
          <span className='text-2xl font-bold uppercase'>
            {dict.select.gener}
          </span>

          <div className='flex flex-col gap-3'>
            <motion.button
              className='flex w-[200px] h-[40px] items-center justify-around rounded-lg bg-pink-50 gap-2'
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpenGener(!isOpenGener)}
            >
              <span className='dark:text-zinc-950'>
                {generValue.phrase}
              </span>

              <motion.div
                className="arrow"
                style={{ originX: 0.5, originY: 0.55 }}
                animate={{ rotate: isOpenGener ? 180 : 0 }}
              >
                <svg width="15" height="15" viewBox="0 0 20 20">
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg>
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isOpenGener && (
                <motion.ul
                  className="pointer-events-auto bg-pink-50 text-lg font-thin w-[200px] p-4 gap-5 dark:text-zinc-950"
                  style={{ clipPath: isOpenGener ? "inset(0% 0% 0% 0% round 10px)" : "inset(10% 50% 90% 50% round 10px)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {gener.map(item => (
                    <motion.li
                      className='hover:bg-pink-100 p-2 cursor-pointer w-full'
                      onClick={() => {
                        setGenerValue(item);
                        setIsOpenGener(false);
                      }}
                      key={item.value}
                      initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    >
                      {item.phrase}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className='flex justify-center gap-3'>
          <span className='text-2xl font-bold uppercase'>
            {dict.select.style}
          </span>

          <div className='flex flex-col gap-3'>
            <motion.button
              className='flex w-[200px] h-[40px] items-center justify-around rounded-lg bg-pink-50 gap-2'
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpenGenerStyleMovie(!isOpenStyleMovie)}
            >
              <span className='dark:text-zinc-950'>
                {styleMovieValue.phrase}
              </span>

              <motion.div
                className="arrow"
                style={{ originX: 0.5, originY: 0.55 }}
                animate={{ rotate: isOpenStyleMovie ? 180 : 0 }}
              >
                <svg width="15" height="15" viewBox="0 0 20 20">
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg>
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isOpenStyleMovie && (
                <motion.ul
                  className="pointer-events-auto bg-pink-50 text-lg font-thin w-[200px] p-4 gap-5 dark:text-zinc-950"
                  style={{ clipPath: isOpenStyleMovie ? "inset(0% 0% 0% 0% round 10px)" : "inset(10% 50% 90% 50% round 10px)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {styleMovie.map(item => (
                    <motion.li
                      className='hover:bg-pink-100 p-2 cursor-pointer w-full '
                      onClick={() => {
                        setstyleMovieValue(item);
                        setIsOpenGenerStyleMovie(false);
                      }}
                      key={item.value}
                      initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    >
                      {item.phrase}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>


        <button
          className='group flex justify-center items-center w-[200px] h-[30px] bg-gray-950 p-6 text-white gap-4 hover:scale-[1.1] hover:bg-gray-950 rounded-full outline-none transition-all font-semibold text-lg'
          onClick={() => handleSubmit()}
          disabled={load}
        >
          {dict.select.search}
          <FaPaperPlane className="text-base opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </button>


        {load ? (
          <LuLoader2 className='animate-spin text-3xl mt-6 text-black rounded-full dark:text-white' />
        )
          : recommendations.length > 0 ? (
            <>
              <h2 className='font-extrabold text-6xl mt-10'>
                {dict.select.results}
              </h2>

              <div className='flex flex-col justify-center w-1/2'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={infoMovies.Poster} alt='image movie' className='animate-[wiggle_1s_ease-in-out_infinite] w-[200px] self-center' />
                <p className='text-lg mt-10'>
                  {dict.select.about} {infoMovies.Plot}
                </p>
                <p className='text-lg'>
                  {dict.select.director} {infoMovies.Director}
                </p>
                <p className='text-lg'>
                  {dict.select.actors} {infoMovies.Actors}
                </p>
                <p className='text-lg'>
                  {dict.select.awards} {infoMovies.Awards === 'N/A' ? 'Sem prêmios' : infoMovies.Awards}
                </p>
                <p className='text-lg'>
                  {dict.select.year} {infoMovies.Year}
                </p>
                <p className='text-lg'>
                  {dict.select.name} {infoMovies.Title}
                </p>
              </div>

              <div className='flex flex-col items-center justify-center gap-6 mb-10'>
                <span className='font-extrabold text-3xl'>{dict.select.moreResults}</span>
                <ul className='flex gap-10 list-disc'>
                  {recommendations?.map((item, index) => (
                    <li key={index}>{item.nome}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : hasMovies && (
            <div>
              <h2 className='text-red-600 text-6xl mt-10'>
                {dict.select.noSearch}
              </h2>
            </div>
          )}
      </nav>
    </>
  )
}
