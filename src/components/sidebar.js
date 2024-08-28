import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { PiClipboardTextThin } from "react-icons/pi";
import { TiSortNumericallyOutline } from "react-icons/ti";
import { IoIosStarOutline } from "react-icons/io";
import { GoSmiley } from "react-icons/go";
import { LuFormInput } from "react-icons/lu";
import { TbCategory2 } from "react-icons/tb";
import { RiListRadio } from "react-icons/ri";
import { Button, Input, Switch, TimePicker } from "antd";
import { PiLessThanBold } from "react-icons/pi";

import dayjs from "dayjs";

const SidebarFields = [
  {
    title: "Text area",
    icon: <PiClipboardTextThin size={20} />,
    btn: <MdAdd size={25} className="text-[#2F4ED7] cursor-pointer " />,
  },
  {
    title: "Numeric rating",
    icon: <TiSortNumericallyOutline size={20} />,
    btn: <MdAdd size={25} className="text-[#2F4ED7] " />,
  },
  {
    title: "Star rating",
    icon: <IoIosStarOutline size={20} />,
    btn: <MdAdd size={25} className="text-[#2F4ED7] " />,
  },
  {
    title: "Smile",
    icon: <GoSmiley size={20} />,
    btn: <MdAdd size={25} className="text-[#2F4ED7] " />,
  },
  {
    title: "Single line rating",
    icon: <LuFormInput size={20} />,
    btn: <MdAdd size={25} className="text-[#2F4ED7] " />,
  },
  {
    title: "Radio buttons",
    icon: <RiListRadio size={20} />,
    btn: <MdAdd size={25} className="text-[#2F4ED7] " />,
  },
  {
    title: "Categories rating",
    icon: <TbCategory2 size={20} />,
    btn: <MdAdd size={25} className="text-[#2F4ED7] " />,
  },
];

export const Sidebar = ({
  inputField,
  setInputField,
  isFieldEdited,
  setFieldIsEdited,
  logicInputs,
  setLogicInputs,
}) => {
  // const [logicInputs, setLogicInputs] = useState({
  //   url: "",
  //   urlFlag: false,
  //   date: "",
  //   dateFlag: false,
  //   time: "",
  //   timeFlag: false,
  // });

  return (
    <>
      {isFieldEdited ? (
        <EditeInput
          setFieldIsEdited={setFieldIsEdited}
          isFieldEdited={isFieldEdited}
        />
      ) : (
        <div>
          <AddField inputField={inputField} setInputField={setInputField} />
          <AddLogic setLogicInputs={setLogicInputs} loginInputs={logicInputs} />
        </div>
      )}
    </>
  );
};

const EditeInput = ({ setFieldIsEdited, isFieldEdited }) => {
  console.log(isFieldEdited);
  return (
    <div>
      <div
        onClick={() => setFieldIsEdited(null)}
        className="flex items-center gap-2  my-3 ml-2 cursor-pointer "
      >
        <PiLessThanBold size={16} />
        <span className="text-[14px] font-bold">Back to add field</span>
      </div>
      <div className="p-2 flex gap-2 flex-col">
        <span className="text-[12px] text-[#2196F3] ">Label</span>
        <Input
          variant="borderless"
          className="border-b-[1.4px] border-t-0 border-l-0 border-r-0 border-slate-400 border-solid "
          type="text"
          value={isFieldEdited?.desc ?? ""}
          placeholder=""
        />
        <div className="flex gap-4 items-center ">
          <Switch size="small" defaultChecked />
          <span className="text-[15px] ">Required</span>
        </div>
        <span className="text-[12px]">Error message</span>
        <Input
          variant="borderless"
          className="border-b-[1.4px] border-t-0 border-l-0 border-r-0 border-slate-400 border-solid "
        />
        <span className="text-[12px]">Helper Text</span>
      </div>

      <div className="flex gap-3  px-3 mt-3 ">
        <Button type="primary">Save</Button>
        <Button type="dashed">Cancel</Button>
      </div>
    </div>
  );
};

const AddField = ({ inputField, setInputField }) => {
  return (
    <>
      <h2 className="text-xl font-semibold p-2 text-start">Add Field</h2>
      <div className="p-2 mb-3 ">
        {SidebarFields.map((field) => (
          <div className="flex items-center gap-2 justify-between my-3 ">
            <div className="flex items-center gap-2">
              {field.icon}
              <p className="text-[14px] ">{field.title}</p>
            </div>
            <span
              className="text-[#2F4ED7] cursor-pointer "
              onClick={() => {
                if (inputField.includes(field)) return;
                setInputField([...inputField, field]);
              }}
            >
              {field.btn}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

const AddLogic = ({ setLogicInputs, loginInputs }) => {
  return (
    <>
      <h2 className="text-xl font-semibold p-2 text-start">Add Logic</h2>
      <div className="p-2 mb-3 ">
        <div>
          <div className="flex items-center gap-2 justify-between my-3 ">
            <span className="text-[12px] ">Show based on URL conditions</span>
            <Switch
              size="small"
              onChange={(e) => setLogicInputs({ ...loginInputs, urlFlag: e })}
            />
          </div>
          <Input
            value={loginInputs.url}
            onChange={(e) =>
              setLogicInputs({ ...loginInputs, url: e.target.value })
            }
            placeholder="https://example.com"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 justify-between my-3 ">
            <span className="text-[12px] ">Show on a specific date </span>
            <Switch
              size="small"
              onChange={() =>
                setLogicInputs({
                  ...loginInputs,
                  dateFlag: !loginInputs.dateFlag,
                })
              }
            />
          </div>
          <Input
            value={loginInputs.date}
            onChange={(e) =>
              setLogicInputs({ ...loginInputs, date: e.target.value })
            }
            type="date"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 justify-between my-3 ">
            <span className="text-[12px] ">Show on a specific time </span>
            <Switch
              size="small"
              onChange={() =>
                setLogicInputs({
                  ...loginInputs,
                  timeFlag: !loginInputs.timeFlag,
                })
              }
            />
          </div>
          <TimePicker
            onChange={(time, timeString) =>
              setLogicInputs({ ...loginInputs, time: timeString })
            }
            placeholder="HH:mm:ss"
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
      </div>
    </>
  );
};
