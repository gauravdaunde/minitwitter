from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.exceptions import ParseError, ValidationError

from .models import Follow, Tweet, UserProfile
from .permissions import IsOwner
from .serializers import ( TweetSerializer,
                           FollowSerializer,
                           UserSerializer,
                           UserProfileSerializer,
                            )



class UserCreateApiView(generics.CreateAPIView):
    """
    ApiVIew to register new users
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)



class UserProfileRetrieveUpdateApiVIew(generics.RetrieveUpdateAPIView):
    """
    ApiView to get or update userprofile instance
    """
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,IsOwner)
    queryset = UserProfile.objects.all()




class TweetListCreateApiView(generics.ListCreateAPIView):
    """
    ApiView to get and crate tweets
    """
    serializer_class = TweetSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        #saving newly created tweet instance to DB
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # fetching pk from kwargs
        pk = self.kwargs.get('pk')

        # returning all tweets instances created by user of this pk
        return get_object_or_404(User,pk=pk).tweet_set.all()


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



class UserSearchApiView(generics.ListAPIView):
    """
    ApiView to search users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def filter_queryset(self, queryset):
        # fetching query field from query_params
        search_query = self.request.query_params.get('query', None)

        #validating for not None and empty
        if not search_query:
            raise ParseError('query not be empty or null.')

        #returning those user instances in queryset which contains search_query string in username or first_name or last_name fields
        return queryset.filter(Q(username__contains=search_query) |
                                    Q(first_name__contains=search_query) |
                                    Q(last_name__contains=search_query))


class TweetFullTextSearchApiView(generics.ListAPIView):
    """
    tweet full text search ApiView
    """
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def filter_queryset(self,queryset):
        # fetching query field from query_params
        search_query = self.request.query_params.get('query', None)

        # validating for not None and empty
        if not search_query:
            raise ParseError('query not be null or empty.')

        # returning those tweet instance queryset which contains search_query string in content or
        # user.username or user.first_name or user.last_name fields
        return queryset.filter(Q(user__username__contains=search_query) |
                                    Q(user__first_name__contains=search_query) |
                                    Q(user__last_name__contains=search_query) |
                                    Q(content__contains=search_query))