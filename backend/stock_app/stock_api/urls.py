from django.urls import path
from .views import CompanyViewSet, MarketPriceViewSet, StockPriceViewSet

urlpatterns = [
    path('company', CompanyViewSet.as_view({
        'get': 'list'
    })),
    path('market-price', MarketPriceViewSet.as_view({
        'get': 'list'
    })),
    path('stock-price', StockPriceViewSet.as_view({
        'get': 'list'
    }))
]
