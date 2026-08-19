import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { CATEGORIES, getSettingsByCategory } from '../config/settingsRegistry'
import { useSettings } from '../contexts/SettingsContext'
import { useServer } from '../contexts/ServerContext'
import { SettingField } from '../components/ui/SettingField'
import { SaveBar } from '../components/ui/SaveBar'
import { Alert } from '../components/ui/Alert'

export function FeatureSettingsPage() {
  const { categoryId } = useParams()
  const category = CATEGORIES.find((c) => c.id === categoryId)
  const settings = useMemo(() => getSettingsByCategory(categoryId), [categoryId])
  const { values, setValue, save, resetAll, loading, saving, error, success, isDirty, dirtyKeys } = useSettings()
  const { channels, roles, selected } = useServer()
  if (!category) return <Alert type="error">Unknown feature section.</Alert>
  if (!selected) return <Alert type="warning">Select a server to edit settings.</Alert>
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>{category.icon} {category.label}</h1>
      <p className="muted">Configure {category.label.toLowerCase()} for {selected.name}.</p>
      {error ? <Alert type="error">{error}</Alert> : null}
      {success ? <Alert type="success">{success}</Alert> : null}
      {loading ? <div className="skeleton" style={{ height: 120 }} /> : null}
      <div className="card">
        <h2 className="card-title">Settings</h2>
        <p className="card-desc">Controls are driven by <code>settingsRegistry.js</code>.</p>
        {settings.length === 0 ? <p className="muted">No dashboard-safe settings in this category yet.</p> : settings.map((def) => (
          <SettingField key={def.id} def={def} value={values[def.id]} onChange={(v) => setValue(def.id, v)} channels={channels} roles={roles} disabled={loading || saving} />
        ))}
      </div>
      <SaveBar isDirty={isDirty} dirtyCount={dirtyKeys.length} saving={saving} onSave={save} onReset={resetAll} />
    </div>
  )
}
