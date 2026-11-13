---
title: "Safe docs: a document opens only for the right face"
where: "College project, UTEC · 2020"
summary: "Passwords protect the account, not the person. This web platform matches a live webcam capture against the recipient's enrolled face before a shared document opens. There is no anti-spoofing, so a photo could fool it, which is the first thing a production version would need. The 28 second demo runs the original 2020 code; a photo stands in for the webcam, which is exactly the spoofing gap."
shows: "a computer vision model wired into a working product, end to end."
metrics: []
stack: "Flask · OpenCV · face_recognition (dlib)"
code: "https://github.com/joaquinramirezg/safe-docs"
order: 4
earlier: true
short: "Safe docs"
oneLine: "A shared document opens only after a live face match with its recipient."
thumb: "<video controls playsinline preload=\"none\" poster=\"/projects/safe-docs/demo-poster.webp\" width=\"1280\" height=\"712\" aria-label=\"Safe docs demo: log in, the face check matches the registered user and the send-documents page opens; a different face is refused\"><source src=\"/projects/safe-docs/demo.mp4\" type=\"video/mp4\"></video>"
---
