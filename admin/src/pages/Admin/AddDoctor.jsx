import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {
  const [docimg, setDocimg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { aToken, backendURL } = useContext(AdminContext)
 
     
  
     const onSubmitHandler = async (event) => {
         event.preventDefault()
 
     
 
        try {
            if(!docimg)
            {
               return toast.error("image not selected")
            }

            const formData=new  FormData()
            formData.append('image',docimg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON
                .stringify({line1:address1,line2:address2}))


//formdata 
formData.forEach((value,key)=>{
    console.log(`${key}:${value}`);
    
})


const {data}=await axios.post(backendURL+'/api/admin/add-doctor',formData,
    {
        headers:{aToken}
    }
)

if(data.success)
{ toast.success(data.message)
    setAbout('')
    setAddress1('')
    setDegree('')
    setDocimg(false)
    setEmail('')
    setExperience('')
    setName('')
    setPassword('')
   
}
else{
    toast.error(data.message)
}

        } catch (error) {



             toast.error(error.message)
            console.log(error);
            
        }

     }

  
  return (
    <form onSubmit={onSubmitHandler} className="w-full m-5 text-gray-600" action="">
      <p className="text-2xl font-semibold mb-4 text-primary">Add Doctor</p>

      <div className="bg-white px-8 py-3 w-full max-w-4xl max-h-[80vh] overflow-y-scroll rounded-lg shadow">
        {/* Image Upload Section */}
        <div className="flex items-center gap-3 mb-8 text-gray">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
              alt=""
              className="w-28 h-28 object-cover rounded-full border"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
            onChange={(e) => setDocimg(e.target.files[0])}
          />
          <p className="text-sm text-gray-600 border-gray-300">
            Upload doctor <br /> Picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="mb-1 font-medium">Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <p className="mb-1 font-medium">Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <p className="mb-1 font-medium">Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
           

            <div>
              <p className="mb-1 font-medium">Experience</p>
              <select
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                {Array.from({ length: 9 }, (_, i) => (
                  <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                ))}
                <option value="10+ Year">10+ Year</option>
              </select>
            </div>

            <div>
              <p className="mb-1 font-medium">Fees</p>
              <input
                type="number"
                placeholder="Fees"
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-1 font-medium">Speciality</p>
              <select
                required
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="mb-1 font-medium">Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <p className="mb-1 font-medium">Address</p>
              <input
                type="text"
                placeholder="Address 1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Address 2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <p className="mb-1 mt-4 font-medium">About</p>
          <textarea
            placeholder="About"
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full border px-3 py-2 rounded h-24 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 mt-4 rounded hover:bg-primary-dark transition"
        >
          Add doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
