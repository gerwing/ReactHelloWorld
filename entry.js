var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');

var data = [
    {author:'GavinG', text: 'Jeej it does work'},
    {author:'Dvidg', text: 'Jeej it does work 1'},
    {author:'JohnD', text: 'Jeej it does work 2'}
];

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data:[]};
    },
    componentDidMount: function() {
        var that = this;
        window.setTimeout(function() {
          that.setState({data:data});
        }, 5000);
    },
    render: function() {
      return (
        <div className="commentBox">
        <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm />
        </div>
      );
    }
});

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(comment) {
        return (
            <Comment author={comment.author}>{comment.text}</Comment>
        );
    });
    return (
      <div className="commentList">
         {comments}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
    rawMarkup: function() {
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
      return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="comment">
              <h2 className="commentAuthor">{this.props.author}</h2>
              <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
