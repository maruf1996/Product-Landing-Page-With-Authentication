import React, { useContext } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import "../../styles/login.css";

const Login = () => {
  const {signIn,signInGoogle}=useContext(AuthContext);
  const navigate=useNavigate()
  const location=useLocation()
  const from=location.state?.from?.pathname||'/'

  const handleSignIn=(e)=>{
    e.preventDefault();
    const form=e.target;
    const email=form.email.value;
    const password=form.password.value;

    signIn(email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      navigate(from,{replace:true})
      Swal.fire({
        icon: 'success',
        title: 'Sign in',
        text:'Sign in Successfully',
      })
    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'sign in',
        text:errorMessage,
      })
    });
  }

  const handleSignInGoogle=()=>{
    signInGoogle()
    .then((result) => {
      const user = result.user;
      console.log(user)
      Swal.fire({
        icon: 'success',
        title: 'Sign in google',
        text:'Sign in Successfully',
      })
    }).catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'sign in google',
        text:errorMessage,
      })
    });
  }

  
  return (
    <div className="login-container">
      <div className="login-title">
        Login
        <BiLogInCircle />
      </div>
      <form onSubmit={handleSignIn} className="login-form">
        <input type="text" name="email" placeholder="Your Email" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign up first</Link>
        </p>
      </form>

      <button onClick={handleSignInGoogle}>Google</button>
    </div>
  );
};

export default Login;
