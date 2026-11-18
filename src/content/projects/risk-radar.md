---
title: "Risk Radar: what the S&P 100 is suddenly worried about"
where: "Solo project · Nov 2026 · live"
summary: "Every S&P 100 annual report's risk factors compared with last year's, an AI analyst that answers questions with the exact sentences as proof and a measured accuracy, and 808 public forecasts of what each company will add to its next 10-K, to be graded when the filings land."
bullets: ["An AI analyst over 204 annual reports that cites the sentence behind every claim: 83% of answers correct on 54 test questions, 9 of 9 unanswerable questions declined, $0.0006 an answer.", "Compares each company's risk factors with last year's: 80 of 102 added or expanded AI risk, 26 of 53 that named ESG dropped it.", "808 forecasts of what each company will warn about next, committed before the filings exist; one year back they beat the base rate (Brier 0.166 vs 0.182)."]
shows: "an AI product with its accuracy, cost and failures measured and published, not just a demo."
metrics: ["83% correct (n=54)", "102 companies, 204 10-Ks", "808 public forecasts"]
stack: "Python · JavaScript · Claude API (Haiku 5.5) · embeddings (bge-small) · Vercel · GitHub Actions"
code: "https://github.com/joaquinramirezg/risk-radar"
demo: "https://risk-radar-ten.vercel.app"
order: 0
thumb: "<img src=\"/p/risk-radar.webp\" alt=\"Risk Radar board: the S&P 100 as tiles, lit by the risk themes each company added this year\" width=\"800\" height=\"480\" loading=\"lazy\" decoding=\"async\">"
kicker: "Project · solo · four versions"
byline: "Built Nov 2026 · live at risk-radar-ten.vercel.app · code public"
lead: "A public site that reads the risk factors in every S&P 100 annual report, shows what each company added, dropped or rewrote since last year, answers questions about them with the exact sentence as proof, and publishes forecasts of what each company will warn about next."
pageMetrics: ["83% of answers correct (72% to 93%, n=54)", "80 of 102 added or expanded AI risk", "Brier 0.166 vs 0.182 base rate"]
note: "Ask has a small daily budget. The example questions are answered from stored runs and always work."
description: "Solo project: S&P 100 10-K risk factors compared year over year, an AI analyst with measured accuracy (83% correct, cites every claim), and 808 public forecasts to be graded on the 2027 filings."
ogAlt: "Risk Radar: what the S&P 100 is suddenly worried about. 83% of answers correct, 102 companies, 808 public forecasts"
---
<figure class="demo">
<video class="demo-video" controls playsinline preload="none" poster="/projects/risk-radar/demo-poster.webp" width="1440" height="900" aria-label="Demo of Risk Radar: the S&P 100 board, a question about ESG answered with cited sentences, and the forecast page">
<source src="/projects/risk-radar/demo.mp4" type="video/mp4">
</video>
<figcaption>The live site: the board of the S&P 100, a question answered with the sentences that back it, and the forecast for each company.</figcaption>
</figure>
<h2>The result</h2>
<p>Four versions, each answering one question, each with one number that says whether it worked.</p>
<div class="tbl-scroll">
<table class="ptable">
<thead><tr><th>Version</th><th>The question</th><th>The number</th></tr></thead>
<tbody>
<tr><td>v1, the radar</td><td>What did each S&P 100 company change in its risk factors this year?</td><td><strong>80 of 102</strong> added or expanded AI risk; 26 of 53 that named ESG dropped it</td></tr>
<tr><td>v2, Ask the filings</td><td>Can anyone ask the filings a question and trust the answer?</td><td><strong>83%</strong> of answers correct (72% to 93%), 9 of 9 unanswerable questions declined, $0.0006 an answer</td></tr>
<tr><td>v3, the forecast</td><td>What will each company add to its next 10-K, in a way that can be checked?</td><td>Backtest Brier <strong>0.166</strong> against 0.182 for the base rate, on 808 forecasts</td></tr>
<tr><td>v4, in public</td><td>Does it hold up in use?</td><td>Counting questions answered right: <strong>16 of 30 before, 29 of 30 after</strong> fixing a failure found in use</td></tr>
</tbody>
</table>
</div>
<h2>Decisions</h2>
<ul>
<li><strong>A measured product, not a chat demo.</strong> A question box over documents is a tutorial project in 2026. What is scarce is knowing how often it is right, so every version ships with its measurement: a 63-question test set, a model grader checked against 30 answers I graded by hand (same verdict 26 times; stricter 3 times, more lenient once), and the failures quoted on the site.</li>
<li><strong>The cheaper model, because the eval said so.</strong> Claude Sonnet 5.5 answered 9 more questions in 100 correctly than Haiku 5.5, but the 95% interval runs from -2 to 20 and it costs 18 times more. Haiku ships. A stricter grounding prompt dropped correct answers to 72% and was reverted.</li>
<li><strong>No claim without a sentence.</strong> Every sentence the search returns gets a number for that request, the answer must cite those numbers, and the server blocks any answer that cites a sentence the search never returned. Across the test set that check blocked nothing, and it is what makes an answer checkable.</li>
<li><strong>A hard budget of $2 a month.</strong> Example questions are answered once and served from a file, each visitor gets 5 questions a day, the server stops at 60, and the API workspace has a spending limit. Rerun at these limits, accuracy did not move.</li>
<li><strong>Forecasts that can be wrong in public.</strong> Describing last year is easy to make look good. The forecasts are committed before the 2027 filings exist, the scorer refuses any forecast made after a company's filing date, and CI fails if a frozen forecast changes. The edge over the base rate is modest, and the page says so first.</li>
<li><strong>Left out on purpose:</strong> news feeds (licensing and noise), more themes, a bigger model.</li>
</ul>
<h2>A failure, fixed in public</h2>
<p>Asked "Which companies stopped mentioning ESG?", Ask said none had, while the front page showed 26 of 53. The cause: its counting tool covered six themes, and the data on terms companies dropped (ESG, COVID-19) was never connected to it. The test set asks about one company at a time, so it never caught this. I added ten counting questions scored exactly against the site's own numbers, connected the data, and reran: <strong>16 of 30 before, 29 of 30 after</strong> (three runs each). The full test set, rerun after the fix, scored 78% (67% to 89%), within the run-to-run noise of the published 83%; none of the answers that changed used the fixed tool.</p>
<h2>How it works</h2>
<ol>
<li><strong>Read.</strong> The two latest 10-Ks of each S&amp;P 100 company from SEC EDGAR; the risk factor section split into individual risks.</li>
<li><strong>Compare.</strong> Each risk matched to last year's version by meaning (embeddings, one-to-one), with splits and merges detected; each edit labelled new exposure, escalated, softened or boilerplate by an AI classifier checked against labels.</li>
<li><strong>Answer.</strong> A small agent with four search tools: hybrid search (keywords plus meaning), one company's changes, last year against this year for one risk, and counts across all companies.</li>
<li><strong>Forecast.</strong> Signals from what companies filed since their last 10-K (quarterly risk factor updates, 8-K events, the company's own trend), a logistic model scored against two baselines one year back.</li>
<li><strong>Watch.</strong> Tests and a data consistency check on every push; a check every six hours that the site and the AI are up.</li>
</ol>
<h2>Limits</h2>
<ul>
<li>The test questions and the labels were written by AI models, and the site says so wherever a number is quoted; I graded 30 answers by hand to check the grader.</li>
<li>The forecasts are a draft until frozen in January 2027, and the real score exists only after the February to March 2027 filings.</li>
<li>The risk factor section in quarterly reports could not be read for 12 companies, mostly banks and drug makers.</li>
</ul>
<h2>Next</h2>
<p>When the 2027 10-Ks land, the pipeline reads each new filing, scores every forecast and publishes the result, right or wrong, with a calibration chart against the base rate.</p>
