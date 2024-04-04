import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";
import getListModels from "@/getListModels";

export default function ModelsClosed(props) {
  const { closedList, setModelsList, clientForList, userId } = props;

  const db = getFirestore(appFirebase);

  const deleteModel = async (id) => {
    await deleteDoc(doc(db, "promosgg", id));
    getListModels(userId, clientForList, setModelsList);
  };

  return (
    <div className="py-4 mt-10 border-b-2 w-full md:px-10">
      <table className="table-auto w-full text-center ">
        <thead className="">
          <tr className="bg-teal-600 text-white text-md h-9">
            <th colSpan={5}>Modelos finalizadas</th>
          </tr>
          <tr className="h-10">
            <th></th>
            <th>Modelo </th>
            <th>act / fin.</th>
            <th>Fecha Cierre</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {closedList.map((model, i) => {
            const classTr = i % 2 === 0 ? "bg-gray-100" : "";
            const day = model.fechaCerrado?.toDate().getDate();
            const month = model.fechaCerrado?.toDate().getMonth() + 1;
            const anio = model.fechaCerrado?.toDate().getYear() - 100;
            const hours = model.fechaCerrado?.toDate().getHours();
            const minutes = model.fechaCerrado?.toDate().getMinutes();

            return (
              <tr key={`tr${model.id}`} className={`h-8 ${classTr}`}>
                <td>
                  <span
                    onClick={() => deleteModel(model.id)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    x
                  </span>
                </td>
                <td className="flex justify-center gap-1 items-center">
                  <span>{model.model}</span>
                </td>
                <td>
                  {model.actual}/{model.acord}
                </td>
                <td>
                  {day}/{month}/{anio} {hours}:{minutes}
                </td>
                <td>{model.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
