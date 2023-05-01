from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://casualink.onrender.com',
        'https://casualink.onrender.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# @socketio.on("connect")
# def handle_connect():
#     print('Client connected')

# # handle chat messages


# @socketio.on("chat")
# def handle_chat(data):
#     emit("chat", data, broadcast=True)


@socketio.on("auction_bid")
def handle_bid(data):
    current_bid = data["current_bid"]
    emit("update_bid", current_bid, broadcast=True)
