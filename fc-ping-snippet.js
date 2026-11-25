<script>
/*
  Fuller Classes answer ping + booking fixups
  For Kiel's story builder: paste this whole block into the story template,
  just before </body>. It does three things:
  1. Pings HighLevel the moment a visitor taps a quiz answer, so the answer
     lands on the studio's contact even if they never book.
  2. Points every booking link at Bahubali's Calendly instead of Kiel's.
  3. Swaps "Sweat & Tonic" for "a studio in Toronto" and "call with Kiel"
     for "call with Bahubali" in the rendered text.
  The builder must stamp the studio's token into the page, one of:
    window.FC_TOKEN = "s-xxxxxx";            (before this script), or
    <div data-fc-token="s-xxxxxx">           (on the player root), or
    the story link carries ?s=s-xxxxxx
  Tokens are the last part of each studio's story link in the sheet
  (Page links column G), e.g. fullerclasses.com/s-la3toj means token s-la3toj.
*/
(function () {
  var WEBHOOK = "https://services.leadconnectorhq.com/hooks/FIEBupc64bcKVn0TkV72/webhook-trigger/17c75666-24ca-427f-ae76-f537dadb9ee3";
  var FOUNDER_CALENDLY = "https://calendly.com/studiointels/fuller-classes-intro-call";

  function getToken() {
    if (window.FC_TOKEN) return window.FC_TOKEN;
    var el = document.querySelector("[data-fc-token]");
    if (el) return el.getAttribute("data-fc-token");
    var p = new URLSearchParams(window.location.search);
    return p.get("s") || p.get("t") || "";
  }

  function ping(q, a) {
    var token = getToken();
    if (!token || !a) return;
    var body = JSON.stringify({ token: token, q: q, a: a });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(WEBHOOK, new Blob([body], { type: "text/plain" }));
        return;
      }
    } catch (e) {}
    try {
      fetch(WEBHOOK, { method: "POST", mode: "no-cors", body: body, keepalive: true });
    } catch (e) {}
  }

  /* Answer labels as they appear on the buttons, mapped to the values
     HighLevel expects. Q1 is slide 2, Q2 is slide 10. Options that map to
     "" send no ping on purpose (the audit and not-sure answers are handled
     by the booking link and the follow-up flow instead). */
  var ANSWERS = [
    { match: "More new people booking a first class", q: "q1", a: "fill" },
    { match: "Members coming often enough to make it a habit", q: "q1", a: "return" },
    { match: "Knowing who's slipping before they cancel", q: "q1", a: "return" },
    { match: "A reason for members to stay between classes", q: "q1", a: "outside" },
    { match: "A marketing audit", q: "q2", a: "" },
    { match: "Member auto-booking", q: "q2", a: "plan" },
    { match: "The morning retention note", q: "q2", a: "answers" },
    { match: "A coach-led nutrition line", q: "q2", a: "nutrition" },
    { match: "Not sure yet, help me choose", q: "q2", a: "" }
  ];

  document.addEventListener("click", function (ev) {
    var el = ev.target;
    while (el && el !== document) {
      var text = (el.textContent || "").trim();
      if (text) {
        for (var i = 0; i < ANSWERS.length; i++) {
          if (text.indexOf(ANSWERS[i].match) === 0) {
            ping(ANSWERS[i].q, ANSWERS[i].a);
            return;
          }
        }
      }
      el = el.parentElement;
    }
  }, true);

  function fixPage() {
    /* Booking links to the founder, not Kiel. */
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href") || "";
      if (href.indexOf("calendly.com/kiel") !== -1 || href.indexOf("cal.com") !== -1) {
        links[i].setAttribute("href", FOUNDER_CALENDLY);
      }
    }
    /* Founder asked for this name to stay anonymous. */
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.indexOf("Sweat") !== -1) {
        node.nodeValue = node.nodeValue
          .replace(/Sweat\s*(&|and)\s*Tonic/g, "a studio in Toronto");
      }
      if (node.nodeValue.indexOf("call with Kiel") !== -1) {
        node.nodeValue = node.nodeValue.replace("call with Kiel", "call with Bahubali");
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixPage);
  } else {
    fixPage();
  }
  /* The player re-renders per slide, so re-apply the fixups as it changes. */
  new MutationObserver(fixPage).observe(document.documentElement, {
    childList: true, subtree: true
  });
})();
</script>
