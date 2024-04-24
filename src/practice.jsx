import { useState } from "react"


export function PracticeComponent(){
const [input, setInput]=useState('')
const [input2, setInput2]=useState('')

    return(
        <>
        <div>
            <h1 className="text-danger">this is practice </h1>
            <h1>{input2}</h1>
<input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}></input>

<button className="btn btn-primary" onClick={()=>{setInput2(input)}}>click</button>
        </div>
        </>
    )
}