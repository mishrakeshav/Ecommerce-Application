from django.shortcuts import render
from rest_framework import generics
import django_filters.rest_framework
from rest_framework import filters
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import permissions
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


from users.models import Profile


from .serializers import UserSerializer, ProfileSerializer


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.user == request.user


class ProfileDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.request.user.id
        user = get_object_or_404(User, pk=user_id)
        return user


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
