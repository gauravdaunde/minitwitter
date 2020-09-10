from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from .views import (FollowingsListCreateApiView,
                    FollowersListApiView,
                    FollowingRetrieveDestroyApiView,
                    TweetListCreateApiView,
                    TweetTimelineListApiView,
                    TweetSearchListApiView,
                    UserListCreateApiView,
                    UserProfileRetrieveUpdateApiVIew,
                    RetrieveLoggedInUserApiView,
                    TweetRetrieveUpdateDestroyApiView
                    )


urlpatterns = [
    path('users/', UserListCreateApiView.as_view(), name='user_registration_list'),
    path('user/login/', obtain_auth_token, name='login'),
    path('user/logged-in/', RetrieveLoggedInUserApiView.as_view(), name='logged_in_user'),
    path('users/<int:pk>/profile/', UserProfileRetrieveUpdateApiVIew.as_view(), name='user_profile'),

    path('users/<int:user_id>/tweets/', TweetListCreateApiView.as_view(), name='tweets'),
    path('users/<int:user_id>/tweets/<int:pk>', TweetRetrieveUpdateDestroyApiView.as_view(), name='tweet_get_update_delete'),
    path('tweets/timeline/', TweetTimelineListApiView.as_view(), name='tweets_timeline'),
    path('tweets/', TweetSearchListApiView.as_view(), name='tweet_search'),

    path('users/<int:user_id>/followings/', FollowingsListCreateApiView.as_view(), name='followings'),
    path('users/<int:user_id>/followers/', FollowersListApiView.as_view(), name='followings'),
    path('users/<int:user_id>/followings/<int:pk>', FollowingRetrieveDestroyApiView.as_view(), name='unfollow'),
]

