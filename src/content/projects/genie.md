---
title: "G.E.N.I.E., my undergraduate thesis"
where: "UTEC · 2023"
summary: "A generative chatbot specialized in our university's regulations, fine-tuned end to end. We scraped and structured the documents, generated a fine-tuning dataset, and LoRA fine-tuned Falcon-7B through 20 hyperparameter trials, taking evaluation loss down 84% (2.92 to 0.46) and perplexity from 18.5 to 1.6, then validated the answers with user testing."
shows: "the whole fine-tuning loop, from raw documents to an evaluated model."
metrics: ["eval loss −84%", "perplexity 18.5 → 1.6"]
stack: "Falcon-7B · LoRA · Hugging Face"
code: "https://github.com/joaquinramirezg/genie-llm-chatbot"
order: 2
thumb: "<svg viewBox=\"0 0 250 150\" role=\"img\" aria-label=\"GENIE fine-tuning results: evaluation loss from 2.92 to 0.46, perplexity from 18.5 to 1.6\">\n<text class=\"dg-t\" x=\"62\" y=\"18\" text-anchor=\"middle\">Eval loss</text>\n<rect class=\"pt-before\" x=\"30\" y=\"44\" width=\"30\" height=\"76\" rx=\"3\"/>\n<rect class=\"pt-after\" x=\"68\" y=\"107\" width=\"30\" height=\"13\" rx=\"3\"/>\n<text class=\"dg-s\" x=\"45\" y=\"38\" text-anchor=\"middle\">2.92</text>\n<text class=\"dg-k\" x=\"83\" y=\"101\" text-anchor=\"middle\">0.46</text>\n<text class=\"dg-t\" x=\"187\" y=\"18\" text-anchor=\"middle\">Perplexity</text>\n<rect class=\"pt-before\" x=\"155\" y=\"44\" width=\"30\" height=\"76\" rx=\"3\"/>\n<rect class=\"pt-after\" x=\"193\" y=\"113\" width=\"30\" height=\"7\" rx=\"3\"/>\n<text class=\"dg-s\" x=\"170\" y=\"38\" text-anchor=\"middle\">18.5</text>\n<text class=\"dg-k\" x=\"208\" y=\"107\" text-anchor=\"middle\">1.6</text>\n<line class=\"dg-l\" x1=\"20\" y1=\"120.5\" x2=\"230\" y2=\"120.5\"/>\n<text class=\"dg-s\" x=\"45\" y=\"136\" text-anchor=\"middle\">before</text>\n<text class=\"dg-s\" x=\"83\" y=\"136\" text-anchor=\"middle\">after</text>\n<text class=\"dg-s\" x=\"170\" y=\"136\" text-anchor=\"middle\">before</text>\n<text class=\"dg-s\" x=\"208\" y=\"136\" text-anchor=\"middle\">after</text>\n</svg>"
---
