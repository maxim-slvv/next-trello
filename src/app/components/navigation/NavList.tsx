import { NextPage } from 'next';
import Image from 'next/image';

import styles from './NavList.module.scss';
import { UserBoards, useBoard } from '@/app/store/useBoard';

type INavProps = {
  boards: UserBoards;
};

const NavList: NextPage<INavProps> = ({ boards }) => {
  const { selectedBoard, setSelectedBoard } = useBoard((state) => ({
    selectedBoard: state.selectedBoard,
    setSelectedBoard: state.setSelectedBoard,
  }));

  const onClickFavorites = (e: any) => {
    e.stopPropagation();
    console.log('changeFavorite');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navItems}>
        {/*//TODO отсортировать перед выводом по favorites */}
        {boards.map((e) => {
          return (
            <div key={e.id} className={styles.itemBox} onClick={() => setSelectedBoard(e.id)}>
              <div className={styles.navItem}>
                <div className={styles.picture}>
                  <Image src={e.picture} width={20} height={20} alt={e.name} priority />
                </div>
                <div className={styles.flex}> {e.name}</div>
                <div className={styles.favorite} onClick={(e) => onClickFavorites(e)}>
                  <Image
                    src={e.isFavorite ? '/header/favorite-selected.svg' : '/header/favorite.svg'}
                    width={20}
                    height={20}
                    alt="favorite"
                    priority
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavList;
