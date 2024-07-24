import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todolist from './Todolist';
import { deleteCart } from '../control/cartDelete';
import { nanoid } from 'nanoid';

function Formsheet() {
  const [value, setValue] = useState({
    title: '',
    content: '',
    id: String(nanoid())
  });

  const todoItems = useSelector((store) => store.delete.todoItems);
  const dispatch = useDispatch();

  useEffect(() => {
 
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      dispatch(deleteCart({ todos: savedTodos }));
    }
  }, [dispatch]);

  useEffect(() => {
  
    localStorage.setItem('todos', JSON.stringify(todoItems));
  }, [todoItems]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValue((prevValue) => ({...prevValue,[name]: value}));
  }

  function addTodo(e) {
    e.preventDefault();
    
    const { title, content } = value;

    if (!title || !content) {
      alert("Lütfen boş alan bırakmayın.");
      return;
    }

    const newTodo = { title, content, id: value.id };
    dispatch(deleteCart({ todos: [...todoItems, newTodo] }));

    setValue({ title: '', content: '', id: String(nanoid()) });
  }

  return (
    <div className='container'>
      <form>
        <h1 className='title'>Yapılacaklar Listesi</h1>
        <div className='inputContainer'>
          <label htmlFor='title' style={{ display: 'block' }}>Başlık</label>
          <input
            type='text'
            name='title'
            id='title'
            onChange={handleChange}
            placeholder='Başlık girin'
            value={value.title}
            required
          />
          <label htmlFor='textarea1' style={{ display: 'block' }}>İçerik</label>
          <textarea
            name='content'
            id='textarea1'
            onChange={handleChange}
            value={value.content}
            placeholder='Yapılacakları girin'
            required
          ></textarea>
          <button type='submit' onClick={addTodo} className='formButton'>Kaydet</button>
        </div>
      </form>
      <div className='listHolder'>
        {todoItems.map((todo) => (
          <Todolist key={todo.id} title={todo.title} content={todo.content} id={todo.id} divId={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default Formsheet;

