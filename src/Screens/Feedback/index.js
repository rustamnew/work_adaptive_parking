import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

// plug-ins
import Moment from 'moment';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import Back from '../../Components/Back';

// models
import {Feedbacks} from './../../Models';

// helpers
import {phoneFormatter} from '../../Globals/Utils';

// styles
import './styles.css';

const FeedbackScreen = (props) => {
	const [id] = useState(props.match.params.id||0);
	const [feedback, setFeedback] = useState(null);
	useEffect(() => {
		const feedbackGet = async () => {
			const d = await Feedbacks.get(id);
			const feedback = d.data[0];
			setFeedback(feedback);
		};
		feedbackGet();
	}, [id]);
	return (
		<Template>
			{feedback === null ? <Loader /> :
				<div>
					<Back title="Обращение пользователя" link='feedbacks' />
					<div className="form-container">
						<div className="cell">
							<label>
								<span>Дата обращения</span>
								<div>{Moment(feedback.dateCreate*1000).format('DD.MM.y, H:mm')}</div>
							</label>
						</div>
						<div className="cell">
							<label>
								<span>Имя</span>
								<div><Link to={`/client/${feedback.clientId}`}>{feedback.clientName}</Link></div>
							</label>
						</div>
						<div className="cell">
							<label>
								<span>Телефон</span>
								<div>{phoneFormatter(feedback.phone)}</div>
							</label>
						</div>
						<div className="cell">
							<label>
								<span>Эл.почта</span>
								<div>{feedback.email||'—'}</div>
							</label>
						</div>
						<div className="cell">
							<label>
								<span>Сообщение</span>
								<div>{feedback.message}</div>
							</label>
						</div>
					</div>
				</div>
			}
		</Template>
	);
};

export default FeedbackScreen;