import { AES } from "crypto-js";

export default {
  enc(data: any): string {
    return AES.encrypt(data, import.meta.env.VITE_LOCALSTORAGE_KEY).toString();
  },
  dec(data: any) {
    let binData = AES.decrypt(data!, import.meta.env.VITE_LOCALSTORAGE_KEY);
    return binData.toString(CryptoJS.enc.Utf8);
  },
};
