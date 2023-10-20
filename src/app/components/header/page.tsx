'use client';

import { NextPage } from 'next';
import { useEffect } from 'react';
import { useOpen } from '@/app/store/useOpen';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import styles from './Header.module.scss';

interface Props {}

//*если бы данные о теме - хранились на сервере то грузилась бы сразу нужна тема
const DynamicDarkMode = dynamic(() => import('../darkMode/page'), {
  ssr: false,
});

const Header: NextPage<Props> = ({}) => {
  const { setIsOpenNav, setIsOpenAside } = useOpen((state) => ({
    setIsOpenNav: state.setIsOpenNav,
    setIsOpenAside: state.setIsOpenAside,
  }));

  useEffect(() => {
    const handleKey = (event: any) => {
      if (event.keyCode === 219) {
        setIsOpenNav();
      }
      if (event.keyCode === 221) {
        setIsOpenAside();
      }
      if (event.keyCode === 220) {
        console.log('свободная клавиша');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [setIsOpenNav, setIsOpenAside]);

  return (
    // TODO сделать наоборот отображение того что нужно только в dashboadr и того что нужно в home
    <div className={styles.header}>
      <div className={styles.openNav} onClick={() => setIsOpenNav()}>
        <Image src={'/header/navigation.svg'} width={30} height={48} alt="navigation" priority />
      </div>
      <div className={styles.flex}>
        <div className={styles.goHome}>
          <Link href="/dashboard">
            <Image src={'/header/logo.svg'} width={110} height={48} alt="car" priority />
          </Link>
        </div>
      </div>
      <DynamicDarkMode />
      <div className={styles.profile}>
        <Image src={'/users/1.jpg'} width={110} height={48} alt="car" priority />
      </div>
    </div>
  );
};

export default Header;
