# Generated by Django 3.1.1 on 2020-10-11 03:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0007_auto_20201010_1727'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='category_id',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='kilate_id',
            new_name='kilate',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='unit_measurement_id',
            new_name='unit_measurement',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='vendor_id',
            new_name='vendor',
        ),
    ]