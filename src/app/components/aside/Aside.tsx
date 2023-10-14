'use client';

import { NextPage } from 'next';
import { useOpen } from '@/app/store/useOpen';
import styles from './Aside.module.scss';

interface Props {}

const Aside: NextPage<Props> = ({}) => {
  const { isOpen } = useOpen((state) => ({
    isOpen: state.isOpenAside,
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
      Сайдбар
    </div>
  );
};

export default Aside;
