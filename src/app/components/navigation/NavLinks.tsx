import { NextPage } from 'next';
import Image from 'next/image';

import styles from './NavLinks.module.scss';

export type INavItem = {
  id: string;
  label: string;
  href: string;
  picture: string;
  isFavorite: boolean;
};
type INavProps = {
  navArray: INavItem[];
};

const NavLinks: NextPage<INavProps> = ({ navArray }) => {
  console.log();
  return (
    <div className={styles.wrapper}>
      <div className={styles.navItems}>
        {/* отсортировать перед выводом по favorites */}
        {navArray.map((e) => {
          return (
            <div key={e.id} className={styles.itemBox}>
              <div className={styles.navItem}>
                <div className={styles.picture}>
                  <Image src={e.picture} width={22} height={22} alt={e.label} priority />
                </div>
                <div className={styles.flex}> {e.label}</div>
                <div className={styles.favorite}>
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

export default NavLinks;
