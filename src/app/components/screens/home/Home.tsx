import { NextPage } from 'next';
import DashboardLayout from '@/app/dashboard/layout';
import styles from './Home.module.scss';

const Home: NextPage = () => {
  return (
    <DashboardLayout>
      <div className={styles.home}>
        <div className={styles.box}>
          <h1>Главная</h1>
          {/* <CarItem car={props.car} /> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
