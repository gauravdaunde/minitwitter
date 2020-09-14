from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework import serializers

from .models import (UserProfile,
                     Tweet,
                     Follow,
                     TweetLike
                     )


class UserSerializer(serializers.ModelSerializer):
    first_name= serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    follow = serializers.SerializerMethodField()

    #if logged in user follows current serializer user instance then follow field is true otherwise false
    def get_follow(self, user_obj):
        user = self.context['request'].user
        return user.id in user_obj.following_set.all().values_list('follower__id', flat=True)

    #overrided for password hashing
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)


    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password','follow']
        extra_kwargs = {'password': {'write_only': True}}



class UserProfileSerializer(serializers.ModelSerializer):#
    user = UserSerializer(read_only=True)
    followings = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()


    def get_followers(self, profile_obj):
        return profile_obj.user.following_set.all().count()

    def get_followings(self, profile_obj):
        return profile_obj.user.follower_set.all().count()

    class Meta:
        model = UserProfile
        fields = ['user', 'bio','profile_image','followers','followings']


class FollowSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)
    following = UserSerializer(read_only=True)
    following_id = serializers.IntegerField(required=True)

    class Meta:
        model = Follow
        fields = ['id', 'follower','following', 'following_id']


class TweetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'user', 'content', 'created_on']


class TweetLikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    tweet = TweetSerializer(read_only=True)

    class Meta:
        model = TweetLike
        fields = ['id', 'user', 'tweet']