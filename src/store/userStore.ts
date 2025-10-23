import { getLocalStoreConfig } from "@/setting";
import { produce } from "immer";
import { create } from "zustand";

export const userStore = create<any>((set) => ({
  isLogin: getLocalStoreConfig("TOKEN"),
  user: {},
  roles: null,
  permissions: [],
}));
