from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework import filters

from .models import Follow, Tweet, UserProfile
from .permissions import IsOwner
from .serializers import ( TweetSerializer,
                           FollowSerializer,
                           UserSerializer,
                           UserProfileSerializer,
                            )



class UserListCreateApiView(generics.ListCreateAPIView):
    """
    ApiVIew to register new users
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    filter_backends = (filters.SearchFilter,)
    queryset = User.objects.all()
    search_fields = ('username','first_name','last_name')



class UserProfileRetrieveUpdateApiVIew(generics.RetrieveUpdateAPIView):
    """
    ApiView to get or update userprofile instance
    """
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,IsOwner)
    queryset = UserProfile.objects.all()
    
    def get_object(self):
        # fetching id from query params
        user_id = self.request.query_params.get('id', None)

        #if user_id not none then returning profile instance of user which having id as user_id
        if user_id:
            user = get_object_or_404(User, id=user_id)
            return UserProfile.objects.get(user=user)

        #otherwise returning profile instance of current logged in user
        return UserProfile.objects.get(user=self.request.user)




class TweetListCreateApiView(generics.ListCreateAPIView):
    """
    ApiView to get and crate tweets
    """
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Tweet.objects.all()

    filter_backends = (filters.SearchFilter,)
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'content')

    def perform_create(self, serializer):
        #saving newly created tweet instance to DB
        serializer.save(user=self.request.user)


class RetrieveUserTweetsApiView(generics.ListAPIView):
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'user_id'


    def get_queryset(self):
        # fetching pk from kwargs
        user_id = self.kwargs.get('user_id')

        # returning all tweets instances created by user
        user = get_object_or_404(User,id=user_id)
        return user.tweet_set.all()



class TweetTimelineListApiView(generics.ListAPIView):
    """
    ApiView to get timeline tweets of loggedin user
    """
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Tweet.objects.all()


    def filter_queryset(self, queryset):
        # returning all tweets instances created by users that logged in user follows
        return queryset.filter(Q(user=self.request.user) |
                                    Q(user__following_set__follower=self.request.user))


class FollowApiView(generics.CreateAPIView):
    """
        ApiView to create follow relation
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
            raise ValidationError(detail="you already follows this user.")

class FollowDestroyApiView(generics.DestroyAPIView):
    """
        ApiView to delete follow relation
    """
    serializer_class = FollowSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Follow.objects.all()

