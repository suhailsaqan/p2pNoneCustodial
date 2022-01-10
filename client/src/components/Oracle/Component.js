import React from "react";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import PostDetailPost from "./Post";
import PostDetailInfoBarContainer from "./InfoBar/Container";
// import CommentFormContainer from "../CommentForm/Container";
import PostDetailCommentSection from "./CommentSection";

class Oracle extends React.Component {
  componentDidMount() {
    this.props.fetchContract(this.props.id);
    this.props.fetchStatus(this.props.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.contract !== prevProps.contract &&
      this.props.contract === null
    ) {
      this.props.history.goBack();
    }
  }

  render() {
    const { contract, status } = this.props;
    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!contract) return <Empty />;
    return (
      <>
        <PostDetailPost {...post} />
        <PostDetailInfoBarContainer
          id={post.id}
          views={post.views}
          upvotePercentage={post.upvotePercentage}
          author={post.author}
        />
        {/* {this.props.token && <CommentFormContainer id={post.id} />} */}
        <PostDetailCommentSection comments={post.comments} />
      </>
    );
  }
}

export default Oracle;
