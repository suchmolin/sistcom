import { useAuth } from "@/context/AuthContext";
import getListClients from "@/getListClients";
import { useState, useEffect } from "react";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";

export default function PagoPromos() {
  const [selectClient, setSelectClient] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [totalCom, setTotalCom] = useState(0);
  const today = new Date();
  const month =
    today.getMonth() <= 8 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const fullyear = today.getFullYear();
  const [monthInput, setMonthInput] = useState(`${fullyear}-${month}`);
  const { user } = useAuth();
  const userId = user.uid;
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const searchPagoPromo = async (e) => {
    e.preventDefault();
    const mes = new Date(monthInput + "-01" + " 00:00");
    const inicio = new Date(mes.getFullYear(), mes.getMonth(), 1);
    const final = new Date(mes.getFullYear(), mes.getMonth() + 1, 0, 23, 59);

    const db = getFirestore(appFirebase);
    const q = query(
      collection(db, "promosgg"),
      where("assistClient", "==", userId),
      where("cliente", "==", selectClient),
      where("type", "==", "promo"),
      where("fechaPago", ">=", inicio),
      where("fechaPago", "<=", final)
    );
    const querySnapshot = await getDocs(q);
    let contTotal = 0;
    const array = [];
    querySnapshot.forEach((doc) => {
      array.push({
        id: doc.id,
        client: doc.data().cliente,
        model: doc.data().modelo,
        acord: doc.data().acord,
        actual: doc.data().actual,
        estado: doc.data().estado,
        fechaPago: doc.data().fechaPago,
        comision: doc.data().comision,
      });
      contTotal = contTotal + parseInt(doc.data().comision);
    });
    setModelsList(array);
    setTotalCom(contTotal);
  };

  useEffect(() => {
    getListClients(userId, setClientList);
  }, [userId]);

  const changedMonth = (e) => {
    setMonthInput(e.target.value);
    setModelsList([]);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="pb-7 border-b-2 w-full h-fit md:px-10">
        <h2 className="w-full text-center my-4 text-xl">Pago de Promos</h2>

        <form
          action="#"
          className="flex flex-col md:flex-row gap-5 md:items-center"
          onSubmit={searchPagoPromo}
        >
          <div className="w-full md:w-fit flex justify-center">
            <select
              onChange={(e) => setSelectClient(e.target.value)}
              className="h-fit w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 "
            >
              <option key="select" value={null}>
                Selecciona un Cliente
              </option>
              {clientList.map((doc, id) => (
                <option key={`select${id}`} value={doc.client}>
                  {doc.client}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-center">
            <label htmlFor="month">Mes:</label>
            <input
              required
              type="month"
              onChange={changedMonth}
              value={monthInput}
              className="ring-2 rounded-sm h-8 pl-2 ring-teal-700"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-fit px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500">
              Buscar
            </button>
          </div>
        </form>
        {/**************************** TABLA PAGO DE PROMO********************* */}

        <div className="w-full border-r-2 my-10">
          <table className="table-auto w-full text-center ">
            <thead className="">
              <tr className="bg-teal-600 text-white text-md h-9">
                <th colSpan={6}>
                  PROMOS {meses[new Date(monthInput).getMonth() + 1]}
                </th>
              </tr>
              <tr className="h-10">
                <th>Modelo</th>
                <th>Fans</th>
                <th>Fecha Pago</th>
                <th>Comision</th>
              </tr>
            </thead>
            <tbody>
              {modelsList.map((model, i) => {
                const classTr = i % 2 === 0 ? "bg-gray-100" : "";
                return (
                  <tr className={`h-8 ${classTr}`} key={model.id}>
                    <td>{model.model}</td>
                    <td>{model.acord}</td>
                    <td>
                      {model.fechaPago
                        ? (() => {
                            const day = model.fechaPago.toDate().getDate();
                            const month =
                              meses[model.fechaPago.toDate().getMonth()];
                            return `${day} ${month}`;
                          })()
                        : "- - -"}
                    </td>
                    <td>{model.comision}$</td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td className="font-bold">Total</td>
                <td className="border-2 border-teal-700">{totalCom}$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
