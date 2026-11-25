# Code for Kiel's builder: answer pings and booking fix

Hi Kiel, this is the piece our hand-built stories already use, packaged so
the builder can use it too. One file: fc-ping-snippet.js

## What it does

1. The moment a visitor taps a quiz answer in a story, it quietly sends that
   answer to HighLevel, so the answer lands on the studio's contact right
   away, even if they never book. Right now the builder only captures
   answers inside the booking link, so anyone who answers and does not book
   is invisible to us.
2. It points every booking button at Bahubali's Calendly
   (calendly.com/studiointels/fuller-classes-intro-call) instead of yours.
   He runs the calls, so bookings have to land on his calendar.
3. It swaps "Sweat & Tonic" for "a studio in Toronto" wherever it appears,
   and "call with Kiel" for "call with Bahubali". Bahubali approved the
   stories on the condition that studio stays anonymous.

## How to add it

Paste the whole block into the builder's story template, just before the
closing body tag. It is plain JavaScript in a script tag, no dependencies.

One thing the builder has to stamp into each story it makes: the studio's
token, so HighLevel knows which contact the answers belong to. Any one of
these works:

- Set window.FC_TOKEN = "s-xxxxxx" before the snippet, or
- Put data-fc-token="s-xxxxxx" on the player root element, or
- Add ?s=s-xxxxxx to the story link

The token for each studio is the end of its story link in the sheet
(Page links tab, column G). Barry's link is fullerclasses.com/s-la3toj, so
Barry's token is s-la3toj. The full list is in that column for all 96
studios.

## How the answers map

Question 1 (slide 2):
- More new people booking a first class: fill
- Members coming often enough to make it a habit: return
- Knowing who's slipping before they cancel: return
- A reason for members to stay between classes: outside

Question 2 (slide 10):
- Member auto-booking: plan
- The morning retention note: answers
- A coach-led nutrition line: nutrition
- A marketing audit and Not sure yet send no ping on purpose. Those two are
  picked up by the follow-up flow instead.

## How to test it

Build one story with a test token (use s-test02), open it, tap one answer
to each question, then check the test contact in the Fuller Classes
HighLevel account. Both answers, the date stamp, and the quiz tags should
be there within a few seconds, and the pipeline card should move from
Invited to Quiz Done without booking anything. That loop is already proven
with our hand-built stories; this snippet sends the exact same payload.

## Notes

- The ping uses sendBeacon with a plain text body. That detail matters:
  the HighLevel webhook only maps the answers when the body arrives that
  way, a normal GET with the answers in the URL records nothing.
- The fixups re-apply as slides change, because the player re-renders.
  If the booking link or the Sweat & Tonic name is baked into the story
  data instead of the page HTML, fix it in the data too and treat the
  snippet as a safety net.
- Nothing in here changes how the builder works or what the stories look
  like. It only adds the tap ping and the three text/link fixes.
