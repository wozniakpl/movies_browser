import requests

API_KEY = "5ba8bcf0" # if it stops working, make a new one, it's 1k request per day
base_url = "http://www.omdbapi.com/"

def make_url(self):
    return self.base_url + "?apikey=" + API_KEY + "&"

class OMDBClient:
    def search_title(title):
        response = requests.get(base_url + "?apikey=" + API_KEY + "&t=" + title)
        return response.text

    def search_pattern(pattern):
        response = requests.get(base_url + "?apikey=" + API_KEY + "&s=" + pattern)
        return response.text
