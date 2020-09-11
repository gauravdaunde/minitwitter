from django.contrib.auth.models import User
from django.db.models import Q
from django.db import IntegrityError

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import filters
from rest_framework.exceptions import ValidationError
from rest_framework.generics import (ListCreateAPIView,
                                     ListAPIView,
                                     CreateAPIView,
                                     RetrieveDestroyAPIView,
                                     RetrieveUpdateAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     RetrieveAPIView,)

from .models import (Follow,
                     Tweet,
                     UserProfile,
                     TweetLike
                     )
from .permissions import IsOwner
from .serializers import (TweetSerializer,
                          FollowSerializer,
                          UserSerializer,
                          UserProfileSerializer,
                          TweetLikeSerializer
                          )



class UserListCreateApiView(ListCreateAPIView):
    """
    ApiVIew to register new users and to search users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    filter_backends = (filters.SearchFilter,)
    search_fields = ('username', 'first_name', 'last_name')



class RetrieveLoggedInUserApiView(RetrieveAPIView):
    """
    ApiView to get current loggeed in user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user



class UserProfileRetrieveUpdateApiVIew(RetrieveUpdateAPIView):
    """
    ApiView to get or update userprofile instance
    """
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    queryset = UserProfile.objects.all()



class TweetListCreateApiView(ListCreateAPIView):
    """
    ApiView to get and crate tweets
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'user_id'

    def perform_create(self, serializer):
        # saving newly created tweet instance to DB
        serializer.save(user=self.request.user)

    def filter_queryset(self, queryset):
        # returning all queryset of tweets instances created by user_id
        return queryset.filter(user_id=self.kwargs.get('user_id'))



class TweetRetrieveUpdateDestroyApiView(RetrieveUpdateDestroyAPIView):
    """
    ApiView to get ,update and delete a tweet
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated, IsOwner)



class TweetTimelineListApiView(ListAPIView):
    """
    ApiView to get timeline tweets of logged in user
    """
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Tweet.objects.all()


    def filter_queryset(self, queryset):
        # returning queryset of tweets instances created by all users that followed by logged in user
        return queryset.filter(Q(user=self.request.user) | Q(user__following_set__follower=self.request.user))



class TweetSearchListApiView(ListAPIView):
    """
    ApiView to get and crate tweets
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    filter_backends = (filters.SearchFilter,)
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'content')



class FollowingsListCreateApiView(ListCreateAPIView):
    """
        ApiView to create follow relation
    """
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = (IsAuthenticated,)


    def perform_create(self, serializer):
        # saving serializer, exception is handled for duplicate instances
        try:
            serializer.save(follower=self.request.user)
        except:
            raise IntegrityError("you are already following this user.")

    def filter_queryset(self, queryset):
        #filtering and returning queryset, of follower_id=user_id
        return queryset.filter(follower_id=self.kwargs.get('user_id'))



class FollowersListApiView(ListAPIView):
    """
        ApiView to get followers list of any user
    """
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = (IsAuthenticated,)

    def filter_queryset(self, queryset):
        # filtering and returning queryset, of following_id=user_id
        return queryset.filter(following_id=self.kwargs.get('user_id'))



class FollowingRetrieveDestroyApiView(RetrieveDestroyAPIView):
    """
        ApiView to delete follow relation
    """
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = (IsAuthenticated,)



class TweetLikeListCreateApiView(ListCreateAPIView):
    """
        ApiView to like a tweet and get all likes of particular tweet
    """
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated,)
    
    def filter_queryset(self, queryset):
        queryset.filter(tweet_id=self.kwargs['tweet_id'])
    
    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user, tweet_id=self.kwargs['tweet_id'])
        except:
            raise ValidationError(detail="You've already liked this tweet.")



class TweetLikeRetrieveDestroyApiView(RetrieveDestroyAPIView):
    """
        ApiView to delete and get like relation between user and tweet
    """
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated, IsOwner)