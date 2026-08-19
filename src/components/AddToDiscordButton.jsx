import { DISCORD_INVITE_URL } from '../config/site'

export function AddToDiscordButton({ className = 'btn', style }) {
  return (
    <a
      className={className}
      style={style}
      href={DISCORD_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      Add to Discord
    </a>
  )
}
