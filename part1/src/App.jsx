import {useState} from 'react'

const History = ({allClick}) =>{
  if(allClick.length==0){
    return (
      <p>The app is used by clicking buttons</p>
    )
  }
  else{
    return(
      <p>{allClick}</p>
    )
  }
}

const Button = ({onSmash,text}) =><button onClick={onSmash}>{text}</button>


const App = () => {

  const [left,setLeft] = useState(0)
  const [right,setRight] = useState(0)
  const [allClick,setAllClick] = useState([])
  const [total,setTotal] = useState(0)

  const handleLeftClick = () =>{
    setAllClick([...allClick,'L'])
    setLeft(left+1)
    setTotal(left+1+right)
  }
  const handleRightClick = () =>{
    setAllClick([...allClick,'R'])
    setRight(right+1)
    setTotal(left+right+1)
  }

  return (
    <div>
      {left}
      <Button onSmash={handleLeftClick} text = 'left'/>
      <Button onSmash = {handleRightClick} text = 'right'/>
      {right}
      <br/>
      <History allClick={allClick}/>
      <p>total {total}</p>
    </div>
  )
}

export default App