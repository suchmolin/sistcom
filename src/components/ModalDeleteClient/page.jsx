"use client";

import { FiUser } from "react-icons/fi";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";

export default function ModalDeleteClient(props) {
  const { setModalDeleteClient, userForEdit } = props;
  const db = getFirestore(appFirebase);

  const deleteClient = async (id) => {
    await deleteDoc(doc(db, "clientes", id));
    setModalDeleteClient(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute left-0 top-0 h-screen w-full bg-gray-100 opacity-80 z-10"></div>
      <div className="p-16 rounded-sm flex flex-col  items-center mt-40 bg-white z-20">
        <h3 className="text-center my-4 text-xl">
          ¿Estás seguro que deseas eliminar este cliente?
        </h3>
        <span className="px-2 py-1 mb-3 w-fit text-9xl text-teal-600 ring-2 ring-teal-600 rounded-md">
          <FiUser />
        </span>
        <p className="text-center mt-2 mb-4 text-red-500 text-3xl">
          {userForEdit.name}
        </p>
        <div className="flex gap-5">
          <button
            onClick={() => setModalDeleteClient(false)}
            className="px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500 "
          >
            {" "}
            Cerrar
          </button>
          <button
            onClick={() => deleteClient(userForEdit.id)}
            className="px-3 py-2 bg-red-500 text-white rounded-sm hover:bg-red-300 "
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
