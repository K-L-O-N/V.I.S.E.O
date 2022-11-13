import time

import autopy as ap
import cv2
import numpy as np

import HandMotionModeule as hmm


def main():

    detector = hmm.handDetector(maxHands=1)
    wScr, hScr = ap.screen.size()
    clocX, clocY = 0, 0
    plocX, plocY = 0, 0
    frameR = 200
    smoothening = 10
    wCam, hCam = 1280, 720
    isReady = False
    isMenu = False

    cap = cv2.VideoCapture(0)
    cap.set(3,wCam)
    cap.set(4,hCam)
    count = 0

    while True:
        ret, frame = cap.read()
        frame = detector.findHands(frame)
        lmList, bbox = detector.findPosition(frame)

        if len(lmList) != 0:
            if bbox[3] - bbox[1] < 80 or bbox[2] - bbox[0] < 80:
                continue
            x1, y1 = lmList[4][1:]
            x2, y2 = lmList[8][1:]

        fingers = detector.fingersUp()
        # print(fingers)
        if isReady is False:
            if fingers == [0, 0, 0, 0, 0]:
                isReady = True

        if isReady is True and isMenu is False:
            if fingers == [1, 1, 1, 1, 1]:

                isMenu = True
                ap.key.tap(ap.key.Code.HOME)


        if isMenu:
            cv2.putText(frame, "Menu Field", (frameR, frameR-5), 0, 2, (0, 255, 0), 3)
            cv2.rectangle(frame, (frameR, frameR), (wCam - frameR, hCam - frameR),
                          (255, 0, 255), 2)
            if fingers == [1, 1, 0, 0, 0] or count == 1:
                x3 = np.interp(x1, (frameR, wCam - frameR), (0, wScr))
                y3 = np.interp(y1, (frameR, hCam - frameR), (0, hScr))
                clocX = plocX + (x3 - plocX) / smoothening
                clocY = plocY + (y3 - plocY) / smoothening
                # 마우스 움직임
                ap.mouse.move(wScr - clocX, clocY)
                cv2.circle(frame, (x1, y1), 15, (255, 0, 255), cv2.FILLED)
                plocX, plocY = clocX, clocY

            #마우스 토글
            if fingers[0] == 1 and fingers[1] == 0:
                if count < 1:
                    ap.mouse.toggle(ap.mouse.Button.LEFT, True)
                    cv2.circle(frame, (x2, y2), 15, (255, 0, 255), cv2.FILLED)
                    count += 1
            else:
                if count > 0:
                    ap.mouse.toggle(ap.mouse.Button.LEFT, False)
                    count = 0

            if fingers == [0, 0, 0, 0, 0]:

                isMenu = False
                isReady = False
                ap.key.tap(ap.key.Code.END)



        if fingers == [0, 0, 0, 0, 0]:
            cv2.putText(frame, "Close", (bbox[0], bbox[3]), 0, 2, (0, 255, 0), 3)
        elif fingers == [1, 1, 1, 1, 1]:
            cv2.putText(frame, "Open", (bbox[0], bbox[3]), 0, 2, (0, 255, 0), 3)
        elif fingers == [1, 1, 0, 0, 0]:
            cv2.putText(frame, "Move", (bbox[0], bbox[3]), 0, 2, (0, 255, 0), 3)
        elif fingers == [1, 0, 0, 0, 0]:
            cv2.putText(frame, "Click", (bbox[0], bbox[3]), 0, 2, (0, 255, 0), 3)

        cv2.imshow('test', frame)
        keycode = cv2.waitKeyEx(1)
        if keycode == 0x240000:
            print("OK")
        elif keycode == 0x230000:
            print("end")



if __name__ == "__main__":
    main()