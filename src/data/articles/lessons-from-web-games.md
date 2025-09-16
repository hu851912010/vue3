---
id: "3"
slug: "lessons-from-web-games"
title:
  en: "Lessons from Shipping Web Games"
  zh: "发布网页游戏的经验总结"
summary:
  en: "Prototype fast, embrace constraints, and let playtests guide your design decisions."
  zh: "快速原型、拥抱限制，并让试玩数据决定设计方向。"
publishedAt: "2024-01-26"
tags: ["game", "iteration", "testing"]
featured: false
---

Shipping a web game requires balancing creativity with technical constraints. Browsers are powerful, yet they perform best when we respect their limits.

#### Choose the right constraint

I give myself a single limitation per jam: three colors, 90-second rounds, or one-button controls. These constraints spark new mechanics.

#### Prototype the feel first

Motion and physics define the soul of a game. I often prototype core loops in a sandbox before building UI.

```html
<canvas id="playground"></canvas>
<script type="module">
  import { Engine } from 'matter-js';
  const engine = Engine.create();
  Engine.run(engine);
</script>
```

#### Observe players early

> Games are conversations. Observe where players smile and where they stumble.

Set up remote playtests, iterate quickly, and take careful notes. Your future self will thank you.
