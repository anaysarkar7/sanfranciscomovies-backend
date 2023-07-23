# sanfranciscomovies-backend > README.md
## Steps to get started 
```
1. clone this repo in your local machine "git clone https://github.com/anaysarkar7/sanfranciscomovies-backend.git"
2. install all required dependencies "npm install" 
3. setup your environment variables (go to .env.example file in your local directory of the project)
        3.1. Create a position stack account at https://positionstack.com/
        3.2. Get your API Access Key from https://positionstack.com/dashboard, copy that
        3.3. paste it in value for "POSITION_STACK_API_ACCESS_KEY"
        3.4. you can also change your port number as required in the "PORT" variable's value
        3.5. change .env.example to .env
4. start your server "npm run start"
```
## APIs
##### 1. 
```js
endpoint : "/api/autocompleteSearch",
request body : {
    "inputText":"SOME_TEXT_HERE",//(required), can't be empty string
    "filterType": "title" || "location" || "director", //(required), can't be any other value than the three mentioned
}
```
```curl
curl --location 'localhost:8000/api/autocompleteSearch' \
--header 'Content-Type: application/json' \
--data '{
    "inputText":"ma",
    "filterType":"title"
}'  
```
