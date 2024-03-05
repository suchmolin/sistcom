"use client";
import { useEffect, useState } from "react";
import { FiUserPlus, FiUser } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import ModalEditarCliente from "../ModalEditarCliente/page";
import ModalDeleteClient from "../ModalDeleteClient/page";
import appFirebase from "@/firebase/firebase.config";
import { useAuth } from "@/context/AuthContext";
import getListClients from "@/getListClients";
import { getFirestore, addDoc, collection } from "firebase/firestore";

export default function AgregarClientes() {
  const { user } = useAuth();
  const userId = user.uid;
  const [modalEditarCliente, setModalEditarCliente] = useState(false);
  const [modalDeleteClient, setModalDeleteClient] = useState(false);
  const [userForEdit, setUserForEdit] = useState(null);
  const [handleNewClient, setHandleNewClient] = useState("");

  const [clientList, setClientList] = useState([]);
  const db = getFirestore(appFirebase);

  const editUser = (id, name) => {
    setUserForEdit({ id: id, name: name });
    setModalEditarCliente(true);
  };

  const deleteClient = (id, name) => {
    setUserForEdit({ id: id, name: name });
    setModalDeleteClient(true);
  };

  const addClient = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "clientes"), {
        assistClient: userId,
        client: handleNewClient,
      });
    } catch (error) {
      console.log(error);
    }
    setHandleNewClient("");
    getListClients(userId, setClientList);
  };

  useEffect(() => {
    getListClients(userId, setClientList);
  }, [modalDeleteClient, modalEditarCliente, userId]);

  return (
    <div className="flex flex-col w-full relative">
      <div className="pb-7 border-b-2 w-full h-fit md:px-10">
        <h2 className="w-full text-center my-4 text-xl">
          Agregar Nuevo Cliente
        </h2>
        <form
          onSubmit={addClient}
          action="#"
          className="w-full flex justify-center items-center"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="px-2 py-1 mb-3 text-9xl text-teal-600 ring-2 ring-teal-600 rounded-md">
              <FiUserPlus />
            </span>
            <input
              required
              placeholder="Cliente"
              onChange={(e) => setHandleNewClient(e.target.value)}
              value={handleNewClient}
              type="text"
              className="ring-2 rounded-sm w-70 ring-teal-600 mb-2 text-center py-1"
            />
            <label htmlFor="nombre">Nombre del Cliente</label>
          </div>

          <button className="ml-10 px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500">
            Agregar
          </button>
        </form>
      </div>
      <div className="pb-7 border-b-2 w-full h-full md:px-10">
        <h2 className="w-full text-center my-4 text-xl">Editar Clientes</h2>
        <div className="w-full flex items-center justify-center gap-10">
          {clientList.map((doc) => {
            return (
              <div
                key={doc.id}
                className="flex flex-col justify-center items-center"
              >
                <div className="flex gap-6">
                  <button
                    onClick={() => editUser(doc.id, doc.client)}
                    className="cliente1 hover:text-blue-500 w-fit text-xl"
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={() => deleteClient(doc.id, doc.client)}
                    className="hover:text-red-500 w-fit text-2xl"
                  >
                    x
                  </button>
                </div>
                <span className="px-2 py-1 mb-3 w-fit text-7xl text-teal-600 ring-2 ring-teal-600 rounded-md">
                  <FiUser />
                </span>
                <p id="cliente1" className="rounded-sm text-center mb-2 w-24">
                  {doc.client}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {modalEditarCliente && (
        <ModalEditarCliente
          setModalEditarCliente={setModalEditarCliente}
          userForEdit={userForEdit}
          userId={userId}
        />
      )}
      {modalDeleteClient && (
        <ModalDeleteClient
          setModalDeleteClient={setModalDeleteClient}
          userForEdit={userForEdit}
        />
      )}
    </div>
  );
}
