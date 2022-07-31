export async function api(palavra) {
    let response = await fetch('https://countries.trevorblades.com', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            query: `{
                country(code:"BR") {
                    name
                }
              }`
        })
    })
    let countryFound = await response.json()
    console.log(response)
    return countryFound
    
    
}