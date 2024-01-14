import { useState } from 'react'

const Title = ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}: </td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
      <tr>
        <td>{text}: </td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.bad * -1) / total
  const positive = props.good * (100/total)

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good}/>
          <StatisticLine text='neutral' value={props.neutral}/>
          <StatisticLine text='bad' value={props.bad}/>
          <StatisticLine text='all' value={total}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive}/>
        </tbody>
      </table>
  )
}

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodVote = () => {
    setGood(good + 1)
  }

  const handleNeutralVote = () => {
      setNeutral(neutral + 1)
    }

  const handleBadVote = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title='give feedback'/>
      <Button onClick={handleGoodVote} text='good'/>
      <Button onClick={handleNeutralVote} text='neutral'/>
      <Button onClick={handleBadVote} text='bad'/>
      <Title title='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App