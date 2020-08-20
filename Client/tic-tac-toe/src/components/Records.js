import React, { useEffect, useState } from "react";

function Records(props) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("/api/v1/records")
            .then((res) => res.json())
            .then((res) => {
                setRecords(res);
            });
    }, [props.isGameOver]);

    return (
        <table style={{textAlign: "center"}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Game start Date</th>
                    <th>Game duration</th>
                </tr>
            </thead>
            <tbody>
            {records.map((record, index) => {
                return (
                    <tr key={index}>
                        <td>{record.winnerName}</td>
                        <td>{record.date}</td>
                        <td>{record.gameDuration} sec</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default Records;
