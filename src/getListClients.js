import appFirebase from "@/firebase/firebase.config";
import {
  query,
  getFirestore,
  collection,
  getDocs,
  where,
} from "firebase/firestore";

export default async function getListClients(userId, setClientList) {
  const db = getFirestore(appFirebase);
  const q = query(
    collection(db, "clientes"),
    where("assistClient", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  const array = [];
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, client: doc.data().client });
  });
  setClientList(array);
}
