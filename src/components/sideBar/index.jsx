import { Link, useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import Notes from "../../Images/2230140.png";
import "./sidebar.css";
import toast from "react-hot-toast";

const SideBar = () => {
const navigate=useNavigate();


  const handleLogout=()=>{
    localStorage.removeItem("userToken")
    toast.success("Logged out successfully!",{duration:2000,className:"text-success px-4 fw-bolder"});
      navigate("/signin");
  }





  return (
    <div className=" col-2 col-sm-2 bg-dark d-flex align-items-center  flex-column min-vh-100">
      <div className="d-flex align-items-center my-5">
        <h3 className=" fw-bold  d-none d-lg-inline-block">Notes</h3>
        <img className=" ms-0 ms-md-3" src={Notes} alt="Notes" />
      </div>

      <div className=" d-flex flex-column align-items-center ">
        <Link className="text-decoration-none text-white fs-4 " to="/">
          <span className=" d-none d-lg-inline-block">Register</span>
          <BiSolidUser className=" ms-0 ms-md-3" />
        </Link>

        <Link onClick={handleLogout} className="text-decoration-none text-white fs-4 d-inline-block mt-5 ">
          <span className=" d-none d-lg-inline-block">Logout</span>
          <FiLogIn className=" ms-0 ms-md-3" />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
