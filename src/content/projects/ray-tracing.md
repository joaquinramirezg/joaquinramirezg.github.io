---
title: "A ray tracer written from scratch"
where: "Computer graphics, UTEC · 2023"
summary: "Renders a scene by casting a ray through every pixel, finding what it hits, and computing the light that comes back. No graphics API and no GPU: every intersection, reflection and shading term is solved on the CPU in C++20. The animation is 300 frames of its own test scene, rendered by this code."
shows: "I can build the thing underneath, not only use the library on top."
metrics: ["4 primitives, closed-form hits", "mirror reflections"]
stack: "C++20 · linear algebra"
code: "https://github.com/joaquinramirezg/ray-tracing"
order: 3
earlier: true
short: "Ray tracer from scratch"
oneLine: "Casts a ray through every pixel and solves the light on the CPU in C++20, no graphics API."
thumb: "<picture>\n<source media=\"(prefers-reduced-motion: reduce)\" srcset=\"/p/ray-tracing.webp\">\n<img src=\"/p/ray-tracing-anim.webp\" alt=\"Animated render from the ray tracer: a glass bottle with moving lights inside, spheres, triangles and a cylinder on a reflective floor, seen from an orbiting camera\" width=\"500\" height=\"300\" loading=\"lazy\" decoding=\"async\">\n</picture>"
---
