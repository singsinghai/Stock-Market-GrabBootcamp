from rest_framework import viewsets
from ..models import StockPrice, Company, MarketPrice
from ..serializers import CompanySerializer, MarketPriceSerializer, StockPriceSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class MarketPriceViewSet(viewsets.ModelViewSet):
    queryset = MarketPrice.objects.all()
    serializers_class = MarketPriceSerializer

class StockPriceViewSet(viewsets.ModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer