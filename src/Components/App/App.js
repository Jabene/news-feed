import { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import apiCalls from '../../apiCalls.js'
import './App.css';

class App extends Component {
  state = {
    articles: [],
  }

  componentDidMount = async () => {
    const homeArticles = await apiCalls.getHomeArticles()
    this.setState({articles: homeArticles.results.map(article => (
      <Card style={{maxWidth: '400px', minWidth: '200px', margin: '20px'}}>
        <Card.Img variant='top' src={article.multimedia[0].url} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.abstract}</Card.Text>
        </Card.Body>
      </Card>
    ))})
  }

  render() {
    return (
      <Container className='app'>
        <Row>
          <Col>
            <h1 className='landing-header'>New Source</h1>
          </Col>
        </Row>
        <Row>
          {this.state.articles}
        </Row>
      </Container>
    )
  }
}

export default App;
