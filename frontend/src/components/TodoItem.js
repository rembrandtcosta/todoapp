import { Button, ListGroupItem } from "react-bootstrap"  

export default function TodoItem(props) {


  return (
    <ListGroupItem 
      onClick={props.onClick}
      variant="warning"
      key={props.i}
    >
      <li
        className={"cursor-pointer"}
        key={props.i}
      >
        {props.text}
      </li>
      <Button variant="warning" onClick={props.onDelete}>
        X
      </Button> 
      <Button 
        variant="warning"
        className="btn btn-info"
        onClick={props.onEdit}
      >
        <span className="glyphicon glyphicon-pencil">Edit</span>
      </Button>
    </ListGroupItem>
  )
}
