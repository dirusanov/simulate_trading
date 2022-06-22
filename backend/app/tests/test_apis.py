from http import HTTPStatus

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_api_get_tickers():
    response = client.get("/api/tickers")
    response_data = response.json()
    assert isinstance(response_data, list)
    assert response.status_code == HTTPStatus.OK
