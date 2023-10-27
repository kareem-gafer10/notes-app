import CardNote from "../cardNote";
import { NotesContext } from "../../Context/NotesContext";
import { useContext } from "react";
import ModalAdd from "../modalAdd";

const AddNotes = () => {

  const {userNotes} = useContext(NotesContext);



  return (
    <>
      <div className="col-10 col-sm-10">
        <div className="d-flex justify-content-end my-5">
          <ModalAdd/>
        </div>

        <div className="d-flex align-items-center mt-5 ps-3">
          <h2 className="text-muted fw-bold">My Notes</h2>
        </div>
        <hr />
         
            <div className="row g-5 mb-5">
          {userNotes?.length>0 ? userNotes.map((note) => (
            <CardNote key={note._id} {...note} />
          )) :
          <h1 className="  text-center text-muted my-5 py-5">Not Notes Found</h1>
          }
        </div>
          
          
      
      </div>
    </>
  );
};

export default AddNotes;
