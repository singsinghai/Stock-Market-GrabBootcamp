"""
This is a script to populate marketprice table with data
fetched from wichart api
"""
from datetime import timezone, datetime
import time
import requests
from stock_app.stock_api.models import MarketPrice
from scripts import HTTP_HEADERS
from datetime import datetime

def run(*args):
    
    print("--BEGIN POPULATING MARKET_PRICE TABLE.--")
    start_time = time.time()

    print("TRUNCATING MARKET_PRICE TABLE.")
    MarketPrice.objects.all().delete()

    # Get historical trades of common index around the world

    created_records_cnt = 0

    api_endpoint = f"https://wichart.vn/wichartapi/wichart/chartthitruong"

    HEADERS = HTTP_HEADERS
    
    market_list = [
        { 'VNINDEX':    'VN-INDEX' }, 
        { 'HNX':        'HNX-INDEX' },
        { 'dji':        'DOW JONES' },
        { 'gdaxi':      'DAX' },
        { 'ftse':       'FTSE 100' },
        { 'n225':       'Nikkei 225' },
        { 'ks11':       'KOSPI' },
        { 'ssec':       'Shanghai' }
    ]
    
    market_history_price = []

    for market in market_list:
        short_name, market_symbol = market.popitem()
        params = { "code": short_name }
        
        api_response = requests.get(API_ENDPOINT, headers=HEADERS, params=params).json()
        
        for trading_date, price_close in api_response['listClose']:
            if price_close == None:
                continue
            trade_data = {
                'market_symbol': market_symbol.upper(),
                'trading_date': datetime.fromtimestamp(trading_date/1000).astimezone(timezone.utc).strftime('%Y-%m-%d'),
                'price_close': price_close
            }
            market_history_price.append(MarketPrice(**trade_data))
                    
    # Bulk insert all stock_price records of a company
    created_records_cnt += len(MarketPrice.objects.bulk_create(market_history_price))
    
    print(f"TOTAL INSERTED RECORDS: {created_records_cnt}")
    print(f"TIME ELAPSED: {str(time.time() - start_time)}")
    print("--FINISH POPULATING MARKET_PRICE TABLE--")
    
