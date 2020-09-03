import os

from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver




#function to rename and return path path to store profile image
def image_path_rename(profile_obj, image_filename):
    upload_to = 'profile_images'
    image_extension = image_filename.split('.')[-1]

    #renaming image with user's username.extension
    image_name = '{}.{}'.format(profile_obj.user.username, image_extension)
    return os.path.join(upload_to, image_name)



@receiver(models.signals.post_save, sender=User)
def user_created(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


class UserProfile(models.Model):
    """
    UserProfile model to store user's profile info
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to=image_path_rename,null=True)
    bio = models.CharField(max_length=255)




class Tweet(models.Model):
    """
    Tweet model to store tweets
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_on']


class Follow(models.Model):
    """
    Follow model for user to have follow relation
    """
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower_set')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following_set')

    class Meta:
        unique_together = (('follower','following'))


