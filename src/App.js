import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

// screens
import Start		from './Screens/Start';
import Login		from './Screens/Login';
import Clients		from './Screens/Clients';
import Client		from './Screens/Client';
import Transactions	from './Screens/Transactions';
import Orders		from './Screens/Orders';
import Order		from './Screens/Order';
import Parkings		from './Screens/Parkings';
import ParkingsMap	from './Screens/ParkingsMap';
import Parking		from './Screens/Parking';
import Feedbacks	from './Screens/Feedbacks';
import Feedback		from './Screens/Feedback';
import Supports		from './Screens/Supports';
import Support		from './Screens/Support';
import Push			from './Screens/Push';
import Settings		from './Screens/Settings';
import Setting		from './Screens/Setting';
import Users		from './Screens/Users';
import User			from './Screens/User';
import Error		from './Screens/Error';

// start
const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/' component={Start} exact />
			<Route path='/login' component={Login} exact />
			<Route path='/clients' component={Clients} exact />
			<Route path='/client/:id' component={Client} exact />
			<Route path='/transactions' component={Transactions} exact />
			<Route path='/orders' component={Orders} exact />
			<Route path='/order/:id' component={Order} exact />
			<Route path='/parkings' component={Parkings} exact />
			<Route path='/parkingsmap' component={ParkingsMap} exact />
			<Route path='/parking/:id' component={Parking} exact />
			<Route path='/feedbacks' component={Feedbacks} exact />
			<Route path='/feedback/:id' component={Feedback} exact />
			<Route path='/supports' component={Supports} exact />
			<Route path='/support/:id' component={Support} exact />
			<Route path='/push' component={Push} exact />
			<Route path='/settings' component={Settings} exact />
			<Route path='/setting' component={Setting} exact />
			<Route path='/setting/:id' component={Setting} exact />
			<Route path='/users' component={Users} exact />
			<Route path='/user/:id' component={User} exact />
			<Route path='/error' component={Error} status={500} exact />
			<Route path='/error401' component={Error} status={401} exact />
			<Route path='/error403' component={Error} status={403} exact />
			<Route path='/error404' component={Error} status={404} exact />
			<Route path='*' component={Error} status={404} />
		</Switch>
	</BrowserRouter>
);

export default App;