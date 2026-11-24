// import api from "./api";
import api from "../api/axios";
import { tokenStore } from "./tokenStore";

let restorePromise: Promise<boolean> | null = null;

export const restoreSession = () => {
  if (!restorePromise) {
    restorePromise = api
      .post("/auth/refresh")
      .then((response) => {
        tokenStore.set(response.data.accessToken);
        return true;
      })
      .catch(() => {
        tokenStore.clear();
        return false;
      })
      .finally(() => {
        restorePromise = null;
      });
  }

  return restorePromise;
};