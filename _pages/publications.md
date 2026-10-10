---
layout: page
permalink: /publications/
title: publications
description:
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

Full list from my CV. See also [Google Scholar](https://scholar.google.com/citations?user=RF1_oQoAAAAJ&hl=en).

<!-- section headings rank above the faint per-year dividers -->
<style>
  h2.pub-section {
    margin-top: 3rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--global-text-color-light);
  }
  h2#peer-reviewed {
    margin-top: 1.5rem;
  }
  h2.pub-section + .publications > h2.bibliography:first-child {
    margin-top: 0.75rem;
  }
</style>

<h2 id="peer-reviewed" class="pub-section">peer-reviewed</h2>

<div class="publications">

{% bibliography %}

</div>

<h2 id="preprints" class="pub-section">preprints</h2>

<div class="publications">

{% bibliography --file preprints --group_by none %}

</div>
