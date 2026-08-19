export function Toggle({ id, checked, onChange, disabled, label }) {
  return (
    <label className="toggle" aria-label={label || id}>
      <input id={id} type="checkbox" checked={Boolean(checked)} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  )
}
