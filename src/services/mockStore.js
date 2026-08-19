function disabled() {
  throw new Error('Mock data is disabled. Use the real OmniBot API.')
}
export const mockStore = {
  getUser: disabled,
  getGuilds: disabled,
  getChannels: disabled,
  getRoles: disabled,
  getSettings: disabled,
  saveSettings: disabled,
  getChangeLog: disabled,
  getBotStatus: disabled,
  getStats: disabled,
}
