import React, { useCallback, useEffect, useState } from "react";
import useInfoModal from "@/hooks/useInfoModal";
import useUser from "@/hooks/useUser";
import { AiOutlineClose } from "react-icons/ai";

const InfoModal = () => {
  const { id, isOpen, openModal, closeModal } = useInfoModal();
  const { data = {} } = useUser(id);

  const handleCLose = useCallback(() => {
    setTimeout(() => {
      closeModal();
    }, 100);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div className="z-50 transition duration-300 bg-[#1F4D90] bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="mx-10 px-10 py-10 self-center my-10 w-3/5 max-w-3xl rounded-lg overflow-hidden">
        <div
          className={`${
            isOpen ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-[#fff] drop-shadow-md`}
        >
          <div
            className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-[#1F4D90] flex items-center justify-center"
            onClick={handleCLose}
          >
            <AiOutlineClose className="text-white" size={20} />
          </div>
          <div className="flex flex-col mx-10 gap-4">
            <div className="mt-10 text-lg">Username: {data.name}</div>
            <div className="text-lg">Phone: {data.phone}</div>
            <div className="text-lg">Email: {data.email}</div>
          </div>
          <button className="bg-[#1F4D90] py-3 px-3 my-5 mx-10 text-white rounded-md mt-10 transition">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
