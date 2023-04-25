import React from "react";
import Button from "../Button";
import icon from "../static/casual-ink.png"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ itemId, deleteFn, directTo }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleCancel = async (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await dispatch(deleteFn(itemId));

    if (!data.errors) {
      history.push(`${directTo}`);
      closeModal();
    };

    return data.errors;

  };


  return (
    <div className="delete-modal-background">
      <i onClick={closeModal} className="fa-solid fa-xmark"></i>
      <img src={icon} id='icon' alt={'casual-ink'} />
      <div className="delete-modal-label">
        This action is irreversible.
        <br />
        Relevant information could be lost.
        <br />
        Do you wish to continue?
      </div>
      <div className="delete-modal-buttons">
        <Button buttonStyle='' buttonSize='' onClick={handleCancel}>Cancel</Button>
        <Button buttonStyle='' buttonSize='' onClick={handleDelete}>Confirm</Button>
      </div>
    </div>
  )
};

export default ConfirmDeleteModal;
