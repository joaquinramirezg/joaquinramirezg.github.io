---
title: "Fraud detection across 35 financial institutions"
where: "Canvia · Data Scientist · Dec 2023 – Dec 2024"
summary: "Real-time anomaly detection (Isolation Forest) on transactions moving between 35 of Peru's leading financial institutions. The system automatically flags the highest-risk ~2% for human review instead of asking analysts to watch everything."
metrics: ["35 institutions", "~2% flagged, real time"]
stack: "Isolation Forest · anomaly detection · Python"
order: 5
compact: false
pageTitle: "Fraud detection across 35 financial institutions"
minutes: 1
angle: "Canvia · unsupervised learning under real-world constraints"
description: "Real-time anomaly detection (Isolation Forest) on transactions moving between 35 of Peru's leading financial institutions."
tldr: {"problem": "Spot fraud in real-time transfers between 35 Peruvian financial institutions, with no fraud labels to learn from.", "role": "I inherited an MVP that flagged about 9% of transactions, redesigned the features and the Isolation Forest model, and served it through an on-premise FastAPI service.", "result": "Flags brought in line with the client's ~2% review threshold, in real time."}
---
<h2>What it watched</h2>
<p>Interbank transfers between 35 of Peru's leading financial institutions, in real time. The feature engineering encoded what fraud tends to look like: account age, deviation from a person's normal transfer amounts, transfers between someone's own accounts across different banks, activity at unusual hours, unusual bank-to-bank combinations. The model then decided what was anomalous in that feature space.</p>
<h2>Why Isolation Forest</h2>
<p>The client could not provide fraud labels, which rules out supervised learning and is exactly the setting unsupervised anomaly detection exists for. I inherited a first MVP that flagged around 9% of transactions, far more than review capacity. I redesigned the features and the model and brought flags in line with the client's ~2% operating threshold. With labels, I would revisit the choice: semi-supervised methods or a supervised model trained on confirmed cases could well beat it.</p>
<figure class="fig">
<div class="fig-scroll">
<svg viewBox="0 0 520 330" role="img" aria-label="How one interbank transfer is scored in real time. Features about the account and the transfer feed an Isolation Forest trained without fraud labels. The most anomalous share of transfers, about 2 percent, goes to human review; the rest passes. The first MVP flagged about 9 percent.">
<defs><marker id="arf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="dg-a"/></marker></defs>
<rect class="dg-box" x="10" y="14" width="150" height="54" rx="10"/>
<text class="dg-t" x="85" y="37" text-anchor="middle">Interbank transfer</text>
<text class="dg-s" x="85" y="55" text-anchor="middle">35 institutions, live</text>
<line class="dg-l" x1="160" y1="41" x2="182" y2="41" marker-end="url(#arf)"/>
<rect class="dg-box" x="186" y="8" width="176" height="128" rx="10"/>
<text class="dg-t" x="274" y="30" text-anchor="middle">Features</text>
<text class="dg-s" x="198" y="52">account age</text>
<text class="dg-s" x="198" y="70">vs. usual amounts</text>
<text class="dg-s" x="198" y="88">own accounts, other banks</text>
<text class="dg-s" x="198" y="106">unusual hours</text>
<text class="dg-s" x="198" y="124">unusual bank pairs</text>
<line class="dg-l" x1="362" y1="41" x2="386" y2="41" marker-end="url(#arf)"/>
<rect class="dg-key" x="390" y="14" width="120" height="54" rx="10"/>
<text class="dg-k" x="450" y="37" text-anchor="middle">Isolation Forest</text>
<text class="dg-s" x="450" y="55" text-anchor="middle">no fraud labels</text>
<line class="dg-l" x1="450" y1="68" x2="450" y2="160" marker-end="url(#arf)"/>
<text class="dg-s" x="442" y="100" text-anchor="end">anomaly score</text>
<rect class="dg-key" x="370" y="164" width="140" height="48" rx="10"/>
<text class="dg-k" x="440" y="186" text-anchor="middle">Top ~2%</text>
<text class="dg-s" x="440" y="203" text-anchor="middle">to human review</text>
<rect class="dg-box" x="200" y="164" width="140" height="48" rx="10"/>
<text class="dg-t" x="270" y="186" text-anchor="middle">The other ~98%</text>
<text class="dg-s" x="270" y="203" text-anchor="middle">pass through</text>
<polyline class="dg-l" points="430,140 270,140 270,160" marker-end="url(#arf)"/>
<rect class="dg-group" x="190" y="152" width="330" height="70" rx="12"/>
<text class="dg-s" x="198" y="238">served by a FastAPI service, on-premise, no cloud</text>
<text class="dg-t" x="10" y="270">Share of transfers flagged</text>
<rect class="pt-before" x="10" y="282" width="270" height="14" rx="3"/>
<text class="dg-s" x="288" y="294">first MVP, ~9%: more than review capacity</text>
<rect class="pt-after" x="10" y="306" width="60" height="14" rx="3"/>
<text class="dg-k" x="78" y="318">redesign, ~2%: the client's threshold</text>
</svg>
</div>
<figcaption>What the model sees and where its output goes. The 2% is the client's review capacity, not a measured precision.</figcaption>
</figure>
<h2>What real time required</h2>
<p>A fast, concurrent API (FastAPI), hosted on-premise with no cloud services allowed, which meant working hand in hand with the infrastructure team on latency and concurrency budgets.</p>
<h2>Scope, honestly</h2>
<p>The 2% threshold was the client's operating requirement, sized to their review capacity. A deeper analysis of false positives against missed fraud sat outside the engagement's scope: our mandate was the model and the flagging API, and the client consumed the alerts downstream. If I owned the product end to end, that precision-recall analysis is the first thing I would add.</p>
