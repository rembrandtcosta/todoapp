import { Button, ListGroupItem } from "react-bootstrap"  

export default function TodoItem(props) {


  return (
    <ListGroupItem 
      onClick={props.onClick}
      variant="warning"
    >
      <li
        className={"cursor-pointer"}
        key={props.key}
      >
        {props.text}
      </li>
      <Button variant="warning" onClick={props.onDelete}>
        X
      </Button> 
      <Button 
        variant="warning"
        className="btn btn-info"
      >
        <span class="glyphicon glyphicon-pencil">Edit</span>
      </Button>
    </ListGroupItem>
  )
}
