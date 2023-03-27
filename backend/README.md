# Backend

## Stept to run the project
1. Go to the `backend` folder and install all dependencies 
```bash
npm install
```
2. Run the following command in the `./fwe-ss-21-759509` Directory
```bash
sudo docker-compose up 
```
3. For saving data in the database, we have to create the database (important `typeorm` for the migration)
```bash
docker-compose exec backend bash
npm run typeorm schema:drop # To delete the current scheme 
npm run typeorm schema:sync # Create the schema depending on your data in `backend / src / entity` 
```

## Documentation: CRUD System
- Get all the jokes (**GET** Request) 
    - <code>http://localhost:4000/api/joke/</code>
- Create / Insert a new joke (**POST** Request)
    - <code>http://localhost:4000/api/joke/<code>
- Get a joke by ID (**GET** Request) 
    - <code> http://localhost:4000/api/joke/:id</code>
- Delete a joke by ID (**DELETE** Request) 
    - <code>http://localhost:4000/api/joke/:id</code>
- Update a joke by ID (**PATCH** Request) 
    - <code>http://localhost:4000/api/joke/:id</code>

- Delete all the jokes (**DELETE** Request)
    - <code> http://localhost:4000/api/joke/ </code>


## Rating system
The rating of Jokes is defined by the variable `count` inside of entity Joke. The best score is `5` and the worse score is `1`.`0` mean that the joke never received a notation. 
- GET all the Jokes with the Rating = `x`
    - <code> http://localhost:4000/api/top/:rating </code>

## Export and download the jokes in CSV format
To extract and download all jokes as `csv` file you can use the following endpoints inside a browser: 
- <code> http://localhost:4000/api/download/all </code>
- You can find the download file under: <a href = "https://code.fbi.h-da.de/istlomihu/fwe-ss-21-759509/-/blob/master/backend/exportJokes.csv">`./fwe-ss-21-759509/backend/exportJokes.csv`</a>

## External API 
- Get jokes from external API (**GET** Request)
  - <code>http://localhost:4000/api/externalApi</code>

