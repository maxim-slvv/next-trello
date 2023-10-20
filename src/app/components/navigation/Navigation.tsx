'use client';
import { NextPage } from 'next';
import { useOpen } from '@/app/store/useOpen';
import { useMediaQuery } from 'react-responsive';
import type { INavItem } from './NavLinks';
import NavLinks from './NavLinks';

import styles from './Navigation.module.scss';
import { useEffect } from 'react';

interface Props {}

const Navigation: NextPage<Props> = ({}) => {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const { isOpen, setIsOpen } = useOpen((state) => ({
    isOpen: state.isOpenNav,
    setIsOpen: state.setIsOpenNav,
  }));

  useEffect(() => {
    setIsOpen();
  }, [isTablet, setIsOpen]);

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
