import { NextPage } from 'next';
import DashboardLayout from '@/app/dashboard/layout';

const Home: NextPage = () => {
  return (
    <DashboardLayout>
      <h1>Главная</h1>
      {/* <CarItem car={props.car} /> */}
    </DashboardLayout>
  );
};

export default Home;
