'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Header.module.scss';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';

interface Props {}

//*если бы данные о теме - хранились на сервере то грузилась бы сразу нужна тема
const DynamicDarkMode = dynamic(() => import('../darkMode/page'), {
  ssr: false,
});

const Header: NextPage<Props> = ({}) => {
  const pathname = usePathname();
  return (
    // TODO сделать наоборот отображение того что нужно только в dashboadr и того что нужно в home
    <div className={styles.header}>
      <div className={styles.openNav}>
        <Link href="/" className={pathname === '/' ? styles.active : ''}>
          <Image src={'/navigation.svg'} width={30} height={48} alt="navigation" priority />
        </Link>
      </div>
      <div className={styles.flex}>
        <div className={styles.goHome}>
          <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
            <Image src={'/logo.svg'} width={110} height={48} alt="car" priority />
          </Link>
        </div>
      </div>
      <DynamicDarkMode />
      <div className={styles.profile}>
        <Image src={'/profile-empty.svg'} width={110} height={48} alt="car" priority />
      </div>
    </div>
  );
};

export default Header;
