# Generated by Django 3.1.1 on 2020-10-10 22:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='paymentmethod',
            options={'verbose_name': 'payment Method'},
        ),
        migrations.AlterModelTable(
            name='paymentmethod',
            table='payment_methods',
        ),
    ]