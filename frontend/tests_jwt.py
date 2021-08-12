from django.test import TestCase
from django.contrib.auth.models import User
import json

test_users = [
    {"username": "testuser1", "password": "testpassword1"},
    {"username": "testuser2", "password": "testpassword2"},
]
test_user = test_users[0]

class LoginTest(TestCase):
    def setUp(self):
        for user in test_users:
            new_user = User.objects.create(username=user["username"])
            new_user.set_password(user["password"])
            new_user.save()

    def get_token(self, user):
        res = self.client.post('/token',
                               data=json.dumps({
                                   'username': user["username"],
                                   'password': user["password"],
                               }),
                               content_type='application/json',
                            )
        result = json.loads(res.content)
        self.assertTrue("access" in result)
        return result["access"]

    def test_login(self):
        token = self.get_token(test_user)
        assert(len(token)>0)

    def test_getting_movies(self): 
        token = self.get_token(test_user)
        res = self.client.get( # TODO: mock omdb api
            '/api/search/title/purge',
            content_type='application/json',
            HTTP_AUTHORIZATION=f'Bearer {token}'
        )
        print(res.content)
        assert False # TODO
