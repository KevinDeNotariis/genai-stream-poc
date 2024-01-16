# GenAI stream POC

This repo contains a POC that implements a streaming of the response from an LLM back to a frontend (via a middle backend (kinda proxy)).

This POC will spin up 3 *servers*:

1. Frontend written in React
2. Backend using ExpressJS
3. API written in Python using FastAPI

To set up the project and spin up the containers:

1. Configure the `api/app/.env` by taking a look at the `.env.example`
2. Run `docker compose up --build`


In VSCode, To have locally intellisense:

1. Setup the local python environment:

    1. `python3 -m venv .venv`
    2. `source .venv/bin/activate`
    3. `pip3 install -r api/app/requirements.txt`

    (Reload the VSCode window)

2. Install Node dependencies:

    1. Inside `backend/app` run `npm i`
    2. Inside `frontend/app` run `npm i`