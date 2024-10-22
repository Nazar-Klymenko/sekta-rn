import { Timestamp } from "firebase/firestore";

const DEFAULT_PRICE = 20;
const DEFAULT_LOCATION = "Cracow, Nowa 3";
const DEFAULT_DATE = Timestamp.now().toDate();

export { DEFAULT_PRICE, DEFAULT_LOCATION, DEFAULT_DATE };
