

export default function TodoItem(props) {


  return (
    <div 
      className={
        "list-group-item cursor-pointer " +
        (props.active ? "active" : "")
      }
      onClick={props.onClick}
    >
      <li
        className={"cursor-pointer"}
        key={props.key}
      >
        {props.text}
      </li>
      <button className="btn btn-danger" onClick={props.onDelete}>
        X
      </button> 
      <button className="btn btn-info">
        <span class="glyphicon glyphicon-pencil">Edit</span>
      </button>
    </div>
  )
}
