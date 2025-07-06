import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { assets } from '../assets/assets_frontend/assets';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div
      ref={headerRef}
      className='flex flex-col md:flex-row flex-wrap bg-primary rounded-3xl px-6 md:px-10 lg:px-20 overflow-hidden'
    >
      {/* Left Side */}
      <motion.div
        className='md:w-1/2 flex flex-col items-center md:items-start justify-center gap-6 md:gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-extrabold leading-tight md:leading-tight text-center md:text-left'>
          Book Appointment<br />
          With Trusted Doctors
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-medium'>
          <img src={assets.group_profiles} alt="group" className='w-12 h-12 object-contain' />
          <p className='text-white text-center md:text-left max-w-md'>
            Consult top-rated specialists, instantly. Trusted by thousands of patients nationwide.
          </p>
        </div>

        <motion.a
          href="#speciality"
          className='flex items-center gap-3 bg-white py-4 px-7 rounded-full text-gray-700 font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105'
          whileHover={{ scale: 1.07 }}
        >
          Book Appointment
          <img className='w-3' src={assets.arrow_icon} alt="arrow" />
        </motion.a>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className='md:w-1/2 relative flex justify-center items-end'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img
          className='w-full md:absolute bottom-0 h-auto rounded-xl max-w-[500px] md:max-w-full'
          src={assets.header_img}
          alt="header"
        />
      </motion.div>
    </div>
  );
};

export default Header;
