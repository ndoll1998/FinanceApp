import os
import json
from abc import ABC
from collections import OrderedDict
# import manager and Singleton
from src.core.utils.Manager import Manager, Managable
from src.core.utils.Singleton import Singleton
# import search-engine-manager
from .SearchEngine import SearchEngine_Manager

class Queries_Manager(Manager, Singleton):
    """ Queries Manager """

    def __init__(self):
        # initialize manager
        Manager.__init__(self)

    def get(self, ticker):
        # check if ticker is registered
        if self.has_identifier(ticker):
            return Manager.get(self, ticker)
        # load from file if exists
        if Queries.check_save(ticker):
            return self.register(ticker, Queries.load_from_file(ticker))
        # create new instance otherwise
        return self.register(ticker, Queries())

class Query(Managable, ABC):
    """ Query """

    # abstract query element has no search engine
    SEARCH_ENGINE_IDENTIFIER = None

    def __init__(self, name="Query"):
        # attributes
        self.name = name
        self.weight = 0.5

    @staticmethod
    def deserialize(string):
        # deserialize string
        value_dict = json.loads(string)
        # create query instance according to search-engine
        q_type = SearchEngine_Manager().get(value_dict['engine'])
        q = q_type.QUERY_TYPE()
        # load values from dict
        q.from_dict(value_dict)
        # return query
        return q

    def from_dict(self, value_dict):
        # load values from dict
        self.name = value_dict['name']
        self.weight = value_dict['weight']

    def to_dict(self):
        return {'weight': self.weight, 'name': self.name}

    def serialize(self):
        # create dict and add search-engine
        value_dict = self.to_dict()
        value_dict['engine'] = self.__class__.SEARCH_ENGINE_IDENTIFIER
        # return serialized dict
        return json.dumps(self.to_dict())


class Queries(Manager, Managable):
    """ Queries Manager """

    # base path to save-files
    __BASE_PATH = "data/queries"

    @staticmethod
    def get_fpath(identifier):
        return os.path.join(Queries.__BASE_PATH, identifier + ".json")

    def save_to_file(self, identifier):
        # create folder-structure
        os.makedirs(Queries.__BASE_PATH, exist_ok=True)
        # write serialized object to file        
        with open(Queries.get_fpath(identifier), "w+") as f:
            f.write(self.serialize())

    @staticmethod
    def check_save(identifier):
        return os.path.exists(Queries.get_fpath(identifier))

    @staticmethod
    def load_from_file(identifier):
        # load file-content
        with open(Queries.get_fpath(identifier), "r") as f:
            string = f.read()
        # deserialize content
        return Queries.deserialize(string)

    def load_from_serialized(self, string):
        # clear manager
        Manager.clear(self)
        # deserialize
        serialized_dict = OrderedDict(json.loads(string))
        # deserialize all queries
        for name, string in serialized_dict.items():
            self.register(name, Query.deserialize(string))
        # return instance
        return self

    @staticmethod
    def deserialize(string):
        # return queries instance loaded from serialized
        return Queries().load_from_serialized(string)

    def serialize(self):
        # serialize all queries
        serialized_dict = OrderedDict({key: self.get(key).serialize() for key in self})
        return json.dumps(serialized_dict)