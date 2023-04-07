import mwclient
import json
import time
import re
import pandas as pd
from pandas._config import display

def grab_players():
    data = []
    site = mwclient.Site('lol.fandom.com', path='/')
    for x in range(1,10): 
        response = site.api('cargoquery',
	    limit = 'max',
        tables = "Tournaments = TN, TournamentPlayers = TP",
        join_on = "TN.OverviewPage = TP.OverviewPage",
	    fields = "TN.Name, TN.Year, TP.Team, TP.Player, TP.Role, TP.Flag",
        where = f'TN.Name LIKE "Ultraliga Season {x}"',
        order_by = "TN.Year",
        )
        data.append(response["cargoquery"])
        
        time.sleep(3)
        print(f"Season {x}")

    data_to_dump = json.dumps(data, indent=4)
    with open("test.json", "w") as file:
        file.write(data_to_dump)


def filter_to_nice():
    with open("test.json", "r") as file:
        data = json.load(file)

    # start filter
    clean = []
    for x in data:
        for y in x:
            tmp = y["title"]
            if tmp["Role"] == "Coach":
                continue
            tmp["Player"] = re.sub(r'\([^)]*\)', '', tmp["Player"])
            tmp["Team"] = re.sub(r'\([^)]*\)', '', tmp["Team"])
            print(tmp)
            clean.append(tmp)
    with open("clean.json", "w") as file:
        file.write(json.dumps(clean, indent=4))

def select_random_team():
    df = pd.read_json("clean.json")
    print(df)
    # result = df.groupby(["Name", "Team", "Year"],as_index=False).apply(lambda x: [list(x["Player"]), list(x["Role"]), list(x["Flag"])]).apply(pd.Series)
    result = df.groupby(["Name", "Team", "Year"],as_index=False)["Player", "Role", "Flag"].agg(lambda x: list(x))

    print(result.head())
    result.to_json("final.json", orient='records')


if __name__ == "__main__":
    # grab_players() # grabbing players
    # filter_to_nice()
    select_random_team()

    # notes to myself:
    # 1. rewrite it to rust 
    # 2. move it into HTTP server
    # 3. requests limit is 500 
    # 4. create frontend 

