import os

from dotenv import load_dotenv

load_dotenv("./.env")

HOST = os.environ["HOST"]
PORT = os.environ["PORT"]
NUMBER_OF_TICKERS = int(os.environ["NUMBER_OF_TICKERS"])
DELAY = int(os.environ["DELAY"])
