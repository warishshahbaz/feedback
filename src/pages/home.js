import { useState } from "react";
import { Header } from "../components/header";
import { Dashboard } from "../pages/dashboard";
import { Details } from "../components/details";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../components/firebase"; // Import the Firestore database

function Home() {
  const [createNewForm, setCreateNewForm] = useState(false);
  const [allFeedBack, setAllFeedBack] = useState([]);
  const [inputField, setInputField] = useState({
    textarea: "",
    reference: 0,
    smile: 0,
    suggestion: "",
    star: 0,
    multipleChoice: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const [logicInputs, setLogicInputs] = useState({
    url: "",
    urlFlag: false,
    date: "",
    dateFlag: false,
    time: "",
    timeFlag: false,
  });

  const handleToPublish = async () => {
    await apiDocs("feedbackUrl", logicInputs);
    await apiDocs("feedback", inputField);

    setAllFeedBack([
      ...allFeedBack,
      { ...inputField, createAt: new Date().getTime() },
    ]);
    setInputField({
      textarea: "",
      reference: 0,
      smile: 0,
      suggestion: "",
      star: 0,
      multipleChoice: "",
    });
    setShowDetails(true);
  };

  async function apiDocs(collections, data) {
    await addDoc(collection(db, collections), {
      ...data,
      createAt: new Date().getTime(),
    });
  }

  return (
    <div>
      <Header createNewForm={createNewForm} handleToPublish={handleToPublish} />
      {showDetails ? (
        <Details data={allFeedBack} setShowDetails={setShowDetails} />
      ) : (
        <Dashboard
          setCreateNewForm={setCreateNewForm}
          createNewForm={createNewForm}
          setAllFeedBack={setAllFeedBack}
          setInput={setInputField}
          input={inputField}
          logicInputs={logicInputs}
          setLogicInputs={setLogicInputs}
        />
      )}
    </div>
  );
}

export default Home;
