import { useContext, useState } from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import "../../styles/login.css";

const Signup = () => {
  const {createUser}=useContext(AuthContext);
  const [error,setError]=useState({
    emailError:'',
    passwordError:'',
    confirmPasswordError:'',
  });
  const [userInfo,setUserInfo]=useState({
    email:'',
    password:'',
    confirmPassword:''
  });

  const navigate=useNavigate()

  // console.log(userInfo.email,userInfo.password)


  const handleEmailChange=(event)=>{
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email)){
      setError({...error,emailError:'Please Provide a valid Email'})
      setUserInfo({...userInfo,email:event.target.value})
    }else{
      setUserInfo({...userInfo,email:event.target.value})
      setError({...error,emailError:''})
    }
  }
  
  const handlePasswordChange=(event)=>{
    if((event.target.value).length<6){
      setError({...error,passwordError:'must be at least 6 charectors'})
    }else{
      setUserInfo({...userInfo,password:event.target.value})
      setError({...error,passwordError:''})
    }
  }

  const handleConfirmPasswordChange=(event)=>{
    if((event.target.value)===userInfo.password){
      // setUserInfo({...userInfo,confirmPassword:event.target.value})
      setError({...error,confirmPasswordError:''})
    }else{
      setError({...error,confirmPasswordError:'password not matched'})
    }
  }

  const handleCreateUser=(e)=>{
    e.preventDefault();
    createUser(userInfo.email,userInfo.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      Swal.fire({
        icon: 'success',
        title: 'Sign up',
        text:'Sign up Successfully',
      })
      navigate('/')
    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'sign up',
        text:errorMessage,
      })
    });
  }

  return (
    <div className="login-container">
      <div className="login-title">Sign up <SiGnuprivacyguard /></div>
      <form className="login-form" onSubmit={handleCreateUser}>
        <input onChange={handleEmailChange} type="text" placeholder="Your Email" />
        <p className="text-red-500">{error.emailError}</p>
        <input onChange={handlePasswordChange} placeholder="password" />
        <p className="text-red-500">{error.passwordError}</p>
        <input onChange={handleConfirmPasswordChange} type="password" placeholder="confirm password" required/>
        <p className="text-red-500">{error.confirmPasswordError}</p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
