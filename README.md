# Movie Database

`With google chrome, it has problems with CORS. Use Firefox instead.`

Will use [omdbapi](http://www.omdbapi.com/) to get movies data.

## Development

To run the production version of the app, call:

```
docker-compose up
```

And visit [http://localhost:3000](http://localhost:3000) in your browser.

### Database

To run the each component locally, you first start the database by calling

```
docker-compose run -p 5432:5432 db
```

### Backend

Then, you need to call:

```
pip3 install -r requirements.txt
```

and start the backend by calling:

```
python3 manage.py runserver 0.0.0.0:8000
```

You can set DB_HOST to the address of the machine running the database. It helps when you can't refer to your WSL as localhost but as 172.25.something.

You can also use it with docker:

```
docker-compose run -p 8000:8000 backend
```

Command above will also start the db, so no need to run db explicitly then.

### Client

Start the client by calling in `client` directory:

```
yarn
```

and then

```
yarn start
```

You can set env variable REACT_APP_BACKEND_HOST to any host you want, e.g. 172.12.15.16:8000 - http:// will be added by default.

## TODO

- Logging in
- Storing stuff in db
