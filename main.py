import mwclient
import json

def grab_players():
    site = mwclient.Site('lol.fandom.com', path='/')

    response = site.api('cargoquery',
	    limit = 'max',
        tables = "Tournaments = TN, TournamentPlayers = TP",
        join_on = "TN.OverviewPage = TP.OverviewPage",
	    fields = "TN.Name, TN.Year, TP.Team, TP.Player, TP.Role, TP.Flag",
        where = 'TN.League = "Ultraliga" AND TN.Name LIKE ’Ultraliga Season .’',
        order_by = "TN.Year",
    )
    print(response)
    for x in response["cargoquery"]:
        print(x["title"])
    data = json.dumps(response["cargoquery"], indent=4)
    with open("test.json", "w") as file:
        file.write(data)


def filter_to_nice():
    with open("test.json", "r") as file:
        data = json.load(file)

    # start filter
    banned = [
            "Promotion",
            "Qualifier",
            "Expansion",
            "Playoffs",
            "Stage"
            ]
    clean = []
    print(data)
    for x in data:
        tmp = x["title"]
        # if any(word in tmp["Name"] for word in banned):
        #     continue
        # tmp["RosterLinks"] = tmp["RosterLinks"].split(";;")
        # tmp["Flags"] = tmp["Flags"].split(";;")
        print(tmp)
        clean.append(tmp)


if __name__ == "__main__":
    # grab_players() # grabbing players
    filter_to_nice()

    # notes to myself:
    # 1. rewrite it to rust 
    # 2. move it into HTTP server
    # 3. requests limit is 500 
    # 4. create frontend 

