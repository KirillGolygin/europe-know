import { Oval } from 'react-loader-spinner';

import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <Oval color="black" secondaryColor="gray" />
    </div>
  );
};

export default Loader;
