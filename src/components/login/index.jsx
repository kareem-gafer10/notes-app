import React, { useState } from "react";
import signInImage from "../../Images/Notebook-cuate.png";
import {BsEnvelopeCheck,BsFillLockFill} from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import RingLoader from "react-spinners/ClipLoader";
import baseInstance from "../../Networking/baseInstance";
import Styles from "./login.module.css";




const Login = () => {

  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();


  const handleLogin= async(values)=>{
    try {
      setLoading(true)
     const {data}= await baseInstance.post("users/signIn",values)
     if(data.msg){
      toast.success(data.msg,{duration:2000,className:"text-success px-4 fw-bolder"});
      setLoading(false)
      localStorage.setItem('userToken',`3b8ny__${data.token}`)
      navigate("/notes")
     }
    } catch (error) {
      toast.error(error.response.data.msg,{duration:2000,className:"text-danger px-4 fw-bolder"});
      setLoading(false)
    }
   
  }

  const validationLogin=Yup.object({
    email:Yup.string().required('*Your email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Email must be valid email"'),
    password:Yup.string().required("*Your password is required")
    .matches(/^[A-Z][a-z0-9]{5,10}$/i,"Your password must start with an uppercase letter and be between 5 and 10 characters")
  })
 

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password:"",
      age:"",
      phone:""
    },
    validationSchema:validationLogin,
    onSubmit:handleLogin
  });



  
  return (
    <section className=" my-5 ">
    <div className="container-lg">
      <div className="  row flex-row-reverse align-items-center bg-white rounded-5 mx-auto">


        <div className="col-md-6">

          <div className={Styles.signIn}>
            <h2 className=" fw-bold">Sign In</h2>

            <form onSubmit={formik.handleSubmit} className=" mt-4">


              <div className="form-group d-flex align-items-center mb-4">
              <label htmlFor="email">
                <BsEnvelopeCheck size="1.4rem" className="me-3"/>
              </label>
              <input
               className=" form-control"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              </div>

              {formik.touched.email && formik.errors.email ? (
                  <small className=" text-danger d-block mb-2">{formik.errors.email}</small>
                ) : null}

              <div className="form-group d-flex align-items-center mb-4">
              <label htmlFor="password">
                <BsFillLockFill size="1.4rem" className="me-3"/>
              </label>
              <input
               className=" form-control"
                type="password"
                name="password"
                autoComplete="off"
                id="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              </div>

              {formik.touched.password && formik.errors.password ? (
                  <small className=" text-danger d-block mb-2">{formik.errors.password}</small>
                ) : null}


              <button disabled={!(formik.isValid && formik.dirty)}  type="submit" 
              className=" btn btn-danger">
              { loading ? <RingLoader color="white" size={18}/>  : " Sign In"} 
              </button>

              <p className=" mt-5">
              Don't Have an Account ?
              <Link to="/"  className='text-primary mx-2'>
              Sign Up
              </Link>
              </p>

            </form>
          </div>
        </div>


        <div className=" col-md-6">
          <img className="w-100" src={signInImage} alt="singUp" />
        </div>


      </div>
    </div>
  </section>
  )
}

export default Login;
