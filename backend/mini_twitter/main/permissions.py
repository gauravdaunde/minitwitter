from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    message = "You don't have permission to do this."

    def has_permission(self,request,view):
        user_id = request.query_params.get('id', None)

        if request.method in permissions.SAFE_METHODS:
            return  True
        if not user_id:
            return True
        return int(user_id) == request.user.id