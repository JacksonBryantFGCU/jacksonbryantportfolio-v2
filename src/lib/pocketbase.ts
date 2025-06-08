import PocketBase from "pocketbase";

const baseUrl = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(baseUrl);

export { pb, baseUrl };