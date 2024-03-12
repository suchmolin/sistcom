import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";
import getListMM from "@/getListMM";
import getStartEndWeek from "@/getStartEndWeek";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

export default function FinalizadosMM() {
  const [mmList, setMMList] = useState([]);
  const [mmCurrentClosed, setMMCurrentClosed] = useState([]);
  const [mmLateClosed, setMMLateClosed] = useState([]);
  const [openMM, setopenMM] = useState(false);

  const { user } = useAuth();
  const userId = user.uid;

  const db = getFirestore(appFirebase);

  useEffect(() => {
    getListMM(setMMList, userId, "all", "closed");
  }, [openMM, userId]);

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
    setMMCurrentClosed(current);
    setMMLateClosed(late);
  }, [mmList]);

  const Reopen = (id) => {
    updateDoc(doc(db, "miniMasses", id), {
      fechaCerrado: new Date(),
      estado: true,
    });
    setopenMM(!openMM);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="py-4 border-b-2 w-full md:px-10">
        <table className="table-auto w-full text-center ">
          <thead className="">
            <tr className="bg-teal-600 text-white text-md h-9">
              <th></th>
              <th colSpan={5}>Finalizados de la Semana Actual</th>
            </tr>
            <tr className="h-10">
              <th>N°</th>
              <th>Nombre </th>

              <th>Clientes </th>
              <th>Cerrado</th>
              <th>Reopen</th>
            </tr>
          </thead>
          <tbody>
            {mmCurrentClosed.map((doc, i) => {
              const classTr = i % 2 === 0 ? "bg-gray-100" : "";
              return (
                <tr
                  key={`tr${doc.id}`}
                  className={`h-8 ${classTr} text-xs md:text-base`}
                >
                  <td className="">{i + 1}</td>
                  <td>{doc.nombreMM}</td>

                  <td>
                    {doc.clientes.map((client, i) => {
                      return i === doc.clientes.length - 1
                        ? client
                        : client + " - ";
                    })}
                  </td>
                  <td>
                    {doc.fechaCerrado
                      ? (() => {
                          const day = doc.fechaCerrado.toDate().getDate();
                          const month =
                            doc.fechaCerrado.toDate().getMonth() + 1;
                          const anio =
                            doc.fechaCerrado.toDate().getYear() - 100;
                          const hours = doc.fechaCerrado.toDate().getHours();
                          const minutes = doc.fechaCerrado
                            .toDate()
                            .getMinutes();
                          return `${day}/${month}/${anio} ${hours}:${minutes}`;
                        })()
                      : "- - -"}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        Reopen(doc.id);
                      }}
                      className="rounded-sm bg-blue-300 px-2 py-1hover:bg-blue-500 hover:text-white text-xl"
                    >
                      <MdOutlineSettingsBackupRestore />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/****************************FINALIZADOS ANTERIORES*************************************** */}
      <div className="py-4 border-b-2 w-full md:px-10">
        <table className="table-auto w-full text-center ">
          <thead className="">
            <tr className="bg-teal-600 text-white text-md h-9">
              <th></th>
              <th colSpan={5}>Finalizados Anteriores</th>
            </tr>
            <tr className="h-10">
              <th>N°</th>
              <th>Nombre </th>

              <th>Clientes </th>
              <th>Creado</th>
              <th>Cerrado</th>
            </tr>
          </thead>
          <tbody>
            {mmLateClosed.map((doc, i) => {
              const classTr = i % 2 === 0 ? "bg-gray-100" : "";
              return (
                <tr
                  key={`tr${doc.id}`}
                  className={`h-8 ${classTr}   text-xs md:text-base`}
                >
                  <td>{i + 1}</td>
                  <td>{doc.nombreMM}</td>

                  <td>
                    {doc.clientes.map((client, i) => {
                      return i === doc.clientes.length - 1
                        ? client
                        : client + " - ";
                    })}
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
                    {doc.fechaCerrado
                      ? (() => {
                          const day = doc.fechaCerrado.toDate().getDate();
                          const month =
                            doc.fechaCerrado.toDate().getMonth() + 1;
                          const anio =
                            doc.fechaCerrado.toDate().getYear() - 100;
                          const hours = doc.fechaCerrado.toDate().getHours();
                          const minutes = doc.fechaCerrado
                            .toDate()
                            .getMinutes();
                          return `${day}/${month}/${anio} ${hours}:${minutes}`;
                        })()
                      : "- - -"}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        Reopen(doc.id);
                      }}
                      className="rounded-sm bg-blue-300 px-2 py-1 hover:bg-blue-500 hover:text-white text-xl"
                    >
                      <MdOutlineSettingsBackupRestore />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
