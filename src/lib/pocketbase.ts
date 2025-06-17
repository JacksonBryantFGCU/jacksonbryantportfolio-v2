import PocketBase from "pocketbase";

const baseUrl = import.meta.env.PB_URL;
const pb = new PocketBase(baseUrl);

export { pb, baseUrl };
