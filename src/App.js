import React, { Suspense, lazy, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./configs/router";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import "antd/dist/antd.compact.css";
import jwt_decode from "jwt-decode";
import { createBrowserHistory } from "history";
import {USER_INFO} from "./constants/types";
const history = createBrowserHistory();

const Components = {};
for (const c of AuthenticatedRoutes) {
  Components[c.component] = lazy(() => import(`./pages/` + c.component));
}

for (const c of UnauthenticatedRoutes) {
  Components[c.component] = lazy(() => import("./pages/" + c.component));
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isSignedIn);
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  dispatch({ type: USER_INFO, payload: decoded})

  return (
    <Router history={history}>
      <Switch>
        {UnauthenticatedRoutes.map((c) => {
          const C = Components[c.component];
          return (
            <Route
              key={c.path}
              exact={c.isExact}
              path={c.path}
              render={(props) => (
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Suspense fallback={<Loading />}>
                    <C {...props} isAuthenticated={isAuthenticated} />
                  </Suspense>
                </PublicRoute>
              )}
            />
          );
        })}
        {AuthenticatedRoutes.map((c) => {
          const C = Components[c.component];
          return (
            <Route
              key={c.path}
              exact
              path={c.path}
              render={(props) => (
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Suspense fallback={<Loading />}>
                    <C {...props} isAuthenticated={isAuthenticated} />
                  </Suspense>
                </PrivateRoute>
              )}
            />
          );
        })}
        <Route
          render={() => (
            <div>
              {isAuthenticated ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              )}{" "}
            </div>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
