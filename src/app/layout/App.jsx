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
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import NotFound from './NotFound';

class App extends Component {
	render() {
		return (
			<Fragment>
				<ModalManager />
				<Route exact path='/' component={HomePage} />

				<Route
					path='/(.+)'
					render={() => (
						<Fragment>
							<NavBar />
							<Container className='main'>
								<Switch key={this.props.location.key}>
									<Route exact path='/events' component={EventDashboard} />
									<Route path='/events/:id' component={EventDetailedPage} />
									<Route path='/people' component={PeopleDashboard} />
									<Route
										path='/profile/:id'
										component={UserIsAuthenticated(UserDetailedPage)}
									/>
									<Route
										path='/settings'
										component={UserIsAuthenticated(SettingsDashBoard)}
									/>
									<Route
										path={['/create-event', '/manage/:id']}
										component={UserIsAuthenticated(EventForm)}
									/>
									<Route component={NotFound} />
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
