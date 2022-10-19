// import React, { createContext, useState, useEffect } from "react";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const myContext = createContext({});

// export default function Context(props) {
//   const [privateData, setPrivateData] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/");
//     }
//     async function fetchPrivateData() {
//       try {
//         await axios
//           .get(`http://localhost:4000/user?secret-token=${token}`, {
//             withCredentials: true,
//           })
//           .then((res) => {
//             console.log(res.data)
//             const userPrivateData = res.data;
//             setPrivateData(userPrivateData);
//           });
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchPrivateData();
//   }, []);

//   //Logout User
//   const logoutHandler = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <myContext.Provider value={{ privateData, logoutHandler }}>
//       {props.children}
//     </myContext.Provider>
//   );
// }


import { createContext } from "react";

const AuthContext = createContext();

export default AuthContext;