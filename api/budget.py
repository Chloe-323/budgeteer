from .models import *
import datetime
import json

def calculate_start_date():
    #first of this month
    start_date = datetime.date.today().replace(day=1)

def calculate_end_date():
    #last day of this month
    end_date = datetime.date.today().replace(day=28) + datetime.timedelta(days=4)

class PyBudget:
    def __init__(self, name, start_amount, start_date = calculate_start_date(), end_date = calculate_end_date()):
        self.categories = []
        self.transactions = []
        self.name = name
        self.start_amount = start_amount
        self.current_amount = start_amount
        self.start_date = start_date
        self.end_date = end_date

    def add_tx(self, tx):
        if tx.category not in self.categories:
            self.categories.append(tx.category)
        self.transactions.append(tx)
        self.current_amount += tx.amount

    def jsonify(self):
        json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4) #What?


class PyTransaction:
    def __init__(self, amount, category, date = datetime.date.today()):
        self.amount = amount
        self.category = category
        self.date = date
