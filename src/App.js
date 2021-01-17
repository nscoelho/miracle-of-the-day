import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [bookChosen, setBookChosen] = useState(false);
  const [book, setBook] = useState({
    city: "",
    country: "",
    year: "",
    summary: "",
    text: "",
    map: "",
    url: ""
  });


  const randomMiracle = () => {
    const min = Math.ceil(1)
    const max = Math.floor(145)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const searchBook = () => {

    // Reads the API
    Axios.get('https://eucharistic-miracles-api.herokuapp.com/miracles/' + randomMiracle())
    .then((response) => {
      console.log(response);
      setBook({
        city: response.data.city,
        country: response.data.country,
        year: response.data.year,
        summary: response.data.summary,
        text: response.data.text,
        map: response.data.map,
        url: response.data.url
      });

      setBookChosen(true);
    });
    addNewLines(book);
  };

  // Adds a new line after "."
  const addNewLines = (book) => {
    book.summary = book.summary.replaceAll(/\. /g, '.\n');
    book.text = book.text.replaceAll(/\. /g, '.\n');
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>miracle of the day.org</h1>

        <button onClick={searchBook}>Miracle Guide</button>
      </div>
      <div className="DisplaySection">
        {!bookChosen ?
        (<h3> Click the button to get your miracle of the day </h3>)
        :
        (
        <>

        <h2>{book.city}, {book.country}, {book.year}</h2>
        <div className="lineBreak">
          <h6>{book.summary}</h6>
          <h6>{book.text}</h6>
        </div>
        <h3><a target="_blank" rel="noreferrer" href={book.map}>Map</a></h3>
        <h3><a target="_blank" rel="noreferrer" href={book.url}>Click here to see the original exhibition of Carlo Acutis</a></h3>
        <h3><a target="_blank" rel="noreferrer" href="https://www.amazon.com/Eucharist-Mystery-Presence-Sacrifice-Communion/dp/1945125721/ref=sr_1_2?dchild=1&amp;keywords=eucharist&amp;qid=1610393073&amp;sr=8-2/&amp;WZoneDirect-no-more-redirect&_encoding=UTF8&tag=nelsonsc-20&linkCode=ur2&linkId=2209460d7022c9540d4de247a7ea7c15&camp=1789&creative=9325">Click here to learn more about The Eucharist</a></h3>
        </>
        )}

      </div>
    </div>
  );
}

export default App;
