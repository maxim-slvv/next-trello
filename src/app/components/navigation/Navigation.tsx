'use client';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useOpen } from '@/app/store/useOpen';
import { useMediaQuery } from 'react-responsive';

import { useBoard } from '@/app/store/useBoard';
import NavList from './NavList';
import ButtonAdd from '../buttonAdd/ButtonAdd';

import styles from './Navigation.module.scss';

const Navigation: NextPage = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const { isOpen, setHandIsOpenNav } = useOpen((state) => ({
    isOpen: state.isOpenNav,
    setHandIsOpenNav: state.setHandIsOpenNav,
  }));

  useEffect(() => {
    if (!isTablet) {
      setHandIsOpenNav('close');
    } else {
      setHandIsOpenNav('open');
    }
  }, [isTablet, setHandIsOpenNav]);

  const { serverData } = useBoard((state) => ({ serverData: state.serverData }));
  const { boards } = serverData;

  return (
    <div
      className={
        isOpen === 'none'
          ? `${styles.navigation} `
          : isOpen === 'close'
          ? `${styles.navigation} ${styles.open}`
          : `${styles.navigation} ${styles.close}`
      }>
      <NavList boards={boards} />
      {boards.length === 0 && <div className={styles.emptyInfo}>у вас еще нету досок {`:)`}</div>}
      <div className={styles.buttonAdd}>
        <ButtonAdd title="Добавить Доску" />
      </div>
    </div>
  );
};

export default Navigation;
