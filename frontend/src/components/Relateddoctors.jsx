import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Relateddoctors = ({ speciality, docID }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setrelDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsdata = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docID);
            setrelDoc(doctorsdata);
        }
    }, [doctors, speciality, docID]);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium text-blue-950'>Top Doctors To Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-500'>Simply browse through our extensive list of trusted doctors</p>
            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0);}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300'>
                        <img src={item.image} alt="" className='bg-blue-50' />
                        <div className='flex items-center gap-2 text-sm text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                            <p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-500 text-sm'>{item.speciality}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Relateddoctors;
