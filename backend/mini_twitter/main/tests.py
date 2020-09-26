import json

from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token



class UserRegistrationTestCase(APITestCase):

    def test_user_can_register(self):
        register_url = reverse('user_registration_list')
        data = {'username':'Gaurav  ', 'password':'123456','first_name':'Gaurav','last_name':'Daunde'}

        response = self.client.post(register_url, data, format='json')
        self.assertEqual(response.status_code, 201)
        

class UserProfileTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='Gaurav', password='123456')
        self.token = Token.objects.create(user=self.user)
        self.token_authentication()

    def token_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token "+self.token.key)

    def test_user_profile_retrieve(self):
        response = self.client.get(reverse('user_profile', kwargs={'pk':self.user.id}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'],'Gaurav')

    def test_user_profile_update(self):
        response = self.client.put(reverse('user_profile', kwargs={'pk': self.user.id}),
                                     {'bio':'my bio'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bio'],'my bio')

class TweetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='Gaurav', password='123456')
        self.token = Token.objects.create(user=self.user)
        self.token_authentication()

    def token_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_tweet_post(self):
        data = {'content': 'hello, world'}
        response = self.client.post(reverse('tweets', kwargs={'user_id': self.user.id}), data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_tweet_update(self):#not working
        response = self.client.patch(reverse('tweet_get_update_delete', kwargs={'user_id': self.user.id, 'pk':1}),
                                     {'content': 'hello, world2'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['content'], 'hello, world2')
