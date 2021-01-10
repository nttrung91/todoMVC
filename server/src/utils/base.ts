import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyBWG40HPgmSBX7w" }).base(
  "appSacyTKuS38n1zT"
);

const userTable = base("Users");
const itemTable = base("Items");

export { userTable, itemTable };
