// // import React, { createContext, useState, useEffect } from "react";

// // import axios from "axios";
// // import { Navigate } from "react-router-dom";

// // export const myContext = createContext({});

// // export default function Context(props) {
// //   const [user, setUser] = useState(null);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     async function fetchUserProfile() {
// //       await axios
// //         .get(`http://localhost:4000/user?secret-token=${token}`, {
// //           withCredentials: true,
// //         })
// //         .then((res) => {
// //           const userData = res.data;
// //           setUser(userData);
// //           localStorage.setItem("user", JSON.stringify(userData));
// //         });
// //     }

// //     fetchUserProfile();
// //   }, [token]);

// //   //   function logoutFunction () {
// //   //     axios
// //   //     .post("http://localhost:4000/logout")
// //   //     .then((res) => {
// //   //       console.log(res)
// //   //       if(res.data === "success")
// //   //       setUser(null);
// //   //     });
// //   //   }

// //   return (
// //     <myContext.Provider value={{ user }}>{props.children}</myContext.Provider>
// //   );
// // }

// import { useState, createContext, useContext } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (user) => {
//     setUser(user);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
