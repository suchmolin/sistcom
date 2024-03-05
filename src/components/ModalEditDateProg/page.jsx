import { LuFileClock } from "react-icons/lu";
import { useState } from "react";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";

export default function ModalEditDateProg(props) {
  const { setModalEditDateProg, mmForEdit } = props;
  const db = getFirestore(appFirebase);
  const fulldate = new Date(mmForEdit.fechaProg.toDate());
  const month =
    fulldate.getMonth() <= 9
      ? "0" + (fulldate.getMonth() + 1)
      : fulldate.getMonth() + 1;
  const date =
    fulldate.getDate() <= 9 ? "0" + fulldate.getDate() : fulldate.getDate();
  const hours =
    fulldate.getHours() <= 9 ? "0" + fulldate.getHours() : fulldate.getHours();
  const minutes =
    fulldate.getMinutes() <= 9
      ? "0" + fulldate.getMinutes()
      : fulldate.getMinutes();
  const fullyear = fulldate.getFullYear();

  const [inputDate, setInputDate] = useState(`${fullyear}-${month}-${date}`);
  const [handleHours, setHandleHours] = useState(hours);
  const [handleMinutes, setHandleMinutes] = useState(minutes);

  const EditDateProg = async () => {
    const setYear = new Date(inputDate).getFullYear();
    const setMonth = new Date(inputDate).getMonth();
    const setDate = new Date(inputDate).getDate() + 1;
    console.log(setYear);
    await updateDoc(doc(db, "miniMasses", mmForEdit.id), {
      fechaProg: new Date(
        setYear,
        setMonth,
        setDate,
        handleHours,
        handleMinutes
      ),
    });
    setModalEditDateProg(false);
  };

  const checkHours = (e) => {
    if (e.target.value.length > 2 || parseInt(e.target.value) > 23) return;
    const value = setHandleHours(e.target.value.replace(/[^0-9]/g, ""));
  };
  const checkMinutes = (e) => {
    if (e.target.value.length > 2 || parseInt(e.target.value) > 59) return;
    const value = setHandleMinutes(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center">
      <div className="absolute left-0 top-0 h-screen w-full bg-gray-100 opacity-80 z-10"></div>
      <div className="p-16 rounded-sm flex flex-col  items-center mt-40 bg-white z-20">
        <h3 className="text-center my-4 text-xl">
          Editar fecha de programacion
        </h3>
        <span className="px-2 py-1 mb-3 w-fit text-9xl text-teal-600 ring-2 ring-teal-600 rounded-md">
          <LuFileClock />
        </span>
        <span>{mmForEdit.nameMM}</span>
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => setInputDate(e.target.value)}
            type="date"
            value={inputDate}
            className="text-center my-6 ring-2 rounded-sm"
          />
          <span>HH:</span>
          <input
            type="text"
            onChange={checkHours}
            value={handleHours}
            className="ring-2 rounded-sm h-7 w-8 text-center"
          />
          <span>MM:</span>
          <input
            type="text"
            onChange={checkMinutes}
            value={handleMinutes}
            className="ring-2 rounded-sm h-7 w-8 text-center"
          />
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => setModalEditDateProg(false)}
            className="px-3 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-500 "
          >
            {" "}
            Cerrar
          </button>
          <button
            onClick={EditDateProg}
            className="px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-300 "
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
