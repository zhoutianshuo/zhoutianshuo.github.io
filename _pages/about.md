---
layout: about
title: about
permalink: /
subtitle: Machine Learning at Uber · Ph.D. in Computer Science, Oregon State University

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items

latest_posts:
  enabled: false
---

<!-- profile photo at 2/3 of the theme default (30% desktop, 100% mobile) -->
<style>
  .profile.float-right {
    width: 66.67%;
    float: none;
    margin: 0 auto 1rem;
  }
  /* flat photo: drop the theme's z-depth-1 shadow */
  .profile img {
    box-shadow: none;
  }
  @media (min-width: 576px) {
    .profile.float-right {
      width: 20%;
      float: right;
      margin: 0 0 1rem 2.5rem;
    }
    /* keep the name and subtitle clear of the photo, which is pulled up beside them */
    .post-header {
      padding-right: calc(20% + 2.5rem);
    }
  }
</style>

<!-- pull the photo up so its top lines up with the top of the name heading (desktop only) -->
<script>
  (function () {
    var profile = document.querySelector(".profile.float-right");
    var title = document.querySelector(".post-header .post-title");
    if (!profile || !title) return;
    var desktop = window.matchMedia("(min-width: 576px)");
    function align() {
      profile.style.marginTop = "0px";
      if (!desktop.matches) return;
      var offset = profile.getBoundingClientRect().top - title.getBoundingClientRect().top;
      profile.style.marginTop = -offset + "px";
    }
    align();
    window.addEventListener("load", align);
    window.addEventListener("resize", align);
  })();
</script>

I completed my Ph.D. in Computer Science at Oregon State University in January 2026, advised by [Prof. Liang Huang](https://web.engr.oregonstate.edu/~huanlian/).
My research focused on AI for science: I developed efficient algorithms and generative models for biological sequence generation, drawing on methods from natural language processing.
Currently, I work on machine learning for marketplace forecasting at Uber.

## research interests

- AI for Science
- Computational Biology
- Natural Language Processing
- Web Search

## academic service

- **Reviewer**: ACL 2026, _Nature Communications_ (2024), _Bioinformatics_ (2025), ACM BCB (2025, 2026), _Computational and Structural Biotechnology Journal_ (2026)
- **Co-Reviewer**: ISMB (2023, 2024, 2025), RECOMB (2026)
