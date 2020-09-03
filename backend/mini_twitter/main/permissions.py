from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    message = "You don't have permission to do this."

    def has_object_permission(self,request,view,object):

        if request.method in permissions.SAFE_METHODS:
            return  True
        return object.user == request.user