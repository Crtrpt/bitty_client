import { AES } from "crypto-js";
import CryptoJS from "crypto-js";

const renderKey = (key: string) => {
  return import.meta.env.VITE_VERSION_MAJOR + ":" + key;
};

export default {
  save(key: string, val: any) {
    let data = AES.encrypt(
      JSON.stringify(val),
      import.meta.env.VITE_LOCALSTOREGE_KEY
    ).toString();
    localStorage.setItem(renderKey(key), data);
  },
  del(key: string) {
    localStorage.removeItem(renderKey(key));
  },
  get(key: string) {
    let encData = localStorage.getItem(renderKey(key));
    let binData = AES.decrypt(encData!, import.meta.env.VITE_LOCALSTOREGE_KEY);
    return JSON.parse(binData.toString(CryptoJS.enc.Utf8));
  },
};
