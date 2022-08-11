import {evaluate} from 'mathjs';
import {useState} from 'react';


function App() {
  const [total, setTotal] = useState('');
  const [current, setCurrent] = useState(0);
  const [operator, setOperator] = useState('');
  return (
      <div className="content">
        <Display total={total} current={current} operator={operator}/>
        <Buttons setOperator={setOperator} operator={operator} total={total} setTotal={setTotal} current={current} setCurrent={setCurrent} />
      </div>
  );
}

const Display = (props) => {
  function disp (current,operator){
    // console.log(operator)
    if (operator===''){
      return current;
    }
    else{
      return operator;
    }
  }

  function totDisp(total){
    if(total!==0){
      return total;
    }
  }
  return(
    <div className="display">
      <div className="equation">
        
        {totDisp(props.total)}
      </div>
      <div id="display" className="display-text">
        {disp(props.current,props.operator)}
      </div>
    </div>
  )
}

let flipper=null; //true for number false for operator
let setToClear=false;
const Buttons = (props) => {

  function addnum(num) {   
    console.log(num)
    if(setToClear===true){
      console.log("cleared")
      props.setCurrent(num);
      setToClear=false;
      return;
    }
    if(num==='.'){
      if(props.current.includes('.')){
        return;
      }
    }
    
    if (props.current==0){
      props.setCurrent(num);
    } 
    else{
      props.setCurrent(props.current + num);
    }
    
    if (flipper===false) {
      props.setTotal(props.total+props.operator)
      props.setOperator('');
    }

    flipper=true;

  }

  function setFunc(oper){
    console.log(oper)
    setToClear=false;

    if (oper==="-"){
      let x=props.operator+"-";
      if (x.length>2){
        props.setOperator(x.slice(-2,))
      }
      else{
        // console.log(x)
        props.setOperator(x);
      }
    }
    else{
      props.setOperator(oper)
    }
    if (flipper===true) {
      // console.log(props.current);
      if(props.total==0){
        props.setTotal(props.current);
      }
      else{
        props.setTotal(props.total+props.current)
      }
      
      props.setCurrent(0);
    }
    flipper=false;
  }
  
  function ac(){
    console.log("clear")
    props.setOperator('');
    props.setCurrent(0);
    props.setTotal(0);
    flipper=null;
    setToClear=false;
  }

  function equals(){
    console.log("equals")
    let final = (props.total+props.current)
    props.setTotal(props.total+props.current)
    console.log(evaluate(final))
    props.setOperator('');
    props.setCurrent(evaluate(final))
    props.setTotal("")
    setToClear=true;
  }
  return(
    <>
      <button id="clear" onClick={() => {ac()}} className='bigger'>AC</button>
      <button id="decimal" onClick={() => {addnum(".");}}>.</button>
      <button id="divide" className='function' onClick={() => {setFunc("/"); flipper=false}}>/</button>
      <button id="one" onClick={() => {addnum("1");}}>1</button>
      <button id="two" onClick={() => {addnum('2')}}>2</button>
      <button id="three" onClick={() => {addnum('3')}}>3</button>
      <button id="multiply" className='function' onClick={() => {setFunc("*"); flipper=false}}>*</button>
      <button id="four" onClick={() => {addnum('4')}}>4</button>
      <button id="five" onClick={() => {addnum('5')}}>5</button>
      <button id="six" onClick={() => {addnum('6')}}>6</button>
      <button id="subtract" className='function' onClick={() => {setFunc("-"); flipper=false}}>-</button>
      <button id="seven" onClick={() => {addnum('7')}}>7</button>
      <button id="eight" onClick={() => {addnum('8')}}>8</button>
      <button id="nine" onClick={() => {addnum('9')}}>9</button>
      <button id="add" className='function' onClick={() => {setFunc("+"); flipper=false;}}>+</button>
      <button id="zero" onClick={() => {addnum('0')}} className='biggerer'>0</button>
      <button onClick={() => {equals()}} id="equals">=</button>
    </>
  )
}

export default App;
