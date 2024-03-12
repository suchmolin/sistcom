"use client";

import { doc, updateDoc, getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";

export default function ModalDeleteModel(props) {
  const { rowEdit, setModalDeleteModel } = props;

  const db = getFirestore(appFirebase);

  const closeModel = async (id) => {
    updateDoc(doc(db, "promosgg", id), {
      estado: false,
      fechaCerrado: new Date(),
    });
    setModalDeleteModel(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute left-0 top-0 h-screen w-full bg-gray-100 opacity-80 z-10"></div>
      <div className="p-16 rounded-sm flex flex-col  items-center mt-40 bg-white z-20">
        <h3 className="text-center mt-4 text-xl">
          ¿Estás seguro que deseas finalizar esta Modelo?
        </h3>

        <p className="text-center mt-2 mb-1 text-1xl">
          <span className=" text-red-500">{rowEdit.model}</span> del cliente{" "}
          <span className=" text-red-500">{rowEdit.client}</span>
        </p>

        <div className="flex gap-5">
          <button
            onClick={() => setModalDeleteModel(false)}
            className="px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500 "
          >
            {" "}
            Cerrar
          </button>
          <button
            onClick={() => closeModel(rowEdit.id)}
            className="px-3 py-2 bg-red-500 text-white rounded-sm hover:bg-red-300 "
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
