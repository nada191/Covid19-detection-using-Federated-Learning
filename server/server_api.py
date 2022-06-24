import json
import os
from urllib.request import Request
# from server import launch_fl_session
import fastapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Request
import shutil

from server.server import launch_fl_session
import mysql.connector as MC
from datetime import datetime


conn = MC.connect(host='localhost', database='mysql', user='root', password='')



app = FastAPI()
origins = [
    "*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

default_ip="localhost"


# num_rounds:parseInt(launch.num_rounds),
# ipaddress:launch.ipaddress,
# port:parseInt(launch.port),
# resume:launch.resume



@app.post("/launchFL")
async  def launch_session(fastapi_req: Request):
       body = await fastapi_req.body()
       my_json = body.decode('utf8').replace("'", '"')
       data = json.loads(my_json)
       print(data["ipaddress"])

       # return True

       # launch_fl_session(int(data["num_rounds"]), data["ipaddress"], data["port"], data["resume"])
       # path = os.getcwd()
       # os.makedirs(f'./nada')
       with open('/Users/macbookair/Desktop/Projet_pfe-main/server/strategy_coefs.json', 'r+') as file:
           config = json.load(file)
           config["min_available_clients"] = int(data["num_clients"])
           config["min_evaluation_clients"] = int(data["num_clients"])
           config["min_fitting_clients"] = int(data["num_clients"])
           file.seek(0)
           json.dump(config, file, indent=4)

       cursor = conn.cursor()
       req = 'select * from client'
       cursor.execute(req)
       clientlist = cursor.fetchall()
       for client in clientlist:
            # i+/=1
            print(client[0])
            reqnotif = """INSERT INTO notification (id_client, id_server, state, notif_date) VALUES (%s,%s,%s,%s)"""
            # print(cursor.lastrowid)
            infos = (client[0],10,0, datetime.now())
            cursor.execute(reqnotif, infos)
            conn.commit()
       launch_fl_session(int(data["num_rounds"]), data["ipaddress"], data["port"], data["resume"])

       with open('/Users/macbookair/Desktop/Projet_pfe-main/server/evaluation.json', 'r+') as file:
           config = json.load(file)
           acc = "{:.2f}".format(config["session"][-1][list(config["session"][-1].keys())[0]]["global_accuracy"])
           sess = list(config["session"][-1].keys())[0]
       print({"session": sess, "num_rnds": data["num_rounds"], "accuracy": acc})
       reqhist = """INSERT INTO historique_server (session_date, nb_rounds, accuracy) VALUES (%s,%s,%s)"""
       infos_hist = (sess, data["num_rounds"], acc)
       cursor.execute(reqhist, infos_hist)
       conn.commit()
       return {"session": sess, "num_rnds": data["num_rounds"], "accuracy": acc}


@app.get("/selectHist")
def select_hist():
    cursor = conn.cursor()
    req = 'select * from historique_server'
    cursor.execute(req)
    hist_list = cursor.fetchall()
    return hist_list

# @app.get("/selectNotif")
# def select_notif():
#     cursor = conn.cursor()
#     req = 'select center_org.server_name, notification.state, notification.notif_date, client.id from notification, client, center_org where id_client=client.id and id_server=center_org.id and state=0'
#     cursor.execute(req)
#     notif_list = cursor.fetchall()
#     return notif_list
#
# @app.put("/clientAccept")
# async def update_state_accept(fastapi_req: Request):
#     cursor = conn.cursor()
#     body = await fastapi_req.body()
#     my_json = body.decode('utf8').replace("'", '"')
#     data = json.loads(my_json)
#     reqnotif = """UPDATE notification set state = %s where id_client = %s and notif_date = %s"""
#     # print(cursor.lastrowid)
#     infos = (1, data["client_id"], data["notif_date"])
#     cursor.execute(reqnotif, infos)
#     conn.commit()
#     print('clientid',data["client_id"])
#     print('notif date',data["notif_date"])
#     return True
#     # fl.client.start_numpy_client('127.0.0.1' + ":" + str(8080), client=client)
#
# @app.put("/clientDecline")
# async def update_state_decline(fastapi_req: Request):
#     cursor = conn.cursor()
#     body = await fastapi_req.body()
#     my_json = body.decode('utf8').replace("'", '"')
#     data = json.loads(my_json)
#     reqnotif = """UPDATE notification set state = %s where id_client = %s and notif_date = %s"""
#     # print(cursor.lastrowid)
#     infos = (2, data["client_id"], data["notif_date"])
#     cursor.execute(reqnotif, infos)
#     conn.commit()
#     return True