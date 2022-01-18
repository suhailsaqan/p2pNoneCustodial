import React from "react";
import { ThemeProvider } from "styled-components";
import { Router, Route, Switch } from "react-router-dom";
import theme from "../../theme";
import history from "../../util/history";
import GlobalStyle from "../../globalStyle";
import HeaderContainer from "../Header/Container";
import ErrorNotificationContainer from "../ErrorNotification/Container";
import LoginFormContainer from "../LoginForm/Container";
import SignupFormContainer from "../SignupForm/Container";
import forgotPassword from "../forgotPassword/ForgotPassword";
import UpdatePassword from "../updatePassword/UpdatePassword";
import Settings from "../Settings/Component";
import ChangePasswordContainer from "../ChangePasswordForm/Container";
import CreateContractContainer from "../CreateContract/Container";
import Home from "../Home";

const App = (props) => (
  <ThemeProvider theme={theme(props.dark)}>
    <Router history={history}>
      <>
        <GlobalStyle />
        <Route component={HeaderContainer} />
        <Route component={ErrorNotificationContainer} />
        <Switch>
          <Route path="/login" component={LoginFormContainer} />
          <Route path="/signup" component={SignupFormContainer} />
          <Route path="/forgotPassword" component={forgotPassword} />
          <Route
            path="/updatePassword/:token"
            exact
            component={UpdatePassword}
          />
          <Route path="/settings" component={Settings} />
          <Route path="/changepassword" component={ChangePasswordContainer} />
          <Route path="/create" component={CreateContractContainer} />
          <Route path="/" component={Home} />
        </Switch>
      </>
    </Router>
  </ThemeProvider>
);

export default App;
