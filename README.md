# Movie Database

Will use [omdbapi](http://www.omdbapi.com/) to get movies data. You will need to log in.

## Development

To run the production version of the app, call:

```
docker-compose up
```

To run the project locally, you first start the database by calling

```
docker-compose run -p 5432:5432 db
```

Then, you need to call

```
pip3 install -r requirements.txt
```

and start the backend by calling:

```
python3 manage.py runserver 0.0.0.0:8000
```

and start the frontend by calling in `client` directory:

```
yarn
```

and then

```
yarn start
```

## TODO

- Frontend setup
- Browsing/searching
- Logging in
- Storing stuff in db
