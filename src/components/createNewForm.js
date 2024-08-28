import React, { useEffect, useMemo, useState } from "react";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { PiLessThanBold, PiLessThanLight } from "react-icons/pi";
import {
  MdDelete,
  MdModeEditOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { Card, Radio, Rate, Space } from "antd";
import { Input } from "antd";
const { TextArea } = Input;

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const CUSTOMER_INPUTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CreateNewForm = ({
  input,
  setInput,
  isFieldEdited,
  setFieldIsEdited,
  inputs,
  setInputs,
  setOpen,
  setOpenCreateModal,
}) => {
  const [allInputField, setAllInputField] = useState([]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const UPDATED_RATING_INPUTS = useMemo(() => {
    return [
      {
        title: "textarea",
        dataIndex: "Text area",
        desc: "Would you like to add a comment?*",
        children: (
          <TextArea
            rows={4}
            name="textarea"
            value={inputs.textarea}
            onChange={handleChange}
          />
        ),
      },
      {
        title: "reference",
        dataIndex: "Numeric rating",
        desc: "How likely is it that you will recommend us to your family and friends?",
        children: (
          <Rate
            allowClear={false}
            count={10}
            tooltips={CUSTOMER_INPUTS}
            value={inputs.reference}
            onChange={(e) => setInputs({ ...inputs, reference: e })}
            character={({ index = 0 }) => (
              <span className="border-solid rounded-md border-slate-300 border-[1.4px]  px-[6.4px]  ">
                {CUSTOMER_INPUTS[index]}
              </span>
            )}
          />
        ),
      },
      {
        title: "smile",
        dataIndex: "Smile",
        desc: "What is your opinion of this page?",
        children: (
          <Rate
            value={inputs.smile}
            onChange={(e) => setInputs({ ...inputs, smile: e })}
            defaultValue={3}
            character={({ index = 0 }) => (
              <span className="text-[25px] ">{customIcons[index + 1]}</span>
            )}
          />
        ),
      },
      {
        title: "suggestion",
        dataIndex: "Single line rating",
        desc: "Do you have any suggestions to improve our website?",
        children: (
          <Input
            value={inputs.suggestion}
            name="suggestion"
            onChange={handleChange}
          />
        ),
      },
      {
        title: "star",
        dataIndex: "Star rating",
        desc: "Give a star rating for the website.",
        children: (
          <Rate
            value={inputs.star}
            onChange={(e) => setInputs({ ...inputs, star: e })}
            defaultValue={3}
            allowClear={false}
          />
        ),
      },
      {
        title: "multipleChoice",
        desc: "Multiple choice - 1 answer",
        dataIndex: "Radio buttons",
        children: (
          <Space
            direction="vertical"
            onChange={(e) =>
              setInputs({ ...inputs, multipleChoice: e.target.value })
            }
          >
            <Radio value={1}>Radio 1</Radio>
            <Radio value={2}>Radio 2</Radio>
            <Radio value={3}>Radio 3</Radio>
          </Space>
        ),
      },
      {
        title: "feedback",
        dataIndex: "Categories rating",
        desc: "Pick a subject and provide your feedback:",
        children: (
          <Radio.Group
            onChange={(e) => setInputs({ ...inputs, feedback: e.target.value })}
            className="flex gap-3 justify-center "
          >
            <Radio.Button value="bug">Bug</Radio.Button>
            <Radio.Button value="comment">Comment</Radio.Button>
            <Radio.Button value="other">Other</Radio.Button>
          </Radio.Group>
        ),
      },
    ];
  }, [inputs]);

  const handleDeleteInput = (dataIndex) => {
    setInput(input.filter((input) => input.title !== dataIndex));
  };

  const handleEdite = (obj) => {
    setFieldIsEdited(obj);
  };

  useEffect(() => {
    function updateInput() {
      const matchedRatings = UPDATED_RATING_INPUTS.filter((ratingInput) =>
        input.some(
          (sidebarField) => sidebarField.title === ratingInput.dataIndex
        )
      );
      setAllInputField(matchedRatings ?? []);
    }
    updateInput();
  }, [UPDATED_RATING_INPUTS, input]);
  console.log(allInputField, "allInputField");

  return (
    <div className=" shadow-md w-[400px]  rounded-md   ">
      <div className="flex items-center bg-blue-500 gap-4 p-3 rounded-t-md text-white ">
        <PiLessThanBold
          onClick={() => {
            setOpen(false);
            setOpenCreateModal(false);
          }}
          size={20}
          className="font-bold "
        />{" "}
        <span className="font-semibold text-[14px]">
          Generic Website Rating
        </span>
        <MdOutlineModeEditOutline size={20} />
      </div>
      <div className=" w-full p-2 flex items-center  flex-col gap-5  overflow-auto ">
        {allInputField.length > 0 ? (
          allInputField.map((input) => (
            <InputCard>
              <p className="text-[14px] text-start mb-2  ">{input.desc}</p>
              {input.children}
              <div className="flex gap-2 justify-end items-center w-[350px] mt-2 ">
                <MdModeEditOutline
                  onClick={() => handleEdite(input)}
                  size={20}
                  color="gray"
                />
                <MdDelete
                  onClick={() => handleDeleteInput(input.dataIndex)}
                  size={20}
                  color="gray"
                />
              </div>
            </InputCard>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-[70vh] font-semibold">
            Add Fields
          </div>
        )}
      </div>
    </div>
  );
};

const InputCard = ({ children }) => {
  return (
    <div className=" w-full flex justify-center items-center shadow-md cursor-pointer flex-col px-4 py-3 ">
      <div className=" ">{children}</div>
    </div>
  );
};
