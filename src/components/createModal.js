import { Button, Modal } from "antd";
import React from "react";

const CreateModal = ({ open, setOpen, setCreateNewForm }) => {
  return (
    <div>
      <Modal
        open={open}
        width={400}
        onCancel={() => setOpen(false)}
        footer={
          <div className="flex gap-2 justify-end">
            <p
              onClick={() => {
                setOpen(false);
                setCreateNewForm(true);
              }}
              className="text-[#189657] shadow-md rounded-md p-1 cursor-pointer "
            >
              CREATE
            </p>
            <p
              className="text-slate-500 shadow-md rounded-md p-1 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </p>
          </div>
        }
        title="Create Feedback Form"
      >
        <span></span>
        <p>Generic website rating</p>
      </Modal>
    </div>
  );
};

export default CreateModal;
