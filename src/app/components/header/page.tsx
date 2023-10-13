'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Header.module.scss';
import DarkMode from '../darkMode/DarkMode';
import Image from 'next/image';

interface Props {}

const Header: NextPage<Props> = ({}) => {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <Image src={'/logo.gif'} width={75} height={15} alt="car" priority />
      <Link href="/" className={pathname === '/' ? styles.active : ''}>
        Главная
      </Link>
      <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
        Dashboard
      </Link>
      <DarkMode />
    </div>
  );
};

export default Header;
