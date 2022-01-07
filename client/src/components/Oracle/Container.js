import { connect } from "react-redux";
import { compose } from "redux";
import { fetchPost } from "../../actions/posts"; //change
import Oracle from "./Component";

export const mapStateToProps = (state) => ({
  isFetching: state.posts.isFetching,
  post: state.posts.post,
});

const mapDispatchToProps = { fetchPost }; //change

const enhance = compose(connect(mapStateToProps, mapDispatchToProps)); 

const OracleContainer = enhance(Oracle);

export default OracleContainer;
