import React from 'react';
import {Link} from 'react-router-dom';

// helpers
import {empty} from '../../Globals/Utils';

// logo
import logo from '../../Images/inparking.logo.svg';

// styles
import './styles.css';

const ErrorScreen = () => {
	let page = window.location.pathname,
		title = <>Ошибка 404<span>Страница не найдена!</span></>,
		text = <>
			<p>
				Наверное, вы ошиблись при наборе адреса или перешли по неверной ссылке.<br/>
				Не расстраивайтесь, решение всегда найдется!
			</p>
			<p>
				<Link to={'/'} className="btn">На главную</Link>
			</p>
		</>;
	if (!empty(page)) page = page.replace('/', '');
	switch(page) {
		case 'error':
			title = <>Ошибка 500<span>Ошибка сервера</span></>;
			text = <>
				<p>
					Внутренняя ошибка сервера. Попробуйте обновить страницу.<br/>
					Мы знаем об этой поломке и стараемся как можно быстрее все поправить.
				</p>
				<p>
					<Link to={'/'} className="btn">На главную</Link>
				</p>
			</>;
			break;
		case 'error401':
			title = <>Ошибка 401<span>Требуется авторизация</span></>;
			text = <>
				<p>
					У вас нет прав для доступа к этому разделу сайта!<br/>
					Вероятно вы не зарегистрированы на сайте либо не вошли под своей учетной записью.
				</p>
				<p>
					<Link to={'/'} className="btn">На главную</Link>
				</p>
			</>;
			break;
		case 'error403':
			title = <>Ошибка 403<span>Отказано в доступе</span></>;
			text = <>
				<p>
					К сожалению у вас нет доступа к этой странице.<br/>
					Вы запросили страницу, доступ к которой ограничен специальными условиями доступа.
				</p>
				<p>
					<Link to={'/'} className="btn">На главную</Link>
				</p>
			</>;
			break;
		default: break;
	}
	return (
		<div className="error-container">
			<img src={logo} alt="InParking" />
			{title && <h1>{title}</h1>}
			{text}
		</div>
	);
}

export default ErrorScreen;