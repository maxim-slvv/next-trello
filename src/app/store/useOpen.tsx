import { create } from 'zustand';

type openedType = {
  type: 'none' | 'open' | 'close';
};

export type IUseOpen = {
  isOpenNav: openedType['type'];
  toggleOpenNav: () => any;
  setHandIsOpenNav: (string: openedType['type']) => any;

  isOpenAside: openedType['type'];
  toggleOpenAside: () => any;
  setHandIsOpenAside: (string: openedType['type']) => any;

  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => any;
  // setHandIsOpenModal: (string: openedType['type']) => any;
};

export const useOpen = create<IUseOpen>()((set, get) => ({
  isOpenNav: 'open',
  toggleOpenNav: () => {
    const newState = get().isOpenNav === 'open' ? 'close' : 'open';
    set({ isOpenNav: newState });
  },
  setHandIsOpenNav: (string) => {
    set({ isOpenNav: string });
  },

  isOpenAside: 'open',
  toggleOpenAside: () => {
    const newState = get().isOpenAside === 'open' ? 'close' : 'open';
    set({ isOpenAside: newState });
  },

  setHandIsOpenAside: (string) => {
    set({ isOpenAside: string });
  },
  isOpenModal: true,
  setIsOpenModal: (value) => {
    set({ isOpenModal: value });
  },
  // setHandIsOpenModal: (string) => {
  //   set({ isOpenAside: string });
  // },
}));
