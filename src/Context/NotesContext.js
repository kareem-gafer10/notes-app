import { createContext, useEffect, useState } from "react";
import baseInstance from "../Networking/baseInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const NotesContext = createContext();

const NotesContextProvider = ({ children }) => {
  const [userNotes, setUserNotes] = useState([]);

  const getUserNotes = async () => {
    try {
      const { data } = await baseInstance.get("notes", {
        headers: {   token: localStorage.getItem("userToken"), },
      });
      setUserNotes(data.notes);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.msg, {
      //   duration: 2000,
      //   className: "text-danger px-4 fw-bolder",
      // });
    }
  };


  useEffect(() => {
    getUserNotes()
  }, []);


  const handleDelete = async (_id) => {
    try {
      const { data } = await baseInstance.delete(`notes/${_id}`, {
        headers: {   token: localStorage.getItem("userToken"), },
      });
      setUserNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
    } catch (error) {
      toast.error(error.response.data.msg, {
        duration: 2000,
        className: "text-danger px-4 fw-bolder",
      });
    }
  };

 

const Sweet = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
};

  



  return (
    <NotesContext.Provider
      value={{ getUserNotes, userNotes, handleDelete,Sweet}}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
