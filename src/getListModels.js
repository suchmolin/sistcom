import appFirebase from "@/firebase/firebase.config";
import {
  query,
  getFirestore,
  collection,
  getDocs,
  where,
} from "firebase/firestore";

export default async function getListModels(
  userId,
  clientForList,
  setModelsList
) {
  const db = getFirestore(appFirebase);
  const q = query(
    collection(db, "promosgg"),
    where("assistClient", "==", userId),
    where("cliente", "==", clientForList)
  );
  const querySnapshot = await getDocs(q);
  const array = [];
  querySnapshot.forEach((doc) => {
    array.push({
      id: doc.id,
      client: doc.data().cliente,
      model: doc.data().modelo,
      acord: doc.data().acord,
      actual: doc.data().actual,
      type: doc.data().type,
      extra: doc.data().extra,
      estado: doc.data().estado,
      fechaCerrado: doc.data().fechaCerrado,
      fechaPago: doc.data().fechaPago,
      fechaProg: doc.data().fechaProg,
    });
  });
  setModelsList(array);
}
