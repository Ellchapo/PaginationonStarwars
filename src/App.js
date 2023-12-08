
import './App.css';
import { useState,useEffect,useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCharacters } from './slice/apiSlice';

let timer
function App() {
  const [query,setQuery]=useState('');
  const [page,setPage]=useState(1);
  const [data,setData]=useState([]);
  
  const dispatch=useDispatch();
  const observer = useRef();

  useEffect(()=>{
    const fun =async()=>{
      dispatch(fetchCharacters({query,page}))
    }
     fun().then(()=>{
      if(page === 1){
        setData(new Set([...state.data.results]))
       }else{
        setData((p)=>{
          return (
            new Set([...p,...state.data.results])
          )
        })
       }
    })
      
  },[query,page])

  const state= useSelector((state)=>state.starwars);

  const lastElement =(node)=>{
    if(state.isLoading) return;

    if(observer.current){
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && state.data.count > page+1){
        setPage((p)=>p+1);
      }
    })
    if(node)observer.current.observe(node);
  } 
  const queryHandler=(e)=>{
    if(timer)clearTimeout(timer)

      timer= setTimeout(()=>{
      setQuery(e.target.value)
      setPage(1);
     },1000)
  }
  return (
    <div className="searchContainer">
      <input type='text' onChange={queryHandler} ></input>
      {state.data &&
            [...data].map((item,index)=>{
          if(data.size-1 === index){
            return<div key={index} className='searchTitle' ref={lastElement} >
                {item.name}
            </div>
          }else{
            return<div key={index} className='searchTitle'>
                {item.name}
            </div>
          }
         
        })
      }
      <div>{state.isLoading && 'Loading... '}</div>
    </div>
  );
}

export default App;
