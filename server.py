from flask import Flask
import random

app = Flask(__name__)

@app.route("/random")
def randomNum():
    rando = random.randint(0,50)
    return str(rando)

if __name__ == "__main__":
  app.run()
