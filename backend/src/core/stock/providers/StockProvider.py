import os
# import pandas
import pandas as pd
# import manager and singleton
from src.core.utils.Manager import Manager, Managable
from src.core.utils.Singleton import Singleton

class StockProvider_Manager(Manager, Singleton):
    """ Stock Manager managing different Stock-Providers. """

    def __init__(self):
        # initialize manager
        Manager.__init__(self)
        # register all providers by importing
        import src.core.stock.providers

class StockProvider(Managable, Singleton):
    """ Provider for Stock Data """

    def __init__(self, data_path):
        # save and create directory
        self.data_path = data_path
        os.makedirs(data_path, exist_ok=True)

    def load_stock_from_provider(self, ticker):
        raise NotImplementedError()

    def load_stock_from_local(self, ticker):
        # build path to candidate file
        fpath = os.path.join(self.data_path, "%s.csv" % ticker)
        # check if file for ticker exists
        if os.path.isfile(fpath):
            # load file and return stock
            df = pd.read_csv(fpath, index_col='Date', parse_dates=True)
            return df
        # return None if file was not found
        return None

    def save_stock_to_local(self, ticker, df):
        # load existing dataframe
        prev_df = self.load_stock_from_local(ticker)
        # update it with the given dataframe
        if prev_df is not None:
            df = pd.concat((df, prev_df), join='outer', ignore_index=False)
        # build full path to file and save dataframe to it
        fpath = os.path.join(self.data_path, "%s.csv" % ticker)
        df.to_csv(fpath)

    def get_stock_df(self, ticker, start, end):
        # load stock from local
        df = self.load_stock_from_local(ticker)

        if df is not None:
            # get range
            mask = (df.index >= start) & (df.index <= end)
            df = df.iloc[mask]
            # check if data is dense - no gap
            dates = [start] + df.index.tolist() + [end]
            max_d = max((d1 - d2 for d1, d2 in zip(dates[1:], dates[:-1])))
            # set df to None if maximum difference is exceeded
            df = df if max_d.days <= 4 else None

        # handle stock is not in local data
        if (df is None) or (len(df.index) == 0):
            # load stock from provider and save to local
            df = self.load_stock_from_provider(ticker, start, end)
            self.save_stock_to_local(ticker, df)

        return df