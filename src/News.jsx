import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './News.css'

function formatDate(publishedAt) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(publishedAt);
  return date.toLocaleDateString('en-GB',options);
}

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {

     const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API}`;
      
     const getArticles = async() => {

        try{
            const response = await axios.get(API_URL)
            setNews(response.data.articles)
            console.log(response)
        }
        catch (error){
            console.error("Eror in Fetching Data");
        }

    }

    getArticles();

  }, []);

  return (

    <div className="container-fluid">
      <div className="row">

        {news.map((article, index) => (
          <div className="col-md-6 mb-4" key={index}>

            <Card className="card">

              <div className="titlecard">
                <Card.Title>

                  <a className="title" href={article.url} target="_blank" rel="noopener noreferrer">
                    <span className="title-text">{article.title}</span>
                  </a></Card.Title>

              </div>

              <Card.Text className="subTitle">{article.author} - {article.source.name}</Card.Text>
              <Card.Text className="date">{formatDate(article.publishedAt)}</Card.Text> 

              <Card.Body className="cardBody">
                <Card.Img className="float-start image" variant="top" src={article.urlToImage}/>                
                <Card.Text className="description">{article.description}</Card.Text>  
              </Card.Body>

            </Card>

          </div>
        ))}
        
      </div>
    </div>
  );
};

export default News;
