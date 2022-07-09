const continentSelect = document.getElementById('continentSelect');

continentSelect.addEventListener('change', async (e) => {
    const selectedContinent = e.target.value;
    const countries = await getCountriesByContinent(selectedContinent)
})

const getCountriesByContinent = (continentCode) => {
    return fetchQuery(`
        query getCountries($code: String) {
            continent(code: $code) {
              countries {
                name
              }
            }
          }
`, { code: continentCode })
        .then(data => { console.log(data) })
}

const fetchQuery = (query, variables = {}) => {
    return fetch("https://countries.trevorblades.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: query
        })
    }).then(res => res.json())
}

fetchQuery(`
    query{
        continents{
            code
            name
        }
    }
`).then(data => {
    (data.data.continents).map(continent => {
        const option = document.createElement("option");
        option.value = continent.code
        option.innerText = continent.name
        continentSelect.append(option)
    })
})
