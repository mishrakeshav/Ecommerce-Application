from django.db import models
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, permissions, filters, status
from rest_framework import response
from rest_framework.response import Response
import django_filters.rest_framework

from .models import (Category, Product, Order, OrderItem, Cart, Wishlist)
from .serializers import (
    ProductSerializer,
    ProductDetailSerializer,
    OrderSerializer,
    OrderItemSerializer,
    OrderItemCreateSerializer,
    CategorySerializer,
    WishlistSerializer,
    WishlistCreateSerializer,
)


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = {
        'name': ['contains'],
        'price': ['exact', 'gte', 'lte'],
        'category': ['exact'],
        'model_number': ['contains'],
        'other': ['contains']
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
        data = request.data
        order = Order.objects.create(
            user=request.user,
            shipping_address=data.get('shipping_address'),
            city=data.get('city'),
            state=data.get('state'),
            pincode=data.get('pincode'),
        )

        orderitem_list = data.get('order_item')
        for id in orderitem_list:
            orderitem = get_object_or_404(OrderItem, pk=id)

            cart_item = Cart.objects.filter(order_item=orderitem)
            cart_item.delete()

            orderitem.order = order
            orderitem.save()

        return Response(
            data=OrderSerializer(order).data
        )


class OrderItemList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        user = self.request.user
        order_item = list(map(
            lambda cart: cart.order_item,
            Cart.objects.filter(user=user).all()
        ))
        return order_item


class OrderItemCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemCreateSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        product = get_object_or_404(Product, pk=data.get('product'))

        product.quantity = product.quantity - 1
        product.save()

        order_item = OrderItem.objects.create(
            product=product,
            quantity=int(data.get('quantity')),
            price=product.price,
        )

        Cart.objects.create(user=request.user, order_item=order_item)

        return Response(
            data=OrderItemCreateSerializer(order_item).data
        )


class OrderItemDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        product = get_object_or_404(Product, pk=instance.product.id)
        product.quantity += instance.quantity
        product.save()

        cart = Cart.objects.filter(order_item=instance).first()
        cart.delete()

        return super().delete(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        product = get_object_or_404(Product, pk=instance.product.id)

        data = self.request.data
        product.quantity += instance.quantity

        if data.get('quantity') > product.quantity:
            return Response(data="Quantity Exceeded", status=status.HTTP_400_BAD_REQUEST)

        product.quantity -= data['quantity']
        product.save()

        self.request.data['price'] = product.price

        return super().put(request, *args, **kwargs)


class WishlistCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Wishlist.objects.all()
    serializer_class = WishlistCreateSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        product = get_object_or_404(Product, pk=data.get('product'))

        wishlist = Wishlist.objects.create(
            user=request.user,
            product=product,
        )

        return Response(
            data=WishlistSerializer(wishlist).data
        )


class WishlistList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def get_queryset(self):
        user = self.request.user
        wishlist = Wishlist.objects.filter(user=user).all()
        return wishlist


class WishlistDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer


class CategoryList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


def home(request):
    context = {}
    return render(request, 'ecomm/home.html', context)
