import { Card } from 'components/Card'
import { Loading } from 'components/Loading'
import { SearchFilter } from 'components/SearchFilter'
import { axiosServer } from 'config/axios/axios'
import { useCookies } from 'hooks/useCookies'
import { useCallback, useEffect, useState } from 'react'
import { sessionHOC } from 'services/auth/sessionHOC'

const initialFilters = {
  modality: 'SEI',
  theme: '',
  id: '',
  author: '',
  title: '',
}

function Dashboard() {
  const [allWorks, setAllWorks] = useState([])
  const [works, setWorks] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { getCookies } = useCookies()
  const quantity2Show = 25

  const handleSetFilters = useCallback((data, field) => {
    setFilters((curr) => ({ ...curr, [field]: data }))
  }, [])

  const filterWorks = useCallback((works, filters) => {
    return works.filter((work) =>
      Object.keys(filters).every((key) => {
        if (filters[key] === '') return true
        const fieldsToCompare = ['id', 'theme', 'author', 'title']
        if (fieldsToCompare.includes(key))
          return `${work[key]}`.toLowerCase().includes(`${filters[key]}`.toLowerCase())
        return work[key] === filters[key]
      })
    )
  }, [])

  // prettier-ignore
  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const { data, status } = await axiosServer('/work', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookies('accessToken')}`,
          },
        })

        if (status !== 200) return

        setAllWorks(data)
        setWorks(filterWorks(data, filters))
      } catch (err) {
        console.log(err)
        setError('Erro ao carregar os trabalhos')
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (allWorks.length) setWorks(filterWorks(allWorks, filters))
  }, [filters])

  return (
    <>
      {loading && (
        <Loading
          bgColor={'#000000aa'}
          colors={['var(--primary)', 'var(--secondary)', '#ffffff']}
          textColor={'#ffffff'}
          text={'Carregando...'}
        />
      )}
      {error && (
        <p className="font-semibold text-4xl text-white text-center">
          Refine melhor a sua busca{' '}
          <span className="text-xl">
            <br />
            (Muitos resultados foram encontrados)
          </span>
        </p>
      )}
      {!error && (
        <div className="flex flex-col flex-wrap mt-24 gap-16">
          <SearchFilter.Root className="relative flex flex-col lg:flex-row w-11/12 lg:w-2/3 h-auto lg:h-64 mx-auto mt-8 gap-6 bg-[#18181b] rounded-lg p-6">
            <div className="flex flex-col w-full justify-between gap-6 lg:gap-0">
              <SearchFilter.Radio
                options={['SEI', 'SICITE']}
                title="SEI ou SICITE?"
                setSelected={(data) => handleSetFilters(data, 'modality')}
              />
              <SearchFilter.Text
                value={filters.author}
                onChange={(e) => handleSetFilters(e.target.value, 'author')}
              >
                Autor
              </SearchFilter.Text>
            </div>
            <div className="flex flex-col w-full justify-between gap-6 lg:gap-0">
              <SearchFilter.Text
                value={filters.title}
                onChange={(e) => handleSetFilters(e.target.value, 'title')}
              >
                Título do trabalho
              </SearchFilter.Text>
              <SearchFilter.Text
                value={filters.theme}
                onChange={(e) => handleSetFilters(e.target.value, 'theme')}
              >
                Tema
              </SearchFilter.Text>
              <SearchFilter.Text
                value={filters.id}
                onChange={(e) => handleSetFilters(e.target.value, 'id')}
              >
                id
              </SearchFilter.Text>
            </div>
          </SearchFilter.Root>
          {!works.length && (
            <p className="font-semibold text-4xl text-primary text-center">
              Nenhum resultado encontrado
            </p>
          )}
          {works.length > quantity2Show && (
            <p className="font-semibold text-4xl text-primary text-center">
              Refine melhor a sua busca
            </p>
          )}
          {works.length <= quantity2Show && (
            <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-around">
              {works.map((work) => (
                <Card key={work.id} {...work} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const DashboardWrapper = sessionHOC(Dashboard)
export { DashboardWrapper as Dashboard }
