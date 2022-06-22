from __future__ import annotations

import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from websockets.exceptions import ConnectionClosedOK, ConnectionClosedError

from app.apis.api_exchange.utils import generate_movement, get_coefficient_by_ticker
from app.core import config
from app.core.connection_manager import ConnectionManager

router = APIRouter()


manager = ConnectionManager()


@router.get("/api/tickers", tags=["api_exchange"])
async def get_tickers() -> JSONResponse:
    tickers = ["ticker_{:02d}".format(number) for number in range(config.NUMBER_OF_TICKERS)]
    return JSONResponse(tickers)


@router.websocket("/api/ws/amount/{ticker}")
async def get_amount_websocket(websocket: WebSocket):
    movements = []
    await manager.connect(websocket)
    req_data = await websocket.receive_json()
    coefficient = get_coefficient_by_ticker(req_data['ticker'])
    try:
        while True:
            amount = sum(movements) * coefficient
            response = {'amount': amount}
            await manager.send_message(response, websocket)
            await asyncio.sleep(config.DELAY)
            movement = generate_movement()
            movements.append(movement)
    except (WebSocketDisconnect, ConnectionClosedOK, ConnectionClosedError):
        manager.disconnect(websocket)
