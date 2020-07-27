# import manager and Singleton
from src.core.utils.Manager import Manager
from src.core.utils.Singleton import Singleton

class Service_Manager(Manager, Singleton):
    """ Service Manager """

    def __init__(self):
        # initialize manager
        Manager.__init__(self)
        # register all services
        import src.services