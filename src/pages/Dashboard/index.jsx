// import { Card } from 'components/Card'
import { axiosServer } from 'config/axios'
import { useEffect, useState } from 'react'
// import { sessionHOC } from 'services/auth/sessionHOC'

function Dashboard() {
  const [works, setWorks] = useState([])

  useEffect(() => {
    (async () => {
      const { data, status } = axiosServer('/work')

      if (status !== 200) return

      setWorks(data)

    })()
  }, [])

  return (
    <div className="flex flex-col sm:flex-row flex-wrap mt-24">
      {works}
    </div>
  )
}

// const DashboardWrapper = sessionHOC(Dashboard)

// export { DashboardWrapper as Dashboard }

export { Dashboard }