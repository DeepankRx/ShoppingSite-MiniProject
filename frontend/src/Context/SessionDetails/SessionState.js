import SessionContext from "./SessionContext";
import { useState, useEffect } from "react";
import agent from "../../agent";
const SessionState = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    agent.Auth.isLoggedIn().then((response) => {
      setIsLoggedIn(response.data.loggedIn);
      setIsAdmin(response.data.isAdmin);
    });
  }, []);
  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        setIsAdmin,
        setIsLoggedIn,
        isAdmin,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionState;
