from django.urls import path, re_path
from .views import CompanyViewSet, MarketPriceViewSet, StockPriceViewSet

urlpatterns = [
    path('company', CompanyViewSet.as_view({
        'get': 'list'
    })),
    path('company/<slug:pk>', CompanyViewSet.as_view({
        'get': 'retrieve'
    })),
    path('market-price', MarketPriceViewSet.as_view({
        'get': 'list'
    })),
    path('stock-price', StockPriceViewSet.as_view({
        'get': 'list'
    })),
    path(r'stock-price/<slug:company>', StockPriceViewSet.as_view({
        'get': 'get_company_stock_price_history'
    }))
]
