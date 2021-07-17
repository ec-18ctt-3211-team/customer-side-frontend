import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import Pages from './pages';

function App() {
  const [isAuthorized, setAuthorized] = useState(false);
  return (
    <Router>
      <Switch>
        <Route exact path={SITE_PAGES.MAIN.path}>
          <Pages.Main
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.LIST_OF_ROOMS.path}>
          <Pages.ListOfRooms
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.VIEW_A_PLACE.path}>
          <Pages.Viewaplace
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.ROOMS_OF_HOST.path}>
          <Pages.RoomsOfHost
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.CONFIRM_BOOKING.path}>
          <Pages.ConfirmBooking
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.BOOKING_HISTORY.path}>
          <Pages.BookingHistory
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.USER_PROFILE.path}>
          <Pages.UserProfile
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.SUCCESS_BOOKING.path}>
          <Pages.SuccessBooking
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path="*">
          <div>ERROR!!!</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
