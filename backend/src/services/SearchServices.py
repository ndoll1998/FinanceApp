import json
# import managers
from .ServiceManager import Service_Manager
from src.core.utils.Manager import Managable
from src.core.analyser.external.searchEngines.Queries import Queries_Manager
from src.core.analyser.external.searchEngines.SearchEngine import SearchEngine_Manager


@Service_Manager.instance.register("search/queries/pull")
class PullQueries(Managable):

    def __call__(self, ticker):
        # get queries instance
        queries = Queries_Manager().get(ticker)
        # return serialized identifiers
        return queries.serialize()

@Service_Manager.instance.register("search/queries/push")
class PushQueries(Managable):

    def __call__(self, ticker, serialized_data):
        # get queries instance
        queries = Queries_Manager().get(ticker)
        # load from serialized data
        queries.load_from_serialized(serialized_data)
        # save data
        queries.save_to_file(ticker)

@Service_Manager.instance.register("search/get-engines")
class GetEngines(Managable):

    def __call__(self):
        # get search-engines
        searchEngines = SearchEngine_Manager().identifiers
        # return serialized
        return json.dumps(searchEngines)