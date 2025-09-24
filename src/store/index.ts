import { produce } from 'immer';
import { create } from 'zustand';

export const useStore = create((set) => ({
  /** 登录信息 */
  userInfo: {
    isLogin: true,
    name: '你好, 张三',
  },
  setUserInfo: (obj: any) => set(produce(() => ({ userInfo: obj }))),
  // modalType: 0,
  // setModalType: (index: number) => set(() => ({ modalType: index })),
}));
