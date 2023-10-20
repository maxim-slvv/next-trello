import { NextPage } from 'next';
import Image from 'next/image';

import styles from './ButtonAdd.module.scss';

interface Props {
  title: string;
}

const ButtonAdd: NextPage<Props> = ({ title }) => {
  return (
    <button className={styles.addBoard}>
      <Image src={'/plus.svg'} width={16} height={16} alt="favorite" priority />
      <span>{title}</span>
    </button>
  );
};

export default ButtonAdd;
