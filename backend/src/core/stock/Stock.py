import json
# import datetime
import datetime as dt
# import manager and singleton
from src.core.utils.Manager import Manager, Managable
from src.core.utils.Singleton import Singleton

class Stock_Manager(Manager, Singleton):

    def __init__(self):
        # initialize manager
        Manager.__init__(self)

    def get(self, ticker):
        # check if ticker is registered
        if self.has_identifier(ticker):
            return Manager.get(self, ticker)
        # create stock and register it
        return self.register(ticker, Stock(ticker))
        


class Stock(Managable):
    
    def __init__(self, ticker):
        # save ticker
        self.ticker = ticker
        # provider and stock-dataframe
        self.provider = None
        self.df = None
        # currently loaded time-span
        self.start, self.end = None, None

    def set_provider(self, provider):
        # update provider
        self.provider = provider
        
    def load_data(self, start=None, end=None):
        # handle time-span is None
        new_end = end if end is not None else dt.datetime.now()
        new_start = start if start is not None else (new_end - dt.timedelta(days=365))
        # check if time-span is already loaded
        if (self.start is not None) and (self.end is not None):
            if (new_start >= self.start) and (new_end <= self.end):
                # update span and data 
                self.start, self.end = new_start, new_end
                self.df = self.df[(self.df.index >= self.start) & (self.df.index <= self.end)]
                # exit function
                return
        # update span
        self.start, self.end = new_start, new_end
        # check provider
        if self.provider is None:
            raise RuntimeError("No Provider set for stock %s" % self.ticker)
        # load data from provider
        self.df = self.provider.get_stock_df(self.ticker, self.start, self.end)

    def serialize(self):
        # create csv-format
        csv = self.df[['Open', 'High', 'Low', 'Close', 'Volume']].to_csv(date_format='%Y-%m-%d')
        data = {'csv': csv}
        # return data
        return json.dumps(data)