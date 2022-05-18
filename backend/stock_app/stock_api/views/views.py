from rest_framework import viewsets
from ..models import StockPrice, Company
from ..serializers import CompanySerializer, StockPriceSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class StockPriceViewSet(viewsets.ModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer