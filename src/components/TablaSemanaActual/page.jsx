"use client";
import { useState, useEffect } from "react";
import getListMM from "@/getListMM";
import { useAuth } from "@/context/AuthContext";
import getListClients from "@/getListClients";
import ModalDeleteMM from "../ModalDeleteMM/page";

export default function TablaSemanaActual({ addedMM }) {
  const [clientForList, setClientForList] = useState("all");
  const [mmList, setMMList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [modalDeleteMM, setModalDeleteMM] = useState(false);
  const [userForEdit, setuserForEdit] = useState(null);
  const { user } = useAuth();
  const userId = user.uid;

  const deteleMM = (id, clientes, nombreMM) => {
    setuserForEdit({ id: id, clientes: clientes, nombreMM: nombreMM });
    setModalDeleteMM(true);
  };

  useEffect(() => {
    getListMM(setMMList, userId, clientForList, "current");
  }, [clientForList, modalDeleteMM, addedMM, userId]);

  useEffect(() => {
    getListClients(userId, setClientList);
  }, [userId]);

  return (
    <div>
      {/* *****************************TABLAS****************************/}
      <h2 className="w-full text-center mt-4 text-xl">Semana Actual</h2>
      <div className="max-w-sm w-52 ml-10">
        <select
          onChange={(e) => setClientForList(e.target.value)}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
        >
          <option key="select" value="all">
            Todos
          </option>
          {clientList.map((doc, id) => (
            <option key={`select${id}`} value={doc.client}>
              {doc.client}
            </option>
          ))}
        </select>
      </div>
      <div className="py-4 border-b-2 w-full md:px-10">
        <table className="table-auto w-full text-center ">
          <thead className="">
            <tr className="bg-teal-600 text-white text-md h-9">
              <th></th>
              <th colSpan={5}>Semana 19 FEB</th>
            </tr>
            <tr className="h-10">
              <th></th>
              <th>N°</th>
              <th>Nombre </th>
              <th>Fecha Prog.</th>
              <th>Clientes </th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mmList.map((doc, i) => {
              const classTr =
                doc.fechaProg?.toDate().getDate() === new Date().getDate()
                  ? "bg-red-100"
                  : doc.fechaProg?.toDate().getDate() - 1 ===
                    new Date().getDate()
                  ? "bg-orange-100"
                  : "";

              return (
                <tr key={`tr${doc.id}`} className={`h-8 ${classTr}`}>
                  <td>
                    <button
                      onClick={() =>
                        deteleMM(doc.id, doc.clientes, doc.nombreMM)
                      }
                      className="hover:text-red-500"
                    >
                      x
                    </button>
                  </td>
                  <td>{i + 1}</td>
                  <td>{doc.nombreMM}</td>
                  <td className="text-sm">
                    {doc.fechaProg
                      ? (() => {
                          const day = doc.fechaProg.toDate().getDate();
                          const month = doc.fechaProg.toDate().getMonth() + 1;
                          const anio = doc.fechaProg.toDate().getYear() - 100;
                          const hours = doc.fechaProg.toDate().getHours();
                          const minutes = doc.fechaProg.toDate().getMinutes();
                          return `${day}/${month}/${anio} ${hours}:${minutes}`;
                        })()
                      : "- - -"}
                  </td>
                  <td>
                    {clientForList === "all"
                      ? doc.clientes.map((client, i) => {
                          return i === doc.clientes.length - 1
                            ? client
                            : client + " - ";
                        })
                      : clientForList}
                  </td>
                  <td>
                    {doc.estado ? (
                      "Abierto"
                    ) : (
                      <span className="text-red-500">Cerrado</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modalDeleteMM && (
        <ModalDeleteMM
          setModalDeleteMM={setModalDeleteMM}
          userForEdit={userForEdit}
        />
      )}
    </div>
  );
}
