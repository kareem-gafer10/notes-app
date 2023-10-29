import { useFormik } from "formik";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import baseInstance from "../../Networking/baseInstance";
import toast from "react-hot-toast";
import { NotesContext } from "../../Context/NotesContext";

const ModalAdd = () => {
  const {getUserNotes,Sweet} = useContext(NotesContext);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNotes = async (values) => {
    const title = values.title.trim();
    const content = values.content.trim();
    if (!title || !content) {
      toast.error("Please fill in both title and content fields.", {
        duration: 2000,
        className: "text-danger px-4 fw-bolder"
      });
      return;
    }

    
    try {
      const {data}= await baseInstance.post("notes",values,{
        headers: {   token: localStorage.getItem("userToken"), },
      })
      console.log(data);
    if(data.msg){
      toast.success(data.msg,{duration:2000,className:"text-success px-4 fw-bolder"});
      handleClose()
      getUserNotes()
      Sweet()
      formik.resetForm();
    }
    } 
    catch(error){
      toast.error(error.response.data.msg,{duration:2000,className:"text-danger px-4 fw-bolder"});
    }
  };




  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNotes,
  });


  



  return (
    <>
      <Button
        className=" btn btn-lg d-flex align-items-center"
        variant="dark"
        onClick={handleShow}
      >
        <AiOutlinePlus className="fs-5 me-3" />
        Add Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              className=" form-control mb-4"
              name="title"
              id="title"
              placeholder="Title"
              type="text"
              onChange={formik.handleChange}
            />
            <input
              className=" form-control"
              name="content"
              id="content"
              placeholder="Content"
              type="text"
              onChange={formik.handleChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdd;
