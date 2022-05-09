import React, { useState, useEffect } from 'react';


export default function () {
    const[data, setData] = useState();
    const [formData, setFormData] = useState({name: "", value: ""});
    const [searchName, setSearchName] = useState("");
    const [editValue, setEditValue] = useState({name: "", value: ""});

    useEffect(() => {
        getEmployees();
    }, []);

    const onChangeHandler = (name) => {
        return e => setFormData({...formData, [name]: e.target.value});
    }

    const onClickHandler = async () =>{
            await createEmployee(formData.name, formData.value);
            await getEmployees();
            setFormData({name: "", value: ""});
            //window.location.reload();
    }

    const onClickEdit = async () =>{
        await updateEmployee(formData.name, formData.value);
        await getEmployees();
        setFormData({name: "", value: ""});
    }

    async function getEmployees() {
        // return fetch("/employees").then(response => response.json());
        const response = await fetch("/employees");
        const data = await response.json();
        setData(data);
    }
    
    async function createEmployee(name, value) {
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    async function updateEmployee(name, value) {
        return fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    
    return (
        // <div>{JSON.stringify(data)}</div>
        <div>
            <h2>Employee List</h2>
            <table style={{width: "50%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                {data && data.map((dt, i)=>(
                    <tr key={dt.name + i}>
                        <td>{dt.name}</td>
                        <td>{dt.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            <p>
            <h3>Add a new employee or edit the value of an employee</h3>
                {formData.name}<br/>
                <label>Employee Name: <input type="text" value={formData.name} onChange = {onChangeHandler("name")}></input></label>
            </p>
            <p>
                {formData.value}<br/>
                <label>Employee Value: <input type="text" value={formData.value} onChange = {onChangeHandler("value")}></input></label>
            </p>
            <button onClick={onClickHandler}>Create</button>
            <button onClick={onClickEdit}>Edit Value</button>
        </div>

    );

}
