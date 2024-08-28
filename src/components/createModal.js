import { Button, Modal } from "antd";
import React, { useState } from "react";

const CreateModal = ({
  open,
  setOpen,
  setCreateNewForm,
  feedbackTitle,
  setFeedbackTitle,
}) => {
  return (
    <div>
      <Modal
        open={open}
        width={400}
        onCancel={() => setOpen(false)}
        footer={
          <div className="flex gap-2 justify-end">
            {feedbackTitle ? (
              <p
                onClick={() => {
                  setOpen(false);
                  setCreateNewForm(true);
                }}
                className={`${
                  feedbackTitle ? "text-[#189657]" : "text-slate-400"
                }  shadow-md rounded-md p-1 cursor-pointer`}
              >
                CREATE
              </p>
            ) : (
              <p
                className={`${
                  feedbackTitle ? "text-[#189657]" : "text-slate-400"
                }  shadow-md rounded-md p-1 cursor-pointer`}
              >
                CREATE
              </p>
            )}

            <p
              className="text-slate-400 shadow-md rounded-md p-1 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </p>
          </div>
        }
        title="Create Feedback Form"
      >
        <input
          type="text"
          placeholder="Feedback Title"
          value={feedbackTitle}
          onChange={(e) => setFeedbackTitle(e.target.value)}
          className=" text-[17px] w-full border-0 border-b-[2px] border-solid border-slate-300 focus:outline-none"
        />
      </Modal>
    </div>
  );
};

export default CreateModal;
