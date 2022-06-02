# Generated by Django 4.0.4 on 2022-06-02 19:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BusinessValuation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('quarter', models.IntegerField()),
                ('book_value', models.FloatField()),
                ('earnings_per_share', models.FloatField()),
                ('enterprise_value', models.FloatField()),
                ('ev_over_ebit', models.FloatField()),
                ('ev_over_ebitda', models.FloatField()),
                ('ev_sales', models.FloatField()),
                ('price_to_book', models.FloatField()),
                ('price_earnings', models.FloatField()),
                ('price_to_sales', models.FloatField()),
                ('market_cap', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('symbol', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('industry_name', models.CharField(max_length=2048, null=True)),
                ('floor_code', models.CharField(max_length=50)),
                ('company_name', models.CharField(max_length=2048)),
                ('shares_outstanding', models.BigIntegerField()),
                ('dividend_payout_ratio', models.BigIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FinancialRatio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('quarter', models.IntegerField()),
                ('return_on_equity', models.FloatField()),
                ('return_on_assets', models.FloatField()),
                ('return_on_invested_capitals', models.FloatField()),
                ('current_ratio', models.FloatField()),
                ('gross_margin', models.FloatField()),
                ('profit_margin', models.FloatField()),
                ('pretax_profit_margin', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='FinancialStatement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('quarter', models.IntegerField()),
                ('total_assets', models.BigIntegerField(null=True)),
                ('tangible_assets', models.BigIntegerField(null=True)),
                ('intangible_assets', models.BigIntegerField(null=True)),
                ('net_revenue', models.BigIntegerField(null=True)),
                ('profit_before_taxes', models.BigIntegerField(null=True)),
                ('profit_after_taxes', models.BigIntegerField(null=True)),
                ('inventory', models.BigIntegerField(null=True)),
                ('liabilities', models.BigIntegerField(null=True)),
                ('cash_and_cash_equivalents', models.BigIntegerField(null=True)),
                ('shortterm_liabilities', models.BigIntegerField(null=True)),
                ('longterm_liabilities', models.BigIntegerField(null=True)),
                ('cost_price', models.BigIntegerField(null=True)),
                ('equity', models.BigIntegerField(null=True)),
                ('fixed_assets_depreciation', models.BigIntegerField(null=True)),
                ('lending_cost', models.BigIntegerField(null=True)),
                ('shortterm_borrowings_financial_leases', models.BigIntegerField(null=True)),
                ('longterm_borrowings_financial_leases', models.BigIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MarketPrice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('market_symbol', models.CharField(max_length=10)),
                ('trading_date', models.DateTimeField()),
                ('price_close', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='StockPrice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trading_date', models.DateTimeField()),
                ('price_high', models.FloatField()),
                ('price_low', models.FloatField()),
                ('price_open', models.FloatField()),
                ('price_close', models.FloatField()),
                ('total_volume', models.BigIntegerField()),
                ('total_value', models.BigIntegerField(default=0)),
                ('buy_foreign_value', models.BigIntegerField()),
                ('sell_foreign_value', models.BigIntegerField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock_api.company')),
            ],
        ),
        migrations.AddIndex(
            model_name='marketprice',
            index=models.Index(fields=['trading_date'], name='stock_api_m_trading_3835c7_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='marketprice',
            unique_together={('market_symbol', 'trading_date')},
        ),
        migrations.AddField(
            model_name='financialstatement',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock_api.company'),
        ),
        migrations.AddField(
            model_name='financialratio',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock_api.company'),
        ),
        migrations.AddField(
            model_name='businessvaluation',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock_api.company'),
        ),
        migrations.AddIndex(
            model_name='stockprice',
            index=models.Index(fields=['trading_date'], name='stock_api_s_trading_455a9e_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='stockprice',
            unique_together={('company', 'trading_date')},
        ),
    ]