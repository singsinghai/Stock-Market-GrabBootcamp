from django.urls import path
from .views import CompanyViewSet, StockPriceViewSet

urlpatterns = [
    path('company', CompanyViewSet.as_view({
        'get': 'list'
    })),
    path('stock-price', StockPriceViewSet.as_view({
        'get': 'list'
    }))
]
