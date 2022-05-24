import  {Redirect} from 'react-router-dom';

// helpers
import {ls} from '../../Globals/Localstorage';

const StartScreen = () => <Redirect to={ls('user') === null ? '/login' : '/parkings'} />;
export default StartScreen;