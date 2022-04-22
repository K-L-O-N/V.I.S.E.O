import cv2
import numpy as np
import HandMotionModeule as hmm
import pyautogui as pag
import time
import threading

global frame, x1, y1, x2, y2

cap = cv2.VideoCapture(0)
cap.set(3,1480)
cap.set(4,1042)

detector = hmm.handDetector(maxHands = 1)
wScr, hScr = pag.size()

while True:
    ret, frame = cap.read()
    frame = detector.findHands(frame)
    lmList, bbox = detector.findPosition(frame)
    if len(lmList) != 0:
        x1, y1 = lmList[8][1:]
        x2, y2 = lmList[12][1:]

    fingers = detector.fingersUp()
    # print(fingers)
    if fingers == [0,1,1,0,0]:
        print("Move Mode")
        if checkPosition == "":
            checkPosition = y1
        if checkPosition - y1 < -100:
            cv2.putText(frame, "Menu Open!", (100,100), 0, 2, (0,255,0), 3)
    else:
        checkPosition = ""

    cv2.imshow('test', frame)
    cv2.waitKey(1)
