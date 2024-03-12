"use client";
import "@/app/globals.css";
import HeaderHomeLog from "../HeaderHomeLog/page";
import MenuHomeLog from "../MenuHomeLog/page";
import BodyHomeLog from "../BodyHomeLog/page";
import AgregarMM from "@/components/AgregarMM/page";
import AgregarClientes from "@/components/AgregarClientes/page";
import FinalizadosMM from "../FinalizadosMM/page";
import { useState } from "react";
import PromosGG from "../PromosGG/page";
import PagoPromos from "../PagoPromos/page";

export default function HomeLog(props) {
  const { userEmail } = props;
  const [currentPage, setCurrentPage] = useState("inicio");

  return (
    <div style={{ fontFamily: "Anta" }} className="w-full">
      <HeaderHomeLog />
      <div className="relative flex">
        <MenuHomeLog
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        {currentPage === "agregarmm" ? (
          <AgregarMM />
        ) : currentPage === "inicio" ? (
          <BodyHomeLog />
        ) : currentPage === "clientes" ? (
          <AgregarClientes userEmail={userEmail} />
        ) : currentPage === "finalizados" ? (
          <FinalizadosMM />
        ) : currentPage === "promosGG" ? (
          <PromosGG />
        ) : currentPage === "pagoPromos" ? (
          <PagoPromos />
        ) : (
          true
        )}
      </div>
    </div>
  );
}
