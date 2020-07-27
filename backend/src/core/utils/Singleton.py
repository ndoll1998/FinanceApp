
class __SingletonType(type):

    @property
    def instance(cls):
        return cls.get_instance()

    def __call__(cls):
        return cls.get_instance()


class Singleton(object, metaclass=__SingletonType):
    """ Singleton """

    # class instance
    __instance = None

    @classmethod
    def get_instance(cls):
        # create instance
        if cls.__instance is None:
            cls.__instance = object.__new__(cls)
            cls.__instance.__init__()
        # return instance
        return cls.__instance
