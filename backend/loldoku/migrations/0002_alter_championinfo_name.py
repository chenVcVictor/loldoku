# Generated by Django 5.0.1 on 2024-03-27 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loldoku', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='championinfo',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]