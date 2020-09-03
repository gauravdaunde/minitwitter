from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework import serializers


from .models import (UserProfile,
                     Tweet,
                     Follow)


class UserSerializer(serializers.ModelSerializer):
    first_name= serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    follow = serializers.SerializerMethodField()

    #if logged in user follows current serializer user instance then follow field is true otherwise false
    def get_follow(self, user_obj):
        user = self.context['request'].user
        return (user.id,) in user_obj.following_set.all().values_list('follower__id')

    #override for password hashing
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)


    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password','follow']
        extra_kwargs = {'password': {'write_only': True}}



class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()


    def get_followers(self, profile_obj):
        return profile_obj.user.following_set.all().values('id','follower__id', 'follower__first_name',
                                                                    'follower__last_name', 'follower__username')

    def get_following(self, profile_obj):
        return profile_obj.user.follower_set.all().values('id', 'following__id', 'following__first_name',
                                                                  'following__last_name', 'following__username')


    class Meta:
        model = UserProfile
        fields = ['user', 'bio','profile_image','followers','following']


class FollowSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)
    following = UserSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = ['follower','following']



class TweetSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(source='user.id', required=False)
    username = serializers.CharField(source='user.username', required=False)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = Tweet
        fields = ['user_id','first_name','last_name','username', 'content', 'created_on']


