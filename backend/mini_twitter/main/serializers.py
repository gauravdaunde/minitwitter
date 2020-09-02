from django.contrib.auth.models import User

from rest_framework import serializers


from .models import (UserProfile,
                     Tweet,
                     Follow)



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password']
        depth = 1


class FollowSerializer(serializers.ModelSerializer):
    follower_full_name = serializers.SerializerMethodField()
    follower_username = serializers.SerializerMethodField()
    following_full_name = serializers.SerializerMethodField()
    following_username = serializers.SerializerMethodField()

    def get_follower_id(self, follow_obj):
        return follow_obj.follower.id

    def get_follower_full_name(self, follow_obj):
        return (follow_obj.follower.first_name + ' ' + follow_obj.follower.last_name)

    def get_follower_username(self, follow_obj):
        return follow_obj.follower.username

    def get_following_id(self, follow_obj):
        return follow_obj.following.id

    def get_following_full_name(self, follow_obj):
        return (follow_obj.following.first_name + ' ' + follow_obj.following.last_name)

    def get_following_username(self, follow_obj):
        return follow_obj.following.username

    class Meta:
        model = Follow
        fields = ['follower_id','follower_full_name', 'follower_username', 'following_id', 'following_full_name', 'following_username']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    def get_following(self, profile_obj):
        return FollowSerializer(profile_obj.user.following_set.all(), many=True).data

    def get_followers(self, profile_obj):
        return FollowSerializer(profile_obj.user.follower_set.all(), many=True).data

    class Meta:
        model = UserProfile
        fields = ['user', 'bio','profile_image','followers','following']


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


