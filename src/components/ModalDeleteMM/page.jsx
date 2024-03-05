"use client";

import { LuFileX2 } from "react-icons/lu";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";

export default function ModalDeleteMM(props) {
  const { setModalDeleteMM, userForEdit } = props;
  const db = getFirestore(appFirebase);

  const deleteMM = async (id) => {
    await deleteDoc(doc(db, "miniMasses", id));
    setModalDeleteMM(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute left-0 top-0 h-screen w-full bg-gray-100 opacity-80 z-10"></div>
      <div className="p-16 rounded-sm flex flex-col  items-center mt-40 bg-white z-20">
        <h3 className="text-center mt-4 text-xl">
          ¿Estás seguro que deseas eliminar este Minimass?
        </h3>
        <p className="mb-4">(no quedará registro)</p>
        <span className="px-2 py-1 mb-3 w-fit text-9xl text-teal-600 ring-2 ring-teal-600 rounded-md">
          <LuFileX2 />
        </span>
        <p className="text-center mt-2 mb-1 text-red-500 text-1xl">
          {userForEdit.nombreMM}
        </p>
        <p className="text-center mb-3 text-1xl">
          Clientes:{" "}
          {userForEdit.clientes.map((client, i) => {
            return i === userForEdit.clientes.length - 1
              ? client
              : client + " - ";
          })}
        </p>

        <div className="flex gap-5">
          <button
            onClick={() => setModalDeleteMM(false)}
            className="px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500 "
          >
            {" "}
            Cerrar
          </button>
          <button
            onClick={() => deleteMM(userForEdit.id)}
            className="px-3 py-2 bg-red-500 text-white rounded-sm hover:bg-red-300 "
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
