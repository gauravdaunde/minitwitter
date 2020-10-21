from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework import serializers

from .models import (UserProfile,
                     Tweet,
                     UserFollowRelation,
                     TweetLike
                     )




class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['bio','profile_image']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    follow = serializers.SerializerMethodField()
    followings = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()


    def get_followers(self, user_obj):
        return user_obj.followers.all().count()

    def get_followings(self, user_obj):
        return user_obj.followings.all().count()

    #if logged in user follows current serializer user instance then follow field is true otherwise false
    def get_follow(self, user_obj):
        user = self.context['request'].user
        return user.id in user_obj.followers.all().values_list('follower__id', flat=True)

    #overrided for password hashing
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

    #overrided to update this and nested profile instance
    def update(self, instance, validated_data):
        user_profile_data = validated_data.pop('profile')
        user_profile_serializer = self.fields['profile']
        user_profile_instance = instance.profile
        user_profile_serializer.update(user_profile_instance, user_profile_data)

        #calling update() of super class to update fields of user instance
        return super(UserSerializer, self).update(instance, validated_data)


    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password','follow', 'profile', 'followers','followings']
        extra_kwargs = {'password': {'write_only': True},
                        'first_name': {'required': True}, 'last_name': {'required': True}}



class UserFollowRelationSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)
    following = UserSerializer(read_only=True)
    following_id = serializers.IntegerField(required=True)

    class Meta:
        model = UserFollowRelation
        fields = ['id', 'follower','following', 'following_id']


class TweetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'created_on', 'user']


class TweetLikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    tweet = TweetSerializer(read_only=True)

    class Meta:
        model = TweetLike
        fields = ['id', 'user', 'tweet']