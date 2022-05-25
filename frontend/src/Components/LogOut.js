import { useEffect } from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom';
function LogOut() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
        <Navigate to="/"></Navigate>
    </>
  );
}
export default LogOut;
