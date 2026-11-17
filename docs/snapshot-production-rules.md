# Kyn snapshot production rules, v1
Written 2026-11-16 from Ky's lessons building the Barry's story with Grok (a lot of back and forth on photos). These rules are standing instructions for the snapshot-making bot on every story, so the back and forth happens once, here, not 120 times per batch.
Master structure stays the Barry's v2: 11 slides, Studio Intelligence first, quiz intact, both case studies, pilot, book a call close.

## Photo rules
1. Quality bar: only high resolution photos, sharp at full-screen phone size (roughly 1080px or wider before cropping). Blurry, pixelated, or tiny images are rejected, no exceptions for a good subject.
2. No repeats: a photo is used once per story, ever. That includes the same photo in a different crop or size, and near-duplicates from the same shoot moment.
3. Enough unique photos before building: count usable photos first. A story needs its full set of unique, quality photos before generation starts, not discovered halfway through.
4. Real over staged: prefer their actual classes, instructors, members, and studio interiors. Skip anything that reads as generic stock on their own site, skip screenshots, text graphics, menus, and logos used as photos.
5. Crop check: every photo must crop cleanly to the tall story format without cutting off faces or the action. If it cannot crop cleanly, it does not get used.

## If a site does not have enough good photos, fallback ladder in this order
1. Dig deeper on their own site first: gallery, instructors, locations, and blog pages, not just the homepage.
2. Their own public photos elsewhere: Google Business profile and their Instagram.
3. Default photo set: a small library of neutral boutique fitness photos we curate once (no other studio's branding visible in them). Defaults fill gaps only, never replace a studio's own photos wholesale.
4. Any story that used defaults gets flagged in the batch QA log, so we know which ones leaned on them.

## Motion rule
- A little animation as you tap through: slides ease in, photos settle with a slight drift, the progress bar moves smoothly. Subtle and fast, never bouncy, never slow, and it must not delay the tap.
- This is a master template instruction, set once in the template Grok generates from. Ky tells Grok once at template level, every story after that inherits it. Nobody re-asks per story.

## Checks before a story counts as done
Automated, on every story (no human needed):
- Every photo unique in that story (duplicate detection, including recrops), every photo passes the resolution bar, defaults flagged if used
- Page renders, photos load, quiz answers ride into the booking link, booking link is the real one
- Studio Intelligence leads, products not bundled, no em dashes anywhere

Hand checks, sampled, not all 120 (Ky asked, 2026-11-16):
- Batch 1: hand-check the first 10 to 15 stories fully, plus a random sample of about 10 percent of the rest. Bot errors repeat in patterns, so early stories reveal problems that would otherwise show up 120 times.
- Every batch after: hand-check about 10 per batch, plus every story that used default photos, every story that failed and got repaired, and every top Tier 1 target regardless of sample.
- If a hand check finds a pattern problem, the fix goes into these rules or the template, the affected chunk gets regenerated, and the sample rate goes back up for that batch.
- A hand check is a tap-through, about a minute or two per story. Budget roughly half an hour of checking per batch, not 120 reviews.
