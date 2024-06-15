import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      totalResults: 0
    }
  }
  async getApiData() {
    var response
    if (this.props.search)
      response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&sortBy=publishedAt&language=${this.props.language}&apiKey=301c5411d2c14378ae6c68c0ff399326`)
    else
      response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&sortBy=publishedAt&language=${this.props.language}&apiKey=301c5411d2c14378ae6c68c0ff399326`)
    response = await response.json()
    this.setState({
      articles: response.articles.filter((x) => x.title !== "[Removed]"),
      totalResults: response.totalResults
    })
  }
  componentDidMount() {
    this.getApiData()
  }
  componentDidUpdate(old) {
    if (this.props !== old)
      this.getApiData()
  }
  render() {
    return (
      <>
        <h5 className='bg-primary text-light text-center p-2 my-1 text-capitalize'>{this.props.search?this.props.search:this.props.q} News Articles</h5>
        <div className="container">
          <div className="row">
            {this.state.articles.map((item, index) => {
              return <NewsItem
                key={index}
                pic={item.urlToImage}
                title={item.title}
                description={item.description}
                url={item.url}
                date={item.publishedAt}
                source={item.source.name}
              />
            })}
          </div>
        </div>
      </>
    )
  }
}
