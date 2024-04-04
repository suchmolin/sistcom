"use client";
import { useState, useEffect } from "react";
import TablaSemanaActual from "../TablaSemanaActual/page";
import { useAuth } from "@/context/AuthContext";
import getListClients from "@/getListClients";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";

export default function AgregarMM() {
  const [addedMM, setaddedMM] = useState(true);
  const [mmInput, setMMInput] = useState("");
  const [clientList, setClientList] = useState([]);
  const [checked, setCheked] = useState([]);
  const { user } = useAuth();
  const userId = user.uid;
  const db = getFirestore(appFirebase);

  useEffect(() => {
    getListClients(userId, setClientList);
  }, [userId]);

  const addMini = async (e) => {
    e.preventDefault();
    let now = new Date();

    await addDoc(collection(db, "miniMasses"), {
      assistClient: userId,
      clientes: checked,
      estado: true,
      fechaCreado: now,
      fechaProg: null,
      nombreMM: mmInput,
    });
    setMMInput("");
    setaddedMM(!addedMM);
  };

  const pushChecked = (e) => {
    const array = checked;
    const value = e.target.value;
    if (e.target.checked && !array.includes(e.target.value)) {
      array.push(value);
      setCheked(array);
    }
    if (!e.target.checked) {
      const response = array.filter((id) => id != value);
      setCheked(response);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="pb-7 border-b-2 w-full md:px-10">
        <h2 className="w-full text-center my-4 text-xl">Agregar MM</h2>
        <form
          onSubmit={addMini}
          action="#"
          className=" flex flex-col items-center"
        >
          <div className="w-ffull flex items-center mb-4">
            <label htmlFor="nombre">Nombre</label>
            <input
              required
              onChange={(e) => setMMInput(e.target.value)}
              value={mmInput}
              type="text"
              className="ring-2 rounded-sm ml-2 w-72 px-2 ring-teal-700"
            />
          </div>
          <div className="mb-4">
            {
              /******************************CHECKBOXES***************************************************** */

              clientList.map((doc, i) => {
                return (
                  <div key={i} className="flex items-center ">
                    <input
                      onChange={pushChecked}
                      id={doc.id}
                      value={doc.client}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500cursor-pointer"
                    />
                    <label
                      htmlFor={doc.id}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {doc.client}
                    </label>
                  </div>
                );
              })
            }
          </div>
          <button className="px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500">
            Guardar
          </button>
        </form>
      </div>
      <TablaSemanaActual addedMM={addedMM} />
    </div>
  );
}
