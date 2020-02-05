import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/event/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/Navbar/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <Fragment>
          <NavBar />
          <Container className='main'>
            <EventDashboard />
          </Container>
        </Fragment>
      </div>
    );
  }
}

export default App;
