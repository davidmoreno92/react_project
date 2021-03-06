import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react';

import Template from "../Components/Template/template";
import Home from "../Pages/Home/home";
import EventsDashboard from "../Pages/Events/dashboard";
import Error404 from "../Pages/Error/error";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'

function AppRouter() {
  return (
    <BrowserRouter>
      <Template>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/events" component={EventsDashboard} exact/>
          {/*<Route path="/events/detail/:id" component={EventDetail} exact/>
          <Route path="/events/create" component={EditEvent} exact/>
          <Route path="/events/edit/:id" component={EditEvent} exact/>
          */}
          <Route path="*" component={Error404} />
        </Switch>
      </Template>
    </BrowserRouter>
  );
};

export default withAuthenticator(AppRouter);
