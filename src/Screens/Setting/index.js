import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import Back from '../../Components/Back';
import Alert,{alertShow} from '../../Components/Alert';
import {useInput} from '../../Components/Hooks/Input';

// models
import {Settings} from './../../Models';

// styles
import './styles.css';

const SettingScreen = (props) => {
	const [loading, setLoading] = useState(true);
	const [id] = useState(props.match.params.id||0);
	const {value:name, setValue:setName, bind:bindName} = useInput('');
	const {value:code, setValue:setCode, bind:bindCode} = useInput('');
	const {value, setValue, bind:bindValue} = useInput('');
	useEffect(() => {
		(async () => {
			if (id) {
				const d = await Settings.get(id);
				const setting = d.data[0];
				setName(setting.name);
				setCode(setting.code);
				setValue(setting.value);
			}
			setLoading(false);
		})();
	}, [id,setName,setCode,setValue,setLoading]);
	const save = (e) => {
		e.preventDefault();
		const data = {name,code,value};
		if (id === 0) Settings.add(data, () => alertShow('Операция прошла успешно!'), (err) => alertShow('<b>Ошибка!</b><br/>При сохранении данных возникла ошибка', true));
		else Settings.update(id, data, () => alertShow('Операция прошла успешно!'), (err) => alertShow('<b>Ошибка!</b><br/>При сохранении данных возникла ошибка', true));
	}
	return (
		<Template>
			{loading ? <Loader /> :
				<form onSubmit={save}>
					<Back title={id === 0 ? 'Добавить настройку' : 'Редактирование настройки'} link='settings'
						controlAdd={<a href="/setting" className="add">Добавить</a>}  />
					<div className="form-container">
						<div className="cell-oneline">
							<div className="cell">
								<label>
									<span>Название</span>
									<input type="text" {...bindName} placeholder="Название, описание" required />
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Значение</span>
									<input type="text" {...bindCode} placeholder="Значение" required />
								</label>
							</div>
						</div>
						<div className="cell">
							<label>
								<span>Код</span>
								<input type="text" {...bindValue} placeholder="Код" className="double" required />
							</label>
						</div>
						<div className="buttons">
							<button type="submit">Сохранить</button>
						</div>
					</div>
				</form>
			}
			<Alert />
		</Template>
	);
};

export default SettingScreen;