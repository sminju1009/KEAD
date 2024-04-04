FROM python:3.9

# 작업 디렉토리를 설정합니다.
WORKDIR /flask

COPY . /flask

# 필요한 파일을 복사하고 패키지를 설치합니다.
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN pip install flask_cors
RUN pip install --no-cache-dir Flask Flask-Migrate Flask-SQLAlchemy mysql-connector-python scipy
RUN pip install gunicorn

# Flask 애플리케이션을 실행합니다.
CMD ["gunicorn", "flask_recommend:app", "-w", "4", "--bind", "0.0.0.0:5000"]
