import { useState } from "react";
import { FaTimes, FaCopy, FaCheck } from "react-icons/fa";

const Evidence = ({ data }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const [acceptClick, setAcceptClick] = useState(false);
  const [rejectClick, setRejectClick] = useState(false);
  const checkIsArray = (data) => {
    try {
      const str = data.replaceAll("'", '"');

      const obj = JSON.parse(str);

      if (Array.isArray(obj)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const refrenceKeyArray = (obj) => {
    try {
      const str = obj.replaceAll("'", '"');

      let objVal = JSON.parse(str);
      objVal.map((item) => item);

      return objVal;
    } catch (error) {
      console.log(error.message);
    }
  };
  const refrenceKeyObject = (obj) => {
    try {
      const str = obj.replaceAll("'", '"');

      const objVal = JSON.parse(str);

      return Object.keys(objVal);
    } catch (error) {
      console.log(error.message);
    }
  };

  const refrenceValueObject = (obj) => {
    try {
      const str = obj.replaceAll("'", '"');

      const objVal = JSON.parse(str);

      return objVal[Object.keys(objVal)];
    } catch (error) {
      console.log(error.message);
    }
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("text copied successfully.");
      clearCopyText();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleReject = () => {
    setRejectClick(!rejectClick);
    setAcceptClick(rejectClick);
  };

  const toggleAccept = () => {
    setAcceptClick(!acceptClick);
    setRejectClick(acceptClick);
  };
  const clearCopyText = () => {
    setTimeout(() => {
      setCopySuccess("");
    }, 2000);
  };
  return (
    <div className="evidence-container">
      {data?.map((item, index) => (
        <div className="box-container">
          <div className="ref-text-container">
            <div>{item.Reference_Text}</div>
            <div className="person-icon count-circle">
              <span className="pagenumclr">{item.Document_Page_Number}</span>
            </div>
          </div>

          <div className="para-container">{item.Concept_LLM_Summary}</div>

          <div className="note-container">
            <ul className="listwidth">
              <li className="list-style-none">
                {checkIsArray(item.Response_Attribute) ? (
                  <div>
                    {refrenceKeyArray(item.Response_Attribute).map((value) => (
                      <div className="notes-container">
                        <span className="heading align-box">
                          {Object.keys(value)}
                        </span>
                        <div className="condition-line"></div>
                        <span className="align-box">
                          {value[Object.keys(value)]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="notes-container">
                    <span className="heading">
                      {refrenceKeyObject(item.Response_Attribute)}
                    </span>
                    <div className="condition-line"></div>
                    <span>{refrenceValueObject(item.Response_Attribute)}</span>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="icon-container">
            <span onClick={() => copyText(item.Concept_LLM_Summary)}>
              <FaCopy />
            </span>

            <span
              className={acceptClick ? "check" : "check-disabled"}
              onClick={toggleAccept}
            >
              <FaCheck />
            </span>
            <span
              className={rejectClick ? "cross" : "cross-disabled"}
              onClick={toggleReject}
            >
              <FaTimes />
            </span>
            <span className="copyTextSuccess">{copySuccess}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Evidence;
