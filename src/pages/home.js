import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Dashboard } from "../pages/dashboard";
import { Details } from "../components/details";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
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
  const [showDetails, setShowDetails] = useState({
    flag: false,
    key: "",
  });
  const [logicInputs, setLogicInputs] = useState({
    url: "",
    urlFlag: false,
    date: "",
    dateFlag: false,
    time: "",
    timeFlag: false,
  });
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [allData, setAllData] = useState([]);
  const [filterKeys, setFilterKeys] = useState([]);

  const handleToSave = async () => {
    await apiDocs("feedback", inputField, feedbackTitle);

    setAllFeedBack([
      ...allFeedBack,
      { ...inputField, createAt: new Date().getTime() },
    ]);
    // setInputField({
    //   textarea: "",
    //   reference: 0,
    //   smile: 0,
    //   suggestion: "",
    //   star: 0,
    //   multipleChoice: "",
    // });
  };

  async function apiDocs(collectionName, data, keys) {
    try {
      // Generate a new document reference with a unique ID
      const newDocRef = doc(collection(db, collectionName));

      // Prepare the data with the ID included
      const dataWithId = {
        ...data,
        createAt: new Date().getTime(),
        keys: keys,
        id: newDocRef.id, // Add the document ID to the object
      };

      // Save the data to Firestore
      await setDoc(newDocRef, dataWithId);

      console.log("Document successfully written with ID: ", newDocRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const handleToPublish = async () => {
    alert("Publishing...");
    setCreateNewForm(false);
    await apiDocs("feedbackUrl", logicInputs, feedbackTitle);
    await getDocs(collection(db, "feedback")).then((res) => {
      setAllData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const handleDelete = async (keys, id) => {
    try {
      const docRef = doc(db, "feedback", id);
      await deleteDoc(docRef);
      const updatedFilterKeys = filterKeys.filter((item) => item.keys !== keys);
      setFilterKeys(updatedFilterKeys);
      console.log(`Document with ID ${id} successfully deleted`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  console.log(showDetails, "showDetails");
  return (
    <div>
      <Header
        createNewForm={createNewForm}
        handleToSave={handleToSave}
        handleToPublish={handleToPublish}
      />
      {showDetails?.flag ? (
        <Details
          data={allFeedBack}
          setShowDetails={setShowDetails}
          showDetails={showDetails}
        />
      ) : (
        <Dashboard
          setCreateNewForm={setCreateNewForm}
          createNewForm={createNewForm}
          setAllFeedBack={setAllFeedBack}
          setInput={setInputField}
          input={inputField}
          logicInputs={logicInputs}
          setLogicInputs={setLogicInputs}
          setFeedbackTitle={setFeedbackTitle}
          feedbackTitle={feedbackTitle}
          setShowDetails={setShowDetails}
          handleDelete={handleDelete}
          filterKeys={filterKeys}
          setFilterKeys={setFilterKeys}
        />
      )}
    </div>
  );
}

export default Home;
