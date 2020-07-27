import json
# import managers
from .ServiceManager import Service_Manager
from src.core.utils.Manager import Managable
from src.core.stock.Stock import Stock_Manager
from src.core.stock.providers.StockProvider import StockProvider_Manager
# import datetime to parse dates
import datetime as dt

@Service_Manager.instance.register("stock/pull")
class GetStock(Managable):

    def __call__(self, ticker, provider, start, end):
        # parse dates
        end = dt.datetime.strptime(end, "%Y-%m-%d") if end is not None else None
        start = dt.datetime.strptime(start, "%Y-%m-%d") if start is not None else None
        # get stock and provider
        stock = Stock_Manager().get(ticker)
        provider = StockProvider_Manager().get(provider)
        # set stock provider and load data
        stock.set_provider(provider)
        stock.load_data(start, end)
        # return serialized stock
        return stock.serialize()

@Service_Manager.instance.register("stock/get-providers")
class GetProviders(Managable):

    def __call__(self):
        # get providers
        providers = StockProvider_Manager().identifiers
        # return serialized
        return json.dumps(providers)