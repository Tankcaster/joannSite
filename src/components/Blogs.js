import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup'

const centeredStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  width: '50%',
  marginBottom: '20px'
}

const  titleStyle = {
  borderBottom: '1px dotted #777',
  marginBottom: '15px',
}

const dateStyle = {
  verticalAlign: 'text-bottom',
  color: 'lightgrey',
}

class Blogs extends React.Component {
  constructor(){
    super();
    this.state = {blogs: null}
  }

  componentDidMount() {
    fetch('/api/blog')
    .then(res => res.json())
    .then(blogs => this.setState({blogs}))
    .catch(err => {
      console.log(err);
    })
  }

  handleDelete = (id) => {
    fetch('/api/blog/' + id, {
      method: 'DELETE',
    })
    .then(window.location.reload());
  }

  renderIfAdmin(thing){
    if(this.props.isAdmin){
      return thing;
    } else{
      return null;
    }
  }

  renderBlog = (blog) => {
    if(blog) {
      return (
        <div>
          <Row style={titleStyle}>
            <div>
              <Col lg={8}>
                <Link to={'/blog/' + blog.id}><h1>{blog.title}</h1></Link>
              </Col>
              <Col lg={4}>
                <h1 /><p style={dateStyle}>{'posted on: ' + blog.date}</p>
              </Col>
            </div>
          </Row>
          <Row>
            <Col lg={12}>
              <p>{blog.content}</p>
            </Col>
          </Row>
          <Link to={'/blog/' + blog.id}><Button style={{marginTop: '20px'}} bsStyle="info">Comments</Button></Link>
          {this.renderIfAdmin(
            <Popup trigger={<Button bsStyle="danger">Delete</Button>} modal>
            {close => (
              <div>
                <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Are you sure you want to delete this blog?</h2>
                <Row>
                  <Col xs={6}>
                    <Button style={centeredStyle} onClick={() => this.handleDelete(blog.id)}>Yes</Button>
                  </Col>
                  <Col xs={6}>
                    <Button style={centeredStyle} onClick={close}>No</Button>
                  </Col>
                </Row>
              </div>
            )}
          </Popup>)}
        </div>
      );
    } else {
      return null;
    }
  }

  renderAfterApiCall = () => {
    if(this.state.blogs){
      return (
        <Grid>
          {this.state.blogs.slice(0).reverse().map(blog =>
            this.renderBlog(blog)
          )}
          {this.renderIfAdmin(<Link to='/blog/post'><Button style={{marginTop: '50px'}} bsStyle="info">Post New Blog</Button></Link>)}
          <div style={{marginBottom: '150px'}} sm={0} xs={12} />
        </Grid>
      );
    } else {
      return (
        <h1>Loading...</h1>
      );
    }
  }

  render() {
    return this.renderAfterApiCall();
  }
}

export default Blogs;
