from django.db import models

# Thong tin cong ty


class Company(models.Model):
    symbol = models.CharField(max_length=50, primary_key=True)
    industry_name = models.CharField(max_length=2048, null=True)
    floor_code = models.CharField(max_length=50)
    company_name = models.CharField(max_length=2048)
    shares_outstanding = models.BigIntegerField()
    dividend_payout_ratio = models.BigIntegerField(null=True)

# Gia thi truong


class MarketPrice(models.Model):
    market_symbol = models.CharField(max_length=10)
    trading_date = models.DateTimeField()
    price_close = models.FloatField()

    class Meta:
        indexes = [
            models.Index(fields=['trading_date'])
        ]
        unique_together = ['market_symbol', 'trading_date']

# Bao cao tai chinh


class FinancialStatement(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.IntegerField()
    quarter = models.IntegerField()
    total_assets = models.BigIntegerField(null=True)
    tangible_assets = models.BigIntegerField(null=True)
    intangible_assets = models.BigIntegerField(null=True)
    net_revenue = models.BigIntegerField(null=True)
    profit_before_taxes = models.BigIntegerField(null=True)
    profit_after_taxes = models.BigIntegerField(null=True)
    inventory = models.BigIntegerField(null=True)
    liabilities = models.BigIntegerField(null=True)
    cash_and_cash_equivalents = models.BigIntegerField(null=True)
    shortterm_liabilities = models.BigIntegerField(null=True)
    longterm_liabilities = models.BigIntegerField(null=True)
    cost_price = models.BigIntegerField(null=True)
    equity = models.BigIntegerField(null=True)
    fixed_assets_depreciation = models.BigIntegerField(null=True)
    lending_cost = models.BigIntegerField(null=True)
    shortterm_borrowings_financial_leases = models.BigIntegerField(null=True)
    longterm_borrowings_financial_leases = models.BigIntegerField(null=True)

# Gia co phieu


class StockPrice(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    trading_date = models.DateTimeField()
    price_high = models.FloatField()
    price_low = models.FloatField()
    price_open = models.FloatField()
    price_close = models.FloatField()
    total_volume = models.BigIntegerField()
    total_value = models.BigIntegerField(default=0)
    buy_foreign_value = models.BigIntegerField()
    sell_foreign_value = models.BigIntegerField()

    class Meta:
        indexes = [
            models.Index(fields=['trading_date'])
        ]
        unique_together = ['company', 'trading_date']

# Chi so quan trong


class FinancialRatio(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.IntegerField()
    quarter = models.IntegerField()
    return_on_equity = models.FloatField()
    return_on_assets = models.FloatField()
    return_on_invested_capitals = models.FloatField()
    current_ratio = models.FloatField()
    gross_margin = models.FloatField()
    profit_margin =  models.FloatField()
    pretax_profit_margin = models.FloatField()

# Dinh gia cong ty


class BusinessValuation(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.IntegerField()
    quarter = models.IntegerField()
    book_value = models.FloatField()
    earnings_per_share = models.FloatField()
    enterprise_value = models.FloatField()
    ev_over_ebit = models.FloatField()
    ev_over_ebitda = models.FloatField()
    ev_sales = models.FloatField()
    price_to_book = models.FloatField()
    price_earnings = models.FloatField()
    price_to_sales = models.FloatField()
    market_cap = models.BigIntegerField()