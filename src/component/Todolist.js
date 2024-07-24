import React, { useEffect,useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { checkedTodo, clearCheckedItems } from '../control/checkSlice';

import { deletedCart,editTodos } from '../control/cartDelete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';


function Todolist(props) {
  const dispatch = useDispatch();
  const checkedList = useSelector((store) => store.check.checkedItems);
  const isChecked = checkedList[props.id] || false;
  const deletedList = useSelector((store) => store.delete.todoItems);
  





  const [isEdit,setIsEdit] = useState(true);
  const [value,setValue] = useState({
    title:props.title,
    content:props.content,
  })
  const [editValue,setEditValue] = useState({
    editTitle:value.title,
    editContent:value.content
  })

  
  useEffect(() => {
    const savedChecked = JSON.parse(localStorage.getItem('checked'));
    if (savedChecked) {
      Object.keys(savedChecked).forEach((key) => {
        dispatch(checkedTodo({ id: key, checked: savedChecked[key] }));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('checked', JSON.stringify(checkedList));
  }, [checkedList]);

  function handleChange(e) {
    const newCheckedStatus = e.target.checked;
    const targetId = e.target.id;
    const newCheckedState = { id: targetId, checked: newCheckedStatus };
    dispatch(checkedTodo(newCheckedState));
  }
   
  const editChange = (e)=>{
    const {name,value} = e.target;
    setValue((prevValue)=>{
      if(name === "editInput1"){
        return{
          title : value,
          content:prevValue.content
        }
        
      }
      else if(name === "editInput2"){
        return{
          title : prevValue.title,
          content : value,
        }
        
      }
    })
  }
  const acceptClick = ()=>{
   
    
    setIsEdit(true);
    setEditValue({
      editTitle:value.title,
      editContent:value.content
    })

const newArray = deletedList.map((item) => {
  if (item.id === props.divId) {
    return {
      ...item,
      title: value.title,
      content: value.content
    };
  }
  return item;
});
dispatch(editTodos(newArray));
localStorage.setItem('todos', JSON.stringify(newArray));
    
  }
  const cancelClick = ()=>{
    setIsEdit(true);
    setValue({
      title:editValue.editTitle,
      content:editValue.editContent
    });
  }
  const handleClick = () => {
    
    const newArray = deletedList.filter((item) => item.id !== props.divId);
    dispatch(deletedCart(newArray));
    
    dispatch(clearCheckedItems([props.divId]));
    localStorage.setItem('todos', JSON.stringify(newArray));
  };
  const editClick = ()=>{
    setIsEdit(false);
    }
  return (
    <div>
      {isEdit ? 
      (<div className={`listContainer ${isChecked && 'checked'}`} id={props.divId}>
        
        <EditRoundedIcon onClick={editClick} style={{position:"absolute",right:"5px",cursor:"pointer"}}/>
        <h3 className={`todoTitle ${isChecked && 'succesTitle'}`}>{value.title}</h3>
        <div className='contentBelow'>
          <p className={`todoContent ${isChecked && 'succesContent'}`}>{value.content}</p>
        </div>
        <div className='checkBox'>
            <input type="checkbox" checked={isChecked} onChange={handleChange} id={props.id} />
            <DeleteIcon onClick={handleClick} style={{ fontSize: '18px', cursor: 'pointer' }} />
          </div>
      </div>):
      
      
      //edit halinde!


      <div className={`editForm ${isChecked && 'checked'}`} id={props.divId}>
        <div className='iconContainer' style={{position:"absolute",right:"5px",cursor:"pointer"}}>
        <CheckRoundedIcon onClick = {acceptClick} style={{color:"green",borderRadius:"50%", border:"1px solid black"}}/>
        <ClearRoundedIcon onClick={cancelClick} style={{borderRadius:"50%", border:"1px solid red",color:"red",marginLeft:"5px"}} />
        </div>
        
      <div className='formContainer'>
        <form className='formPanel'>
          <label htmlFor="editInput1" >Başlığı Düzenle</label>
          <input required type="text" name='editInput1' id='editInput1' style={{width:"100%",marginTop:"8px"}} value={value.title} onChange={editChange} />
          <label htmlFor="editInput2" >İçeriği Düzenle</label>
          <textarea required name="editInput2" id="editInput2" style={{width:"100%",marginTop:"8px"}} value={value.content} onChange={editChange}></textarea>
        </form>

      </div>
    </div>
    }
    </div>
    
    
  );
}

export default Todolist;


