import AppInfo from "../../app.json";

const DATABASE_NAME = "@" + AppInfo.expo.name;
const STORAGED_USER = DATABASE_NAME + ":" + "user";

export { STORAGED_USER };
