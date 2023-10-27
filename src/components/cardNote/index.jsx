import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useContext } from "react";
import { NotesContext } from "../../Context/NotesContext";
import ModalUpdate from "../modalUpdate";




const CardNote = ({ title, content, _id}) => {

  const {handleDelete} = useContext(NotesContext);


  const sweetDelete=()=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: " mx-3 btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
  
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete(_id)
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }


 
  

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-4   content-card">
        <div className="card shadow rounded-2">
          <div className="card-body mx-auto text-center p-5">
            <h5 className="card-title fs-4">{title}</h5>
            <p className="card-text fs-4">{content}</p>
            <div>
            <ModalUpdate title={title} content={content} _id={_id} />
              <button onClick={()=>sweetDelete()} className=" btn">
                <BsTrash3Fill className=" text-danger" size="1.5rem" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardNote;
