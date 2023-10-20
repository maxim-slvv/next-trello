'use client';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useOpen } from '@/app/store/useOpen';
import { useMediaQuery } from 'react-responsive';
import type { INavItem } from './NavLinks';
import NavLinks from './NavLinks';

import styles from './Navigation.module.scss';

interface Props {}

const Navigation: NextPage<Props> = ({}) => {
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

  const navArray: INavItem[] = [
    { id: '1', label: 'Задачи', href: '/dashboard/1', picture: '/bg/1.jpg', isFavorite: true },
    { id: '2', label: 'Цели', href: '/dashboard/2', picture: '/bg/2.jpg', isFavorite: false },
    { id: '3', label: 'Планы', href: '/dashboard/3', picture: '/bg/3.jpg', isFavorite: true },
  ];

  return (
    <div
      className={
        isOpen === 'none'
          ? `${styles.navigation} `
          : isOpen === 'close'
          ? `${styles.navigation} ${styles.open}`
          : `${styles.navigation} ${styles.close}`
      }>
      {/* Мои доски + */}
      <NavLinks navArray={navArray} />
    </div>
  );
};

export default Navigation;
