// styles
import './styles.css';

// img
import img from './images/error.svg';

const Error = ({title,message}) => (
	<div className="error-inner-container">
		<img src={img} alt="Ошибка!" />
		<h4>{title || 'Ошибка на сервере'}</h4>
		<p>
			{message || 
				<>
					На сервере произошла непредвиденная ошибка.<br />
					Пожайлуста, подождите она вскоре будет исправлена.
				</>
			}
		</p>
	</div>
);
export default Error;