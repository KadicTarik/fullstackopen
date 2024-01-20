const Course = (props) => {
  //console.log(props)
  return (
    <div>
      <Header course={props.course}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

const Header = (props) => {
  //console.log(props)
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}

const Part = (props) => {
  //console.log(props)
  return (
    <div>
      <p>{props.parts.name} {props.parts.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  //console.log(props)
  const allParts = props.parts.map(part => {return <Part key={part.id} parts={part}/>})
  //console.log(allParts)
  return (
    <div>
      {allParts}
    </div>
  )
}

const Total = (props) => {
  const totalSum = props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return (
    <div>
      <b>total of {totalSum} exercises</b>
    </div>
  )
}

export default Course