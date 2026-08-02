FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY pyproject.toml ./
COPY app.py ./

RUN pip install --upgrade pip && pip install .

EXPOSE 8000

CMD ["python", "app.py"]
