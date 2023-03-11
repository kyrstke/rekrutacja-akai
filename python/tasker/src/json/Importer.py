import json


class Importer:

    def __init__(self):
        self.tasks = []

    def read_tasks(self):
        with open('taski.json', 'r', encoding='utf8') as file:
            self.tasks = json.load(file)

    def get_tasks(self):
        return self.tasks