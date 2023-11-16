import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Title from "@/components/Title";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import useUsersList from "@/hooks/useUsersList";
import Details from "@/components/Details";
import Register from "@/components/Register";
import InfoModal from "@/components/InfoModal";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session: JSON.parse(JSON.stringify(session)) },
  };
}

export default function Home() {
  const { data: users = [] } = useUsersList();

  const [variant, setVariant] = useState("details");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "details" ? "register" : "details"
    );
  }, []);

  return (
    <div className="absolute h-full w-full bg-[#1F4D90]">
      <Title value="Home" />
      <div className="flex justify-end">
        <div
          onClick={() => signOut()}
          className="bg-[#fff] text-[#000] py-1 px-2 mx-3 my-3 text-md cursor-pointer rounded-md"
        >
          Sign out
        </div>
      </div>
      <InfoModal />
      <div className="flex justify-center">
        <button
          className={`bg-[#1F4D90] text-[#fff] px-10 text-2xl pt-7 mt-2 w-1/5 ${
            variant === "details" ? "" : "opacity-50"
          }`}
          onClick={variant === "register" ? toggleVariant : () => {}}
        >
          User Details
        </button>
        <button
          className={`bg-[#1F4D90] text-[#fff] px-10 text-2xl pt-7 mt-2 w-1/5 ${
            variant === "register" ? "" : "opacity-50"
          }`}
          onClick={variant === "details" ? toggleVariant : () => {}}
        >
          Account Creation
        </button>
      </div>
      <div className="flex justify-center items-center">
        {variant === "register" ? <Register /> : <Details users={users} />}
      </div>
    </div>
  );
}
