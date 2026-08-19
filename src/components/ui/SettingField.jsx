import { Toggle } from './Toggle'

export function SettingField({ def, value, onChange, channels = [], roles = [], disabled }) {
  if (!def) return null
  const control = () => {
    switch (def.type) {
      case 'boolean':
        return <Toggle id={def.id} checked={value} disabled={disabled} label={def.label} onChange={onChange} />
      case 'number':
        return <input className="input" type="number" id={def.id} value={value ?? ''} min={def.min} max={def.max} step={def.step || 1} disabled={disabled} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />
      case 'textarea':
        return <textarea className="textarea" id={def.id} value={value ?? ''} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
      case 'select':
        return <select className="select" id={def.id} value={value ?? ''} disabled={disabled} onChange={(e) => onChange(e.target.value)}>{(def.options || []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
      case 'channel':
        return <select className="select" id={def.id} value={value ?? ''} disabled={disabled} onChange={(e) => onChange(e.target.value || null)}><option value="">None</option>{channels.map((c) => <option key={c.id} value={c.id}>#{c.name}</option>)}</select>
      case 'role':
        return <select className="select" id={def.id} value={value ?? ''} disabled={disabled} onChange={(e) => onChange(e.target.value || null)}><option value="">None</option>{roles.map((r) => <option key={r.id} value={r.id}>@{r.name}</option>)}</select>
      case 'multiselect':
        return <select className="select" id={def.id} multiple value={Array.isArray(value) ? value : []} disabled={disabled} onChange={(e) => onChange(Array.from(e.target.selectedOptions).map((o) => o.value))} style={{ minHeight: 100 }}>{(def.optionsSource === 'roles' ? roles : def.options || []).map((r) => <option key={r.id || r.value} value={r.id || r.value}>{r.name || r.label}</option>)}</select>
      default:
        return <input className="input" type="text" id={def.id} value={value ?? ''} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
    }
  }
  return (
    <div className="field">
      <div className="field-label"><label htmlFor={def.id}>{def.label}</label>{def.type === 'boolean' ? control() : null}</div>
      {def.description ? <div className="field-desc">{def.description}</div> : null}
      {def.type !== 'boolean' ? control() : null}
    </div>
  )
}
