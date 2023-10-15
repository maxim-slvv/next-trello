import { NextPage } from 'next';
import NextImage from 'next/image';
import styles from './DashBoard.module.scss';
import Navigation from '../components/navigation/Navigation';
import Aside from '../components/aside/Aside';
import HeaderSmall from '../components/headerSmall/page';

const DashboardPage: NextPage = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.background}>
        <NextImage
          src={'/bg/1.jpg'}
          sizes="100vw"
          fill
          quality={100}
          style={{
            objectFit: 'cover',
          }}
          alt="background image"
          priority
        />
        <div className={styles.box}>
          <Navigation />
          <main className={styles.main}>
            <HeaderSmall />
            Доска на выбор
          </main>
          <Aside />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
