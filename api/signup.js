// Measure H updates sign-up.
// Receives the form on the page, sends one notification email to the City's
// measure-updates inbox via Resend, and never exposes that address to the
// browser. Environment: RESEND_API_KEY, SIGNUP_TO, SIGNUP_FROM (see README).

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function wantsJson(req) {
  var accept = String(req.headers["accept"] || "");
  var ctype = String(req.headers["content-type"] || "");
  return accept.indexOf("application/json") !== -1 || ctype.indexOf("application/json") !== -1;
}

function finish(req, res, ok, code) {
  if (wantsJson(req)) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(code).json({ ok: ok });
  }
  // No-JS fallback: bounce back to the form with a status flag.
  res.setHeader("Location", "/?signup=" + (ok ? "ok" : "error") + "#updates");
  return res.status(303).end();
}

module.exports = async function (req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }
  var body = req.body || {};
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  var name = String(body.name || "").trim().slice(0, 120);
  var email = String(body.email || "").trim().slice(0, 254);
  var trap = String(body.website || "").trim();

  // Honeypot: real visitors never see this field. Bots fill it. Pretend success.
  if (trap) return finish(req, res, true, 200);
  if (!EMAIL_RE.test(email)) return finish(req, res, false, 400);

  var key = process.env.RESEND_API_KEY, to = process.env.SIGNUP_TO, from = process.env.SIGNUP_FROM;
  if (!key || !to || !from) return finish(req, res, false, 500);

  var text =
    "A visitor asked to receive Measure H updates.\n\n" +
    "Email: " + email + "\n" +
    (name ? "Name: " + name + "\n" : "") +
    "\nSubmitted from the Measure H information site (arvinmeasureh.com) on " +
    new Date().toISOString() + ".\n" +
    "Reply to this message to write to them directly.";

  try {
    var r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: "Measure H updates sign-up: " + email,
        text: text
      })
    });
    if (!r.ok) return finish(req, res, false, 502);
    return finish(req, res, true, 200);
  } catch (e) {
    return finish(req, res, false, 502);
  }
};
