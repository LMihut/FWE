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
```bash
http://localhost:4000/api/joke/
```
- Create / Insert a new joke (**POST** Request)
```bash
    http://localhost:4000/api/joke/
```
- Get a joke by ID (**GET** Request) 
```bash
    http://localhost:4000/api/joke/:id
```
- Delete a joke by ID (**DELETE** Request) 
```bash
    http://localhost:4000/api/joke/:id
```
- Update a joke by ID (**PATCH** Request) 
```bash
    http://localhost:4000/api/joke/:id
```

- Delete all the jokes (**DELETE** Request)
```bash
    http://localhost:4000/api/joke/
```


## Rating system
The rating of Jokes is defined by the variable `count` inside of entity Joke. The best score is `5` and the worse score is `1`.`0` mean that the joke never received a notation. 
- GET all the Jokes with the Rating = `x`
```bash
    http://localhost:4000/api/top/:rating
```

## Export and download the jokes in CSV format
To extract and download all jokes as `csv` file you can use the following endpoints inside a browser: 
```bash
http://localhost:4000/api/download/all
```

## External API 
- Get jokes from external API (**GET** Request)
  - <code>http://localhost:4000/api/externalApi</code>

