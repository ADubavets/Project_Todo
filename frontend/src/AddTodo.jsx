import {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import { API_URL } from "./index.js";


const AddTodo = (props) => {
    const [todo, setTodos] = useState({})

    const onChange = (e) => {
        const newState = todo
        if (e.target.name === "file") {
            newState[e.target.name] = e.target.files[0]
        } else newState[e.target.name] = e.target.value
        setTodos(newState)
    }

    useEffect(() => {
        if (!props.newTodo) {
            setTodos(todo => props.todo)
        }
        // eslint-disable-next-line
    }, [props.todo])

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }

    const submitDataAdd = async (e) => {
        e.preventDefault();
        const data = {
            title: todo['title'],
            description: todo['description'],
            done: todo['done'],
        }
        // eslint-disable-next-line
        const result = await axios.post(API_URL, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    return (
        <Form onSubmit={props.newTodo ? submitDataAdd : props.editTodo}>
            <FormGroup>
                <Label for="name">Title:</Label>
                <Input
                    type="text"
                    name="title"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(todo.title)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="description">Description</Label>
                <Input
                    type="description"
                    name="description"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(todo.description)}
                />
            </FormGroup>
            
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button>Send</Button> <Button onClick={props.toggle}>Cancel</Button>
            </div>
        </Form>
    )
}

export default AddTodo;