import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Myprofile = () => {
  const { userData, setUserData,token,backendURL,loadUserProfileData} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
 
  const [image,setImage]=useState(false)

  const updateUserProfileData=async()=>{
    try {
      const formData=new FormData()

      formData.append('username',userData.username)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      
      image && formData.append('image',image)

      const {data}=await axios.post(backendURL+'/api/user/update-profile',formData,
        {
          headers:{token}
        }
      )

      if(data.success)
      {

    await    loadUserProfileData()
        toast.success(data.message)
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }

  }
  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
     
     {
      isEdit ?
      <label htmlFor="image">
        <div className='inline-block relative cursor-pointer'>
          <img className='w-36  rounded-lg opacity-75' src={image ? URL.createObjectURL(image):userData.image || assets.profile_pic} alt="" />
          <img className='w-10 bg-gray-00 absolute bottom-12 right-12' src={image ?'':assets.upload_icon} alt="" />
        </div>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id='image' hidden/>
      </label>
      :<img
        className='w-36 rounded'
        src={userData.image || assets.profile_pic}
        alt="Profile"
      />
     }
     
      

      {isEdit ? (
        <input
          className='bg-gray-50  text-3xl font-medium max-w-60 mt-4'
          type="text"
          value={userData.username}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-700 mt-4'>
          {userData.username}
        </p>
      )}

      <hr className='bg-zink-500 h-[1px] border-none' />

      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-500'>
          <p>Email id:</p>
          <p className='text-blue-400'>{userData.email}</p>

          <p className='font-medium'>Phone</p>
          {isEdit ? (
            <input
              className='bg-gray-50 max-w-52'
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className='text-blue-400'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address</p>
          {isEdit ? (
            <div>
              <input
                className='bg-gray-50'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br />
              <input
                className='bg-gray-50'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </div>
          ) : (
            <p className='text-neutral-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className='underline mt-3 font-medium text-gray-600'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-600'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='max-w-20 bg-gray-100'
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p>Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      {isEdit ? (
        <button 
          className='border border-primary px-8 py-2 rounded-full max-w-2/3 hover:bg-primary hover:text-white transition-all'
          onClick={updateUserProfileData}
        >
          Save Information
        </button>
      ) : (
        <button
          className='border border-primary px-8 py-2 rounded-full max-w-2/3 hover:bg-primary hover:text-white transition-all'
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default Myprofile;
