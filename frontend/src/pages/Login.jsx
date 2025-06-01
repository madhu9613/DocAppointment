import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("sign up");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
  event.preventDefault();
  console.log({ username, email, password });
  };

  
  return (
  
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={onSubmitHandler} className="p-6 bg-white shadow-lg  border border-stone-300 rounded-lg text-zinc-600">
        <h2 className="text-2xl font-bold">
          {state === "sign up" ? "Create Account" : "Login"}
        </h2>
        <p className="mb-4">
          Please {state === "sign up" ? "sign up" : "log in"} to book an appointment.
        </p>

        {state === "sign up" && (                                                                                                                                     
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
          {state === "sign up" ? "Create Account" : "Log In"}
        </button>

        <p className="mt-3 text-sm">
          {state === "sign up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setState(state === "sign up" ? "login" : "sign up")}
          >
            {state === "sign up" ? "Log in" : "Sign up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
