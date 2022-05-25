import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

// plug-ins
import {useModal} from 'react-hooks-use-modal';

// helpers
import {ls} from '../../Globals/Localstorage';

// logo
import logo from '../../Images/inparking.logo.svg';

// hamburger menu icon
import hamburgerMenuIcon from '../../Images/hamburger.icon.svg';

// close menu icon
import closeMenuIcon from '../../Images/close.svg';

// styles
import './styles.css';

const Template = (props) => {
	const [Modal, open, close] = useModal('root', {preventScroll:true});
	const done = () => {
		ls();
		close();
		window.location.href='/login';
	}
	const show = (e) => {
		e.preventDefault();
		open();
	}
	const hide = (e) => {
		e.preventDefault();
		close();
	}

	const openMenu = (e) => {
		let menu = document.querySelector('.menu');
		menu.classList.add('active')
	}
	const closeMenu = (e) => {
		let menu = document.querySelector('.menu');
		menu.classList.remove('active')
	}


	useEffect(() => {
		const user = ls('user');
		if (user === null) {
			window.location.href='/error403';
			return;
		}
	}, []);
	return (
		<div className="container">
			<div className="menu-open" onClick={openMenu}>
				<img src={hamburgerMenuIcon} alt="menu-icon"/>
			</div>

			<div className="menu">
				<div className="menu-close" onClick={closeMenu}>
					<img src={closeMenuIcon} alt="menu-icon"/>
				</div>
				<img src={logo} alt="InParking" />
				<ul>
					<li><b>Диспетчерская</b></li>
					<li><Link to={'/parkings'}>Парковки</Link></li>
					<li><Link to={'/parkingsmap'}>Парковки на карте</Link></li>
					<li><Link to={'/clients'}>Клиенты</Link></li>
					<li><Link to={'/orders'}>Заказы</Link></li>
					<li><Link to={'/transactions'}>Транзакции</Link></li>
					<li><b>Поддержка</b></li>
					<li><Link to={'/supports'}>Поддержка</Link></li>
					<li><Link to={'/feedbacks'}>Обратная связь</Link></li>
					<li><Link to={'/push'}>Отправить пуш</Link></li>
					<li><b>Настройки</b></li>
					<li><Link to={'/settings'}>Настройки</Link></li>
					<li><Link to={'/users'}>Пользователи</Link></li>
				</ul>
				<div className="logoff">
					<Link to={'/'} onClick={show}>Выход из системы</Link>
				</div>
			</div>
			<div className="main">
				{props.children}
			</div>
			<Modal>
				<div className="confirmcontainer">
					<h4>Подтвердите пожалуйста</h4>
					Вы уверены что хотите выйти из системы администрирования?
					<div className="buttons">
						<button onClick={done}>Да</button>
						<Link to={'/'} className="cancel" onClick={hide}>Отмена</Link>
					</div>
				</div>
			</Modal>
		</div>
	);
};
export default Template;