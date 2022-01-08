import React from "react";
import { ThemeProvider } from "styled-components";
import { Router, Route, Switch } from "react-router-dom";
import theme from "../../theme";
import history from "../../util/history";
import GlobalStyle from "../../globalStyle";
import HeaderContainer from "../Header/Container";
import ErrorNotificationContainer from "../ErrorNotification/Container";
import CreateContractContainer from "../CreateContract/Container";
import OracleContainer from "../Oracle/Container";

const App = (props) => (
  <ThemeProvider theme={theme(props.dark)}>
    <Router history={history}>
      <>
        <GlobalStyle />
        <Route component={HeaderContainer} />
        <Route component={ErrorNotificationContainer} />
        <Switch>
          <Route path="/create" component={CreateContractContainer} />
          <Route path="/oracle" component={OracleContainer} />
          <Route path="/" component={CreateContractContainer} />
        </Switch>
      </>
    </Router>
  </ThemeProvider>
);

export default App;
