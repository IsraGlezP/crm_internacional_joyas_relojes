# Generated by Django 3.1.1 on 2020-10-10 20:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Kilate',
            fields=[
                ('kilate_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='UnitMeasurement',
            fields=[
                ('unit_measurement_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('vendor_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=15)),
                ('direction', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventarios.category')),
                ('kilate_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventarios.kilate')),
                ('unit_measurement_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventarios.unitmeasurement')),
                ('vendor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventarios.vendor')),
            ],
        ),
    ]