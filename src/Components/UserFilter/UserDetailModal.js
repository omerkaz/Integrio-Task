import { useState } from "react";

import Modal from "react-modal";

const customStyles = {
  content: {
    backgroundColor: "#2096ff",
    color : "white",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function UserDetailModal(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="col-12 col-md-4 col-lg-3 col-xxl-3 d-flex justify-content-center">
      <div
        className="card testimonial-card mt-2 mb-3"
        style={{ width: "13rem" }}
      >
        <div className="card-up aqua-gradient d-none d-lg-block"></div>
        <div className="avatar mx-auto white d-none d-lg-block">
          <img
            src={props.data[props.index].picture.large}
            className="rounded-circle img-fluid "
            alt=""
          />
        </div>
        <div className="card-body text-center">
          <p className="name card-title text-monospace">
            {props.data[props.index].name.title}.{" "}
            {props.data[props.index].name.first}{" "}
            {props.data[props.index].name.last}
          </p>
          <hr />

          <a onClick={openModal} href="#" className="user-btn mb-1 btn btn-primary position-absolute bottom-0 start-50 translate-middle-x ">
            Details
          </a>
        </div>
      </div>

      {/* POPUP/MODAL-START */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>
          {props.data[props.index].name.title}.{" "}
          {props.data[props.index].name.first}{" "}
          {props.data[props.index].name.last} ({props.data[props.index].dob.age}
          )
        </h2>

        <div> </div>
        <ul>
          <li>
            {props.data[props.index].gender[0].toUpperCase()}
            {props.data[props.index].gender.slice(1)}
          </li>
          <li>{props.data[props.index].email}</li>
          <li>{props.data[props.index].cell}</li>
          <li>{props.data[props.index].location.country}</li>
        </ul>
        <button
          className="btn btn-primary d-flex w-100 text-center"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>

      {/* POPUP/MODAL-END */}
    </div>
  );
}

export default UserDetailModal;
