import crypt from "./crypt";

const renderKey = (key: string) => {
  return import.meta.env.VITE_VERSION_MAJOR + ":" + key;
};

export default {
  save(key: string, val: any) {
    let data = JSON.stringify(val);
    if (import.meta.env.VITE_LOCALSTORAGE_KEY != "") {
      data = crypt.enc(data);
    }
    localStorage.setItem(renderKey(key), data);
  },
  del(key: string) {
    localStorage.removeItem(renderKey(key));
  },
  get(key: string) {
    let data = localStorage.getItem(renderKey(key));
    if (import.meta.env.VITE_LOCALSTORAGE_KEY != "") {
      data = crypt.dec(data);
    }
    return JSON.parse(data!);
  },
};
