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

    # filterset_fields = {
    #     'fees': ['exact', 'gte', 'lte'],
    #     'rank': ['exact', 'gte', 'lte'],
    #     'percentile': ['exact', 'gte', 'lte'],
    #     'avg_percentile': ['exact', 'gte', 'lte'],
    #     'rating': ['exact', 'gte', 'lte'],
    #     'institute_name': ['contains'],
    #     'state': ['contains'],
    #     'city': ['contains'],
    #     'branch': ['contains'],
    # }

    # filter_backends = [
    #     django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # search_fields = ['$institute_name', '$state',
    #                  '$city', '$branch', '$facilities']
    # ordering_fields = ['fees', 'rank',
    #                    'percentile', 'avg_percentile', 'rating','w0','w1','w10', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9']


class OrderDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        orders = Order.objects.filter(user=user_id)
        return orders


def home(request):
    context = {}
    return render(request, 'ecomm/home.html', context)
