from django.db.models import fields
from rest_framework import serializers
from .models import Order, OrderItem, Product, Category, Wishlist
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict


class ProductSerializer(serializers.ModelSerializer):

    category = serializers.SerializerMethodField()

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
            'other'
        )

    def get_category(self, obj):
        if obj.category:
            return obj.category.name
        return ''


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
            'other'
        )


class OrderSerializer(serializers.ModelSerializer):
    item_list = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'status',
            'completed',
            'shipping_address',
            'item_list',
            'total_price',
            'total_items'
        )

    def get_item_list(self, obj):
        order_id = obj.id
        order_items = OrderItem.objects.filter(order=order_id).all()
        order_items = order_items.values()

        for item in order_items:
            product = get_object_or_404(Product, pk=item['product_id'])

            product = serialize_product(product)

            item['product'] = product
            del item['product_id']

        return order_items

    def get_total_price(self, obj):
        order_id = obj.id
        order_items = OrderItem.objects.filter(order=order_id).all()
        return sum(item.price * item.quantity for item in order_items)

    def get_total_items(self, obj):
        order_id = obj.id
        order_items = OrderItem.objects.filter(order=order_id).all()
        return sum(item.quantity for item in order_items)


class OrderItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            'product',
            'quantity',

        )


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'product',
            'quantity',
            'price',
            'id'
        )

    def get_product(self, obj):
        product = get_object_or_404(Product, pk=obj.product.id)
        product = serialize_product(product)
        return product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
        )


class WishlistCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = (
            'product',
        )


class WishlistSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = Wishlist
        fields = (
            'user',
            'product',
            'id',
        )

    def get_product(self, obj):
        product = get_object_or_404(Product, pk=obj.product.id)
        product = serialize_product(product)
        return product


def serialize_product(product: Product) -> dict:
    product = model_to_dict(
        product,
        fields=[field.name for field in product._meta.fields])

    for field in product.keys():
        if 'image' in field:
            product[field] = product[field].url

    return product
