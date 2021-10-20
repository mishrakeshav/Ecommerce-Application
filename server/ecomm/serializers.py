from django.db.models import fields
from rest_framework import serializers
from .models import Order, OrderItem, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'price',
            'quantity',
            'category',
            'company_name',
            'model_number',
            'image',
        )


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'price',
            'quantity',
            'category',
            'company_name',
            'model_number',
            'barcode_number',
            'image',
            'image1',
            'image2',
            'image3',
            'image4',
            'image5',
        )


class OrderSerializer(serializers.ModelSerializer):
    item_list = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'status',
            'completed',
            'shipping_address',
            'item_list',
        )

    def get_item_list(self, obj):
        order_id = obj.id
        order_items = OrderItem.objects.filter(order=order_id).all()
        return order_items.values()