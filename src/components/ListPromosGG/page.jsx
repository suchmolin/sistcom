import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getFirestore } from "firebase/firestore";
import appFirebase from "@/firebase/firebase.config";
import getListClients from "@/getListClients";
import { MdOutlineEdit } from "react-icons/md";
import ModalDeleteModel from "../ModalDeleteModel/page";
import getListModels from "@/getListModels";
import ModalEditModel from "../ModalEditModel/page";
import ModelsClosed from "../ModelsClosed/page";
import { TfiReload } from "react-icons/tfi";

export default function ListPromoGG(props) {
  const { addedModel } = props;
  const [clientList, setClientList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [promoList, setPromoList] = useState([]);
  const [ggList, setGGList] = useState([]);
  const [closedList, setClosedlist] = useState([]);
  const [clientForList, setClientForList] = useState(null);
  const [rowEdit, setRowEdit] = useState(false);

  const [modalDeleteModel, setModalDeleteModel] = useState(false);
  const [modalEditModel, setModalEditModel] = useState(false);

  const { user } = useAuth();
  const userId = user.uid;

  useEffect(() => {
    getListClients(userId, setClientList);
  }, [userId]);

  useEffect(() => {
    getListModels(userId, clientForList, setModelsList);
  }, [userId, clientForList, addedModel, modalDeleteModel, modalEditModel]);

  useEffect(() => {
    const promos = [];
    const ggs = [];
    const closed = [];
    modelsList.forEach((model) => {
      if (model.estado === true) {
        if (model.type === "promo") {
          promos.push(model);
        }
        if (model.type === "gg") {
          ggs.push(model);
        }
      } else {
        closed.push(model);
      }
      setPromoList(promos);
      setGGList(ggs);
      setClosedlist(closed);
    });
  }, [modelsList]);

  const editModelCount = (id, model, actual, acord, extra, fechaProg) => {
    setRowEdit({
      id: id,
      model: model,
      actual: actual,
      acord: acord,
      extra: extra,
      fechaProg: fechaProg,
    });
    setModalEditModel(true);
  };
  const editModelCountGG = (
    id,
    model,
    actual,
    acord,
    extra,
    actualSec,
    acordSec
  ) => {
    setRowEdit({
      id: id,
      model: model,
      actual: actual,
      actualSec: actualSec,
      acord: acord,
      acordSec: acordSec,
      extra: extra,
    });
    setModalEditModel(true);
  };

  const deteleModel = (id, client, model) => {
    setRowEdit({ id: id, client: client, model: model });
    setModalDeleteModel(true);
  };
  return (
    <div className=" w-full h-fit md:px-10">
      <h2 className="w-full text-center mt-4 text-xl">Lista Promos & GG</h2>
      <div className="flex justify-between">
        <select
          onChange={(e) => setClientForList(e.target.value)}
          id="countries"
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
        <span
          onClick={() => {
            if (clientForList) {
              getListModels(userId, clientForList, setModelsList);
            }
          }}
          className="text-teal-700 cursor-pointer font-bold text-xl hover:bg-teal-700 hover:text-white flex justify-center items-center px-2 rounded-md"
        >
          <TfiReload />
        </span>
      </div>
      {clientForList && clientForList !== "Selecciona un Cliente" && (
        <div>
          <div className="flex mt-5 flex-col">
            <div className="w-full border-r-2 mb-10">
              <table className="table-auto w-full text-center ">
                <thead className="">
                  <tr className="bg-teal-600 text-white text-md h-9">
                    <th colSpan={6}>PROMOS</th>
                  </tr>
                  <tr className="h-10">
                    <th></th>
                    <th>Modelo</th>
                    <th>Act/Fin</th>
                    <th>Prog</th>
                    <th>Fecha Prog</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {promoList.map((model, i) => {
                    const classTr = i % 2 === 0 ? "bg-gray-100" : "";
                    return (
                      <tr className={`h-8 ${classTr}`} key={model.id}>
                        <td>
                          <button
                            onClick={() =>
                              deteleModel(model.id, model.client, model.model)
                            }
                            className="hover:text-red-500"
                          >
                            x
                          </button>
                        </td>
                        <td>{model.model}</td>
                        <td>
                          {model.actual}/{model.acord}
                        </td>
                        <td>{model.extra}</td>
                        <td>
                          {model.fechaProg
                            ? (() => {
                                const arrayMes = [
                                  "Ene",
                                  "Feb",
                                  "Mar",
                                  "Abr",
                                  "May",
                                  "Jun",
                                  "Jul",
                                  "Ago",
                                  "Sep",
                                  "Oct",
                                  "Nov",
                                  "Dic",
                                ];
                                const day = model.fechaProg.toDate().getDate();
                                const month =
                                  arrayMes[model.fechaProg.toDate().getMonth()];
                                return `${day} ${month}`;
                              })()
                            : "- - -"}
                        </td>
                        <td
                          onClick={() =>
                            editModelCount(
                              model.id,
                              model.model,
                              model.actual,
                              model.acord,
                              model.extra,
                              model.fechaProg
                            )
                          }
                          className=""
                        >
                          <span className="h-full cursor-pointer flex justify-center items-center hover:text-blue-500">
                            {" "}
                            <MdOutlineEdit />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-full border-r-2">
              <table className="table-auto w-full text-center ">
                <thead className="">
                  <tr className="bg-teal-600 text-white text-md h-9">
                    <th colSpan={5}>{"GG's"}</th>
                  </tr>
                  <tr className="h-10">
                    <th></th>
                    <th>Modelo</th>
                    <th>Act/Fin</th>
                    <th>ActM/FinM</th>
                    <th>Prog</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ggList.map((model, i) => {
                    const classTr = i % 2 === 0 ? "bg-gray-100" : "";
                    return (
                      <tr className={`h-8 ${classTr}`} key={model.id}>
                        <td>
                          <button
                            onClick={() =>
                              deteleModel(model.id, model.client, model.model)
                            }
                            className="hover:text-red-500"
                          >
                            x
                          </button>
                        </td>
                        <td>{model.model}</td>
                        <td>
                          {model.actual}/{model.acord}
                        </td>
                        <td>
                          {model.actualSec}/{model.acordSec}
                        </td>
                        <td>{model.extra}</td>
                        <td
                          onClick={() =>
                            editModelCountGG(
                              model.id,
                              model.model,
                              model.actual,
                              model.acord,
                              model.extra,
                              model.actualSec,
                              model.acordSec
                            )
                          }
                          className=""
                        >
                          <span className="h-full cursor-pointer flex justify-center items-center hover:text-blue-500">
                            <MdOutlineEdit />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <ModelsClosed
            closedList={closedList}
            setModelsList={setModelsList}
            clientForList={clientForList}
            userId={userId}
          />
        </div>
      )}
      {modalDeleteModel && (
        <ModalDeleteModel
          rowEdit={rowEdit}
          setModalDeleteModel={setModalDeleteModel}
        />
      )}
      {modalEditModel && (
        <ModalEditModel
          rowEdit={rowEdit}
          setModalEditModel={setModalEditModel}
        />
      )}
    </div>
  );
}
