import { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import apiCalls from '../../apiCalls.js'
import './App.css';

class App extends Component {
  state = {
    articles: [],
    detailArticle: {},
    popupOpen: false,
    displayedCards: null,
  }

  componentDidMount = async () => {
    const homeArticles = await apiCalls.getHomeArticles()
    this.setState({
      detailArticle: homeArticles.results[0],
      articles: homeArticles.results })

  }

  createCards = articles => {
    console.log('hi')
    const cardArticles = articles || this.state.articles
    return cardArticles.map(article => (
      <Card
        style={{maxWidth: '400px', minWidth: '200px', margin: '20px', alignItems: 'center', cursor: 'pointer'}}
        onClick={() => this.handleClick(article)}>
        <Card.Img variant='top' src={article.multimedia[0].url} style={{maxWidth: '95%', margin: '10px 0px'}}/>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle style={{margin: '5px 0px 5px 10px'}}>{article.byline}</Card.Subtitle>
        </Card.Body>
      </Card>
    ))
  }

  handleClick = article => {
    this.setState({detailArticle: article, popupOpen: true})
  }

  handleClose = () => {
    this.setState({popupOpen: false})
  }

  handleChange = e => {
    const query = e.target.value.toLowerCase()
    if(!query) {
      return this.setState({displayedCards: null})
    }
    const filteredArticles = this.state.articles.filter(article => article.title.toLowerCase().includes(query))
    this.setState({displayedCards: this.createCards(filteredArticles)})
  }

  render() {
    return (
      <Container className='app'>
        <Row style={{justifyContent: 'center'}}>
          <h1 className='landing-header'>News Source</h1>
          <input
            className='search-bar'
            placeholder='Search Titles'
            onChange={this.handleChange}/>
        </Row>
        <Row style={{justifyContent: 'center'}}>
          {this.state.displayedCards || this.createCards()}
        </Row>
        {this.state.popupOpen &&
        <Modal
          show={this.state.popupOpen}
          size='lg'
          centered
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.detailArticle.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{justifyContent: 'center'}}>
          <Card
            style={{maxWidth: '400px', minWidth: '200px', alignItems: 'center', cursor: 'pointer', marginBottom: '20px'}}>
            <Card.Img variant='top' src={this.state.detailArticle.multimedia[0].url} style={{maxWidth: '95%', margin: '10px 0px'}}/>
            <Card.Body>
              <Card.Text>{this.state.detailArticle.abstract}</Card.Text>
            </Card.Body>
          </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button href={this.state.detailArticle.url}>View this article</Button>
          </Modal.Footer>
        </Modal>}
      </Container>
    )
  }
}

export default App;
