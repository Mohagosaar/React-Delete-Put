import './App.css';
// useState is a hook, it allows us to keep
// variables and the DOM in sync.
import { useState, useEffect } from 'react';
// import axios so that we can use it within our component
import axios from 'axios';

function App() {
  const [countryList, setCountryList] = useState([]);
  const [name, setName] = useState('');
  const [continent, setContinent] = useState('');

  // Fetch list of countries from the server
  const getCountryList = () => {
      axios.get('/api/countries').then(response => {
          setCountryList(response.data);
      }).catch(error => {
          console.log(error);
          alert('Something went wrong!');
      })
  }

  // useEffect is called on page load
  useEffect(() => {
      console.log('useEffect!');
      getCountryList();
  }, []);

  // Send new country to the server
  const addCountry = (e) => {
      e.preventDefault();
      console.log('addCountry', name);
      const data = { name: name, continent: continent }
      axios.post('/api/countries', data).then((response) => {
          getCountryList();
          // Clear form in the .then
          setName('');
          setContinent('');
      }).catch(error => {
          console.log(error);
          alert('Something went wrong!');
      })
  }

  return (
      <div>
          <header>
              <h1>Smallest Countries!</h1>
          </header>
          <form onSubmit={addCountry}>
              <input type="text" required placeholder="country name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" required placeholder="continent" value={continent} onChange={(e) => setContinent(e.target.value)} />
              <input type="submit" value="Submit" />
          </form>
          <div>
              {/* For development and debugging */}
              {/* {JSON.stringify(countryList)} */}
              {
                  countryList.map(country => (
                      <div className={country.continent} key={country.id}>
                          {country.name}
                      </div>
                  ))
              }
          </div>
      </div>
  );
}

export default App;
