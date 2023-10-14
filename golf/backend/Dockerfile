FROM python:3.11.6-alpine

RUN apt-get update -y && apt-get upgrade -y

WORKDIR /app
COPY ["Pipfile", "Pipfile.lock", "./"]
RUN pip install pipenv && pipenv install --system --deploy --ignore-pipfile

COPY . .

ENTRYPOINT ["uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "80"]
