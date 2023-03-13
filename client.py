import socket
import threading
import time

# Запрос данных у пользователя
name = input("Введите свое имя: ")
sender_port = int(input("Введите порт отправителя: "))
receiver_port = int(input("Введите порт получателя: "))

# Создание udp сокетов
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client_socket.bind(("localhost", sender_port))

recv_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Прием сообщений
def recv_msg():
    while True:
        msg, addr = client_socket.recvfrom(1024)
        print(msg.decode())

threading.Thread(target=recv_msg).start()

# Отправка и получение сообщений
while True:
    message = input('')
    struct = time.localtime(time.time())
    now = time.strftime('%d.%m.%Y %H:%M', struct)
    print(now)
    message = f'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz\n{name}: {message}\n{now}\nzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
    recv_socket.sendto(message.encode(), ("localhost", receiver_port))