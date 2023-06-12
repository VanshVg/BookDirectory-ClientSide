import React, { createContext, useState } from "react";

export const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(() => {
    const storedUserType = localStorage.getItem("userType");
    return storedUserType ? storedUserType : null;
  });
  const [userToken, setUserToken] = useState("");

  return (
    <Authcontext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userType,
        setUserType,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
