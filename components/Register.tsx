import React, { SetStateAction, useCallback, useState } from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import axios from "axios";
import Input from "./Input";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        username: name,
        password,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  }, [name, password]);
  return (
    <div className="bg-white text-center px-10 py-10 self-center mt-10 w-3/5 max-w-md rounded-3xl">
      {status === "" ? (
        <>
          <div className="flex flex-col gap-4">
            <Input
              label="Username"
              onChange={(e: { target: { value: SetStateAction<string> } }) => {
                setName(e.target.value);
              }}
              id="name"
              type=""
              value={name}
            />
            <Input
              label="Password"
              onChange={(e: { target: { value: SetStateAction<string> } }) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              value={password}
            />
          </div>
          <button
            onClick={register}
            className="bg-[#1F4D90] py-3 text-white rounded-md w-full mt-10 transition"
          >
            Create Account
          </button>
        </>
      ) : status === "success" ? (
        "Account created successfully"
      ) : (
        "Username already taken"
      )}
    </div>
  );
};

export default Register;
