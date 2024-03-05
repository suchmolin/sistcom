"use client";
import { useState, useEffect } from "react";
import TablasPendientes from "../TablasPendientes/page";
import getListClients from "@/getListClients";
import { useAuth } from "@/context/AuthContext";

export default function BodyHomeLog() {
  const [clientList, setClientList] = useState([]);
  const [clientForList, setClientForList] = useState("all");
  const { user } = useAuth();
  const userId = user.uid;
  /*******/
  useEffect(() => {
    getListClients(userId, setClientList);
  }, [userId]);

  return (
    <div className="flex flex-col w-full">
      <h2 className="w-fit mt-5 mb-2 ml-10 text-xl">Clientes</h2>
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
      <TablasPendientes clientForList={clientForList} userId={userId} />
    </div>
  );
}
