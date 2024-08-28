import { Card, Collapse } from "antd";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { PiLessThanBold } from "react-icons/pi";
import { db } from "./firebase";

export const Details = ({ data, setShowDetails }) => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    async function getAllFeedBack() {
      await getDocs(collection(db, "feedback")).then((res) => {
        setAllData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    }

    getAllFeedBack();
  }, []);

  const updatedData = useMemo(() => {
    return allData.map((item, i) => {
      return {
        key: i + 1,
        label: (
          <div className="flex gap-2 justify-between items-center ">
            <p>{`Feedback ${i + 1}`}</p>
            <p>{new Date(item?.createAt).toLocaleDateString()}</p>
          </div>
        ),
        children: (
          <div>
            {item.textarea && (
              <>
                <p className="font-semibold">
                  Would you like to add a comment?
                </p>
                <p>{item.textarea}</p>
              </>
            )}
            {item.reference && (
              <>
                <p className="font-semibold">
                  How likely is it that you will recommend us to your family and
                  friends?
                </p>
                <p>{item.reference}</p>
              </>
            )}
            {item.suggestion && (
              <>
                <p className="font-semibold">
                  Do you have any suggestions to improve our website?
                </p>
                <p>{item.suggestion}</p>
              </>
            )}
            {item.smile && (
              <>
                <p className="font-semibold">
                  Give a star rating for the website.
                </p>
                <p>{item.smile}</p>
              </>
            )}
            {item.multipleChoice && (
              <>
                <p className="font-semibold">Multiple choice - 1 answer</p>
                <p>{item.multipleChoice}</p>
              </>
            )}
            {item.star && (
              <>
                <p className="font-semibold">
                  Give a star rating for the website.
                </p>
                <p>{item.star}</p>
              </>
            )}
          </div>
        ),
      };
    });
  }, [allData]);

  return (
    <Card>
      <div className="shadow-md   ">
        <div className="flex items-center bg-blue-500 gap-3 p-3 rounded-t-md text-white ">
          <PiLessThanBold
            size={20}
            onClick={() => setShowDetails(false)}
            className="font-bold "
          />{" "}
          <span className="font-semibold text-[14px]">
            Generic Website Rating
          </span>
        </div>
        <div className=" w-full  flex items-center    gap-20  overflow-auto ">
          <div className=" text-center p-3 ">
            <p className="text-center text-[5rem] font-bold ">26</p>
            <span className="text-center text-[1.5rem] text-gray-400 ">
              VIEWS
            </span>
          </div>
          <div className=" text-center ">
            <p className="text-center text-[5rem] font-bold ">
              {allData.length ?? 0}
            </p>
            <span className="text-center text-[1.5rem] text-gray-400 ">
              Submitted
            </span>
          </div>
        </div>
        <div className=" p-3">
          <p className="text-[16px] font-semibold ">
            Page URL Contain example.com/about
          </p>
          <p className="text-[16px] font-semibold ">Date: 01/01/2021</p>
          <p className="text-[16px] font-semibold ">Time: 01:01</p>
        </div>
        <div className="p-3">
          <h2 className="text-xl font-semibold  text-start mb-2 ">
            Feedback List
          </h2>
          <Collapse
            defaultActiveKey={["1"]}
            items={updatedData}
            expandIconPosition="end"
          />
        </div>
      </div>
    </Card>
  );
};
