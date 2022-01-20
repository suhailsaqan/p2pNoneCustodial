import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { headerItem } from "../shared/helpers";

const Logo = styled(Link)`
  ${headerItem};

  margin-right: auto;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.normalText};
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 19px;
    display: flex;
  }
`;

const HeaderLogo = () => <Logo to="/create">Non</Logo>;

export default HeaderLogo;
