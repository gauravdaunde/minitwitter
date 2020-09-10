from django.contrib.auth.models import User
from django.db.models import Q

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
                     )
from .permissions import IsOwner
from .serializers import (TweetSerializer,
                          FollowSerializer,
                          UserSerializer,
                          UserProfileSerializer,
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
        # fetching following_id from request.data
        following_id = self.request.data.get('following_id', None)

        # saving serializer, exception is handled for duplicate instances
        try:
            serializer.save(follower=self.request.user, following_id=following_id)
        except:
            raise ValidationError(detail="you already follows this user.")

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