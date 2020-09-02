from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.exceptions import ParseError, ValidationError

from .models import UserProfile, Tweet, Follow
from .serializers import (UserSerializer,
                          UserProfileSerializer,
                          TweetSerializer,
                          FollowSerializer)
from .permissions import IsOwner



class UserApiView(generics.CreateAPIView):
    """
    ApiVIew to register new users
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        #assigning serializer data fields to variables
        first_name = serializer.data.get('first_name',None)
        last_name = serializer.data.get('last_name', None)

        #checking for blank and None fields
        if not (first_name and last_name):
            raise ParseError('first name and last name must not be null')

        #creating new user instance
        user = User.objects.create_user(username=serializer.data['username'],
                                        password=serializer.data['password'],
                                        first_name = first_name,
                                        last_name = last_name
                                         )
        #creating new UserProfile instance for newly created user
        UserProfile.objects.create(user=user, bio="")



class UserProfileApiVIew(generics.RetrieveAPIView):
    """
    ApiView for to get user profile
    """
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = UserProfile.objects.all()

    def get_object(self):
        #fetching id from query_params
        id = self.request.query_params.get('id', None)

        #getting user instance of this id
        if id:
            user = get_object_or_404(User, id=id)

            #returning UserProfile instance of requsted user
            return UserProfile.objects.get(user=user)

        #returning UserProfile instance of current logged in user
        return UserProfile.objects.get(user=self.request.user)




class UserProfileUpdateApiVIew(generics.UpdateAPIView):
    """
    ApiView to update user profile
    """
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    queryset = UserProfile.objects.all()

    def get_object(self):
        #returning UserProfile instance of current logged in user
        return UserProfile.objects.get(user=self.request.user)


class TweetCreateApiView(generics.CreateAPIView):
    """
    ApiView to crate tweets
    """
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        #saving newly created tweet instance to DB
        serializer.save(user=self.request.user)


class TweetListApiView(generics.ListAPIView):
    """
    ApiVIew to get tweet list of specific user
    """
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # fetching id from query_params
        id = self.request.query_params.get('id', None)

        # returning all tweets instances created by user of this id
        if id:
            user = User.objects.get(id=id)
            return user.tweet_set.all()

        #returning all tweets instances created by current logged in user
        return self.request.user.tweet_set.all()


class TweetTimelineListApiView(generics.ListAPIView):
    """
    ApiView to get timeline tweets of requested user
    """
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Tweet.objects.all()

    def get_queryset(self):
        #returning all tweets instances created by users that logged in user follows
        return self.queryset.filter(Q(user=self.request.user) | Q(user__following_set__follower=self.request.user))


class FollowApiView(generics.CreateAPIView,generics.DestroyAPIView):
    """
        ApiView to create and delete follow relation
    """
    serializer_class = FollowSerializer
    permission_classes = (IsAuthenticated,)


    def perform_create(self, serializer):
        #fetching pk field from kwargs
        pk = self.kwargs['pk']

        #getting user instance which having pk as given,if not found Http404 response raised
        following_user = get_object_or_404(User, pk=pk)

        #saving serializer, exception is handled for duplicate instances
        try:
            serializer.save(follower=self.request.user, following=following_user)
        except:
            raise ValidationError(detail="user already followed")

    def get_object(self):
        # fetching pk field from kwargs
        pk = self.kwargs['pk']

        # getting user instance which having pk as given,if not found Http404 response raised
        following_user = get_object_or_404(User, pk=pk)

        #returning matched follow instance
        return get_object_or_404(Follow,follower=self.request.user, following=following_user)

