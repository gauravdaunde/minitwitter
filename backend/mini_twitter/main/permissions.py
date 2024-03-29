from django.contrib.auth.models import User

from rest_framework import permissions

from .models import UserFollowRelation, Tweet



class IsOwner(permissions.BasePermission):
    """
        checking for object level permission
    """
    def has_object_permission(self,request,view,object):
        if request.method in permissions.SAFE_METHODS:
            return True

        if isinstance(object, UserFollowRelation):
            return object.follower == request.user
        elif isinstance(object, User):
            return object == request.user
        else:
            return object.user == request.user


class IsValidRequest(permissions.BasePermission):
    """
        checking valid url arguments
    """
    def has_permission(self,request,view):
        user_id = view.kwargs['user_id']
        return request.method in permissions.SAFE_METHODS or user_id == request.user.id
