"use client";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";

export default function ModalEditarCliente(props) {
  const { setModalEditarCliente, userForEdit, userId } = props;
  const [inputNombre, setInputNombre] = useState(userForEdit.name);
  const db = getFirestore(appFirebase);

  const editClient = async () => {
    await setDoc(doc(db, "clientes", userForEdit.id), {
      client: inputNombre,
      assistClient: userId,
    });
    setModalEditarCliente(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute left-0 top-0 h-screen w-full bg-gray-100 opacity-80 z-10"></div>
      <div className="p-16 rounded-sm flex flex-col  items-center mt-40 bg-white z-20">
        <h3 className="text-center my-4 text-xl">Editar Cliente</h3>
        <span className="px-2 py-1 mb-3 w-fit text-9xl text-teal-600 ring-2 ring-teal-600 rounded-md">
          <FiUser />
        </span>
        <input
          onChange={(e) => setInputNombre(e.target.value)}
          type="text"
          value={inputNombre}
          className="text-center my-6 ring-2 rounded-sm"
        />
        <div className="flex gap-5">
          <button
            onClick={() => setModalEditarCliente(false)}
            className="px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500 "
          >
            {" "}
            Cerrar
          </button>
          <button
            onClick={editClient}
            className="px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-300 "
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
