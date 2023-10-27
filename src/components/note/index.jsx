import React from "react";
import SideBar from "../sideBar";
import AddNotes from "../addNotes";

const Note = () => {
  return (
    <div className=" container-fluid sidebar">
      <div className="row">
        <SideBar />
        <AddNotes />
      </div>
    </div>
  );
};

export default Note;
