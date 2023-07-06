import React, { useRef } from 'react';

export default function DeleteModal(props) {
  const modalRef = useRef();
  return (
    <div>
      <button
        type="button"
        className={props.btnClassName}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={modalRef}
      >
        {props.btnChildren}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{props.modalBody}</div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={()=>props.deleteHandler(modalRef)}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
