# Generated by Django 3.1 on 2020-09-01 17:25

from django.conf import settings
from django.db import migrations, models
import main.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tweet',
            options={'ordering': ['-created_on']},
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='profile_image',
            field=models.ImageField(null=True, upload_to=main.models.image_path_rename),
        ),
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('follower', 'following')},
        ),
    ]
