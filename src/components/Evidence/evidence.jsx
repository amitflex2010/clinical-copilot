import { FaTimes, FaCopy, FaCheck } from "react-icons/fa";

const Evidence = ({ data }) => {
  const checkIsArray = (data) => {
    const str = data.replaceAll("'", '"');

    const obj = JSON.parse(str);

    if (Array.isArray(obj)) {
      return true;
    } else {
      return false;
    }
  };

  const refrenceKeyArray = (obj) => {
    const str = obj.replaceAll("'", '"');

    let objVal = JSON.parse(str);
    objVal.map((item) => item);

    return objVal;
  };
  const refrenceKeyObject = (obj) => {
    const str = obj.replaceAll("'", '"');

    const objVal = JSON.parse(str);

    return Object.keys(objVal);
  };

  const refrenceValueObject = (obj) => {
    const str = obj.replaceAll("'", '"');

    const objVal = JSON.parse(str);

    return objVal[Object.keys(objVal)];
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
            <span>
              <FaCopy />
            </span>
            <span className="cross">
              <FaTimes />
            </span>
            <span className="check">
              <FaCheck />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Evidence;
