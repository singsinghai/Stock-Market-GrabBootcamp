from contextlib import closing
from datetime import timezone
from django.db import connection
from rest_framework.response import Response
from rest_framework import viewsets
from ..models import StockPrice, Company, MarketPrice
from ..serializers import CompanySerializer, MarketPriceSerializer, StockPriceSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from datetime import datetime


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['industry_name']
    search_fields = ['company_name']


class MarketPriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MarketPrice.objects.all()
    serializer_class = MarketPriceSerializer


class StockPriceViewSet(viewsets.ModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer

    def get_company_stock_price_history(self, request, company=None):
        sql = """
        SELECT * FROM stock_api_stockprice WHERE company_id = %s
        """
        if request.query_params["start_date"]:
            start_date = datetime.fromisoformat(request.query_params["start_date"]).astimezone(timezone.utc)
            sql += "and trading_date > %s"
        history = StockPrice.objects.raw(sql,[company, start_date])
        serializer = self.get_serializer(history, many=True)
        return Response(serializer.data)
