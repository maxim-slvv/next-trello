'use client';
import { NextPage } from 'next';
import { useOpen } from '@/app/store/useOpen';

import styles from './Navigation.module.scss';

interface Props {}

const Navigation: NextPage<Props> = ({}) => {
  const { isOpen } = useOpen((state) => ({
    isOpen: state.isOpenNav,
  }));

  return (
    <div
      className={
        isOpen === 'none'
          ? `${styles.navigation} `
          : isOpen === 'close'
          ? `${styles.navigation} ${styles.open}`
          : `${styles.navigation} ${styles.close}`
      }>
      Навигация
    </div>
  );
};

export default Navigation;
