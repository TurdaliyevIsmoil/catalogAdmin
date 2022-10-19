import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDataContext } from "../contexts/DataContext";

function LoginPage() {
  const [error, seterror] = useState("");
  const username = useRef();
  const password = useRef();
  const { login } = useDataContext();

  const submitHandler = (e) => {
    e.preventDefault();
    const user = username.current.value;
    const pass = password.current.value;
    login(user, pass);
  };
  return (
    <Container>
      <div className="login-box">
        <h3>Login</h3>
        <form onSubmit={submitHandler}>
          <p>Username</p>
          <input
            type="text"
            name="username"
            ref={username}
            placeholder="Enter your username..."
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            ref={password}
            placeholder="Enter your password..."
          />
          <input type="submit" name="" value="Login" />
          {error && (
            <p style={{ color: "red" }}>
              Login ma'lumotlari hato kiritilgan qaytadan urinib ko'ring
            </p>
          )}
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-weight: bold;
    font-size: 3em;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .login-box {
    width: 25em;
    height: 32em;
    background: #ffffff;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 3em 3em;
    border-radius: 10%;
  }

  .login-image {
    width: 7em;
    height: 7em;
    border-radius: 50%;
    position: absolute;
    top: -3.7em;
    left: calc(50% - 3.7em);
  }

  h3 {
    margin: 0 auto;
    padding: 0.5em 0;
    text-align: center;
    font-size: 2.5rem;
    color: #0f6181;
  }

  .login-box p {
    margin: 0;
    padding: 1em 0;
    font-weight: bold;
    color: #0f6181;
    padding-bottom: 0px;
  }

  .login-box input {
    width: 100%;
    margin-bottom: 2em;
  }

  .login-box input[type="text"],
  input[type="password"] {
    border: none;
    border-bottom: 1.2px solid #0f6181;
    background: transparent;
    outline: none;
    height: 2em;
    color: 0f6181;
    font-size: 16px;
  }

  .login-box input[type="submit"] {
    border: none;
    outline: none;
    height: 2.5em;
    background: #0f6181;
    color: white;
    font-size: 1em;
    border-radius: 1.5rem;
  }

  .login-box input[type="submit"]:hover {
    cursor: pointer;
    background: #0f6181;
    color: white;
  }

  .login-box a {
    text-decoration: none;
    font-size: 0.75em;
    line-height: 1.7em;
    color: rgb(53, 51, 58);
    display: flex;
    flex-direction: vertical;
  }

  .login-box a:hover {
    color: #0f6181;
  }
`;
