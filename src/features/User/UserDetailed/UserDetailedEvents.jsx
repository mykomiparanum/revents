import React, { Fragment } from 'react';
import {
	Grid,
	Segment,
	Header,
	Menu,
	Card,
	Image,
	Tab
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const panes = [
	{ menuItem: 'All Events', pane: { key: 'allEvents' } },
	{ menuItem: 'Past Events', pane: { key: 'pastEvents' } },
	{ menuItem: 'Future Events', pane: { key: 'futureEvents' } },
	{ menuItem: 'Hosting', pane: { key: 'hosted' } }
];

const UserDetailedEvents = ({ events, eventsLoading, changeTab }) => {
	return (
		<Fragment>
			<Grid.Column width={12}>
				<Segment attached loading={eventsLoading}>
					<Header icon='calendar' content='Events' />
					<Tab onTabChange={(e, data) => changeTab(e, data)} panes={panes} menu={{ secondary: true, pointing: true }} />
					<br />

					<Card.Group itemsPerRow={5}>
						{events &&
							events.map(event => (
								<Card as={Link} to={`/event/${event.id}`} key={event.id}>
									<Image src={`/assets/categoryImages/${event.category}.jpg`} />
									<Card.Content>
										<Card.Header textAlign='center'>{event.title}</Card.Header>
										<Card.Meta textAlign='center'></Card.Meta>
									</Card.Content>
								</Card>
							))}
					</Card.Group>
				</Segment>
			</Grid.Column>
		</Fragment>
	);
};

export default UserDetailedEvents;
