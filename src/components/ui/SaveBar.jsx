export function SaveBar({ isDirty, dirtyCount, saving, onSave, onReset, disabled }) {
  if (!isDirty) return null
  return (
    <div className="save-bar" role="region" aria-label="Unsaved changes">
      <span className="muted">{dirtyCount} unsaved change{dirtyCount === 1 ? '' : 's'}</span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" className="btn btn-secondary" onClick={onReset} disabled={saving}>Discard</button>
        <button type="button" className="btn" onClick={onSave} disabled={saving || disabled}>{saving ? 'Saving…' : 'Save changes'}</button>
      </div>
    </div>
  )
}
