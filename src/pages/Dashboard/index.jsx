import { Card } from 'components/Card'
import { sessionHOC } from 'services/auth/sessionHOC'
import sessions from 'utils/sessions.json'

function Dashboard() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap mt-24">
      {[0, 0, 0, 0, 0, 0].map((_, index) => (
        <Card key={index} {...sessions} />
      ))}
    </div>
  )
}

const DashboardWrapper = sessionHOC(Dashboard)

export { DashboardWrapper as Dashboard }
