from django.shortcuts import get_object_or_404, render
from rest_framework import generics, permissions
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import (Cart, Product, Order, OrderItem)
from .serializers import (
    ProductSerializer, ProductDetailSerializer, OrderSerializer, OrderItemSerializer)


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
        data = request.data
        order = Order.objects.create(
            user=request.user,
            shipping_address=data.get('shipping_address'),
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


class OrderItemCreate(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def post(self, request, *args, **kwargs):
        data = request.data

        order_item = OrderItem.objects.create(
            product=get_object_or_404(Product, pk=data.get('product')),
            quantity=int(data.get('quantity')),
            price=int(data.get('price')),
        )

        Cart.objects.create(user=request.user, order_item=order_item)

        return Response(
            data=OrderItemSerializer(order_item).data
        )


def home(request):
    context = {}
    return render(request, 'ecomm/home.html', context)
