from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework import filters
import django_filters.rest_framework

from .models import (Category, Product, Order)
from .serializers import (
    ProductSerializer, 
    ProductDetailSerializer, 
    OrderSerializer,
    CategorySerializer
)


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = {
        'name' : ['contains'],
        'price' : ['exact', 'gte', 'lte'],
        'category' : ['exact'],
        'model_number' : ['contains'],
        'other' : ['contains']
    }
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend, 
        filters.SearchFilter, filters.OrderingFilter
    ]
    search_fields = ['$name', '$category',
                     '$model_number', '$other']
    ordering_fields = ['price', ]




class OrderDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        orders = Order.objects.filter(user=user_id)
        return orders

    def post(self, request, *args, **kwargs):
        # TODO: Implement CART feature
        return super().post(request, *args, **kwargs)

class CategoryList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


def home(request):
    context = {}
    return render(request, 'ecomm/home.html', context)
