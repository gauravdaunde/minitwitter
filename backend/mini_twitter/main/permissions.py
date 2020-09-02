from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    message = "You don't have permission to do this."

    def has_object_permission(self,request,view,object):
        return self.id ==request.user.id