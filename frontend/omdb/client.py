import requests

API_KEY = "5ba8bcf0"  # if it stops working, make a new one, it's 1k request per day
base_url = "http://www.omdbapi.com/"


def make_url():
    return base_url + "?apikey=" + API_KEY + "&"


class OMDBClient:
    def search_title(title):
        response = requests.get(make_url() + "t=" + title)
        return response.text

    def search_pattern(pattern, page=1):
        response = requests.get(make_url() + f"s={pattern}&page={page}")
        return response.text
