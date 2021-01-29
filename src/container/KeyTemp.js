import React from "react";

const KeyTemp = (props) =>{
    console.log("kinokouser",props.users)
    return(
        <div>
            {
                props.users.map((data,index) =>(
                    <span>
                    <h5>{data.id}</h5>
                    <h5>{data.username}</h5>
                    <h5>{data.userKey}</h5>
                    <hr/>
                    </span>
                ))
            }
        </div>
    )
}

export default KeyTemp;