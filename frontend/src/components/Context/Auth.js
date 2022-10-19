// import React, { useEffect, useState } from "react";

// import axios from "axios";

// // export function useGetUser() {
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     const fetchPrivateData = async () => {
// //       try {
// //         axios
// //           .get(`http://localhost:4000/user?auth-token=${token}`, {
// //             withCredentials: true,
// //           })
// //           .then((res) => {
// //             const userPrivateData = res.data;
// //             return userPrivateData;
// //           });
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     fetchPrivateData();
// //   }, []);
// // }

// export const GetUser = () => {
//   const token = localStorage.getItem("token");

//   const [privateData, setPrivateData] = useState(null);

//   axios
//     .get(`http://localhost:4000/user?auth-token=${token}`, {
//       withCredentials: true,
//     })
//     .then((res) => {
//       const backendUserData = res.data;
//     console.log(res.data)
//       setPrivateData(res.data);
//         console.log(privateData)
//       return privateData;
//     });

//   return privateData;

//   //   useEffect(() => {
//   //     try {
//   //       axios
//   //         .get(`http://localhost:4000/user?auth-token=${token}`, {
//   //           withCredentials: true,
//   //         })
//   //         .then((res) => {
//   //           console.log(res.data);
//   //           const backendUserData = res.data;
//   //           setPrivateData(backendUserData);
//   //         });
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   }, []);
// };
