from django.shortcuts import render
from rest_framework import generics, permissions

from .models import (Product, Order)
from .serializers import (
    ProductSerializer, ProductDetailSerializer, OrderSerializer)


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


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


def home(request):
    context = {}
    return render(request, 'ecomm/home.html', context)
