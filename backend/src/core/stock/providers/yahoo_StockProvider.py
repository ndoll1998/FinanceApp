from .StockProvider import StockProvider
# import manager to register
from .StockProvider import StockProvider_Manager

# import yahoo-finance
import yfinance as yf

@StockProvider_Manager.instance.register("yahoo")
class yahoo(StockProvider):

    def __init__(self):
        # initialize base class
        StockProvider.__init__(self, data_path="data/stocks/yahoo")

    def load_stock_from_provider(self, ticker, start, end):
        # get ticker and dataframe
        ticker = yf.Ticker(ticker)
        df = ticker.history(start=start, end=end)
        # return dataframe
        return df
