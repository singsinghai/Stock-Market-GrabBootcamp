from rest_framework import serializers
from ..models import Company, StockPrice, FinancialRatio, FinancialStatement, BusinessValuation


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = "__all__"

class FinancialRatioSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialRatio
        fields = "__all__"

class FinancialStatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialStatement
        fields = "__all__"

class BusinessValuationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessValuation
        fields = "__all__"