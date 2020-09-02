from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from .views import (UserApiView,
                    UserProfileUpdateApiVIew,
                    UserProfileApiVIew,
                    TweetCreateApiView,
                    TweetTimelineListApiView,
                    TweetListApiView,
                    FollowApiView)


urlpatterns = [
    path('user/register/', UserApiView.as_view(), name='register'),
    path('user/login/', obtain_auth_token, name='login'),
    path('user/profile/', UserProfileApiVIew.as_view(), name='user_profile'),
    path('user/update/', UserProfileUpdateApiVIew.as_view(), name='user_profile_update'),

    path('tweet/create/', TweetCreateApiView.as_view(), name='tweet_create'),
    path('tweets/', TweetListApiView.as_view(), name='tweets'),
    path('tweets/timeline/', TweetTimelineListApiView.as_view(), name='tweeets_timeline'),
    
    path('user/<int:pk>/follow/', FollowApiView.as_view(), name='follow'),
]
