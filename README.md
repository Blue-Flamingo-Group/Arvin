# City of Arvin — Local Sales Tax Measure Microsite

Single-page static informational microsite for the one-percent transactions and
use tax on the **November 3, 2026** ballot. No build step. Open `index.html` or
serve the folder; that is the whole stack.

Client: Blue Flamingo · Job code **WBC-2604#** · Fee $200.

## Layout
- `index.html` — the entire site (inline CSS + one inline script).
- `docs/es-translation-worksheet.md` — every string on the page, for the translator.
- `docs/homepage-banner.html` — paste-in promo block for arvin.org's homepage (spec §4.3).
- `assets/img/` — photography, once supplied. `_originals/` is excluded from deploys.
- `_verify/` — Playwright screenshots (git-ignored).
- `deploy.sh` — Vercel deploy for the client review link.

## Guardrails — read before editing copy or CSS

**This is official City communication, not campaign content.** California law
lets a public agency publish *informational* material about a measure it placed
on the ballot; it does not let the agency advocate. Everything below is a
constraint, not a preference.

- No "vote yes", no support language, no slogans, no endorsements, no supporter
  quotes.
- No countdown clocks, no checkmarks, no campaign red/white/blue.
- **"Yes" and "No" get identical size, weight and colour.** They are styled by a
  single `.ballot-choice` rule for exactly this reason. Never colour-code them
  green/red.
- Red (`--alert`) is reserved for deadline and election-date notices only. It is
  currently unused. Do not repurpose it as an "against" or "warning" colour.
- **Do not claim a citizens' oversight committee exists.** The ordinance requires
  audits and public disclosure only. §9 carries an explicit clarification block;
  it is marked do-not-delete in the source.
- No one-sided framing of consequences, and no claim that specific cuts are
  guaranteed.
- The impartiality notice appears twice (below the hero, and in the footer) and
  must stay on any page that is added later.

## Design
Palette is the City's own, pulled from the live markup at arvin.org: navy
`#182955`, orange `#fd8824`, green `#8fc743`, blue-grays `#bcc9d7` / `#96a3b1`.
Type is **Roboto**, which is what arvin.org uses and is first on the spec's
approved list. Body text is 16px on mobile and 18px from 820px up, per spec.

Contrast limits are documented at the top of the stylesheet. The short version:
the orange and the green both fail contrast as text on white, so they are used
for graphic elements on white and for text only on navy. Do not move them around
without re-checking.

## Spanish (EN/ES)

**Status 2026-09-14: not published, and the language bar is off the page.** The
client asked for every pending item removed before launch, so the English /
Español bar and the "translation being prepared" notice were deleted from
`index.html`. The `data-i18n` keys, the `ES` object and `TRANSLATION_COMPLETE`
remain. To publish Spanish later, restore the language-bar markup and its CSS
from git history (commit `ea72b35`), then follow the steps below.

The translation mechanism is built and wired. It is **not** switched on, because
partial Spanish on an official election page is worse than none.

Every translatable string carries a `data-i18n` key. To publish Spanish:

1. Send `docs/es-translation-worksheet.md` to the translator (197 keyed strings
   plus the 31 FAQ pairs). The spec requires professional translation reviewed by
   someone fluent in municipal and election terminology — not machine output.
2. Paste the returned strings into the `ES` object near the bottom of
   `index.html`, keyed by the same `data-i18n` key.
3. Flip `TRANSLATION_COMPLETE` to `true`.

That is the whole job — no rebuild, no redesign. The Español button enables
itself, the pending notice disappears, and `<html lang>` switches with the
toggle. Six keys are already filled from the Spanish nav labels the City
supplied in the spec.

**One hard constraint on the translation.** The header subtitle (`nav.sub`) sits
in a fixed-width space with about 115px of headroom, and Spanish runs roughly
twice the width of the English. Keep it to ~35 characters. The worksheet says so
in a callout, and the stylesheet clamps it with an ellipsis at >=1100px so an
over-length string truncates instead of wrapping the nav onto two rows. Nothing
else on the page has a length limit.

The nav was measured in Spanish with the City's six supplied labels: it fits on
one row at 1024, 1280 and 1440. The horizontal-nav breakpoint is 1100px — chosen
because Spanish needs 1044.7px and 1024 misses it — so 1024-1099 uses the drawer.

## Removed for launch (2026-09-14)

Everything that carried a `PENDING` marker or an unlinked button came off the
page at the client's request, so the live site shows no visible gaps:

- Language bar and Spanish-pending notice (see above).
- §3 "link pending" note on the budget source line.
- §5 "View the Adopted City Budget" button (no URL supplied).
- §9 Official Documents module (five "Not yet posted" slots) and the three
  City-budgets / financial-reports / Council-video buttons (no URLs supplied).
  The nav and drawer links to `#documents` went with it, and FAQ 8 now points
  readers to the City Clerk instead of "the Official Documents section".
- §10 "Read the full ordinance" button (no document supplied).
- FAQ 31 and footer phone / measure-email placeholders.

**Kept: the §5 budget chart.** Police still carries the proposed figure and is
labelled "(proposed)" in the bar, the table and the footnote, so the page states
exactly what it knows. Replace the figure and drop the label when the City
supplies the adopted number, then rescale every bar against the largest amount.

**Added: a Measure H updates sign-up box** (`section#updates`, between the FAQ
and the footer), plus the same address in FAQ 31 and the footer contact column.
All point to `cvela@arvin.org` via `mailto:` — a plain email link, not a form.

## Still owed by the City (none of it blocking)

1. **Final adopted Police figure for the budget chart (§5).** The client supplied final adopted 2026–27
   figures for Fire contract (Kern County) $1,148,836, Parks, buildings and
   grounds $709,481, Administration and finance $2,431,096, Public works
   $70,519, and Other essential services $902,511 (2026-09-13); all five are
   populated. **Police ($3.78M) is the *proposed* budget figure** and is
   labelled as such on the page. Fair representation is a legal requirement
   here: do not omit large expenditure categories, and do not estimate. The
   accessible table below the chart carries the same figures and must be
   updated with it.
2. **Photography (record of client clearance — resolved)** — the agency supplied the hero, the police panel and the
   parks panel on 2026-09-03, and confirmed they are cleared for use; that
   authorization sits with the agency and the City. The files are stock
   preview comps (612px Getty/iStock preview size; the unused almond-orchard
   and aerial-homes files carry a visible Shutterstock ID and a CRMLS watermark
   respectively, which is why neither is placed). The fire panel was filled on
   2026-09-13 with a supplied photo of an Arvin ladder fire truck
   (`assets/img/panel-fire.jpg`); the client confirmed it is cleared for use
   (2026-09-13). The 911 Emergency Response panel was filled on 2026-09-13
   with a supplied photo of an officer and K9, then replaced on 2026-09-14
   with a photo of the Arvin police vehicle fleet (`assets/img/panel-911-fleet.jpg`,
   cropped and resized to the panel's 16:10 frame; renamed from
   `panel-911.jpg` after the swap kept showing the old photo — the 24h
   `Cache-Control` on `/assets/` in `vercel.json` was serving the stale file
   at the old URL). The client confirmed the replacement is cleared for use
   (2026-09-14). The roads panel's original
   2026-09-03
   photo was replaced on 2026-09-13 with a new client-supplied photo of an
   Arvin road at sunset (`assets/img/panel-roads.jpg`, cropped and resized
   from the supplied original to the panel's 16:10 frame); the client
   confirmed it is cleared for use (2026-09-13). The Youth, Senior and
   Community Services panel was filled on 2026-09-13 with a supplied photo
   of a playground and palm trees (`assets/img/panel-youth.jpg`, cropped
   and resized to the panel's 16:10 frame to favor the playground and
   palms over sky); the client confirmed it is cleared for use
   (2026-09-13). **All six service panels are now filled.** Unused
   originals are kept in `assets/img/_originals/`.

   Original note — the hero and all six service panels are placeholder blocks.
   Required shots: a wide Arvin photo (streetscape, aerial, or a three-image
   panorama); then a police vehicle in the community, fire or emergency
   apparatus, communications equipment, a recognizable local street, an Arvin
   park or City facility, and a youth or senior program. Each needs a caption and
   descriptive alt text. They must be City-owned or rights-cleared — this is an
   official page. No AI-generated imagery of real officials or first responders.
3. **City seal** — resolved; the nav carries the client-supplied Measure H mark.
4. **City Clerk phone number and measure-information email** — removed from
   FAQ 31 and the footer; add back when supplied.
5. **Four link targets** — adopted budget, City budgets page, financial reports
   page, Council meeting video page. The buttons were removed; restore them
   from git history (commit `ea72b35`) with real URLs.
6. **Official documents (§10)** — ordinance, resolution, ballot question,
   impartial analysis. Accessible HTML or tagged PDF, not scans, with file size
   labelled on each link. The §9 documents module was removed; restore it from
   git history when there is something to post.
7. **Written confirmation that no citizens' oversight committee exists.** If one
   is later formally adopted, §9 and FAQ 20 both change.
8. **Named sign-off on copy neutrality** — City Attorney or City Clerk, on the
   record, before launch.

## Accessibility
Built to the spec's WCAG requirements: skip link, correct heading order, keyboard
operation throughout, visible focus rings, 44px+ tap targets, `aria-expanded` on
the accordion and drawer, `aria-pressed` on the language toggle, a live region on
the FAQ result count, an accessible table mirroring the bar chart, and
`prefers-reduced-motion` honoured. Re-run an audit once real photos and their alt
text land — alt text is the one thing that cannot be verified before the images
exist.

## FAQ search
Matches question text, answer text, and a synonym list on `data-kw`. The spec's
required terms all resolve, including **sunset**, which does not appear anywhere
in the copy and reaches the expiration question through its synonym list.

## Go-live
**Live and indexable as of 2026-09-14.** The `robots` meta and the `X-Robots-Tag`
header are both gone. `canonical` and `og:url` point at
`https://arvin-measure.vercel.app/`; if the City moves the page to an arvin.org
address, change both and add the domain in Vercel. Production is git-connected:
a push to `main` deploys.

## Before making this repository public

`assets/img/_originals/` is tracked in git history. Review it before changing
this repo's visibility — removing the files in a later commit does **not**
remove them from history.

It holds the ten photographs the agency supplied. Several are stock preview
comps and two carry visible watermarks (a Shutterstock ID and a CRMLS
real-estate mark). They were cleared for use on this site; that is not the same
as clearance to republish the source files.

If this repo is ever made public, strip that folder from history first
(`git filter-repo --path assets/img/_originals --invert-paths`) rather than
deleting it in a new commit.

