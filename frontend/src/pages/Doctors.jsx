import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [Filterdoc, SetFilterdoc] = useState([]);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const gridRef = useRef(null);

  // Apply GSAP animation when filter/grid is in view
  useGSAP(() => {
    if (filterRef.current) {
      gsap.from(filterRef.current, {
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (gridRef.current) {
      gsap.from(gridRef.current, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, []);

  const applyfilter = () => {
    if (speciality) {
      SetFilterdoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      SetFilterdoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [doctors, speciality]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="px-4 md:px-10 py-8"
    >
      <p className="text-gray-600 text-lg font-semibold mb-4">
        Browse Through the Doctors Specialist
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Filter Button on Small Screen */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-2 px-4 border rounded text-sm font-medium transition-all sm:hidden outline-none ${
            showFilter ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          Filters
        </button>

        {/* Filter List */}
        <div
          ref={filterRef}
          className={`${
            showFilter ? 'flex' : 'hidden sm:flex'
          } flex-col gap-3 sm:gap-4 text-sm text-gray-700 font-medium w-full sm:w-auto`}
        >
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist',
          ].map((item) => (
            <motion.p
              key={item}
              onClick={() =>
                speciality === item
                  ? navigate('/doctors')
                  : navigate(`/doctors/${item}`)
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-[180px] text-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer transition-all
              ${
                speciality !== item
                  ? 'bg-gray-100 text-gray-800 hover:bg-green-200 hover:text-gray-900'
                  : 'bg-green-500 text-white shadow-md hover:bg-green-600'
              }`}
            >
              {item}
            </motion.p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div
          ref={gridRef}
          className="w-full grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 px-1 sm:px-0"
        >
          {Filterdoc.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-indigo-50 shadow-sm hover:shadow-lg transition-all duration-300 p-3"
            >
              <img
                src={item.image}
                alt=""
                className="bg-blue-50 w-full h-[150px] object-cover rounded-md mb-2"
              />
              <div className="flex items-center gap-2 text-sm mb-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.availlable ? 'bg-green-500' : 'bg-red-400'
                  }`}
                ></div>
                <p
                  className={`${
                    item.availlable ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {item.availlable ? 'Available' : 'Unavailable'}
                </p>
              </div>
              <p className="text-gray-900 text-base font-semibold">
                {item.name}
              </p>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;
