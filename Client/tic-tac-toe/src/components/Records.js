import React, { useEffect, useState } from 'react';


function Records (props){
    const [records, setRecords] = useState([]);

    useEffect(() => {
        console.log('changed to', props.isGameOver)
        fetch('/api/v1/records')
        .then(res => res.json())
        .then(res => {setRecords(res)})
    },[props.isGameOver]);
    
    return (
        <ul>
        {records.map((record, index) => {
            return <li key={index}><span>{record.id}</span> <span>{record.winnerName}</span> <span>{record.date}</span></li>
        })}
        </ul>)
}

export default Records;