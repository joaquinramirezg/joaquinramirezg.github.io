---
title: "Contract allocation for a commodity exporter"
where: "Canvia (IT consulting) · Data Scientist · Dec 2023 – Dec 2024"
summary: "A fishmeal exporter planned its contract allocation by hand, two weeks per cycle. I built the product classification and allocation algorithm that now does it in under 20 minutes, raising estimated gross margin by ~55% and cutting operating costs by ~40%. I presented the results to about 15 client stakeholders, including VPs."
metrics: ["est. gross margin +55%", "costs −40%", "2 weeks → <20 min"]
stack: "Python · scikit-learn · optimization"
order: 4
compact: false
pageTitle: "Contract allocation for a commodity exporter"
minutes: 2
angle: "Canvia · turning a two-week manual process into a 20-minute optimization"
description: "A fishmeal exporter planned its contract allocation by hand, two weeks per cycle."
tldr: {"problem": "A fishmeal exporter planned blends and contract allocation by hand: around five analysts in Excel, two weeks per cycle.", "role": "I built the branch-and-bound allocation, deployed it on the client's Azure Power Apps, and presented the results to about 15 stakeholders, including VPs.", "result": "Planning went from two weeks to under 20 minutes; the client's month of testing estimated gross margin +55% and operating costs −40%."}
---
<h2>The problem, from zero</h2>
<p>Fishmeal sells by quality band (super prime, prime, and lower grades), and a pile's band is determined by its measured composition: protein, fat, histamine, and other metrics. The interesting part is that piles can be blended, and blending produces a new pile with a new composition. The goal is not to maximize premium volume; it is to maximize revenue across all contracts. And blending has hard constraints: some piles can be blended up into a higher band, while others can never reach it no matter what you mix them with.</p>
<p>Allocation adds a second layer. Clients contract tonnage per quality band, and partial fulfillment is not free: if a contract takes most of a quality's stock, the leftover tons must still meet that band's composition to be sellable later. Piles come in fractional weights and live in physical bags, and splitting a bag is expensive and slow, so the plan has to hit contract tonnage as closely as possible while splitting as few bags as possible and keeping every composition constraint intact.</p>
<h2>What existed before</h2>
<p>Around five analysts working across Excel sheets, hand-picking piles by trial and error, hoping to maximize revenue. Two weeks of planning even for small contracts.</p>
<h2>What I built</h2>
<p>A branch-and-bound search over blend and allocation combinations: I enumerated the combinations as a tree and pruned aggressively, cutting a whole branch as soon as partial results proved it could not contain a better solution. Planning went from two weeks to under 20 minutes. The client asked for delivery through Azure Power Apps, so that is how it was deployed, and I presented results to about 15 client stakeholders, including VPs. Building on their stack instead of the one I would have picked, then standing in their room to defend the numbers, is the forward deployed shape of this work, and it is the part I want more of.</p>
<figure class="fig">
<div class="fig-scroll">
<svg viewBox="0 0 520 300" role="img" aria-label="Branch-and-bound over blend and allocation choices. Each level of the tree fixes one more decision; a branch is cut as soon as its best possible revenue cannot beat the best complete plan found so far. Constraints checked along the way: band composition, contract tonnage, and as few bag splits as possible.">
<defs><marker id="ara" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="dg-a"/></marker></defs>
<rect class="dg-box" x="110" y="10" width="150" height="40" rx="10"/>
<text class="dg-t" x="185" y="35" text-anchor="middle">Piles + contracts</text>
<line class="dg-l" x1="185" y1="50" x2="85" y2="92" marker-end="url(#ara)"/>
<line class="dg-l" x1="185" y1="50" x2="285" y2="92" marker-end="url(#ara)"/>
<text class="dg-s" x="90" y="72">blend A</text>
<text class="dg-s" x="245" y="72">blend B</text>
<rect class="dg-box" x="20" y="96" width="130" height="40" rx="10"/>
<text class="dg-t" x="85" y="121" text-anchor="middle">Allocate</text>
<rect class="dg-box" x="220" y="96" width="130" height="40" rx="10"/>
<text class="dg-t" x="285" y="121" text-anchor="middle">Allocate</text>
<line class="dg-l" x1="85" y1="136" x2="45" y2="178" marker-end="url(#ara)"/>
<line class="dg-l" x1="85" y1="136" x2="125" y2="178" marker-end="url(#ara)"/>
<line class="dg-l" x1="285" y1="136" x2="245" y2="178" marker-end="url(#ara)"/>
<line class="dg-l" x1="285" y1="136" x2="325" y2="178" marker-end="url(#ara)"/>
<rect class="dg-box" x="10" y="182" width="70" height="36" rx="8"/>
<text class="dg-s" x="45" y="204" text-anchor="middle">cut</text>
<rect class="dg-box" x="90" y="182" width="70" height="36" rx="8"/>
<text class="dg-s" x="125" y="204" text-anchor="middle">cut</text>
<rect class="pt-ok" x="210" y="182" width="70" height="36" rx="8"/>
<text class="dg-t" x="245" y="204" text-anchor="middle">best plan</text>
<rect class="dg-box" x="290" y="182" width="70" height="36" rx="8"/>
<text class="dg-s" x="325" y="204" text-anchor="middle">cut</text>
<text class="dg-s" x="10" y="246">cut = its best possible revenue cannot beat the best</text>
<text class="dg-s" x="10" y="262">complete plan found so far, so the whole branch is skipped</text>
<rect class="dg-group" x="380" y="10" width="132" height="208" rx="12"/>
<text class="dg-k" x="446" y="34" text-anchor="middle">Every plan must</text>
<text class="dg-s" x="392" y="62">keep each band's</text>
<text class="dg-s" x="392" y="78">composition</text>
<text class="dg-s" x="392" y="104">hit contract</text>
<text class="dg-s" x="392" y="120">tonnage closely</text>
<text class="dg-s" x="392" y="146">leave sellable</text>
<text class="dg-s" x="392" y="162">leftovers</text>
<text class="dg-s" x="392" y="188">split few bags</text>
<text class="dg-t" x="10" y="292">~5 analysts, Excel, 2 weeks</text>
<line class="dg-l" x1="196" y1="288" x2="236" y2="288" marker-end="url(#ara)"/>
<text class="dg-k" x="244" y="292">branch-and-bound, under 20 minutes</text>
</svg>
</div>
<figcaption>The search behind the plan, and the rules every plan has to respect.</figcaption>
</figure>
<h2>Where the numbers come from</h2>
<p>The estimated 55% gross margin improvement and 40% lower operating cost come from a month of testing on the client's real data, comparing the algorithm's plans against the plans their own team produced, with the client providing the feedback and the baseline. That is why I say estimated: it is their measurement of our output against their old process, not a projection I invented.</p>
