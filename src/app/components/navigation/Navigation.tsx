import { NextPage } from 'next';
import styles from './Navigation.module.scss';
interface Props {}

const Navigation: NextPage<Props> = ({}) => {
  return <div className={styles.navigation}>Навигация</div>;
};

export default Navigation;
