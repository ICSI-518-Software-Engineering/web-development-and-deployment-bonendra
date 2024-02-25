import './App.css';
import {useState,useRef} from 'react';

const Operations=()=>
{
     const [res1,setResult1]=useState();
     const [res2,setResult2]=useState();
    const inp1=useRef();
    const inp2=useRef();


    const frontend=()=>
    {

       setResult1(parseInt(inp1.current.value,10)+parseInt(inp2.current.value,10));

    };

    const backend=()=>
    {
        var val1=parseInt(inp1.current.value,10);
        var val2=parseInt(inp2.current.value,10);
        console.log(val1,val2);

        fetch("http://ec2-3-15-16-47.us-east-2.compute.amazonaws.com:8080/addition",
        {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({inp1:val1,inp2:val2})

        })
        .then(resp=>
            {
                return resp.json();

            })
        .then(result=>
            {
                setResult2(result.result);
            })
        .catch(err=>
            {
                console.log("something went wrong");
            });

    };
       


    return (
        <div className="row mt-3">
            <div className="col-5 border  p-4">
            <form>
                <label>Enter 1st Number</label>
                <input name="inp1" className="inp1" ref={inp1}  type="number"/><br/>
                <label>Enter 2nd Number</label>
                <input name="inp2" className="inp2" ref={inp2} type="number"/>
                <div className='buttonbox'>

                <input className=" " onClick={frontend} type="button" value="frontendRES"/>
                <br />
                <br />
                <input className=" "  onClick={backend} type="button" value="backendRES"/>
                </div>

                <div className='resbox'>
                    <div>Your  Result (from ReactJS)is :<span>{res1}</span></div>
                    <div>Your  Result (from NodeJS)is :<span>{res2}</span></div>

                </div>
                

            </form>

            </div>


           
             
        </div>
    )
}

export default Operations;