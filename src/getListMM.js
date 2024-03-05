import getStartEndWeek from "@/getStartEndWeek";
import appFirebase from "@/firebase/firebase.config";
import {
  query,
  getFirestore,
  collection,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";

export default async function getListMM(setMMList, userId, client, mode) {
  const db = getFirestore(appFirebase);
  const today = new Date();
  const { inicio, final } = getStartEndWeek(today);
  let q;
  /**********************************CURRENT********************* */
  if (mode === "current") {
    q =
      client === "all"
        ? query(
            collection(db, "miniMasses"),
            where("fechaCreado", ">=", inicio),
            where("assistClient", "==", userId),
            orderBy("fechaCreado")
          )
        : query(
            collection(db, "miniMasses"),
            where("assistClient", "==", userId),
            where("fechaCreado", ">=", inicio),
            where("clientes", "array-contains", client),
            orderBy("fechaCreado")
          );
  }

  /**********************************OPEN********************* */
  if (mode === "open") {
    q =
      client === "all"
        ? query(
            collection(db, "miniMasses"),
            where("assistClient", "==", userId),
            where("estado", "==", true),
            orderBy("fechaProg")
          )
        : query(
            collection(db, "miniMasses"),
            where("assistClient", "==", userId),
            where("estado", "==", true),
            where("clientes", "array-contains", client),
            orderBy("fechaProg")
          );
  }

  if (mode === "closed") {
    q = query(
      collection(db, "miniMasses"),
      where("assistClient", "==", userId),
      where("estado", "==", false),
      orderBy("fechaCreado")
    );
  }

  try {
    const querySnapshot = await getDocs(q);
    const array = [];
    querySnapshot.forEach((doc) => {
      array.push({
        id: doc.id,
        nombreMM: doc.data().nombreMM,
        fechaCreado: doc.data().fechaCreado,
        fechaProg: doc.data().fechaProg,
        clientes: doc.data().clientes,
        estado: doc.data().estado,
        fechaCerrado: doc.data().fechaCerrado,
      });
    });

    setMMList(array);
  } catch (error) {
    console.log(error);
  }
}
