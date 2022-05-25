import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const addressHandler = (e) => {
    setAddress(e.target.value);
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      axios
        .post("http://localhost:5000/api/auth/register", {
          name: name,
          email: email,
          password: password,
          address: address,
          phone: phone,
        })
        .then((res) => {
          alert(res.data.message);
          console.log(res);
          setAddress("");
          if (res.data.message === "Sign Up successfully!") {
            setEmail("");
            setName("");
            setPassword("");
            setPhone("");
            setConfirmPassword("");
              navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else {
      alert("Password do not match");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={nameHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={emailHandler}
            autoComplete="on"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
            autoComplete="new-password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={confirmPasswordHandler}
            autoComplete="on"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
            value={address}
            onChange={addressHandler}
            autoComplete="on"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Phone"
            value={phone}
            onChange={phoneHandler}
            autoComplete="on"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default SignUp;
