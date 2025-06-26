import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Login = () => {


  const navigate=useNavigate()
  const { backendURL, token, setToken } = useContext(AppContext)

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") { //register user

        const { data } = await axios.post(backendURL + '/api/user/register',
          {
            username,
            password,
            email
          }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }

      }
      else {
        //it will be an login api

        const { data } = await axios.post(backendURL + '/api/user/login',
          {

            password,
            email
          }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }




      }

    } catch (error) {
      toast.error(error.message)

    }

  };

  useEffect(()=>{

    if(token)
    {
      navigate('/')
    }
  },[token])
  

  return (

    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={onSubmitHandler} className="p-6 bg-white shadow-lg  border border-stone-300 rounded-lg text-zinc-600">
        <h2 className="text-2xl font-bold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="mb-4">
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to book an appointment.
        </p>

        {state === "Sign Up" && (
          <div className="mb-3">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="mt-3 text-sm">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setState(state === "Sign Up" ? "login" : "Sign Up")}
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
