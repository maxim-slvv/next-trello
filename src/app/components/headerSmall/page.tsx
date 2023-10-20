'use client';

import { NextPage } from 'next';
import { useOpen } from '@/app/store/useOpen';
import { useEffect, useState } from 'react';
import { useBoard } from '@/app/store/useBoard';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';

import styles from './HeaderSmall.module.scss';

interface Props {}

const HeaderSmall: NextPage<Props> = ({}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { selectedBoard, serverData, setBoardName } = useBoard((state) => ({
    selectedBoard: state.selectedBoard,
    serverData: state.serverData,
    setBoardName: state.setBoardName,
  }));

  const boardName = serverData.boards[selectedBoard].name;

  const isHeaderSquezze = useMediaQuery({ maxWidth: 1024 });

  const { isOpenAside, toggleOpenAside } = useOpen((state) => ({
    isOpenAside: state.isOpenAside,
    toggleOpenAside: state.toggleOpenAside,
  }));
  const { searchString, setSearchString } = useBoard((state) => ({
    searchString: state.searchString,
    setSearchString: state.setSearchString,
  }));

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearchString(value);
  };

  const inputTitleStyle = {
    // Настройка ширины на основе количества символов
    width: `${boardName.length * 12}px`,
    minWidth: `165px`,
    maxWidth: `200px`,
  };

  const inputSearchStyle = {
    width: `${searchString.length * 10}px`,
    minWidth: `120px`,
    maxWidth: `200px`,
  };

  return (
    // TODO сделать наоборот отображение того что нужно только в dashboadr и того что нужно в home
    <header className={styles.headerSmall}>
      <input
        className={styles.inputTitle}
        //TODO через debounce отправка изменения доски
        onChange={(e) => setBoardName(e.target.value)}
        value={boardName}
        style={inputTitleStyle}
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
      <div className={styles.headerMayHidse}>
        {!isHeaderSquezze && (
          <div className={styles.inputSearch}>
            <input
              //TODO через debounce отправка изменения доски
              onChange={(e) => handleInputChange(e)}
              value={searchString}
              style={inputSearchStyle}
              type="text"
              placeholder="Поиск"
            />
            {!searchString && (
              <Image
                className={styles.searchIcon}
                src={'/header/search.svg'}
                width={22}
                height={22}
                alt="visability"
                priority
              />
            )}
            {searchString && (
              <div className={styles.closeBtn} onClick={() => setSearchString('')}>
                <Image
                  className={styles.closeIcon}
                  src={'/closeBtn.svg'}
                  width={22}
                  height={14}
                  alt="visability"
                  priority
                />
              </div>
            )}
          </div>
        )}
        {!isHeaderSquezze && (
          <>
            <div className={styles.pallete}>
              <Image src={'/header/pallete.svg'} width={20} height={20} alt="pallete" priority />
            </div>
            <div className={styles.profile}>
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
          </>
        )}
        {isOpenAside === 'open' && (
          <div className={styles.openAside} onClick={() => toggleOpenAside()}>
            <Image
              src={'/header/dots-aside.svg'}
              width={20}
              height={20}
              alt="navigation"
              priority
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSmall;
