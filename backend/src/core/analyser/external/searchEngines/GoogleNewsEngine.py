# import SearchEngine-Base and -Manager
from .SearchEngine import SearchEngine, SearchEngine_Manager
# import query
from .Queries import Query
# import beautifulsoup
import bs4 as bs
# import datetime
import datetime as dt

class GoogleNewsQuery(Query):

    # identifier of associated search engine in search-engine-manager
    SEARCH_ENGINE_IDENTIFIER = "google-news" 

    def __init__(self):
        # initialize query
        Query.__init__(self)
        # static attributes
        self.keywords = []
        self.n_urls = 5
        # frquently changing attributes - won't be saved
        self.start, self.end = None, None

    def prepare(self):
        # update time-range
        self.start = dt.datetime.now()
        self.end = self.start - dt.timedelta(days=1)

    def from_dict(self, value_dict):
        # load base from value-dict
        Query.from_dict(self, value_dict)
        # load values from dict
        self.keywords = value_dict['keywords']
        self.n_urls = value_dict['n_urls']

    def to_dict(self):
        # get dict from base
        value_dict = Query.to_dict(self)
        # update
        value_dict['keywords'] = self.keywords
        value_dict['n_urls'] = self.n_urls
        # return dict
        return value_dict

@SearchEngine_Manager.instance.register("google-news")
class GoogleNews(SearchEngine):

    # GoogleNewsEngine requires GoogleNewsQuery
    QUERY_TYPE = GoogleNewsQuery

    def query2url(self, query):
        # check query type
        if not isinstance(query, GoogleNews.QUERY_TYPE):
            raise RuntimeError("GoogleNews-SearchEngines requires GoogleNewsQuery not %s" % query.__class__.__name__)

        # base query
        url = "http://www.google.com/search"
        # add keywords
        url += "?as_oq=" + '+'.join(query.keywords)
        # only consider news
        url += "&tbm=nws"
        # number of results
        url += "&num=" + str(query.n_urls)
        # add language to query
        url += "&lr=lang_en"
        # add time-range
        url += "&tbs=cdr:1"
        url += ",cd_min:%i/%i/%i" % (query.start.month, query.start.day, query.start.year)
        url += ",cd_max:%i/%i/%i" % (query.end.month, query.end.day, query.end.year)

        # return url
        return url

    def parse_html(self, html):
        # create soup-Object from html
        soup = bs.BeautifulSoup(html, 'lxml')
        # find all search results
        results_container = soup.find("div", attrs={'id': 'search'})
        urls = [a['href'] for a in results_container.findAll('a')]
        # return found urls
        return urls