import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import CreateModal from "../components/createModal";
import { CreateNewForm } from "../components/createNewForm";
import { Sidebar } from "../components/sidebar";
import cardLogo from "../galary/survey-standard 1.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase";

export const Dashboard = ({
  setCreateNewForm,
  createNewForm,
  setAllFeedBack,
  setInput,
  input,
  logicInputs,
  setLogicInputs,
  feedbackTitle,
  setFeedbackTitle,
  setShowDetails,
  handleDelete,
  filterKeys,
  setFilterKeys,
}) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [inputField, setInputField] = useState([]);
  const [isFieldEdited, setFieldIsEdited] = useState(null);

  const [data, setData] = useState([]);
  console.log(filterKeys, "filter");

  const handleSubmission = (key) => {
    setShowDetails({
      flag: true,
      key: key,
    });
  };

  const handleEdit = (key, id) => {};

  useEffect(() => {
    async function getAllData() {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        // Extract data from documents
        const docsData = querySnapshot.docs.map((doc) => doc.data());
        setData(docsData);

        // Get unique objects based on the `keys` value
        const uniqueObjectsArray = [
          ...new Map(docsData.map((item) => [item.keys, item])).values(),
        ];

        console.log(uniqueObjectsArray, "Unique array of objects");

        // Update state with unique objects
        setFilterKeys(uniqueObjectsArray);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }

    getAllData();
  }, []);

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
              feedbackTitle={feedbackTitle}
              setCreateNewForm={setCreateNewForm}
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
          {filterKeys &&
            filterKeys?.map((key) => (
              <CustomeCard
                title={key.keys}
                submitted={key.submitted}
                viewed={key.viewed}
                date={key.createAt}
                data={data}
                handleSubmission={handleSubmission}
                id={key.id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
        </div>
      )}
      {openCreateModal && (
        <CreateModal
          setCreateNewForm={setCreateNewForm}
          open={openCreateModal}
          setOpen={setOpenCreateModal}
          setFeedbackTitle={setFeedbackTitle}
          feedbackTitle={feedbackTitle}
        />
      )}
    </>
  );
};

const CustomeCard = ({
  title,
  submitted,
  viewed,
  date,
  data,
  handleSubmission,
  id,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className=" w-[270px] h-[300px] p-0  shadow-md cursor-pointer ">
      <Header />
      <CardBody
        title={title}
        submitted={submitted}
        viewed={viewed}
        date={date}
        data={data}
        id={id}
      />
      <ButtonComp
        keys={title}
        handleSubmission={handleSubmission}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        id={id}
      />
    </div>
  );
};

const ButtonComp = ({
  keys,
  handleSubmission,
  handleDelete,
  id,
  handleEdit,
}) => {
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col ">
        <div className="w-[190px] flex justify-center items-center flex-col ">
          <button
            onClick={() => handleSubmission(keys)}
            className="w-full bg-[#9c27b0] text-white py-[6px] text-[14px] rounded-md"
          >
            VIEW SUBMISSION
          </button>
          <div className="flex gap-2 my-2 w-full ">
            <button
              onClick={() => handleEdit(keys, id)}
              className="bg-[#2E7D32] w-[40%] text-white py-[6px] text-[14px] rounded-md "
            >
              EDIT
            </button>
            <button
              onClick={() => handleDelete(keys, id)}
              className="bg-[#2196F3] w-[60%] text-white rounded-md text-[14px] py-[6px] "
            >
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

const CardBody = ({ title, submitted, viewed, date, data }) => {
  console.log(title, "title");
  let vieweds = data.filter((item) => item.keys === title).length;

  return (
    <>
      <div className="px-2 py-1 ">
        <div>
          <p className="text-[18px] font-semibold ">{title}</p>

          <p></p>
        </div>
        <div className=" my-2 flex justify-between items-center ">
          <p className="text-[15px] text-gray-300 font-semibold ">Submmited</p>

          <p className="">{22}</p>
        </div>
        <div className=" my-2 flex justify-between items-center ">
          <p className="text-[15px] text-gray-300 font-semibold ">Viewed</p>

          <p className="">{vieweds}</p>
        </div>
        <div className=" my-2 flex justify-between items-center ">
          <p className="text-[15px] text-gray-300 font-semibold ">
            Date Published
          </p>

          <p className="">{new Date(date)?.toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
};
