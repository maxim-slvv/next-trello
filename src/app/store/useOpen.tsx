import { create } from 'zustand';

export type IUseOpen = {
  isOpenNav: 'none' | 'open' | 'close';
  setIsOpenNav: () => any;
  isOpenAside: 'none' | 'open' | 'close';
  setIsOpenAside: () => any;
};

export const useOpen = create<IUseOpen>()((set, get) => ({
  isOpenNav: 'none',
  setIsOpenNav: () => {
    const newState = get().isOpenNav === 'open' ? 'close' : 'open';
    set({ isOpenNav: newState });
  },
  isOpenAside: 'none',
  setIsOpenAside: () => {
    const newState = get().isOpenAside === 'open' ? 'close' : 'open';
    set({ isOpenAside: newState });
  },
}));
