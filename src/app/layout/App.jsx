import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';

import EventDashboard from '../../features/event/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/Navbar/NavBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/event/Home/HomePage';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/User/PeopleDashboard/PeopleDashboard';
import SettingsDashBoard from '../../features/User/Settings/SettingsDashBoard';
import UserDetailedPage from '../../features/User/UserDetailed/UserDetailedPage';
import EventForm from '../../features/event/EventForm/EventForm';
import ModalManager from '../../features/modals/ModalManager';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Route exact path='/' component={HomePage} />
				<Route
					path='/(.+)'
					render={() => (
						<Fragment>
							<ModalManager />
							<NavBar />
							<Container className='main'>
								<Switch key={this.props.location.key}>
									<Route exact path='/events' component={EventDashboard} />
									<Route path='/events/:id' component={EventDetailedPage} />
									<Route path='/people' component={PeopleDashboard} />
									<Route path='/profile/:id' component={UserDetailedPage} />
									<Route path='/settings' component={SettingsDashBoard} />
									<Route
										path={['/create-event', '/manage/:id']}
										component={EventForm}
									/>
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default withRouter(App);
