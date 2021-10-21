from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response

from .serializers import UserSerializer, NewUserSerializer
from .models import Profile


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.request.user.id
        user = get_object_or_404(User, pk=user_id)
        return user


class UserCreate(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = NewUserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileUpdate(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.request.user.id
        profile = Profile.objects.get(user=user_id)
        return profile
