import { connect } from "react-redux";
import { compose } from "redux";
import Header from "./Component";

const mapDispatchToProps = {};

const enhance = compose(connect(null, mapDispatchToProps));

const HeaderContainer = enhance(Header);

export default HeaderContainer;
