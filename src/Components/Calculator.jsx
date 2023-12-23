import React, { useState, useEffect } from 'react'
import styles from './Calculator.module.css';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import axios from 'axios';
const Calculator = () => {
  
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState('usd');
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState("inr");
    const [info, setInfo] = useState([]);
    const [output, setOutput] = useState(0);

    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])


    useEffect(()=>{
        axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
        .then((res)=>{
            setInfo(res.data[from]);
        })
        .catch((error)=>{
            console.error(error);
        })
    },[from]);

    // Function to convert the currency
    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }
 
    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }
    
  return (
    <div className={styles.CalculatorApp}>
      <div className={styles.heading}>
           Currency Converter
      </div>
     <div className={styles.container}>
      <div className={styles.left}>
       Left Part
       <h3>Amount</h3>
       <input type="text" 
       placeholder='Enter the Amount'
       onChange={(e)=> setInput(e.target.value)} />
      </div>
      <div className={styles.middle}>
       Middle Part
       <h3>From</h3>
       <Dropdown 
       options={options}
       value={from} placeholder= 'from'
       onChange={(e)=> {setFrom(e.value)}}/>
      </div>
      <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }} 
                        />
                </div>
      <div className={styles.right}>
       Right Part
       <h3>To</h3>
       <Dropdown options={options}
       value={to} placeholder="To"
       onChange={(e)=> {setTo(e.value)}}
       />
      </div>
     </div>

     <div className="result">
                <button onClick={() => { convert() }}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
 
            </div>
    </div>
  )
}

export default Calculator
