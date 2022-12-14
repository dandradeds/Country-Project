import React, { useState } from 'react'
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import '../home/style.css'
import { useEffect } from 'react';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });

  const LIST_COUNTRIES = gql`
  {
    countries {
        name
        native
        capital
        emoji
        currency
        code
        languages {
          name
        }
    }
  }
`;



function Home() {
    const [country, setCountry] = useState('US');
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
    const [flag, setFlag] = useState('');
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        getFlags()
    },[country])

    
    if (loading || error) {
      return <p>{error ? error.message : 'Loading...'}</p>;
    } 
  
   let result =  data.countries.find(el => el.code == country)

    async function getFlags(){
        setLoader(true)
        var response = await fetch(`https://countryflagsapi.com/png/${country}`, {
            method: 'GET', 
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        setFlag(response.url)
        setLoader(false)
    }
        
        

    return (  
        <div className='input'>
            <Header/>
            
            <select value={country} onChange={event => setCountry(event.target.value)}>
            {data.countries.map(country => (
            <option key={country.code} value={country.code}>
            {country.name}
            </option>
        ))}
        </select>
        {loader ? 
            <Loader/>:
        <div className='container'>
         
            <div className='informacao'>
            <h1>{result.name}</h1>
            <h3>Capital: {result.capital}</h3>
            <h3>Emoji: {result.emoji}</h3>
            <h3>Moeda: {result.currency}</h3>
            <h3>Idioma: {result.languages[0].name}</h3>
            
        </div>
        <div>
            <img src={flag} />
        </div>
        </div>}

            
     </div>
      
    );
}

export default Home;