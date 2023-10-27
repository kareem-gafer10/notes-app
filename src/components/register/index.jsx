import React, { useState } from "react";
import signUpImage from "../../Images/Add notes-bro.png";
import { BiSolidUser } from "react-icons/bi";
import { BsEnvelopeCheck,BsFillLockFill,BsFillTelephoneFill,BsGlobe} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import baseInstance from "../../Networking/baseInstance";
import RingLoader from "react-spinners/ClipLoader";
import Styles from "./register.module.css";



const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();




  const handleRegister= async(values)=>{
    try {
      setLoading(true)
     const {data}= await baseInstance.post("users/signUp",values)
     if(data.msg){
      toast.success(data.msg,{duration:2000,className:"text-success px-4 fw-bolder"});
      setLoading(false)
      navigate("/signin")
     }
    } catch (error) {
      toast.error(error.response.data.msg,{duration:2000,className:"text-danger px-4 fw-bolder"});
      setLoading(false)
    }
   
  }

  const validationRegister=Yup.object({
    name :Yup.string().min(3,"Name Must Be More Than 3 Characters and Less Than 10 Characters")
    .max(10,"Name Must Be More Than 3 Characters and Less Than 10 Characters")
    .required('*Your Name is required'),
    email:Yup.string().required('*Your email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Email must be valid email"'),
    password:Yup.string().required("*Your password is required")
    .matches(/^[A-Z][a-z0-9]{5,10}$/i,"Your password must start with an uppercase letter and be between 5 and 10 characters"),
    age:Yup.number().min(18,"*Your age must bigger than 18")
    .max(60,"*Your age must lower than 60").required("Your age is required"),
    phone:Yup.string().required("*Your phone is required")
    .matches(/^01[0125][0-9]{8}$/i,"Your Phone must be an Egyptian number")
  })
 


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password:"",
      age:"",
      phone:""
    },
    validationSchema:validationRegister,
    onSubmit:handleRegister
  });














  return (
    <section className=" my-5 ">
      <div className=" container-lg">
        <div className="row align-items-center bg-white rounded-5 mx-auto">

          <div className="col-md-6">

            <div className={Styles.signUp}>
              <h2 className=" fw-bold">Sign up</h2>

              <form onSubmit={formik.handleSubmit} className=" mt-4">
                <div className="form-group d-flex align-items-center mb-2">
                  <label htmlFor="name">
                    <BiSolidUser size="1.4rem" className="me-3" />
                  </label>
                  <input
                    className=" form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.name && formik.errors.name ? (
                  <small className=" text-danger d-block mb-2">{formik.errors.name}</small>
                ) : null}


                <div className="form-group d-flex align-items-center mb-2">
                  <label htmlFor="email">
                    <BsEnvelopeCheck size="1.4rem" className="me-3" />
                  </label>
                  <input
                    className=" form-control"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.email && formik.errors.email ? (
                  <small className=" text-danger d-block mb-2">{formik.errors.email}</small>
                ) : null}

                <div className="form-group d-flex align-items-center mb-2">
                  <label htmlFor="password">
                    <BsFillLockFill size="1.4rem" className="me-3" />
                  </label>
                  <input
                    className=" form-control"
                    type="password"
                    name="password"
                    autoComplete="off"
                    id="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.password && formik.errors.password ? (
                  <small className=" text-danger d-block mb-2">{formik.errors.password}</small>
                ) : null}


                <div className="form-group d-flex align-items-center mb-2">
                  <label htmlFor="phone">
                    <BsFillTelephoneFill size="1.4rem" className="me-3" />
                  </label>
                  <input
                    className=" form-control"
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.phone && formik.errors.phone ? (
                  <small className=" text-danger d-block mb-2">{formik.errors.phone}</small>
                ) : null}


                <div className="form-group d-flex align-items-center mb-2">
                  <label htmlFor="age">
                    <BsGlobe size="1.4rem" className="me-3" />
                  </label>
                  <input
                    className=" form-control"
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Age"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.age && formik.errors.age ? (
                  <small className=" text-danger d-block mb-2">{formik.errors.age}</small>
                ) : null}


                <button type="submit" disabled={!(formik.isValid && formik.dirty)} 
                className=" btn btn-danger px-3 mt-3">
                { loading ? <RingLoader color="white" size={18}/>  : "Sign Up"}
                </button>

                



                <p className=" mt-5">
                  Have an Account ?
                  <Link to="/signin" className="text-primary mx-3">
                   Sign In
                  </Link>
                </p>
              </form>
            </div>

          </div>

          <div className=" col-md-6">
            <img className="w-100 " src={signUpImage} alt="singUp" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
