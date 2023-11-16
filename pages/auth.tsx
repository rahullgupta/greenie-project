import Input from "@/components/Input";
import { SetStateAction, useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Title from "@/components/Title";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session: JSON.parse(JSON.stringify(session)) },
  };
}

const Auth = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        username: name,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }, [name, password]);

  return (
    <div className="absolute h-full w-full bg-[#1F4D90]">
      <Title value="Login" />
      <div className="h-screen flex justify-center items-center font-semibold">
        <div className="bg-white px-10 py-10 self-center mt-2 w-2/5 max-w-md rounded-3xl">
          <h2 className="text-black text-xl mb-8 text-center">
            Login to your account
          </h2>
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
            onClick={login}
            className="bg-[#1F4D90] py-3 text-white rounded-md w-full mt-10 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
