from django.contrib import admin

# Register your models here.
from . import models
from django.utils.html import format_html


class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_image','name', 'quantity', 'category', 'price', 'created_at')
    list_display_links = ('name', 'quantity', 'category', 'price')
    search_fields = ('name',)
    list_per_page = 20
    def product_image(self, obj):
        return format_html('<img src="{}" width="auto" height="100px" />'.format(obj.image.url))

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_display_links = ('name',)
    search_fields = ('name',)
    list_per_page = 20

admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.Category, CategoryAdmin)