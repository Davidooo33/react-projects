import Banner from "@/app/banner"
import { useState, useEffect } from "react"

const Index = () => {

    const [toDoItems, setToDoItems] = useState([])

    async function getList() { 
        try {
            const res = await fetch('http://localhost:3000/api/to-do-list')
            if(!res.ok){
                throw new Error('could not fetch data');
            }
            const data = await res.json();
            setToDoItems(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const [text, setText] = useState('')

    async function deleteItem(text) {
        const res = await fetch('http://localhost:3000/api/to-do-list', {
            method: 'DELETE'
        })
    }
    async function createItem(text) {
        const res = await fetch('http://localhost:3000/api/to-do-list', {
            method: 'POST',
            body: JSON.stringify({text}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            if(!res.ok){
                throw new Error('could not fetch data');
            }
        setText('')     
    }


   useEffect (async () => {
    getList()}, []) 

return (
    <>
    <Banner />
    <div>
    <input type="text" id="todo" name="todo" value={text} onChange={(event) => setText(event.target.value)}></input>
    <input type="submit" id="submit" value="Submit" onClick={() => {if (!(text === '')){ createItem(text); getList();}}}></input>
    <input type="submit" id="submit" value="Delete" onClick={() => { deleteItem(text); getList();}}></input>
    </div>
    <table className="table">
<thead>
    <tr>
    <th className="col">To do!</th>
    <td></td>
    </tr>
    </thead>
    <tbody>
     {toDoItems && toDoItems.map(toDoItem => ( 
         <tr key={toDoItem.id}>
            <td>{toDoItem.text}</td>
         </tr>))}   
    </tbody>
    </table>
    </>
    )
}

export default Index