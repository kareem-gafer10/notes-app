import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import Notes from "../../Images/2230140.png";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaBars} from "react-icons/fa"
import toast from "react-hot-toast";
import "./sidebar.css";


const SideBar = () => {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 const navigate=useNavigate();


   const handleLogout=()=>{
     localStorage.removeItem("userToken")
     toast.success("Logged out successfully!",{duration:2000,className:"text-success px-4 fw-bolder"});
       navigate("/signin");
   }




  return (
    <div className="col-2 col-sm-2 d-flex align-items-center bg-dark vh-100  flex-column min-vh-100 pt-5 sidebar">
       <Button variant="dark" onClick={handleShow}>
        <FaBars size="1.5rem"/>
      </Button>

      <Offcanvas className=" bg-light sidebarWidth" show={show} onHide={handleClose}>
        <Offcanvas.Header className=" text-dark" closeButton>
              <div className=" d-flex align-items-center my-5">
              <img className=" me-0 me-md-3 sidebarImg" src={Notes} alt="Notes" />
              <Offcanvas.Title className="fw-bold  d-none d-lg-inline-block fs-4">Notes</Offcanvas.Title>
            </div>
        </Offcanvas.Header>



        <Offcanvas.Body>
        <div className=" d-flex flex-column align-items-center ">
         <Link className="text-decoration-none text-dark fs-4 " to="/">
           <span className=" d-none d-lg-inline-block">Register</span>
           <BiSolidUser className=" ms-0 ms-md-3" />
         </Link>

         <Link onClick={handleLogout} className="text-decoration-none text-dark fs-4 d-inline-block mt-5 ">
           <span className=" d-none d-lg-inline-block">Logout</span>
           <FiLogIn className=" ms-0 ms-md-3" />
         </Link>
       </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default SideBar
