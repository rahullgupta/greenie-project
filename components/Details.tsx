import React, { SetStateAction, useState } from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import useInfoModal from "@/hooks/useInfoModal";
import Input from "./Input";

interface DetailsProps {
  users: Record<string, any>[];
}

const Details: React.FC<DetailsProps> = ({ users }) => {
  if (isEmpty(users)) return null;
  const { openModal } = useInfoModal();
  const [property, setProperty] = useState("");
  const [value, setValue] = useState("");

  const [tempUsers, setTempUsers] = useState(users);

  function handleChange1(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setProperty(event.target.value);
    setTempUsers(users);
    setValue("");
  }
  function handleChange2(event: { target: { value: string } }) {
    if (event.target.value === "") setTempUsers(users);
    else {
      const temp: React.SetStateAction<Record<string, any>[]> = [];
      users.forEach((user) => {
        if (user[property].startsWith(event.target.value)) temp.push(user);
      });
      setTempUsers(temp);
    }
  }

  function handleChange(event: any) {
    setTempUsers(users);
    setProperty("");
    setValue("");
  }

  return (
    <div className="bg-white px-10 py-10 self-center mt-10 w-4/5 rounded-3xl">
      <div className="flex flex-row justify-start">
        <div className="w-[85%]">
          <div className="flex flex-row justify-start">
            <div className="w-[20%]">
              <select
                className="border-black border-2 rounded-md pt-4 pb-3.5 px-3"
                onChange={handleChange1}
              >
                <option
                  value=""
                  selected={property === ""}
                  disabled={property === ""}
                  hidden
                >
                  Choose a property
                </option>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            {property !== "" && (
              <div className="">
                <Input
                  label="Value"
                  onChange={(e: { target: { value: string } }) => {
                    setValue(e.target.value);
                    handleChange2(e);
                  }}
                  id="value"
                  type=""
                  value={value}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-[15%]">
          <button
            onClick={handleChange}
            className="bg-[#1F4D90] py-3 text-white rounded-md w-full transition"
          >
            Clear
          </button>
        </div>
      </div>
      <table className="flex flex-col border-collapse">
        <thead className="flex flex-col align-middle text-black">
          <th className="flex border-b min-h-[50px] border-b-neutral-300">
            <td className={`w-[20%] py-[12px] px-[16px] text-center`}>ID</td>
            <td className={`w-[20%] py-[12px] px-[16px] text-center`}>Name</td>
            <td className={`w-[20%] py-[12px] px-[16px] text-center`}>Email</td>
            <td className={`w-[20%] py-[12px] px-[16px] text-center`}>Phone</td>
            <td className={`w-[20%] py-[12px] px-[16px] text-center`}>
              Creation Date
            </td>
          </th>
        </thead>
        <tbody className="flex flex-col align-middle text-gray-500">
          {tempUsers.map((user) => (
            <tr
              key={user.id}
              className="cursor-pointer flex border-b min-h-[50px] border-b-neutral-300"
              onClick={() => openModal(user.id)}
            >
              <td className={`w-[20%] py-[12px] px-[16px] text-center`}>
                {user.id}
              </td>
              <td className={`w-[20%] py-[12px] px-[16px] text-center`}>
                {user.name}
              </td>
              <td className={`w-[20%] py-[12px] px-[16px] text-center`}>
                {user.email}
              </td>
              <td className={`w-[20%] py-[12px] px-[16px] text-center`}>
                {user.phone}
              </td>
              <td className={`w-[20%] py-[12px] px-[16px] text-center`}>
                {moment(user.creationDate).format("MMMM Do, YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Details;
