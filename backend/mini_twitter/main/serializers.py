from django.contrib.auth.models import User

from rest_framework import serializers


from .models import (UserProfile,
                     Tweet,
                     Follow)



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password']



class UserProfileSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    full_name = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    def get_full_name(self, profile_obj):
        return (profile_obj.user.first_name + ' ' + profile_obj.user.last_name)

    def get_username(self, profile_obj):
        return profile_obj.user.username

    def get_followers(self, profile_obj):
        return profile_obj.user.follower_set.all().values('following__id', 'following__first_name',
                                                                  'following__last_name', 'following__username')

    def get_following(self, profile_obj):
        return profile_obj.user.following_set.all().values('follower__id', 'follower__first_name',
                                                                    'follower__last_name', 'follower__username')

    class Meta:
        model = UserProfile
        fields = ['id','username','full_name', 'bio','profile_image','followers','following']


class FollowSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)
    following = UserSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = ['follower','following']



class TweetSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    def get_full_name(self,tweet_obj):
        return (tweet_obj.user.first_name + ' ' + tweet_obj.user.last_name)

    def get_username(self, tweet_obj):
        return tweet_obj.user.username


    class Meta:
        model = Tweet
        fields = ['id','full_name','username', 'content', 'created_on']


