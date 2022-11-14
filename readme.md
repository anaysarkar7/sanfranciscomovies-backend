### Sanfranciscomovies Backend Code

This source code would be deployed on a service such as heroku to serve the frontend

Services Used indside : 
1) ' Position Stack ' : for geocoding the locations of each movie and store in our DB

#### API-endpoints

backend-url =(https://sanfrancisomovies.herokuapp.com)

##### 1) Autocomplete Search  
        endpoint : 'backend-url/api/autocompleteSearch'
        request body expected :
            {
                inputText:"some text",
                filter:"your filter"
            }
            => filter can be : ' movie ' , ' locations ' ,' director '  

        response :
            {
                result: [
                            {
                                movie 1
                            },
                            {
                                movie 2
                            },
                            .
                            .
                            .
                        ]
            }
            => result will be array of movie objects
            => Movie Object example->
                {
                    "title": "Magnum Force",
                    "release_year": "1973",
                    "locations": "Golden Gate Bridge",
                    "fun_facts": "With 23 miles of ladders and 300,000 rivets in each tower, the Golden Gate Bridge was the world's longest span when it opened in 1937.",
                    "production_company": "The Malpaso Company",
                    "distributor": "Warner Bros. Pictures",
                    "director": "Ted Post",
                    "writer": "John Milius",
                    "actor_1": "Clint Eastwood",
                    "actor_2": "Hal Holbrook",
                    "actor_3": "Mitchell Ryan"
                }
##### 2) Add Movie List Into DB (not provided to client)
        REMEMBER:
            -> add movie into DB only after geocoding
            -> if geocode not available then insert as it is

