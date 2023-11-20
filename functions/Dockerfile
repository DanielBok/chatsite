FROM python:3.11.6-bullseye

WORKDIR /app
COPY ["Pipfile", "Pipfile.lock", "./"]
RUN pip install pipenv && pipenv install --system --deploy --ignore-pipfile

COPY . .

ENTRYPOINT ["uvicorn", "src.app:create_app", "--host", "0.0.0.0", "--port", "80"]
