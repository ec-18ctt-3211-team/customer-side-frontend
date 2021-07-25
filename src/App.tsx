import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import Pages from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={SITE_PAGES.MAIN.path}>
          <Pages.Main />
        </Route>
        <Route path={SITE_PAGES.LIST_OF_ROOMS.path}>
          <Pages.ListOfRooms />
        </Route>
        <Route path={SITE_PAGES.VIEW_A_PLACE.path}>
          <Pages.Viewaplace />
        </Route>
        <Route path={SITE_PAGES.ROOMS_OF_HOST.path}>
          <Pages.RoomsOfHost />
        </Route>
        <Route path={SITE_PAGES.CONFIRM_BOOKING.path}>
          <Pages.ConfirmBooking />
        </Route>
        <Route path={SITE_PAGES.BOOKING_HISTORY.path}>
          <Pages.BookingHistory />
        </Route>
        <Route path={SITE_PAGES.USER_PROFILE.path}>
          <Pages.UserProfile />
        </Route>
        <Route path={SITE_PAGES.SUCCESS_BOOKING.path}>
          <Pages.SuccessBooking />
        </Route>
        <Route path="*">
          <Pages.Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
