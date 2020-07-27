# import flask
from flask import Flask
from flask import request
from flask_cors import CORS
# import controller
from src.Controller import Controller

# create app
app = Flask(__name__)
CORS(app)

# create controller
controller = Controller()

# *** server-client-interface ***

@app.route("/stock/pull", methods=['GET'])
def getstock():
    return controller.stock_pullStock(request)

@app.route("/stock/get-providers", methods=["GET"])
def getproviders():
    return controller.stock_getProviders(request)

@app.route("/search/queries/pull", methods=["GET"])
def getqueries():
    return controller.search_pullQueries(request)

@app.route("/search/queries/push", methods=["POST"])
def pushqueries():
    return controller.search_pushQueries(request)

@app.route("/search/get-engines", methods=["GET"])
def getsearchengines():
    return controller.search_getEngines(request)

if __name__ == '__main__':
    app.run()