import {Link} from 'react-router-dom';

// styles
import './styles.css';

// img
import img from './images/back.svg';

const goto = (e, action) => {
	e.preventDefault();
	action();
}

const Back = ({title,link,action,controlAdd}) => (
	<h4 className="back-title">
		<span>
			{action ?
					<Link to={""} onClick={(e) => goto(e, action)}><img src={img} alt="назад" /></Link>
				:
					<Link to={`/${link}`}><img src={img} alt="назад" /></Link>
			}
			{title}
		</span>
		{controlAdd || null}
	</h4>
);
export default Back;