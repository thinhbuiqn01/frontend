import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  search: "",
  setSearch: () => {},
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
  const [search, setSearch] = useState("");

  const setUserToken = (token) => {
    localStorage.setItem("TOKEN", token);
    _setUserToken(token);
  };

  const setCurrentUser = (user) => {
    localStorage.setItem("current_user", JSON.stringify(user));
    _setCurrentUser(user);
  };

  const logout = async () => {
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
        search,
        logout,
        setSearch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
