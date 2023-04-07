from fastapi import FastAPI
import pandas as pd
import random
import json
app = FastAPI()

def grab_random_team():
    with open("final.json") as file:
        data = json.load(file)
    data = list(data)
    return random.choice(data)

@app.get("/api/generate")
async def root():
    data = grab_random_team()
    return {"payload": data}
