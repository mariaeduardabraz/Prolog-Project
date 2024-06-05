'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa6';

export function ArrowDown() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, .25], [.15, .25])

  return (
    <div className="fixed -bottom-16 left-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full animate-bounce transition-all ease-linear">
      <motion.div
        className="w-full h-full overflow-hidden bg-white rounded-full"
        style={{ scale }}
      >
        <div className='w-[85%] h-[85%] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-full'>
          <div className='flex w-full h-full items-center justify-center'>
            <FaArrowDown className='w-[150px] h-[150px] text-black'/>
          </div>
        </div>

        <motion.div className='w-full h-full flex items-center justify-center bg-green-300 dark:bg-red-400 origin-bottom -z-10' style={{ scaleY: scrollYProgress }}>
        </motion.div>
      </motion.div>
    </div>
  )
}
