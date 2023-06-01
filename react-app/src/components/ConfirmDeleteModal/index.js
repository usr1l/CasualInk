import React, { useEffect } from "react";
import Button from "../Button";
import icon from "../static/casual-ink.png"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ itemId, deleteFn, directTo }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal, modalRef, modalContent } = useModal();

  const handleCancel = async (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await dispatch(deleteFn(itemId));

    if (!data.errors) {
      if (directTo) history.push(`${directTo}`);
      else window.location.reload();
      closeModal();
      return;
    };

    return data.errors;

  };


  return (
    <div className="delete-modal-background">
      <div className="modal-icons">
        <i onClick={closeModal} className="fa-solid fa-xmark pointer"></i>
      </div>
      <img src={icon} id='icon' alt={'casual-ink'} />
      <div className="delete-modal-label">
        This action is irreversible.
        <br />
        Relevant information could be lost.
        <br />
        Do you wish to continue?
      </div>
      <div className="delete-modal-buttons">
        <Button buttonStyle='btn--demo' onClick={handleCancel}>Cancel</Button>
        <Button buttonStyle='btn--login' onClick={handleDelete}>Confirm</Button>
      </div>
    </div>
  )
};

export default ConfirmDeleteModal;
