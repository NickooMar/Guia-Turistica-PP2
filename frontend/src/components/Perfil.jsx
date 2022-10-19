import React, { useContext } from 'react'

import AuthContext from "./Context/AuthContext";

const Perfil = () => {

    const { user } = useContext(AuthContext)   

  return (
    <div>{user?.username}</div>
  )
}

export default Perfil