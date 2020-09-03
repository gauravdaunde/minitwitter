from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from .views import (FollowApiView,
                    FollowDestroyApiView,
                    TweetFullTextSearchApiView,
                    TweetListCreateApiView,
                    TweetTimelineListApiView,
                    UserCreateApiView,
                    UserProfileRetrieveUpdateApiVIew,
                    UserSearchApiView,
                    )


urlpatterns = [
    path('user/register/', UserCreateApiView.as_view(), name='register'),
    path('user/login/', obtain_auth_token, name='login'),
    path('user/<int:pk>/profile/', UserProfileRetrieveUpdateApiVIew.as_view(), name='user_profile'),
    # path('user/update/', UserProfileRetrieveUpdateApiVIew.as_view(), name='user_profile_update'),

    # path('tweet/create/', TweetListCreateApiView.as_view(), name='tweet_create'),
    path('tweets/<int:pk>', TweetListCreateApiView.as_view(), name='tweets'),
    path('tweets/timeline/', TweetTimelineListApiView.as_view(), name='tweeets_timeline'),
    
    path('user/<int:user_id>/follow/<int:pk>', FollowApiView.as_view(), name='follow'),
    path('user/<int:user_id>/unfollow/<int:pk>', FollowDestroyApiView.as_view(), name='follow'),

    path('users/search/', UserSearchApiView.as_view(), name='search'),
    path('tweets/search/', TweetFullTextSearchApiView.as_view(), name='tweets_full_search')
]

