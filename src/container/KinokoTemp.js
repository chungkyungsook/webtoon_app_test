import React from "react";

const KinokoTemp = (props) =>{
    console.log("kinokouser",props.kionoko)
    return(
        <div>
            {
                props.kionoko.map((data,index) =>(
                    <span>
                    <h5>{data.id}</h5>
                    <h5>{data.machine_name}</h5>
                    <h5>{data.machine_pin}</h5>
                    <hr/>
                    </span>
                ))
            }
        </div>
    )
}

export default KinokoTemp;