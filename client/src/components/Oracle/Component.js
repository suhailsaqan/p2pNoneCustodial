// import React from "react";
// import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
// import Empty from "../shared/Empty";

// class Oracle extends React.Component {
//   componentDidMount() {
//     this.props.fetchPost(this.props.id);
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.props.post !== prevProps.post && this.props.post === null) {
//       this.props.history.goBack();
//     }
//   }

//   render() {
//     const { post } = this.props;
//     if (this.props.isFetching) return <LoadingIndicatorBox />;
//     if (!post) return <Empty />;
//     return <></>;
//   }
// }

// export default Oracle;
