"use client";

import { doc, updateDoc, getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";
import { useState } from "react";

export default function ModalEditModel(props) {
  const { rowEdit, setModalEditModel } = props;
  const [modelInput, setModelInput] = useState(rowEdit.model);
  const [fansCurrentInput, setFansCurrentInput] = useState(rowEdit.actual);
  const [fansCurrentInputSec, setFansCurrentInputSec] = useState(
    rowEdit.actualSec
  );
  const [fansFinalInput, setFansFinalInput] = useState(rowEdit.acord);
  const [fansFinalInputSec, setFansFinalInputSec] = useState(rowEdit.acordSec);
  const [progInput, setProgInput] = useState(rowEdit.extra);
  const fulldate = new Date(rowEdit.fechaProg?.toDate());
  const month =
    fulldate.getMonth() <= 9
      ? "0" + (fulldate.getMonth() + 1)
      : fulldate.getMonth() + 1;
  const date =
    fulldate.getDate() <= 9 ? "0" + fulldate.getDate() : fulldate.getDate();
  const fullyear = fulldate.getFullYear();

  const [inputDate, setInputDate] = useState(`${fullyear}-${month}-${date}`);

  const db = getFirestore(appFirebase);

  const saveModelCount = async (id) => {
    if (rowEdit.fechaProg) {
      const setYear = new Date(inputDate).getFullYear();
      const setMonth = new Date(inputDate).getMonth();
      const setDate = new Date(inputDate).getDate() + 1;
      updateDoc(doc(db, "promosgg", id), {
        modelo: modelInput,
        actual: fansCurrentInput,
        acord: fansFinalInput,
        extra: progInput,
        fechaProg: new Date(setYear, setMonth, setDate),
      });
    } else {
      updateDoc(doc(db, "promosgg", id), {
        modelo: modelInput,
        actual: fansCurrentInput,
        acord: fansFinalInput,
        actualSec: fansCurrentInputSec,
        acordSec: fansFinalInputSec,
        extra: progInput,
      });
    }
    setModalEditModel(false);
  };

  const checkFansCurrent = (e) => {
    if (e.target.value.length > 3 || parseInt(e.target.value) > 999) return;
    setFansCurrentInput(e.target.value.replace(/[^0-9]/g, ""));
  };
  const checkFansCurrentSec = (e) => {
    if (e.target.value.length > 3 || parseInt(e.target.value) > 999) return;
    setFansCurrentInputSec(e.target.value.replace(/[^0-9]/g, ""));
  };
  const checkFansFinal = (e) => {
    if (e.target.value.length > 3 || parseInt(e.target.value) > 999) return;
    setFansFinalInput(e.target.value.replace(/[^0-9]/g, ""));
  };
  const checkFansFinalSec = (e) => {
    if (e.target.value.length > 3 || parseInt(e.target.value) > 999) return;
    setFansFinalInputSec(e.target.value.replace(/[^0-9]/g, ""));
  };
  const checkProg = (e) => {
    if (e.target.value.length > 3 || parseInt(e.target.value) > 99) return;
    setProgInput(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute left-0 top-0 h-screen w-full bg-gray-100 opacity-80 z-10"></div>
      <div className="p-16 rounded-sm flex flex-col  items-center mt-40 bg-white z-20">
        <h3 className="text-center mt-4 text-xl">Editar Conteo</h3>
        <div className="flex gap-2 mt-3">
          <label>Modelo</label>
          <input
            required
            onChange={(e) => setModelInput(e.target.value)}
            value={modelInput}
            type="text"
            className="ring-2 ring-teal-700 rounded-sm pl-2 w-40"
          />
        </div>
        <div className="flex my-6 gap-3">
          <span>Conteo: </span>
          <input
            required
            type="text"
            onChange={checkFansCurrent}
            value={fansCurrentInput}
            className="ring-2 ring-teal-700 rounded-sm h-7 w-12 text-center"
          />{" "}
          /{" "}
          <input
            required
            type="text"
            onChange={checkFansFinal}
            value={fansFinalInput}
            className="ring-2 ring-teal-700 rounded-sm h-7 w-12 text-center"
          />
          {rowEdit.acordSec && (
            <div>
              <span>Conteo M: </span>
              <input
                required
                type="text"
                onChange={checkFansCurrentSec}
                value={fansCurrentInputSec}
                className="ring-2 ring-teal-700 rounded-sm h-7 w-12 text-center"
              />{" "}
              /{" "}
              <input
                required
                type="text"
                onChange={checkFansFinalSec}
                value={fansFinalInputSec}
                className="ring-2 ring-teal-700 rounded-sm h-7 w-12 text-center"
              />
            </div>
          )}
          <span>Prog</span>
          <input
            required
            type="text"
            onChange={checkProg}
            value={progInput}
            className="ring-2 ring-teal-700 rounded-sm h-7 w-12 text-center"
          />
        </div>
        {rowEdit.fechaProg && (
          <div className="flex gap-2 mb-5">
            <label htmlFor="nombre">fecha Prog.</label>
            <input
              required
              type="date"
              onChange={(e) => setInputDate(e.target.value)}
              value={inputDate}
              className="ring-2 ring-teal-700 rounded-sm h-7 pl-2"
            />
          </div>
        )}
        <div className="flex gap-5">
          <button
            onClick={() => setModalEditModel(false)}
            className="px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500 "
          >
            {" "}
            Cerrar
          </button>
          <button
            onClick={() => saveModelCount(rowEdit.id)}
            className="px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-red-300 "
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
