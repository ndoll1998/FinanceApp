# import Service Manager
from src.services.ServiceManager import Service_Manager

class Controller(object):

    def stock_pullStock(self, request):
        # get ticker and provider from request arguments
        ticker = request.args.get('ticker')
        provider = request.args.get('provider')
        start, end = request.args.get('start'), request.args.get('end')
        # get and call service
        service = Service_Manager().get('stock/pull')
        stock = service(ticker, provider, start, end)
        # return
        return stock

    def stock_getProviders(self, request):
        # get and call service
        service = Service_Manager().get("stock/get-providers")
        return service()

    def search_pullQueries(self, request):
        # get ticker from request
        ticker = request.args.get('ticker')
        # get and call service
        service = Service_Manager().get("search/queries/pull")
        queries = service(ticker)
        # return 
        return queries

    def search_pushQueries(self, request):
        # get ticker and data from request
        ticker = request.args.get('ticker')
        data = request.get_data()
        # get and call service
        service = Service_Manager().get("search/queries/push")
        service(ticker, data)
        # return successful response
        return "Successful", 201

    def search_getEngines(self, request):
        # get and call service
        service = Service_Manager().get("search/get-engines")
        return service()
