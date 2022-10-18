import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Handle404 = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return <></>;
};

export default Handle404;
