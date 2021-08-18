import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: !(process.env?.NEXT_PUBLIC_TLS_REJECT_UNAUTHORIZED === '0')
});

export const SAxios = axios.create({ httpsAgent });
