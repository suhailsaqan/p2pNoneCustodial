import React from "react";
import styled from "styled-components/macro";
import { Route } from "react-router-dom";
import HomeMainSection from "./MainSection";
import OracleContainer from "../Oracle/Container";
import PartyContainer from "../Party/Container";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const Home = () => (
  <Wrapper>
    <HomeMainSection>
      <Route
        exact
        path="/oracle/:id"
        render={({ match, history }) => (
          <OracleContainer id={match.params.id} history={history} />
        )}
      />
      <Route
        exact
        path="/party/:id/:party"
        render={({ match }) => (
          <PartyContainer id={match.params.id} party={match.params.party} />
        )}
      />
    </HomeMainSection>
  </Wrapper>
);

export default Home;
