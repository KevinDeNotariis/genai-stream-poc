import os

import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from langchain_openai import AzureChatOpenAI
from dotenv import load_dotenv

load_dotenv()

PORT = 3005

app = FastAPI()


AZURE_ENDPOINT = os.environ["AZURE_ENDPOINT"]
OPENAI_API_VERSION = os.environ["OPENAI_API_VERSION"]
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
DEPLOYMENT_NAME = os.environ["DEPLOYMENT_NAME"]


async def stream():
    chat = AzureChatOpenAI(
        model="gpt-35-turbo",
        temperature=0.7,
        max_tokens=256,
        azure_endpoint=AZURE_ENDPOINT,
        openai_api_version=OPENAI_API_VERSION,
        openai_api_key=OPENAI_API_KEY,
        streaming=True,
        top_p=0.9,
        deployment_name=DEPLOYMENT_NAME,
    )

    _stream = chat.stream("Can you write me a short poem about Quantum mechanics as if it were written by Shakespeare?")

    for chunk in _stream:
        yield chunk.content


@app.get("/")
async def root():
    return StreamingResponse(stream())


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=PORT)
