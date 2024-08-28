import React from "react";
import logo from "../galary/image 6.png";
import { Button } from "antd";

export const Header = ({ createNewForm, handleToSave, handleToPublish }) => {
  return (
    <div className="flex items-center justify-between gap-2 h-[50px] shadow-lg ">
      <div className="flex gap-3 items-center ">
        <img src={logo} width={50} height={50} alt={"logo"} />
        <span className="capitalize font-bold  ">Usre feedback</span>
      </div>
      {createNewForm && (
        <div className="flex gap-4 mr-2 ">
          <Button onClick={handleToSave} type="primary">
            Save
          </Button>
          <Button
            onClick={handleToPublish}
            className="bg-green-700 text-white "
          >
            Publish
          </Button>
        </div>
      )}
    </div>
  );
};
