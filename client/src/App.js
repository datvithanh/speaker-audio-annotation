import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import Home from './components/Home/Home';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateAdminRoute from './components/routing/PrivateAdminRoute';
import CreateTest from './components/Admin/CreateTest';
import UserManagement from './components/Admin/UserManagement/UserManagement.js';
import TestManagement from './components/Admin/TestManagement';
import AddUser from './components/Admin/UserManagement/AddUser/AddUser';
import DataConstruction from './components/Team/DataConstruction';
import Competitions from './components/Team/Competitons';
import Layout from './components/Admin/Layout/Layout';
import LayoutApp from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import Evaluate from './components/User/Evaluate';
import DetailTest from './components/Admin/TestManagement/DetailTest';
import ChangePassword from './components/User/ChangePassword';
import VoiceManagement from './components/Admin/VoiceManagement';
import AddVocie from './components/Admin/VoiceManagement/AddVocie';
import PrivateTeamRoute from './components/routing/PrivateTeamRoute';
import FinishTask from './components/Team/DataConstruction/FinishTask';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);



  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <LayoutApp>
            <Switch>
              <Route exact path="/test" component={DataConstruction} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute
                exact
                path="/change-password"
                component={ChangePassword}
              />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/evaluate/:id" component={Evaluate} />

              <PrivateAdminRoute path="/admin">
                <Layout>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/admin/create-test"
                      component={CreateTest}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/user-management"
                      component={UserManagement}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/user-management/add-user"
                      component={AddUser}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/test-management"
                      component={TestManagement}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/test-management/:id"
                      component={DetailTest}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/voice-management"
                      component={VoiceManagement}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/voice-management/add-voice"
                      component={AddVocie}
                    />
                  </Switch>
                </Layout>
              </PrivateAdminRoute>
              <PrivateTeamRoute path="/team">
    
                <PrivateRoute
                  exact
                  path="/team/finish"
                  component={FinishTask}
                />
                <PrivateRoute
                  exact
                  path="/team/competitions"
                  component={Competitions}
                />
                <PrivateRoute
                  exact
                  path="/team/competitions/:competitionId"
                  component={DataConstruction}
                />
              </PrivateTeamRoute>
              <Redirect to="/" />
            </Switch>
          </LayoutApp>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ marginTop: '75px' }}
          />
        </div>
      </Router>
    </Provider>
  );
};

export default hot(App);
