import { request } from "@/axios";
import { getTreeData } from "@/utils";
import { create } from "zustand";

export const appStore = create<any>((set) => ({
  selectedProjectId: null,
  selectedProject: null,
  projectList: [],
  gangweilist: [],
  getGangweiList() {
    request.get("/system/post/list?pageNum=1&pageSize=10000").then((res: any) => {
      console.log("res: ", res);
      appStore.setState({ gangweilist: res.rows });
    });
  },
  bumenList: [],
  getBumenList() {
    request.get("/system/user/deptTree?pageNum=1&pageSize=10000").then((res: any) => {
      console.log('bumenList: ', res);
      appStore.setState({ bumenList: getTreeData(res.data) });
    });
  },
}));
