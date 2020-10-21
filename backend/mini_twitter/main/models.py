from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex



class UserProfile(models.Model):
    """
    UserProfile model to store user's profile info
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', primary_key=True)
    profile_image = models.ImageField(upload_to='profile-images', null=True)
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
        indexes = [GinIndex(fields=['content']),]


class UserFollowRelation(models.Model):
    """
    Follow model for user to have follow relation
    """
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followings')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')

    class Meta:
        unique_together = (('follower', 'following'))


class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name='likes')
    
    class Meta:
        unique_together = (('user', 'tweet'),)


@receiver(models.signals.post_save, sender=User)
def user_created(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)