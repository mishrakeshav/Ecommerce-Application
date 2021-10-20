from django.urls import path
from .views import UserDetail, UserList, UserCreate, ProfileUpdate

app_name = 'user'

urlpatterns = [
    path('list/', UserList.as_view(), name='user_list'),
    path('create/', UserCreate.as_view(), name='user_create'),
    path('', UserDetail.as_view(), name='user_detail'),

    path('profile/', ProfileUpdate.as_view(), name='profile_update'),

]
