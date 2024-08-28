import { Card } from "antd";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import CreateModal from "../components/createModal";
import { CreateNewForm } from "../components/createNewForm";
import { Sidebar } from "../components/sidebar";
import cardLogo from "../galary/survey-standard 1.png";

export const Dashboard = ({
  setCreateNewForm,
  createNewForm,
  setAllFeedBack,
  setInput,
  input,
  logicInputs,
  setLogicInputs,
}) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [inputField, setInputField] = useState([]);
  const [isFieldEdited, setFieldIsEdited] = useState(null);

  return (
    <>
      {createNewForm ? (
        <div className=" w-full flex  ">
          <div className="w-[80%] flex justify-center mt-[22px] ">
            <CreateNewForm
              input={inputField}
              setInput={setInputField}
              setFieldIsEdited={setFieldIsEdited}
              isFieldEdited={isFieldEdited}
              setInputs={setInput}
              inputs={input}
              setOpen={setCreateNewForm}
              setOpenCreateModal={setOpenCreateModal}
            />
          </div>
          <div className="w-[20%] border-l-[1.7px] border-t-0 border-r-0 border-solid border-slate-300 ">
            <Sidebar
              setInputField={setInputField}
              inputField={inputField}
              isFieldEdited={isFieldEdited}
              setFieldIsEdited={setFieldIsEdited}
              setLogicInputs={setLogicInputs}
              logicInputs={logicInputs}
            />
          </div>
        </div>
      ) : (
        <div className="p-8 flex flex-wrap gap-8 ">
          <Card
            onClick={() => setOpenCreateModal(true)}
            className=" w-[270px] h-[300px] flex justify-center items-center shadow-md cursor-pointer "
          >
            <div className="flex flex-col items-center ">
              <MdAdd size={50} color="#2F4ED7" />
              <p className="text-xl font-semibold ">New Form</p>
            </div>
          </Card>
          <CustomeCard
            title="Delivery"
            submitted={10}
            viewed={55}
            date={"8/5/2024"}
          />
          <CustomeCard
            title="Product Quality"
            submitted={100}
            viewed={300}
            date={"7/5/2024"}
          />
        </div>
      )}
      {openCreateModal && (
        <CreateModal
          setCreateNewForm={setCreateNewForm}
          open={openCreateModal}
          setOpen={setOpenCreateModal}
        />
      )}
    </>
  );
};

const CustomeCard = ({ title, submitted, viewed, date }) => {
  return (
    <div className=" w-[270px] h-[300px] p-0  shadow-md cursor-pointer ">
      <Header />
      <CardBody
        title={title}
        submitted={submitted}
        viewed={viewed}
        date={date}
      />
      <ButtonComp />
    </div>
  );
};

const ButtonComp = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col ">
        <div className="w-[190px] flex justify-center items-center flex-col ">
          <button className="w-full bg-[#9c27b0] text-white py-[6px] text-[14px] rounded-md">
            VIEW SUBMISSION
          </button>
          <div className="flex gap-2 my-2 w-full ">
            <button className="bg-[#2E7D32] w-[40%] text-white py-[6px] text-[14px] rounded-md ">
              EDIT
            </button>
            <button className="bg-[#2196F3] w-[60%] text-white rounded-md text-[14px] py-[6px] ">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full bg-yellow-300 h-[60px] rounded-t-md ">
        <img src={cardLogo} className="w-[40px] h-[40px] " alt="logo" />
      </div>
    </>
  );
};

const CardBody = ({ title, submitted, viewed, date }) => {
  return (
    <>
      <div className="px-2 py-1 ">
        <div>
          <p className="text-[18px] font-semibold ">{title}</p>

          <p></p>
        </div>
        <div className=" my-2 flex justify-between items-center ">
          <p className="text-[15px] text-gray-300 font-semibold ">Submmited</p>

          <p className="">{submitted}</p>
        </div>
        <div className=" my-2 flex justify-between items-center ">
          <p className="text-[15px] text-gray-300 font-semibold ">Viewed</p>

          <p className="">{viewed}</p>
        </div>
        <div className=" my-2 flex justify-between items-center ">
          <p className="text-[15px] text-gray-300 font-semibold ">
            Date Published
          </p>

          <p className="">{date}</p>
        </div>
      </div>
    </>
  );
};
