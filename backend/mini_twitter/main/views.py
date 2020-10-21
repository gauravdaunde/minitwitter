from django.contrib.auth.models import User
from django.contrib.postgres.search import SearchVector
from django.db.models import Q

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.generics import (ListCreateAPIView,
                                     ListAPIView,
                                     RetrieveDestroyAPIView,
                                     RetrieveUpdateAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     RetrieveAPIView,)


from .permissions import IsOwner, IsValidRequest
from .pagination import PageNumberPagination
from .serializers import (TweetSerializer,
                          UserFollowRelationSerializer,
                          UserSerializer,
                          TweetLikeSerializer
                          )
from .models import (UserFollowRelation,
                     Tweet,
                     TweetLike
                     )



class UserListCreateApiView(ListCreateAPIView):
    """
    ApiVIew to register new users and to search users
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    pagination_class = PageNumberPagination

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        return User.objects.annotate(search_data=SearchVector('username', 'first_name',
                                                               'last_name')).filter(search_data=search_query)



class RetrieveLoggedInUserApiView(RetrieveAPIView):
    """
    ApiView to retrieve current loggeed in users info
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user



class UserRetrieveUpdateApiVIew(RetrieveUpdateAPIView):
    """
    ApiView to retrieve or update userprofile instance
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    queryset = User.objects.all()



class TweetListCreateApiView(ListCreateAPIView):
    """
    ApiView to get and create tweets
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated, IsValidRequest)


    def perform_create(self, serializer):
        # saving newly created tweet instance to DB
        serializer.save(user=self.request.user)

    def filter_queryset(self, queryset):
        list_query = self.request.query_params.get('list', None)
        user_id = self.kwargs.get('user_id')

        if list_query == 'timeline':
            # returning queryset of tweets instances created by all users that followed by logged in user
            return queryset.filter(Q(user__followers__follower=user_id) | Q(user_id=user_id))
        else:
            # returning all queryset of tweets instances created by user_id
            return queryset.filter(user_id=user_id)



class TweetRetrieveUpdateDestroyApiView(RetrieveUpdateDestroyAPIView):
    """
    ApiView to get ,update and delete a tweet
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsValidRequest )


class TweetSearchListApiView(ListAPIView):
    """
    ApiView to search tweets with content and user data
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        return Tweet.objects.annotate(search_data=SearchVector('content', 'user__username', 'user__first_name',
                                                          'user__last_name')).filter(search_data=search_query)



class FollowingsListCreateApiView(ListCreateAPIView):
    """
        ApiView to create and list follow relation
    """
    queryset = UserFollowRelation.objects.all()
    serializer_class = UserFollowRelationSerializer
    permission_classes = (IsAuthenticated,IsValidRequest)


    def perform_create(self, serializer):
        following_id = int(self.request.data['following_id'])

        if following_id == self.request.user.id:
            raise ValidationError("you can't follow yourself.")

        # saving serializer, exception is handled for duplicate instances
        try:
            serializer.save(follower=self.request.user)
        except:
            raise ValidationError("you are already following this user.")

    def filter_queryset(self, queryset):
        list_query = self.request.query_params.get('list', None)

        if list_query == 'followers':
            #filtering and returning queryset, of follower_id=user_id
            return queryset.filter(following_id=self.kwargs.get('user_id'))
        else:
            # filtering and returning queryset, of following_id=user_id
            return queryset.filter(follower_id=self.kwargs.get('user_id'))



class FollowingRetrieveDestroyApiView(RetrieveDestroyAPIView):
    """
        ApiView to retrieve and delete follow relation
    """
    queryset = UserFollowRelation.objects.all()
    serializer_class = UserFollowRelationSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsValidRequest)



class TweetLikeListCreateApiView(ListCreateAPIView):
    """
        ApiView to like a tweet and get all likes of particular tweet
    """
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated,)
    
    def filter_queryset(self, queryset):
        return queryset.filter(tweet_id=self.kwargs['tweet_id'])
    
    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user, tweet_id=self.kwargs['tweet_id'])
        except:
            raise ValidationError(detail="You've already liked this tweet.")



class TweetLikeRetrieveDestroyApiView(RetrieveDestroyAPIView):
    """
        ApiView to delete and get like relation
    """
    queryset = TweetLike.objects.all()
    serializer_class = TweetLikeSerializer
    permission_classes = (IsAuthenticated, IsOwner)