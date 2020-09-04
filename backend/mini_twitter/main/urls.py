from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from .views import (FollowApiView,
                    FollowDestroyApiView,
                    RetrieveUserTweetsApiView,
                    TweetListCreateApiView,
                    TweetTimelineListApiView,
                    UserListCreateApiView,
                    UserProfileRetrieveUpdateApiVIew,
                    )


urlpatterns = [
    path('users/', UserListCreateApiView.as_view(), name='register'),
    path('user/login/', obtain_auth_token, name='login'),
    path('user/profile/', UserProfileRetrieveUpdateApiVIew.as_view(), name='user_profile'),

    path('tweets/', TweetListCreateApiView.as_view(), name='tweets'),
    path('user/<int:user_id>/tweets/', RetrieveUserTweetsApiView.as_view(), name='user-tweets'),
    path('tweets/timeline/', TweetTimelineListApiView.as_view(), name='tweets_timeline'),
    
    path('user/<int:user_id>/follow/<int:pk>', FollowApiView.as_view(), name='follow'),
    path('user/<int:user_id>/unfollow/<int:pk>', FollowDestroyApiView.as_view(), name='follow'),
]

