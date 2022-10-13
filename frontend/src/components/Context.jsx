import React, { createContext, useState, useEffect } from "react";

import axios from "axios";

export const myContext = createContext({});

export default function Context(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  function logoutFunction () { 
    axios
    .post("http://localhost:4000/logout")
    .then((res) => {
      console.log(res)
      if(res.data === "success")
      setUser(null);
    });
  }


  return (
    <myContext.Provider value={{ user, logoutFunction }}>
        {props.children}
    </myContext.Provider>
  )

}
