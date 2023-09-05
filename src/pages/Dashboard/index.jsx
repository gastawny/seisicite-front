import { Card } from 'components/Card'
import sessions from 'utils/sessions.json'

export function Dashboard() {
  return <div className="flex flex-col sm:flex-row flex-wrap mt-24">
    {[0, 0, 0, 0, 0, 0].map((_, index) => (
      <Card key={index} {...sessions} />
    ))}
  </div>
}