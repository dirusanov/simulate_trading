from random import random


def generate_movement():
    movement = -1 if random() < 0.5 else 1
    return movement


def get_coefficient_by_ticker(ticker: str) -> int:
    coefficient = int(ticker.split('_')[-1])
    if coefficient == 0:
        coefficient = 1
    return coefficient
