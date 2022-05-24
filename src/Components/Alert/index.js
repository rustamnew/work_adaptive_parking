import React,{Component} from 'react';

// styles
import './styles.css';

// vars
let alertShowFunction = null;
let timer = null;

const alertType = {
	SUCCESS	: 0,
	ERROR	: 1,
	INFO	: 2
}

export default class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open:false,
			message:null,
			type:alertType.ERROR
		};
		this.alertShow = this.alertShow.bind(this);
		this.alertHide = this.alertHide.bind(this);
	}
	componentDidMount = () => alertShowFunction = this.alertShow;
	alertShow = (message, type) => {
		if (this.state.open) {
			clearTimeout(timer);
			this.alertHide();
		}
		this.setState({open:true,message,type:type === undefined ? alertType.ERROR: type});
		timer = setTimeout(() => this.alertHide(), 3000);
	};
	alertHide = () => this.setState({open:false,message:null});
	styleGet = (type) => {
		switch (type) {
			case alertType.SUCCESS: return 'container-success';
			case alertType.ERROR: return 'container-error';
			case alertType.INFO: default: return 'container-info';
		}
	}
	render() {
		if (this.state.open === false) return null;
		return (
			<div className={this.styleGet(this.state.type)}>
				<span dangerouslySetInnerHTML={{__html:this.state.message}} />
			</div>
		);
	}
}

const alertShow = (message, iserror) => alertShowFunction(message, iserror ? alertType.ERROR : alertType.SUCCESS);
const infoShow = (message) => alertShowFunction(message, alertType.INFO);
export {
	alertShow,
	infoShow
}