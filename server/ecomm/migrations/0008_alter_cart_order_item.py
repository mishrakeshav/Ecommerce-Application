# Generated by Django 3.2.8 on 2021-10-20 18:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0007_alter_cart_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='order_item',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ecomm.orderitem'),
        ),
    ]
