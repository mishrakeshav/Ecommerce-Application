from django.urls import path
from . import views

app_name = 'ecomm'


urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.ProductList.as_view(), name='product_list'),
    path('products/<int:pk>/', views.ProductDetail.as_view(), name='product_detail'),

    path('orders/', views.OrderList.as_view(), name='order_list'),
    path('orders/<int:pk>/', views.OrderDetail.as_view(), name='order_detail'),

    path('orderitem/', views.OrderItemCreate.as_view(), name='orderitem_create'),

    path('categories/', views.CategoryList.as_view(), name='category_detail'),
]
