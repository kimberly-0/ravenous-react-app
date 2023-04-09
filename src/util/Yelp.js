const apiKey = 'API KEY HERE - KEEP SECRET, DO NOT COMMIT';

const Yelp = {
    search(term, location, sortBy) {
        // Request temporary access to demo server: https://cors-anywhere.herokuapp.com/corsdemo 
        const prependForCORSPermissions = 'https://cors-anywhere.herokuapp.com/';

        const endpoint = `${prependForCORSPermissions}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;

        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                });
            }
            throw new Error('Request failed!')
        });
    }
};

export default Yelp; 