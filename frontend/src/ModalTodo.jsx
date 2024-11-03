import {Fragment, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";

const ModalTodo = (props) => {
    const [visible, setVisible] = useState(false)
    var button = <Button onClick={() => toggle()}>Редактировать</Button>;

    const toggle = () => {
        setVisible(!visible)
    }

    if (props.create) {
        button = (
            <Button
                color="primary"
                className="float-right"
                onClick={() => toggle()}
                style={{minWidth: "200px"}}>
                Добавить дело
            </Button>
        )
    }
    return (
        <Fragment>
            {button}
            <Modal isOpen={visible} toggle={toggle}>
                <ModalHeader
                    style={{justifyContent: "center"}}>{props.create ? "Добавить дело" : "Редактировать дело"}</ModalHeader>
                <ModalBody>
                    <TodoForm
                        todo={props.todo ? props.todo : []}
                        resetState={props.resetState}
                        toggle={toggle}
                        newTodo{props.newTodo}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}
export default ModalTodo;