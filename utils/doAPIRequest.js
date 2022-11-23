const axios = require('axios');

//TODO: dynamic country
const doApiRequest = async (appId, apiKey, country = 'fr') => {
    try {
        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${apiKey}?results_per_page=20&what=backend%20node.js%20developer`
        
        const response = await axios.get(url);

        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = doApiRequest;