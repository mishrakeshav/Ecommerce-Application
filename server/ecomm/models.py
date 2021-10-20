from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import create_many_to_many_intermediary_model


class Category(models.Model):
    name = models.CharField(max_length=200, null=True)


class Product(models.Model):
    name = models.CharField(max_length=200, null=True)
    price = models.FloatField()
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    other = models.TextField(blank=True, null=True, max_length=1000)

    # general parameters
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, blank=True, null=True)
    company_name = models.CharField(max_length=200, null=True)
    model_number = models.CharField(max_length=200, null=True)

    # unique parameters
    barcode_number = models.CharField(max_length=200, null=True, blank=True)

    image = models.FileField(upload_to='products/',
                             default='products/default.png')
    image1 = models.FileField(upload_to='products/',
                              default='products/default.png')
    image2 = models.FileField(upload_to='products/',
                              default='products/default.png')
    image3 = models.FileField(upload_to='products/',
                              default='products/default.png')
    image4 = models.FileField(upload_to='products/',
                              default='products/default.png')
    image5 = models.FileField(upload_to='products/',
                              default='products/default.png')


class Order(models.Model):
    status_choices = (
        ('PL', 'PLACED'),
        ('PK', 'PACKED'),
        ('SH', 'SHIPPED'),
        ('DL', 'DELIVERED'),
        ('CA', 'CART'),
    )
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True)
    status = models.CharField(
        max_length=200, null=True, choices=status_choices, default='CA')
    completed = models.BooleanField(default=False)
    shipping_address = models.CharField(max_length=1000, null=True, blank=True)


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField()
    price = models.FloatField()
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, blank=True, null=True)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    order_item = models.OneToOneField(OrderItem, on_delete=models.DO_NOTHING)

