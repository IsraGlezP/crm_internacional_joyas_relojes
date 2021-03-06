# Generated by Django 3.1.2 on 2020-10-21 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0002_auto_20201018_2021'),
    ]

    operations = [
        migrations.AddField(
            model_name='barcode',
            name='barcode_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='barcode',
            name='barcode',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='barcode',
            field=models.ForeignKey(on_delete=models.deletion.CASCADE, to='inventarios.barcode'),
        )
    ]
