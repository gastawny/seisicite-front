import { RadioButtons } from 'components/RadioButtons'
import { useState } from 'react'
import { sessionHOC } from 'services/auth/sessionHOC'
import questions from 'utils/questions'
// import { useParams } from 'react-router-dom'

function Questions() {
  // const { id } = useParams()

  const [selected, setSelected] = useState(
    questions.map((question, index) => ({
      [index]: question.options[0]
    }))
  )

  function handleSetSelected(data, key) {
    const newSelected = selected.map((item) =>
      item[key]
        ? { ...item, [key]: data }
        : item
    )

    setSelected(newSelected)
  }

  return (
    <div className='flex flex-wrap w-full gap-6 justify-center relative left-1/2 -translate-x-1/2 mt-48'>
      {questions.map((question, index) => {
        return <RadioButtons
          key={index}
          setSelected={data => handleSetSelected(data, index)}
          title={question.title}
          options={question.options}
        />
      })}
    </div>
  )
}

const QuestionsWrapper = sessionHOC(Questions)
export { QuestionsWrapper as Questions }
