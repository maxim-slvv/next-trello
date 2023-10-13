import { NextPage } from 'next';

import './Loader.scss';

interface Props {}

const Loader: NextPage<Props> = ({}) => {
  return (
    <div id="load-wrapper">
      <div id="loader">
        <span className="ringFour"></span>
        <span className="ringThree"></span>
        <span className="colorRing"></span>
        <span className="ringTwo"></span>
        <span className="ball"></span>
      </div>
      {/* <div id="label">
        <h2>Radar - Preloader</h2>
        <p>So Hot, So Hot, Wonder if you know.</p>
      </div> */}
    </div>
  );
};

export default Loader;
