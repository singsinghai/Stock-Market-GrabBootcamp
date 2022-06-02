# Generated by Django 4.0.4 on 2022-05-19 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock_api', '0006_alter_stockprice_total_value'),
    ]

    operations = [
        migrations.CreateModel(
            name='MarketPrice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('market_symbol', models.CharField(max_length=10)),
                ('trading_date', models.DateTimeField()),
                ('price_close', models.FloatField()),
            ],
        ),
        migrations.DeleteModel(
            name='MarketIndex',
        ),
    ]