import React, { useContext, useState } from "react";
import { Auth } from "../context/Auth";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const {signup,login} = useContext(Auth)
  
  const onSubmitHandler = async(event)=>{
    event.preventDefault()
    if(currentState === 'Login'){
      const user = await login(email,password) //this login will return user object
      if(user){
          if(user.role === 'admin'){ // if its admin it redirect to admin page
            navigate('/admin')
          }
          else{
            navigate('/women') // else it redirect to home page
          }
      }
    } else{
      const sus = await signup(name,email,password)
      if(sus){
        setCurrentState('Login') //  after user signup it redirect to login page
        setEmail('')
        setPassword('')
      }
    }
  }

  const switchToLogin = (e)=>{
    e.preventDefault()
    setCurrentState('Login')
    setEmail('')
    setPassword('')
  }

  const switchToSignup = (e)=>{
    e.preventDefault()
    setCurrentState('Sign Up')
    setName('')
    setEmail('')
    setPassword('')
  }



  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 "
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10  ">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? null : (       
        <input                                                     // name input box
          type="text"          
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      )}

      <input                                                       // email input box
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input                                                       // password input box
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p onClick={switchToSignup} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={switchToLogin}  className="cursor-pointer">
            Login here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
