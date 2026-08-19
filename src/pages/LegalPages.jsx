export function TermsPage() {
  return (
    <div className="login-page">
      <div className="card" style={{ maxWidth: 640, textAlign: 'left' }}>
        <h1>Terms of Service</h1>
        <p className="muted">Summary for OmniBot users and server admins.</p>
        <ul>
          <li>Use OmniBot in accordance with Discord’s Terms of Service and Community Guidelines.</li>
          <li>Do not use the bot to harass, spam, evade moderation, or break the law.</li>
          <li>Server administrators are responsible for feature configuration in their guilds.</li>
          <li>Service is provided as-is; features and limits (including AI quotas) may change.</li>
        </ul>
        <p>
          <strong>Operator:</strong> [OPERATOR LEGAL NAME / CONTACT — PLACEHOLDER]
        </p>
        <p>
          <a href="#/login">Back to login</a>
        </p>
      </div>
    </div>
  )
}

export function PrivacyPage() {
  return (
    <div className="login-page">
      <div className="card" style={{ maxWidth: 640, textAlign: 'left' }}>
        <h1>Privacy Policy</h1>
        <p className="muted">Based on what OmniBot actually processes.</p>
        <ul>
          <li>Discord IDs, usernames, and message content as needed for commands and features</li>
          <li>Guild configuration stored per server ID on the bot host</li>
          <li>OAuth session for the dashboard (identity + guild list)</li>
          <li>AI prompts when AI features are used</li>
        </ul>
        <p>We do not put bot tokens or OAuth client secrets in this website.</p>
        <p>
          <strong>Contact:</strong> [OPERATOR CONTACT EMAIL — PLACEHOLDER]
          <br />
          <strong>Retention:</strong> [DATA RETENTION — PLACEHOLDER]
        </p>
        <p>
          <a href="#/login">Back to login</a>
        </p>
      </div>
    </div>
  )
}
