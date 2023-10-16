'use client';

import { NextPage } from 'next';
import { useOpen } from '@/app/store/useOpen';
import Image from 'next/image';
import styles from './Aside.module.scss';

interface Props {}

const Aside: NextPage<Props> = ({}) => {
  const { isOpen, setIsOpenAside } = useOpen((state) => ({
    isOpen: state.isOpenAside,
    setIsOpenAside: state.setIsOpenAside,
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
      <div className={styles.asideWrapper}>
        <header className={styles.header}>
          <div className={styles.title}>
            Информация
            <div
              className={styles.closeIcon}
              onClick={() => setIsOpenAside()}
              style={
                isOpen === 'close' || isOpen === 'none'
                  ? { opacity: '1', transition: 'ease-in-out' }
                  : { opacity: '0' }
              }>
              <Image src={'/closeBtn.svg'} width={13} height={13} alt="visability" priority />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Aside;
