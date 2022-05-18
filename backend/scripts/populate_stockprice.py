"""
This is a script to populate stockprice table with data
fetched from fireant api
"""
from datetime import timezone
import time
import requests
from stock_app.stock_api.models import StockPrice, Company
from stock_app.settings import FIREANT_BEARER_TOKEN
from scripts import HTTP_HEADERS
from datetime import datetime

END_DATE = datetime.today().strftime('%Y-%m-%d')
MAX_LIMIT = 1000
OFFSET = 0


def run(*args):
    if args and args[0]:
        start_date = args[0]
    else:
        start_date = "2019-01-01"

    
    params = {
        "startDate": start_date,
        "endDate": END_DATE,
        "offset": OFFSET,
        "limit": MAX_LIMIT
    }
    print("--BEGIN POPULATING STOCK_PRICE TABLE.--")
    company_list = Company.objects.all()
    start_time = time.time()

    print("TRUNCATING STOCK_PRICE TABLE.")
    StockPrice.objects.all().delete()

    # Get historical trades within input interval for each company

    created_records_cnt = 0
    for i, company in enumerate(company_list):

        api_endpoint = f"https://restv2.fireant.vn/symbols/{company.symbol}/historical-quotes"

        HEADERS = HTTP_HEADERS
        HEADERS['Authorization'] = f'Bearer {FIREANT_BEARER_TOKEN}'
        api_response = requests.get(
            api_endpoint, headers=HEADERS, params=params).json()
        
        stock_history_price = []
        for trade in api_response:
            trade_data = {
                "company": company,
                "trading_date": datetime.fromisoformat(trade["date"]).astimezone(timezone.utc),
                "price_high": trade["priceHigh"],
                "price_low": trade["priceLow"],
                "price_open": trade["priceOpen"],
                "price_close":  trade["priceClose"],
                "total_volume": trade["totalVolume"],
                "buy_foreign_value": trade["buyForeignValue"],
                "sell_foreign_value": trade["sellForeignValue"]
            }
            stock_history_price.append(StockPrice(**trade_data))
        
        # Bulk insert all stock_price records of a company
        created_records_cnt += len(StockPrice.objects.bulk_create(stock_history_price))
        if i % 100 == 0:
            print(f"INSERTED RECORDS: {created_records_cnt}...")
    
    print(f"TOTAL INSERTED RECORDS: {created_records_cnt}")
    print(f"TIME ELAPSED: {str(time.time() - start_time)}")
    print("--FINISH POPULATING STOCK_PRICE TABLE--")
    
