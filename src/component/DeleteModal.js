import React, { useRef, useState, useEffect } from "react";

export default function DeleteModal(props) {
  const modalRef = useRef();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    // get all await students
    setIsSubmitDisabled(false);
  }, []);
  return (
    <div>
      <button
        type="button"
        className={props.btnClassName}
        data-bs-toggle="modal"
        data-bs-target={`#${props.modalId}`}
        ref={modalRef}
      >
        {props.btnChildren}
      </button>

      <div
        className="modal fade"
        id={props.modalId} 
        tabindex="-1"
        aria-labelledby={`${props.modalId}Label`} 
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id={`${props.modalId}Label`}>
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
                disabled={isSubmitDisabled}
                onClick={() => {
                  setIsSubmitDisabled(true);

                  props.deleteHandler(modalRef, () =>
                    setIsSubmitDisabled(false)
                  );
                  // setIsSubmitDisabled(false);
                }}
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
