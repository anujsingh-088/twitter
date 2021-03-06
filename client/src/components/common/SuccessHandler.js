import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_SUCCESS } from "../../actions/types";
import "./success.css";

const SuccessHandler = () => {
  const successData = useSelector((state) => state.success);
  const dispatch = useDispatch();
  useEffect(() => {
    let timer;
    if (successData?.successMsg) {
      timer = setTimeout(() => {
        dispatch({ type: REMOVE_SUCCESS, payload: "" });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, successData]);

  return (
    <div>
      {successData?.successMsg && (
        <div className="success-handler">{successData?.successMsg}</div>
      )}
    </div>
  );
};

export default SuccessHandler;
