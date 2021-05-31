From python:latest
ADD . .

ENV FLASK_APP=server
ENV FLASK_RUN_HOST=0.0.0.0

Run pip install flask
Run pip install flask-cors

expose 5000
CMD ["flask", "run"]
