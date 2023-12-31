import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Header from '../components/header/page';
import Modal from '../components/modal/Modal';

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
    <section style={{ overflow: 'hidden', height: '100%' }}>
      {/* //TODO MODAL сделать */}
      {/* <Modal /> */}
      {/* //TODO поскольку я хочу рендерить на стороне сервака данные */}
      {/* //TODO то тогда надо чекать тему на сайте из хранилища и менять ее по ходу дела*/}
      <Header />
      {children}
      {/* <div style={{ background: 'green', display: 'flex', height: '10px' }}></div> */}
      {/* <Loader /> */}
      {/* <DynamicFooter/> */}
    </section>
  );
}
