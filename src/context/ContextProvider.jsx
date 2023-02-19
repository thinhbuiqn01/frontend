import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const currentUserInit = localStorage.getItem("current_user")
    ? JSON.parse(localStorage.getItem("current_user"))
    : {};
  const [currentUser, _setCurrentUser] = useState(currentUserInit);

  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );

  const setUserToken = (token) => {
    localStorage.setItem("TOKEN", token);
    _setUserToken(token);
  };

  const setCurrentUser = (user) => {
    localStorage.setItem("current_user", JSON.stringify(user));
    _setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser({});
    setUserToken("");
    localStorage.removeItem("current_user");
    localStorage.removeItem("TOKEN");
  }; 
  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
