"use Client";
import getListMM from "@/getListMM";
import { useState, useEffect } from "react";
import ModalSetDateProg from "../ModalSetDateProg/page";
import getStartEndWeek from "@/getStartEndWeek";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";
import { MdOutlineEdit } from "react-icons/md";
import ModalEditDateProg from "../ModalEditDateProg/page";
import { FaRegCopy } from "react-icons/fa6";

export default function TablasPendientes(props) {
  const { clientForList, userId } = props;
  const [mmList, setMMList] = useState([]);
  const [modalSetDateProg, setModalSetDateProg] = useState(false);
  const [modalEditDateProg, setModalEditDateProg] = useState(false);
  const [mmForEdit, setMMForEdit] = useState(null);
  const [mmCurrentOpen, setMMCurrentOpen] = useState([]);
  const [mmLateOpen, setMMLateOpen] = useState([]);
  const [closedMM, setClosedMM] = useState(false);

  const db = getFirestore(appFirebase);

  const setDateProg = (id, nameMM) => {
    setMMForEdit({ id: id, nameMM: nameMM });
    setModalSetDateProg(true);
  };

  useEffect(() => {
    getListMM(setMMList, userId, clientForList, "open");
  }, [clientForList, modalSetDateProg, modalEditDateProg, closedMM, userId]);

  useEffect(() => {
    const today = new Date();
    const { inicio } = getStartEndWeek(today);
    const current = [];
    const late = [];

    mmList.forEach((mm) => {
      if (mm.fechaCreado.toDate() < inicio) {
        late.push(mm);
      } else {
        current.push(mm);
      }
    });
    setMMLateOpen(late);
    setMMCurrentOpen(current);
  }, [mmList]);

  const closeMM = (id) => {
    updateDoc(doc(db, "miniMasses", id), {
      fechaCerrado: new Date(),
      estado: false,
    });
    setClosedMM(!closedMM);
  };

  const editDateProg = (id, nombreMM, fechaProg) => {
    setMMForEdit({ id: id, nombreMM: nombreMM, fechaProg: fechaProg });
    setModalEditDateProg(true);
  };

  return (
    <div>
      {/************************************INICIO DE TABLA SEMANA ACTUAL*************************************************************/}
      <div className="py-4 border-b-2 w-full md:px-10">
        <table className="table-auto w-full text-center ">
          <thead className="">
            <tr className="bg-teal-600 text-white text-md h-9">
              <th></th>
              <th colSpan={5}>Semana Actual</th>
            </tr>
            <tr className="h-10">
              <th>N°</th>
              <th>Nombre </th>
              <th>Fecha Prog.</th>
              <th>Clientes </th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mmCurrentOpen.map((doc, i) => {
              const classTr =
                doc.fechaProg?.toDate().getDate() <= new Date().getDate()
                  ? "bg-red-100"
                  : doc.fechaProg?.toDate().getDate() - 1 ===
                    new Date().getDate()
                  ? "bg-orange-100"
                  : i % 2 === 0
                  ? "bg-gray-100"
                  : "";

              const day = doc.fechaProg?.toDate().getDate();
              const month = doc.fechaProg?.toDate().getMonth() + 1;
              const anio = doc.fechaProg?.toDate().getYear() - 100;
              const hours = doc.fechaProg?.toDate().getHours();
              const minutes = doc.fechaProg?.toDate().getMinutes();

              return (
                <tr
                  key={`tr${doc.id}`}
                  className={`h-8  text-xs md:text-base ${classTr}`}
                >
                  <td>{i + 1}</td>
                  <td className="flex justify-center gap-1 items-center">
                    <span id={`name${doc.id}`}>{doc.nombreMM}</span>

                    <span
                      onClick={() =>
                        navigator.clipboard.writeText(
                          document.getElementById(`name${doc.id}`).innerHTML
                        )
                      }
                      className="hover:text-teal-600 cursor-pointer"
                    >
                      <FaRegCopy />
                    </span>
                  </td>

                  <td>
                    {doc.fechaProg ? (
                      <div className="flex justify-end">
                        <span>
                          {day}/{month}/{anio} - {hours}:{minutes}
                        </span>{" "}
                        <button
                          onClick={() =>
                            editDateProg(doc.id, doc.nombreMM, doc.fechaProg)
                          }
                          className="cliente1 hover:text-blue-500 w-fit text-xl cursor-pointer"
                        >
                          <MdOutlineEdit />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDateProg(doc.id, doc.nombreMM)}
                        className="rounded-sm bg-blue-300 px-2 py-1 text-sm hover:bg-blue-500 hover:text-white"
                      >
                        Fecha
                      </button>
                    )}
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
                    {doc.fechaProg ? (
                      <button
                        onClick={() => {
                          closeMM(doc.id);
                        }}
                        className="rounded-sm bg-red-300 px-2 py-1 text-sm hover:bg-red-500 hover:text-white"
                      >
                        Cerrar
                      </button>
                    ) : (
                      "- - -"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/************************************INICIO DE TABLA ATRASADOS*************************************************************/}
      <div className="py-4 border-b-2 w-full md:px-10">
        <table className="table-auto w-full text-center ">
          <thead className="">
            <tr className="bg-teal-600 text-white text-md h-9">
              <th></th>
              <th colSpan={5}>Minimass Anteriores</th>
            </tr>
            <tr className="h-10">
              <th>N°</th>
              <th>Nombre </th>
              <th>Creado</th>
              <th>Fecha Prog.</th>
              <th>Clientes </th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mmLateOpen.map((doc, i) => {
              const classTr =
                doc.fechaProg?.toDate().getDate() <= new Date().getDate()
                  ? "bg-red-100"
                  : doc.fechaProg?.toDate().getDate() - 1 ===
                    new Date().getDate()
                  ? "bg-orange-100"
                  : "";
              const day = doc.fechaProg?.toDate().getDate();
              const month = doc.fechaProg?.toDate().getMonth() + 1;
              const anio = doc.fechaProg?.toDate().getYear() - 100;
              const hours = doc.fechaProg?.toDate().getHours();
              const minutes = doc.fechaProg?.toDate().getMinutes();

              return (
                <tr
                  key={`tr${doc.id}`}
                  className={`h-8  text-xs md:text-base ${classTr}`}
                >
                  <td>{i + 1}</td>
                  <td className="flex justify-center gap-1 items-center">
                    <span id={`name${doc.id}`}>{doc.nombreMM}</span>

                    <span
                      onClick={() =>
                        navigator.clipboard.writeText(
                          document.getElementById(`name${doc.id}`).innerHTML
                        )
                      }
                      className="hover:text-teal-600 cursor-pointer"
                    >
                      <FaRegCopy />
                    </span>
                  </td>
                  <td>
                    {doc.fechaCreado
                      ? (() => {
                          const day = doc.fechaCreado.toDate().getDate();
                          const month = doc.fechaCreado.toDate().getMonth() + 1;
                          const anio = doc.fechaCreado.toDate().getYear() - 100;
                          const hours = doc.fechaCreado.toDate().getHours();
                          const minutes = doc.fechaCreado.toDate().getMinutes();
                          return `${day}/${month}/${anio} ${hours}:${minutes}`;
                        })()
                      : "- - -"}
                  </td>
                  <td>
                    {doc.fechaProg ? (
                      <div className="flex justify-end">
                        <span>
                          {day}/{month}/{anio} - {hours}:{minutes}
                        </span>{" "}
                        <button
                          onClick={() =>
                            editDateProg(doc.id, doc.nombreMM, doc.fechaProg)
                          }
                          className="cliente1 hover:text-blue-500 w-fit text-xl cursor-pointer"
                        >
                          <MdOutlineEdit />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDateProg(doc.id, doc.nombreMM)}
                        className="rounded-sm bg-blue-300 px-2 py-1 text-sm hover:bg-blue-500 hover:text-white"
                      >
                        Fecha
                      </button>
                    )}
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
                    {doc.fechaProg ? (
                      <button
                        onClick={() => {
                          closeMM(doc.id);
                        }}
                        className="rounded-sm bg-red-300 px-2 py-1 text-sm hover:bg-red-500 hover:text-white"
                      >
                        Cerrar
                      </button>
                    ) : (
                      "- - -"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalSetDateProg && (
        <ModalSetDateProg
          setModalSetDateProg={setModalSetDateProg}
          mmForEdit={mmForEdit}
        />
      )}
      {modalEditDateProg && (
        <ModalEditDateProg
          setModalEditDateProg={setModalEditDateProg}
          mmForEdit={mmForEdit}
        />
      )}
    </div>
  );
}
