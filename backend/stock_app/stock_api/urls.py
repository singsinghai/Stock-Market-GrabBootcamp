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
    path('stock-price/top-foreign-value', StockPriceViewSet.as_view({
        'get': 'get_top_total_foreign'
    })),
    path(r'stock-price/<slug:company>', StockPriceViewSet.as_view({
        'get': 'get_company_stock_price_history'
    })),
    path(r'stock-price/all/<slug:trading_date>', StockPriceViewSet.as_view({
        'get': 'get_stock_price_history_group_by_industry'
    }))
]
