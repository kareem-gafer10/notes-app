import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { NotesContext } from "../../Context/NotesContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import baseInstance from "../../Networking/baseInstance";

const ModalUpdate = ({ content, title, _id }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { getUserNotes,Sweet } = useContext(NotesContext);










  const updateNotes = async (valus) => {
    try {
      const { data } = await baseInstance.put(`notes/${_id}`, valus, {
        headers: {   token: localStorage.getItem("userToken"), },
      });
      if (data.msg) {
        toast.success(data.msg, {
          duration: 2000,
          className: "text-success px-4 fw-bolder",
        });
        handleClose();
        getUserNotes();
        Sweet();
      }
    } catch (error) {
      toast.error(error.response.data.msg, {
        duration: 2000,
        className: "text-danger px-4 fw-bolder",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: updateNotes,
  });




  return (
    <>
      <button className=" btn text-primary" onClick={handleShow}>
        <AiOutlineEdit size="1.5rem" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
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
              defaultValue={title}
            />
            <input
              className=" form-control"
              name="content"
              id="content"
              placeholder="Content"
              type="text"
              onChange={formik.handleChange}
              defaultValue={content}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdate;
