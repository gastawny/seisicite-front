import { Card } from 'components/Card'
import sessions from 'utils/sessions.json'

export function Dashboard() {
  return <Card {...sessions} />
}