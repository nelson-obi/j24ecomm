import React, { useContext } from "react";
import EcomContext from "../../context/EcomContext";

function Alert() {
  const { alertInfo } = useContext(EcomContext);

  return (
    <>
      {alertInfo.show && (
        <div
          className={`${
            alertInfo.type === "success"
              ? "bg-green-300"
              : "bg-red-500"
          } text-center capitalize w-[85%] text-white p-3 m-auto duration-150`}
        >
          {alertInfo.message}
        </div>
      )}
    </>
  );
}

export default Alert;
