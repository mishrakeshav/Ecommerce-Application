from django.contrib import admin

# Register your models here.
from . import models


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'category', 'price', 'created_at')
    list_display_links = ('name', 'quantity', 'category', 'price')
    search_fields = ('name',)
    list_per_page = 20

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_display_links = ('name',)
    search_fields = ('name',)
    list_per_page = 20

admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.Category, CategoryAdmin)