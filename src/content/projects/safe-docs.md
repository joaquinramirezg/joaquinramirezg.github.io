---
title: "Safe docs: a document opens only for the right face"
where: "College project, UTEC · 2020"
summary: "Passwords protect the account, not the person. This web platform matches a live webcam capture against the recipient's enrolled face before a shared document opens. An honest limit: there is no anti-spoofing, so a photo could fool it, which is the first thing a production version would need."
shows: "a computer vision model wired into a working product, end to end."
metrics: []
stack: "Flask · OpenCV · face_recognition (dlib)"
code: "https://github.com/joaquinramirezg/safe-docs"
order: 4
thumb: "<svg viewBox=\"0 0 250 150\" role=\"img\" aria-label=\"Safe docs flow: a webcam frame is encoded and matched against the enrolled face; a match opens the document, no match keeps it locked\">\n<rect class=\"dg-box\" x=\"8\" y=\"24\" width=\"72\" height=\"34\" rx=\"6\"/>\n<text class=\"dg-t\" x=\"44\" y=\"46\" text-anchor=\"middle\">Webcam</text>\n<rect class=\"dg-box\" x=\"90\" y=\"24\" width=\"68\" height=\"34\" rx=\"6\"/>\n<text class=\"dg-t\" x=\"124\" y=\"46\" text-anchor=\"middle\">Encode</text>\n<rect class=\"dg-key\" x=\"168\" y=\"24\" width=\"74\" height=\"34\" rx=\"6\"/>\n<text class=\"dg-k\" x=\"205\" y=\"46\" text-anchor=\"middle\">Match?</text>\n<line class=\"dg-l\" x1=\"80\" y1=\"41\" x2=\"86\" y2=\"41\"/><path class=\"dg-a\" d=\"M90 41 l-5 -3 v6 z\"/>\n<line class=\"dg-l\" x1=\"158\" y1=\"41\" x2=\"164\" y2=\"41\"/><path class=\"dg-a\" d=\"M168 41 l-5 -3 v6 z\"/>\n<line class=\"dg-l\" x1=\"222\" y1=\"58\" x2=\"222\" y2=\"88\"/><path class=\"dg-a\" d=\"M222 92 l-3 -5 h6 z\"/>\n<text class=\"dg-s\" x=\"228\" y=\"80\">yes</text>\n<polyline class=\"dg-l\" points=\"186,58 186,74 58,74 58,88\"/><path class=\"dg-a\" d=\"M58 92 l-3 -5 h6 z\"/>\n<text class=\"dg-s\" x=\"118\" y=\"69\" text-anchor=\"middle\">no</text>\n<rect class=\"dg-box\" x=\"8\" y=\"94\" width=\"100\" height=\"34\" rx=\"6\"/>\n<text class=\"dg-t\" x=\"58\" y=\"116\" text-anchor=\"middle\">Stays locked</text>\n<rect class=\"pt-ok\" x=\"160\" y=\"94\" width=\"82\" height=\"34\" rx=\"6\"/>\n<text class=\"dg-t\" x=\"201\" y=\"116\" text-anchor=\"middle\">Doc opens</text>\n</svg>"
---
