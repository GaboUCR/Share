From python:latest
WORKDIR /code
ADD . /server
ENV FLASK_APP=server
ENV FLASK_RUN_HOST=0.0.0.0
Run pip install flask
Run pip install flask-cors
CMD ["flask", "run"]
