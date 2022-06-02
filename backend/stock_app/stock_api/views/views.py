from collections import defaultdict
from contextlib import closing
from datetime import timedelta, timezone
from django.db import connection
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from ..models import StockPrice, Company, MarketPrice, FinancialStatement
from ..serializers import CompanySerializer, MarketPriceSerializer, StockPriceSerializer, FinancialStatementSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from datetime import datetime
from django.db import connections


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['industry_name']
    search_fields = ['company_name']


class MarketPriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MarketPrice.objects.all()
    serializer_class = MarketPriceSerializer


class FinancialRatioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FinancialStatement.objects.all()
    serializer_class = FinancialStatementSerializer
    renderer_classes = [JSONRenderer]
    
    def get_stock_financial_statement(self, request, company=None):
        sql = """
        SELECT * FROM stock_api_financialstatement WHERE company_id = %s
        """
        history = StockPrice.objects.raw(sql, [company])
        
        serializer = self.get_serializer(history, many=True)
        return Response(serializer.data)


class StockPriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer
    renderer_classes = [JSONRenderer]
    
    def get_top_total_foreign(self, request):
        sql = """
        SELECT buy_foreign_value - sell_foreign_value as total_foreign_value, company_id
        FROM stock_api_stockprice
        WHERE trading_date = %s AND LENGTH(company_id) = 3
        ORDER BY total_foreign_value DESC
        """

        with connection.cursor() as cursor:
            cursor.execute(
                sql, [(datetime.today() - timedelta(days=1)).strftime("%Y-%m-%d")])
            rows = cursor.fetchall()

        response_data = []

        for row in rows[:10]:
            response_data.append({
                "total_foreign_value": row[0],
                "symbol": row[1],
            })

        for row in rows[-10:]:
            response_data.append({
                "total_foreign_value": row[0],
                "symbol": row[1],
            })

        return Response(response_data)

    def get_stock_price_history_group_by_industry(self, request, trading_date=None):
        sql = """
        SELECT c.industry_name, sp.price_open, sp.price_close, sp.total_value, c.symbol
        FROM stock_api_stockprice as sp 
        JOIN stock_api_company as c on sp.company_id = c.symbol
        WHERE trading_date = %s
        """
        response_data = defaultdict(lambda: [])

        with connection.cursor() as cursor:
            cursor.execute(sql, [trading_date])
            rows = cursor.fetchall()

        for row in rows:
            industry = row[0]
            response_data[industry].append({
                "price_open": row[1],
                "price_close": row[2],
                "total_value": row[3],
                "symbol": row[4]
            })

        return Response(response_data)

    def get_company_stock_price_history(self, request, company=None):
        sql = """
        SELECT * FROM stock_api_stockprice WHERE company_id = %s
        """
        if request.query_params:
            if request.query_params["start_date"]:
                start_date = datetime.fromisoformat(
                    request.query_params["start_date"]).astimezone(timezone.utc)
                sql += "and trading_date > %s"
                history = StockPrice.objects.raw(sql, [company, start_date])
        else:
            history = StockPrice.objects.raw(sql, [company])
        serializer = self.get_serializer(history, many=True)
        return Response(serializer.data)
