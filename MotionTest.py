import cv2
import numpy as np
import HandMotionModeule as hmm
import autopy as ap
import time
import threading

def main():

    detector = hmm.handDetector(maxHands = 1)
    wScr, hScr = ap.screen.size()
    clocX, clocY = 0, 0
    plocX, plocY = 0, 0
    frameR = 200
    smoothening = 7
    wCam, hCam = 1280, 960
    isMenu = False

    cap = cv2.VideoCapture(0)
    cap.set(3,wCam)
    cap.set(4,hCam)

    while True:
        ret, frame = cap.read()
        frame = detector.findHands(frame)
        lmList, bbox = detector.findPosition(frame)

        if len(lmList) != 0:
            if bbox[3] - bbox[1] < 100 or bbox[2] - bbox[0] < 100:
                print("작은 크기")
                cv2.imshow('test', frame)
                cv2.waitKey(1)
                continue
            x1, y1 = lmList[8][1:]
            x2, y2 = lmList[12][1:]

        fingers = detector.fingersUp()
        # print(fingers)
        if isMenu is False:
            if fingers == [0,1,1,0,0]:
                length, frame, lineInfo = detector.findDistance(8, 12, frame)
                cv2.circle(frame, (lineInfo[4], lineInfo[5]), 15, (0,255,0), cv2.FILLED)
                if checkPosition == "":
                    checkPosition = lineInfo[5]
                if checkPosition - lineInfo[5] < -100:
                    isMenu = True
            else:
                checkPosition = ""

        if isMenu:
            cv2.putText(frame, "Menu Open!", (100, 100), 0, 2, (0, 255, 0), 3)
            cv2.rectangle(frame, (frameR, frameR), (wCam - frameR * 3, hCam - frameR * 2),
                          (255, 0, 255), 2)
            if fingers[0] == 0 and fingers[1] == 1:
                x3 = np.interp(x1, (frameR, wCam - frameR * 3), (0, wScr))
                y3 = np.interp(y1, (frameR, hCam - frameR * 2), (0, hScr))
                clocX = plocX + (x3 - plocX) / smoothening
                clocY = plocY + (y3 - plocY) / smoothening
                ap.mouse.move(wScr - clocX, clocY)
                cv2.circle(frame, (x1, y1), 15, (255, 0, 255), cv2.FILLED)
                plocX, plocY = clocX, clocY
            if fingers[1] == 1 and fingers[2] == 1:
                    ap.mouse.toggle(ap.mouse.Button.LEFT, True)
            if fingers[2] == 0:
                    ap.mouse.toggle(ap.mouse.Button.LEFT, False)

            if fingers == [0,0,0,0,0]:
                isMenu = False

        cv2.imshow('test', frame)
        cv2.waitKey(1)

if __name__ == "__main__":
    main()