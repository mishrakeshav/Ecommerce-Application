from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import Profile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email',
                  'username', 'profile_image', 'address')

    def get_profile_image(self, obj):
        user_id = obj.id
        profile = Profile.objects.get(user=user_id)
        return profile.image.url

    def get_address(self, obj):
        user_id = obj.id
        profile = Profile.objects.get(user=user_id)
        return profile.address
    

class NewUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username','password')

    def create(self, validated_data):
        user = super(NewUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('image', 'address')
