import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Loader from '../components/loader/Loader';

//!рендеринг на стороне клиента - у нас там будет фотка и имя из google авторизации
//TODO Опущу еще ниже, что бы рендерился он на сервере а именно данные профиля уже на клиенте
const DynamicHeader = dynamic(() => import('../components/header/page'), {
  ssr: false,
});

//TODO: почему то стало ныть
// export const metadata: Metadata = {
//   title: 'Trello | Дашборд',
//   description:
//     'Создайте и управляйте досками для проектов. Организуйте задачи и задания на досках для максимальной производительности',
// };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <DynamicHeader />
      {children}
      <div style={{ background: 'green', display: 'flex', height: '10px' }}></div>
      {/* <Loader /> */}
      {/* <DynamicFooter/> */}
    </section>
  );
}
