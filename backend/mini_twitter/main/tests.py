from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from . import views


class UserTest(APITestCase):
    def setUp(self):
        self.login_url = reverse('login')
        self.data = {'username': 'luffy1', 'password':'luffy1'}

        super().setUp()

    def test_usre_can_register(self):
        register_url = reverse('user_register_list')
        data = {'username':'luffy1', 'password':'luffy1','first_name':'Luffy D.','last_name':'Monkey'}

        response = self.client.post(register_url, data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_user_can_login(self):
        # self.client.login(username='luffy', password='luffy')
        response = self.client.post(self.login_url, self.data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_user_can_post_tweet(self):
        data = {'content': 'hello, world'}
        self.client.login(username='msdhoni', password='msdhoni')
        response = self.client.post('/tweets/1/', data, format='json')
        self.assertEqual(response.status_code, 201)
