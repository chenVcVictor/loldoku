# Generated by Django 5.0.1 on 2024-03-28 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loldoku', '0003_championinfo_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='championinfo',
            name='id',
        ),
        migrations.AlterField(
            model_name='championinfo',
            name='name',
            field=models.CharField(max_length=100, primary_key=True, serialize=False, unique=True),
        ),
    ]
