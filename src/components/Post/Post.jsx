import React from 'react'

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spans: 0,
    }

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10 + 1);

    this.setState({ spans })
  }

  render() {
    const { description, urls, id } = this.props.post;
    return (
      <div style={{ gridRowEnd: `span ${ this.state.spans }`}} >
        <a href={`/posts/${id}`}>
          <img
            ref={ this.imageRef }
            alt={ description }
            src={ urls.regular }
          />
        </a>
      </div>
    );
  }
}

export default Post;
