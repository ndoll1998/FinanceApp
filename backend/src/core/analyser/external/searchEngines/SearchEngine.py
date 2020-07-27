import requests
# import Singleton and Manager
from src.core.utils.Singleton import Singleton
from src.core.utils.Manager import Manager, Managable
# import random headers
from .headers import get_random_header

class SearchEngine_Manager(Manager, Singleton):

    def __init__(self):
        # initialize Manager
        Manager.__init__(self)
        # register all SearchEngines
        import src.core.analyser.external.searchEngines

# import query
from .Queries import Query

class SearchEngine(Managable, Singleton):
    """ Abstact Base Class for Search Engines """

    # type of query to use
    QUERY_TYPE = Query
    
    def query2url(self, query):
        """ Convert a query object to a url string """
        raise NotImplementedError()

    def parse_html(self, html):
        """ Parse HTML for links """
        raise NotImplementedError()

    def crawl(self, query):
        # build url and get response
        return requests.get(self.query2url(query), headers=get_random_header())

    def get_urls(self, query):
        # get response from query
        resp = self.crawl(query)
        # check response
        if (resp.status_code != 200):
            raise RuntimeError("Unvalid Response:", resp)
        # parse and return
        return self.parse_html(resp.text)