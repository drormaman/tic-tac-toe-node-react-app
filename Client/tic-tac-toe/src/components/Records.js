import React, { useEffect, useState } from 'react';


function Records (props){
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/records')
        .then(res => res.json())
        .then(res => {setRecords(res)})
    },[]);
    console.log(records)
    
    return (
        <ul>
        {records.map((record, index) => {
            return <li key={index}><span>{record.id}</span> <span>{record.winnerName}</span> <span>{record.date}</span></li>
        })}
        </ul>)
}

export default Records;