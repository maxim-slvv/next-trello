'use client';

import { NextPage } from 'next';
import { useOpen } from '@/app/store/useOpen';
import { useState } from 'react';
import Image from 'next/image';
import styles from './HeaderSmall.module.scss';

interface Props {}

const HeaderSmall: NextPage<Props> = ({}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { isOpenAside, setIsOpenAside } = useOpen((state) => ({
    isOpenAside: state.isOpenAside,
    setIsOpenAside: state.setIsOpenAside,
  }));

  return (
    // TODO сделать наоборот отображение того что нужно только в dashboadr и того что нужно в home
    <header className={styles.headerSmall}>
      <input
        className={styles.inputTitle}
        //TODO через debounce отправка изменения доски
        onChange={(e) => console.log(e.target)}
        value={'Задачи'}
        type="text"
        placeholder="Название Доски"
      />
      <div className={styles.favorite} onClick={() => setIsFavorite((prev) => !prev)}>
        <Image
          src={isFavorite ? '/header/favorite-selected.svg' : '/header/favorite.svg'}
          width={20}
          height={20}
          alt="favorite"
          priority
        />
      </div>
      <div className={styles.visability}>
        <Image src={'/header/visability.svg'} width={20} height={20} alt="visability" priority />
      </div>
      <div className={styles.flex}></div>
      <div className={styles.pallete}>
        <Image src={'/header/pallete.svg'} width={20} height={20} alt="pallete" priority />
      </div>
      <div className={styles.profile}>
        {/* //? Фотографии участников и навешать админу - значек */}
        <Image
          src={'/users/1.jpg'}
          quality={100}
          width={110}
          height={48}
          alt="user photo"
          priority
        />
        <Image
          src={'/users/2.jpeg'}
          quality={100}
          width={110}
          height={48}
          alt="user photo"
          priority
        />
        <Image
          src={'/users/3.jpeg'}
          quality={100}
          width={110}
          height={48}
          alt="user photo"
          priority
        />
      </div>
      {isOpenAside === 'open' && (
        <div className={styles.openAside} onClick={() => setIsOpenAside()}>
          <Image src={'/header/dots-aside.svg'} width={20} height={20} alt="navigation" priority />
        </div>
      )}
    </header>
  );
};

export default HeaderSmall;
