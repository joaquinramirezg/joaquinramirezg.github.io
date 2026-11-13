---
title: "AI copilot and agents for HR teams"
where: "Crehana (B2B HR-tech SaaS) · Senior Machine Learning Engineer · Feb 2025 – Sep 2026"
summary: "I led development of Crehana's GenAI copilot and the agentic systems behind it (LangChain, LangGraph), used across Latin America. When our data-extraction agent kept failing in production, I redesigned its routing and added reliability safeguards, and failures dropped 25%. Adoption of the whole copilot grew 9x."
metrics: ["1300+ organizations", "48K+ users", "agent failures −25%", "adoption 9x"]
stack: "LangChain · LangGraph · OpenAI · Python · AWS"
order: 1
compact: false
pageTitle: "The HR copilot and its agents"
minutes: 3
angle: "Crehana · how I think about agents, reliability, and product"
description: "I led Crehana's GenAI copilot and its agents (LangChain, LangGraph): 1300+ organizations, 48K+ users, agent failures down 25%, adoption up 9x."
tldr: {"problem": "Crehana's HR copilot ran on agents, and its data-extraction agent failed too often in production: schema-invalid outputs, timeouts, wrong extractions.", "role": "I led development of the copilot and its agents, redesigned the agent's routing and reliability safeguards, and presented tradeoffs to the executive committee.", "result": "Agent failures dropped 25%. Copilot adoption, in weekly active prompts, grew 9x across 1300+ organizations."}
---
<h2>Who uses it and for what</h2>
<p>HR admins, managers, and employees, each with different jobs to be done. An employee asks what their company's paternity leave policy allows, and the copilot answers from the documents their HR team uploaded. Another asks how they did against their quarterly goals, which triggers a data query and then course recommendations to close the gaps. A team leader asks who on the team is behind on which metrics and how to help them catch up. One interface, very different workflows underneath.</p>
<h2>Why agents instead of simpler automation</h2>
<p>The use cases that mattered were multi-step and stateful. Onboarding involves a chain of bureaucratic steps over private personal data: cleaning it, validating it, triggering downstream tasks, and, critically, surviving interruption, because managers stop mid-flow and come back later. Complex reporting needs retrieval across different components of the platform's data (we exposed them to the agents through MCP) and a back-confirmation pass before anything reaches the user. A form or a single prompt cannot hold that kind of state or recover from partial failure; an agent can.</p>
<h2>Where personal data sat, and where it did not</h2>
<p>I chose authorization over redaction. An answer about someone's own onboarding or goals needs the underlying record to be worth reading, so stripping personal data before it reached the model would have defeated the feature. The control is authorization: retrieval is filtered by the asking organization and then by what that specific user is entitled to see, so the model is only ever handed records the asker could already open themselves. Upstream, ingestion was owned by data engineering under their security guidelines, and I designed the handoff with them so the copilot worked from curated data, never raw records. The filter has a visible cost worth naming. The copilot can answer that there is no data on something when the company holds plenty of it, just not for that user, and the open product question is whether to say that out loud. Telling someone they lack access is clearer than telling them nothing exists, but it also confirms the record exists, which is its own leak.</p>
<h2>The reliability work behind the 25% failure reduction</h2>
<p>The data-extraction agent was failing in production: schema-invalid outputs, timeouts, wrong extractions. I rebuilt it on five fronts: stricter schema enforcement on outputs, redesigned prompts, better validation, a fallback chain so that when a model fails the request retries on a lighter model or a different provider, and a self-critique step where the agent checks that its own answer makes sense before returning it. The failure rate dropped 25%, counting every schema-invalid output, timeout and wrong extraction. Across the copilot, adoption measured in weekly active prompts grew 9x.</p>
<figure class="fig">
<div class="fig-scroll">
<svg viewBox="0 0 520 414" role="img" aria-label="The path of one data extraction request. A failed model call falls back to a lighter model and then a different provider. Whatever the call produces must clear two gates added in the redesign, schema enforcement and a self critique step; rejected output is retried instead of reaching the user.">
<defs>
<marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" class="dg-a"/>
</marker>
</defs>
<rect class="dg-box" x="46" y="14" width="250" height="44" rx="10"/>
<text class="dg-t" x="171" y="41" text-anchor="middle">Extraction request</text>
<rect class="dg-box" x="46" y="96" width="250" height="48" rx="10"/>
<text class="dg-t" x="171" y="125" text-anchor="middle">Model call</text>
<rect class="dg-box" x="342" y="96" width="164" height="48" rx="10"/>
<text class="dg-s" x="424" y="115" text-anchor="middle">Lighter model, then</text>
<text class="dg-s" x="424" y="131" text-anchor="middle">a different provider</text>
<rect class="dg-group" x="34" y="184" width="278" height="140" rx="14"/>
<rect class="dg-key" x="50" y="198" width="246" height="42" rx="10"/>
<text class="dg-k" x="173" y="224" text-anchor="middle">Schema enforcement</text>
<rect class="dg-key" x="50" y="268" width="246" height="42" rx="10"/>
<text class="dg-k" x="173" y="294" text-anchor="middle">Self critique</text>
<rect class="dg-box" x="46" y="356" width="250" height="44" rx="10"/>
<text class="dg-t" x="171" y="383" text-anchor="middle">Returned to the user</text>
<line class="dg-l" x1="171" y1="58" x2="171" y2="90" marker-end="url(#ar1)"/>
<line class="dg-l" x1="171" y1="144" x2="171" y2="178" marker-end="url(#ar1)"/>
<text class="dg-s" x="179" y="166">output</text>
<line class="dg-l" x1="173" y1="240" x2="173" y2="262" marker-end="url(#ar1)"/>
<line class="dg-l" x1="171" y1="324" x2="171" y2="350" marker-end="url(#ar1)"/>
<text class="dg-s" x="179" y="344">clears both</text>
<line class="dg-l" x1="296" y1="120" x2="336" y2="120" marker-end="url(#ar1)"/>
<text class="dg-s" x="316" y="88" text-anchor="middle">call fails</text>
<path class="dg-l" d="M 424 144 L 424 252 L 318 252" marker-end="url(#ar1)"/>
<text class="dg-s" x="372" y="246" text-anchor="middle">retried output</text>
<path class="dg-l" d="M 34 252 L 18 252 L 18 120 L 40 120" marker-end="url(#ar1)"/>
<text class="dg-s" x="11" y="186" transform="rotate(-90 11 186)" text-anchor="middle">rejected, retry</text>
</svg>
</div>
<figcaption>One extraction request. Everything the model produces, first call or fallback, has to clear both gates before anyone sees it: output that does not match the schema, and answers that do not survive the model's own critique, go back for another attempt. Those two gates are what the reliability work added.</figcaption>
</figure>
<h2>Working with the business</h2>
<p>I presented tradeoffs to an executive committee of the CEO, CTO, and product lead: where the AI team should go next, which products the company needed, how to weigh bug fixes against new capabilities.</p>
