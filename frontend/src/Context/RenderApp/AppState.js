import AppContext from "./AppContext";
import { useState, useEffect } from "react";
import agent from "../../agent";
const AppState = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    agent.Auth.isLoggedIn().then((response) => {
      setIsLoggedIn(response.data.loggedIn);
      setIsAdmin(response.data.isAdmin);
    });
  }, []);
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsAdmin,
        setIsLoggedIn,
        isAdmin,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
