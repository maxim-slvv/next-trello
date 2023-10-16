'use client';
import { NextPage } from 'next';
import { useOpen } from '@/app/store/useOpen';

import styles from './Navigation.module.scss';
import NavLinks, { INavItem } from './NavLinks';

interface Props {}

const Navigation: NextPage<Props> = ({}) => {
  const { isOpen } = useOpen((state) => ({
    isOpen: state.isOpenNav,
  }));

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
