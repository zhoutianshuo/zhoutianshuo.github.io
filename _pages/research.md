---
layout: page
permalink: /research/
title: research
description:
nav: true
nav_order: 1
---

<!-- _pages/research.md -->

<p class="jump-links">
  <a href="#interests">interests</a> · <a href="#publications">publications</a> · <a href="#preprints">preprints</a> ·
  <a href="#academic-service">service</a>
</p>

<!-- The publication search treats any URL hash as a filter query, so plain
     anchor links would hide every paper. Scroll without touching the hash. -->
<style>
  .post h2[id] {
    scroll-margin-top: 4.5rem; /* clear the fixed navbar */
  }
</style>
<script>
  document.querySelectorAll(".jump-links a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.getElementById(a.getAttribute("href").slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
</script>

## interests

- AI for Science
- Computational Biology
- Natural Language Processing
- Parallel Algorithms

## publications

Also on [Google Scholar](https://scholar.google.com/citations?user=RF1_oQoAAAAJ&hl=en).

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

## preprints

<div class="publications">

{% bibliography --file preprints --group_by none %}

</div>

## academic service

- **Reviewer**: ACL (2026), _Bioinformatics_ (2026, 2025), ACM BCB (2026, 2025), _Computational and Structural Biotechnology Journal_ (2026), _PeerJ_ (2026), _Journal of Computational Biology_ (2026), _Nature Communications_ (2024)
- **Co-Reviewer**: RECOMB (2026), ISMB (2025, 2024, 2023)
