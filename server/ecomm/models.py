from django.db import models
from django.contrib.auth.models import User



class Category(models.Model):
    name = models.CharField(max_length=200,null=True)


class Product(models.Model):
    name = models.CharField(max_length=200,null=True)
    price = models.FloatField()
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    # general parameters
    category = models.ForeignKey(Category,on_delete =models.SET_NULL,blank=True,null=True)
    company_name = models.CharField(max_length=200,null=True)
    model_number = models.CharField(max_length=200,null=True)

    #unique parameters
    barcode_number = models.CharField(max_length=200, null=True, blank=True)

    image = models.FileField(upload_to='products/', default='products/default.png')
    image1 = models.FileField(upload_to='products/', default='products/default.png')
    image2 = models.FileField(upload_to='products/', default='products/default.png')
    image3 = models.FileField(upload_to='products/', default='products/default.png')
    image4 = models.FileField(upload_to='products/', default='products/default.png')
    image5 = models.FileField(upload_to='products/', default='products/default.png')


class Order(models.Model):
    user = models.ForeignKey(User,on_delete =models.SET_NULL,blank=True,null=True)
    status = models.CharField(max_length=200,null=True)
    completed = models.BooleanField(default=False)
    shipping_address = models.CharField(max_length=1000, null=True, blank=True)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete =models.SET_NULL,blank=True,null=True)
    quantity = models.IntegerField()
    price = models.FloatField()
    order = models.ForeignKey(Order,on_delete =models.SET_NULL,blank=True,null=True)

