import yfinance as yf
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import math

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ticker indices
TICKERS = {
    "S&P 500": "^GSPC",
    "NASDAQ": "^IXIC",
    "Dow Jones": "^DJI",
    "FTSE 100": "^FTSE",
    "Nikkei 225": "^N225",
    "DAX": "^GDAXI"
}

def fetch_index_data():
    data = yf.download(list(TICKERS.values()), period="1d", interval="1m", progress=False)
    current_prices = data['Close'].iloc[-1]
    result = {}
    for name, symbol in TICKERS.items():
        price = current_prices[symbol]
        if not math.isfinite(price):
            result[name] = None
        else:
            result[name] = float(price)
    return result

if __name__ == "__main__":
    while True:
        print("\n📈 Live Market Ticker:")
        prices = fetch_index_data()
        for name, price in prices.items():
            print(f"{name}: {price:.2f}")
        time.sleep(60)  # refresh every 60 seconds

@app.get("/api/ticker")
def get_ticker():
    result = {}
    for symbol in TICKERS.values():
        stock = yf.Ticker(symbol)
        info = stock.info
        # Use get to avoid KeyError if the field is missing
        name = info.get('shortName', symbol)
        price = info.get('regularMarketPrice', None)
        result[name] = price
    return result


