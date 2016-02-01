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
        window.setTimeout(() => this.setState({data:data}), 2000);
    },
    handleCommentSubmit: function(comment) {
      data.push(comment);
      setTimeout(() => this.setState({data:data}), 1000);
    },
    render: function() {
      return (
        <div className="commentBox">
        <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onSubmit={this.handleCommentSubmit} />
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
  getInitialState: function() {
  return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onSubmit({text:text, author:author});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <div className="commentForm">
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text"
                  placeholder="Your name"
                  value={this.state.author}
                  onChange={this.handleAuthorChange}/>
          <input type="text"
                  placeholder="Say something..."
                  value={this.state.text}
                  onChange={this.handleTextChange}/>
          <input type="submit" value="Post" />
        </form>
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
