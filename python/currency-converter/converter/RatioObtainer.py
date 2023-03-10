import json, datetime, requests, os


class RatioObtainer:
    base = None
    target = None

    def __init__(self, base, target, ratios_path='./ratios.json'):
        self.base = base
        self.target = target
        self.ratios_path = ratios_path

    def was_ratio_saved_today(self):
        # TODO
        # This function checks if given ratio was saved today and if the file with ratios is created at all
        # should return false when file doesn't exist or if there's no today's exchange rate for given values at all
        # should return true otherwise

        # check if file ./ratios.json exists, if not create it
        if not os.path.exists(self.ratios_path):
            with open(self.ratios_path, 'w') as file:
                json.dump([], file)
            return False

        with open(self.ratios_path, 'r') as file:
            ratios = json.load(file)
            # print(ratios)
            for entry in ratios:
                if entry['base_currency'] == self.base and entry['target_currency'] == self.target:
                    if entry['date_fetched'] == datetime.date.today().strftime('%Y-%m-%d'):
                        print(f'Ratio for {self.base} to {self.target} was saved today, no need to fetch it again.')
                        return True
            return False

    def fetch_ratio(self):
        # TODO
        # This function calls API for today's exchange ratio
        # Should ask API for today's exchange ratio with given base and target currency
        # and call save_ratio method to save it
        
        print(f'Fetching ratio for {self.base} to {self.target}...')
        url = f'https://api.exchangerate.host/convert?from={self.base}&to={self.target}'
        response = requests.get(url)
        data = response.json()

        self.save_ratio(data['result'])

    def save_ratio(self, ratio):
        # TODO
        # Should save or update exchange rate for given pair in json file
        # takes ratio as argument
        # example file structure is shipped in project's directory, yours can differ (as long as it works)
        
        with open(self.ratios_path, 'r') as file:
            ratios = json.load(file)
            for entry in ratios:
                if entry['base_currency'] == self.base and entry['target_currency'] == self.target:
                    entry['ratio'] = ratio
                    entry['date_fetched'] = datetime.date.today().strftime('%Y-%m-%d')
                    with open(self.ratios_path, 'w') as file:
                        json.dump(ratios, file, indent=4)
                    return
                
            ratios.append({
                'base_currency': self.base,
                'target_currency': self.target,
                'ratio': ratio,
                'date_fetched': datetime.date.today().strftime('%Y-%m-%d')
            })
            with open(self.ratios_path, 'w') as file:
                json.dump(ratios, file, indent=4)
            


    def get_matched_ratio_value(self):
        # TODO
        # Should read file and receive exchange rate for given base and target currency from that file
        
        with open(self.ratios_path, 'r') as file:
            ratios = json.load(file)
            for ratio in ratios:
                if ratio['base_currency'] == self.base and ratio['target_currency'] == self.target:
                    return ratio['ratio']
