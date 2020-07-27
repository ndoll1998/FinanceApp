from collections import OrderedDict

class Managable(object):
    """ Abstract Class that can be registered to a Manager. """


class Manager(object):
    """ Manager """

    def __init__(self):
        # map identifiers to their subordinate
        self.subordinates = OrderedDict()

    def register(self, identifier, *args, **kwargs):

        # check if identifier already known
        if self.has_identifier(identifier):
            raise RuntimeError("Identifier <%s> already registered in %s" % (identifier, self.__class__.__name__))

        # check if there is an instance candidate
        if len(args) > 0:
            # get instance candiate
            instance_candidate = args[0]
            # check if is candidate is of subordinate type
            if isinstance(instance_candidate, Managable):
                # register instance and return it
                return self.__instance_register(identifier, instance_candidate)

        # decorator call otherwise
        return self.__decorate_register(identifier, *args, **kwargs)

    def __instance_register(self, identifier, instance):
        # add instance to subordiante
        self.subordinates[identifier] = instance
        # return registered instance
        return instance

    def __decorate_register(self, identifier, *args, **kwargs):
        """ Register a managable to the manager with an identifier. """

        def wrapper(sub_cls):
            # check class of subordinate
            if not issubclass(sub_cls, Managable):
                raise RuntimeError("Only subclasses of Managable can be registered to a manager. (%s)" % (sub_cls.__name__))
        
            # create instance and register it
            inst = sub_cls(*args, **kwargs)
            self.__instance_register(identifier, inst)

            # return sub
            return sub_cls

        return wrapper

    def get(self, identifier):
        # find identifier in mapping
        if self.has_identifier(identifier):
            return self.subordinates[identifier]
        # identifier not found
        raise AttributeError("%s has no subordinate with identifier %s" % (self.__class__.__name__, identifier))
    
    def has_identifier(self, identifier):
        return identifier in self.subordinates

    @property
    def identifiers(self):
        return list(self.subordinates.keys())

    def __iter__(self):
        return self.subordinates.__iter__()

    def clear(self):
        # clear all subordinates
        self.subordinates.clear()