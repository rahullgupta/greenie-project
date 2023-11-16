import React from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import useInfoModal from "@/hooks/useInfoModal";

interface DetailsProps {
  users: Record<string, any>[];
}

const Details: React.FC<DetailsProps> = ({ users }) => {
  if (isEmpty(users)) return null;
  const { openModal } = useInfoModal();
  return (
    <div className="bg-white px-10 py-10 self-center mt-10 w-4/5 rounded-3xl">
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
          {users.map((user) => (
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
