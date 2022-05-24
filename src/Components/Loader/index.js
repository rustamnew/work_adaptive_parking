// styles
import './styles.css';

// img
import img from './images/loader.svg';

const Loader = () => <div className="loader-container"><img src={img} alt="Идет загрузка..." /></div>;
export default Loader;