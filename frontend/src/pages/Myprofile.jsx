import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets.js';

const Myprofile = () => {
  const [userdata, setUserdata] = useState({
    name: "madhujya",
    image: assets.profile_pic,
    email: "rajkhowa@gmail.com",
    phone: "+91 000 000 0000",
    address: {
      line1: "India Assam",
      line2: "785632",
    },
    gender: "Male",
    dob: "11-07-2005",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userdata.image} alt="Profile" />

      {isEdit ? (
        <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 '
          type="text"
          value={userdata.name}
          onChange={(e) =>
            setUserdata((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-700 mt-4'>{userdata.name}</p>
      )}

      <hr className='bg-zink-500 h-[1px] border-none'/>

      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-500'>
          <p>Email id:</p>
          <p className='text-blue-400'>{userdata.email}</p>

          <p className='font-medium'>Phone</p>
          {isEdit ? (
            <input
             className='bg-gray-50 max-w-52'
              type="text"
              value={userdata.phone}
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className='text-blue-400'>{userdata.phone}</p>
          )}

          <p className='font-medium'>Address</p>
          {isEdit ? (
            <div>
              <input
              className='bg-gray-50'
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userdata.address.line1}
                type="text"
              />
              <br />
              <input
              className='bg-gray-50'
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userdata.address.line2}
                type="text"
              />
            </div>
          ) : (
            <p className='text-neutral-500'>
              {userdata.address.line1}
              <br/>
              {userdata.address.line2}
            </p>
          )}
        </div> 
      </div>
      <div>
        <p className='underline mt-3 font-medium text-gray-600'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-600'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit 
            ?<select className='max-w-20 bg-gray-100' name="" id="" onChange={(e)=>setUserdata(prev=>({...prev,gender:e.target.value}))} value={userdata.gender} >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p >{userdata.gender}</p>
          }

           <p>Birthday:</p>
          {
            isEdit 
            ? <input type="date" onChange={(e)=>setUserdata(prev=>({...prev,dob:e.target.value}))} value={userdata.dob}  />
            : <p>{userdata.dob}</p>
          }
        </div>
      </div>
      
      {
        isEdit 
        ? <button className='border border-primary px-8 py-2 rounded-full max-w-2/3 hover:bg-primary hover:text-white transition-all' onClick={(e)=>setIsEdit(false)}>Save Information</button>
        :  <button className='border border-primary px-8 py-2 rounded-full max-w-2/3 hover:bg-primary hover:text-white transition-all'  onClick={(e)=>setIsEdit(true)}>Edit</button>
      }
    </div>
  );
};

export default Myprofile;