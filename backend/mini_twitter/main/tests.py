import json

from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework.status import (HTTP_200_OK,
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_403_FORBIDDEN,
                                   HTTP_201_CREATED,
                                   HTTP_204_NO_CONTENT)





class UserRegistrationTestCase(APITestCase):
    register_url = reverse('user_registration_list')

    #testcase to register user with valid data
    def test_registeration_with_valid_data(self):
        data = {'username':'Gaurav  ', 'password':'123456','first_name':'Gaurav','last_name':'Daunde'}

        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, HTTP_201_CREATED)

    # testcase to register user with used username data
    def test_registration_with_taken_username(self):
        self.test_registeration_with_valid_data()
        data = {'username': 'Gaurav  ', 'password': '123456', 'first_name': 'Gaurav', 'last_name': 'Daunde'}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST)
        

class UserProfileTestCase(APITestCase):
    #overrided setUp method for creation of user and adding Authorization header to request
    def setUp(self):
        self.user = User.objects.create_user(username='Gaurav', password='123456')
        token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+token.key)

    # testcase to retrieve user profile
    def test_user_profile_retrieve(self):
        response = self.client.get(reverse('user_profile', kwargs={'pk':self.user.id}))
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.data['user']['username'],'Gaurav')

    # testcase to update profile by owner
    def test_user_profile_update_by_owner(self):
        response = self.client.put(reverse('user_profile', kwargs={'pk': self.user.id}),
                                     {'bio':'my bio'})
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.data['bio'],'my bio')

    # testcase to update profile by otheruser
    def test_user_profile_update_by_otheruser(self):
        user = User.objects.create_user(username='GauravD', password='123456')
        response = self.client.put(reverse('user_profile', kwargs={'pk': user.id}),
                                     {'bio':'my bio'})
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)

class TweetTestCase(APITestCase):

    # overrided setUp method for creation of user and adding Authorization header to request
    def setUp(self):
        self.user = User.objects.create_user(username='Gaurav', password='123456')
        self.login(self.user)

    def login(self, user):
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    # testcase for posting new tweet
    def test_tweet_post(self):
        data = {'content': 'hello, world'}
        response = self.client.post(reverse('tweets', kwargs={'user_id': self.user.id}), data, format='json')
        self.assertEqual(response.status_code, HTTP_201_CREATED)

    # testcase for update tweet by owner
    def test_tweet_update_by_owner(self):
        data = {'content': 'hello, world'}
        response = self.client.post(reverse('tweets', kwargs={'user_id': self.user.id}), data, format='json')
        response = self.client.patch(reverse('tweet_get_update_delete', kwargs={'user_id': self.user.id, 'pk':response.data['id']}),
                                     {'content': 'hello, world2'})
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.data['content'], 'hello, world2')

    # testcase for update tweet by otheruser
    def test_tweet_update_by_otheruser(self):
        data = {'content': 'hello, world'}
        response = self.client.post(reverse('tweets', kwargs={'user_id': self.user.id}), data, format='json')

        user = User.objects.create_user(username='GauravD', password='123456')
        self.login(user)

        response = self.client.patch(reverse('tweet_get_update_delete', kwargs={'user_id': self.user.id, 'pk':response.data['id']}),
                                     {'content': 'hello, world2'})
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)

    # testcase for delete tweet by owner
    def test_tweet_destroy_by_owner(self):
        data = {'content': 'hello, world'}
        response = self.client.post(reverse('tweets', kwargs={'user_id': self.user.id}), data, format='json')
        response = self.client.delete(
            reverse('tweet_get_update_delete', kwargs={'user_id': self.user.id, 'pk': response.data['id']}))
        self.assertEqual(response.status_code, HTTP_204_NO_CONTENT)

    # testcase for delete tweet by otheruser
    def test_tweet_destroy_by_otheruser(self):
        data = {'content': 'hello, world'}
        response = self.client.post(reverse('tweets', kwargs={'user_id': self.user.id}), data, format='json')

        user = User.objects.create_user(username='GauravD', password='123456')
        self.login(user)

        response = self.client.delete(
            reverse('tweet_get_update_delete', kwargs={'user_id': self.user.id, 'pk': response.data['id']}))
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)


