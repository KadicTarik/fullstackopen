const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.parts.title} {props.parts.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>
    </div>
  )
}

const App = () => {
  const course = {
    title: 'Half Stack application development',
    parts:[
      {
        title: 'Fundamentals of React',
        exercise: 10
      },
      {
        title: 'Using props to pass data',
        exercise: 7
      },
      {
        title: 'State of a component',
        exercise: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.title} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
    </div>
  )
}

export default App