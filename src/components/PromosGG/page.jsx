"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import getListClients from "@/getListClients";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";
import ListPromoGG from "../ListPromosGG/page";

export default function PromosGG() {
  const [clientList, setClientList] = useState([]);
  const [clientForList, setClientForList] = useState(null);
  const [typeRadio, setTypeRadio] = useState(null);
  const [modelInput, setModelInput] = useState("");
  const [fansInput, setFansInput] = useState("");
  const [comisionInput, setComisionInput] = useState("");
  const [errorClient, setErrorClient] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const [addedModel, setAddedModel] = useState(false);
  const today = new Date();
  const fullyear = today.getFullYear();
  const month =
    today.getMonth() <= 8 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const day = today.getDate() <= 9 ? "0" + today.getDate() : today.getDate();
  const [inputDate, setInputDate] = useState(`${fullyear}-${month}-${day}`);
  const [inputDatePay, setInputDatePay] = useState(
    `${fullyear}-${month}-${day}`
  );
  const { user } = useAuth();
  const userId = user.uid;
  const db = getFirestore(appFirebase);

  useEffect(() => {
    getListClients(userId, setClientList);
  }, [userId]);

  const checkFans = (e) => {
    if (e.target.value.length > 3 || parseInt(e.target.value) > 999) return;
    const value = setFansInput(e.target.value.replace(/[^0-9]/g, ""));
  };
  const checkComision = (e) => {
    if (e.target.value.length > 2 || parseInt(e.target.value) > 99) return;
    const value = setComisionInput(e.target.value.replace(/[^0-9]/g, ""));
  };

  const selectClient = (e) => {
    setErrorClient(false);
    setClientForList(e.target.value);
  };

  const setRadio = (e) => {
    setErrorType(false);
    setTypeRadio(e.target.value);
    if (e.target.value === "promo") {
      document.getElementById("fechaProg").classList.remove("hidden");
      document.getElementById("comInput").classList.remove("hidden");
    }
    if (e.target.value === "gg") {
      document.getElementById("fechaProg").classList.add("hidden");
      document.getElementById("comInput").classList.add("hidden");
    }
  };

  const addModel = async (e) => {
    e.preventDefault();
    if (!clientForList) {
      setErrorClient(true);
      return;
    }
    if (!typeRadio) {
      setErrorType(true);
      return;
    }

    if (typeRadio === "promo") {
      await addDoc(collection(db, "promosgg"), {
        assistClient: userId,
        cliente: clientForList,
        modelo: modelInput,
        type: typeRadio,
        acord: fansInput,
        fechaProg: new Date(inputDate + " 00:00"),
        fechaPago: new Date(inputDatePay + " 00:00"),
        comision: comisionInput,
        actual: 0,
        extra: 0,
        estado: true,
      });
    }

    if (typeRadio === "gg") {
      await addDoc(collection(db, "promosgg"), {
        assistClient: userId,
        cliente: clientForList,
        modelo: modelInput,
        type: typeRadio,
        acord: fansInput,

        actual: 0,
        extra: 0,
        estado: true,
      });
    }

    setFansInput("");
    setModelInput("");
    setComisionInput("");
    setAddedModel(!addedModel);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="pb-7 border-b-2 w-full h-fit md:px-10">
        <h2 className="w-full text-center my-4 text-xl">Asignar Modelo</h2>
        <div className="w-ffull h-full">
          <form
            action="#"
            className="flex flex-col items-center gap-5 justify-between"
            onSubmit={addModel}
          >
            <div className="w-full flex gap-5">
              <div className="flex flex-col gap-2">
                <select
                  onChange={selectClient}
                  className="h-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 "
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
                {errorClient && (
                  <p className="text-red-500 ml-1">Seleccione un cliente</p>
                )}
                {errorType && (
                  <p className="text-red-500 ml-1">Seleccione un tipo</p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <input
                    onChange={setRadio}
                    type="radio"
                    value="promo"
                    name="promoRadio"
                    className="w-4 h-4 cursor-pointer focus:ring-0"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Promos
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={setRadio}
                    type="radio"
                    value="gg"
                    name="promoRadio"
                    className="w-4 h-4 cursor-pointer focus:ring-0"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {"GG's"}
                  </label>
                </div>
              </div>
              <div className="flex flex-col ml-3 -mt-3">
                <label>Modelo</label>
                <input
                  required
                  onChange={(e) => setModelInput(e.target.value)}
                  value={modelInput}
                  type="text"
                  className="ring-2 ring-teal-700 rounded-sm pl-2 w-40"
                />
              </div>
              <div className="flex flex-col ml-3 -mt-3">
                <label>fans</label>
                <input
                  required
                  type="text"
                  onChange={checkFans}
                  value={fansInput}
                  className="ring-2 ring-teal-700 rounded-sm h-7 w-12 text-center"
                />
              </div>
              <div id="fechaProg" className="ml-3 -mt-3 gap-2 hidden">
                <div className="flex flex-col">
                  <label>Programacion</label>
                  <input
                    required
                    type="date"
                    onChange={(e) => setInputDate(e.target.value)}
                    value={inputDate}
                    className="ring-2 ring-teal-700 rounded-sm h-7 pl-2"
                  />
                  <div className="flex flex-col"></div>
                  <label>Pago</label>
                  <input
                    required
                    type="date"
                    onChange={(e) => setInputDatePay(e.target.value)}
                    value={inputDatePay}
                    className="ring-2 ring-teal-700 rounded-sm h-7 pl-2"
                  />
                </div>
              </div>
              <div id="comInput" className="hidden">
                <div className="flex flex-col -mt-3">
                  <label>Com.</label>
                  <input
                    type="text"
                    onChange={checkComision}
                    value={comisionInput}
                    className="ring-2 ring-teal-700 rounded-sm h-7 w-12 text-center"
                  />
                </div>
              </div>
            </div>

            <button className="ml-10 px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500">
              Asignar
            </button>
          </form>
        </div>
      </div>
      <ListPromoGG addedModel={addedModel} />
    </div>
  );
}
