---
title: "The retrieval pipeline behind the copilot"
where: "Crehana · Senior Machine Learning Engineer · Feb 2025 – Sep 2026"
summary: "The copilot answers from each company's own documents, so the retrieval layer has to stay fresh and tenant-aware. I built and ran the ingestion pipeline: 10K+ documents a week, indexed on a schedule into a search corpus of 1.2M+ vectors on Qdrant with OpenAI embeddings."
metrics: ["10K+ docs/week", "1.2M+ vectors"]
stack: "RAG · Qdrant · OpenAI embeddings · Python"
order: 2
compact: false
pageTitle: "The retrieval pipeline behind the copilot"
minutes: 2
angle: "Crehana · multi-tenancy, messy inputs, and evaluation"
description: "The copilot answers from each company's own documents, so the retrieval layer has to stay fresh and tenant-aware."
tldr: {"problem": "The copilot answers from each company's own documents: 10K+ new documents a week, 1300+ organizations, and no company may ever see another's data.", "role": "I built and ran the ingestion pipeline, enforced per-organization filtering, and rebuilt preprocessing per format when companies started uploading every kind of file.", "result": "A search corpus of 1.2M+ vectors on Qdrant, reindexed every weekend, with every change scored against a 200-question golden set."}
---
<h2>What actually flows in</h2>
<p>It is not a static document pile. Information flowed continuously from the platform's HR modules into the master database as companies edited, uploaded, and generated records, more than 10K documents a week. Every weekend the pipeline reindexed that into a search corpus of 1.2M+ vectors on Qdrant, using OpenAI embeddings over overlapping chunks.</p>
<h2>Multi-tenancy: the constraint that shapes everything</h2>
<p>1300+ organizations share the platform, and no company may ever see another company's data. Retrieval enforces metadata filtering per organization on the vector side, on top of tenant schemas in the relational database. I also evaluated moving to separate collections per tenant, which buys stronger isolation and much simpler offboarding when a customer leaves, at the cost of operational overhead across that many organizations. Filtered search won at our scale; separate collections become the better call once isolation matters more than operating cost.</p>
<figure class="fig">
<div class="fig-scroll">
<svg viewBox="0 0 520 556" role="img" aria-label="The retrieval pipeline: platform records and uploaded files of every format are preprocessed, chunked with overlap and embedded into a vector store that is reindexed every weekend; at question time retrieval is filtered to the asking organization before an answer is grounded.">
<defs>
<marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" class="dg-a"/>
</marker>
</defs>
<text class="dg-s" x="10" y="14">Every weekend</text>
<rect class="dg-box" x="10" y="26" width="240" height="46" rx="10"/>
<text class="dg-t" x="130" y="47" text-anchor="middle">HR platform records</text>
<text class="dg-s" x="130" y="63" text-anchor="middle">edited and created continuously</text>
<rect class="dg-box" x="270" y="26" width="240" height="46" rx="10"/>
<text class="dg-t" x="390" y="47" text-anchor="middle">Files companies upload</text>
<text class="dg-s" x="390" y="63" text-anchor="middle">docs, slides, sheets, PDFs, audio</text>
<rect class="dg-box" x="130" y="118" width="260" height="42" rx="10"/>
<text class="dg-t" x="260" y="144" text-anchor="middle">Preprocessing per format</text>
<rect class="dg-box" x="130" y="196" width="260" height="42" rx="10"/>
<text class="dg-t" x="260" y="222" text-anchor="middle">Chunking with overlap, embedding</text>
<rect class="dg-box" x="130" y="274" width="260" height="46" rx="10"/>
<text class="dg-t" x="260" y="295" text-anchor="middle">Vector store</text>
<text class="dg-s" x="260" y="311" text-anchor="middle">1.2M+ vectors, reindexed weekly</text>
<line class="dg-l" x1="130" y1="72" x2="200" y2="112" marker-end="url(#ar2)"/>
<line class="dg-l" x1="390" y1="72" x2="320" y2="112" marker-end="url(#ar2)"/>
<text class="dg-s" x="260" y="98" text-anchor="middle">10K+ documents a week</text>
<line class="dg-l" x1="260" y1="160" x2="260" y2="190" marker-end="url(#ar2)"/>
<line class="dg-l" x1="260" y1="238" x2="260" y2="268" marker-end="url(#ar2)"/>
<text class="dg-s" x="10" y="364">At question time</text>
<rect class="dg-box" x="130" y="376" width="260" height="42" rx="10"/>
<text class="dg-t" x="260" y="402" text-anchor="middle">Question, from one company</text>
<rect class="dg-key" x="130" y="452" width="260" height="42" rx="10"/>
<text class="dg-k" x="260" y="478" text-anchor="middle">Retrieval filtered to that company</text>
<path class="dg-l" d="M 390 297 L 462 297 L 462 473 L 396 473" marker-end="url(#ar2)"/>
<text class="dg-s" x="426" y="290" text-anchor="middle">searched</text>
<line class="dg-l" x1="260" y1="418" x2="260" y2="446" marker-end="url(#ar2)"/>
<line class="dg-l" x1="260" y1="494" x2="260" y2="524" marker-end="url(#ar2)"/>
<text class="dg-t" x="260" y="544" text-anchor="middle">Answer grounded in that company's own text</text>
</svg>
</div>
<figcaption>The pipeline, and the line that matters. Retrieval is filtered to the asking organization, so one company's question can only ever be answered from that company's own material. Everything above that gate is shared plumbing; the gate is what makes it safe to share.</figcaption>
</figure>
<h2>When customers outgrew the design</h2>
<p>Companies started uploading every kind of file: Word, PowerPoint, Excel, PDFs, even audio, far beyond the HR documents the system was designed for, and they expected answers from all of it. We rebuilt preprocessing per format, redesigned chunking and indexing, and replaced single-pass similarity search with a retrieval approach that held up across all those formats. Answer quality improved notably without giving up speed.</p>
<h2>How I evaluated it</h2>
<p>Every change was scored for answer accuracy against a golden set of 200 questions before it counted as an improvement. Next on the roadmap: retrieval-level metrics such as hit rate and MRR, to see whether a miss comes from search or from generation. Qdrant held up at 1.2M+ vectors, so the effort went into retrieval quality, not the database.</p>
