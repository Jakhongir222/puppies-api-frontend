import React, { useEffect, useState } from 'react'
import './puppies.css'
import axios from 'axios';


function Puppies () {

  interface Images {
    [puppyName: string]: string;
  }

  const [editMode, setEditMode] = useState(true);
  

  const [puppyToEdit, setPuppyToEdit] = useState<{puppyName: string, puppyBreed: string, puppyBirthday: string, puppyId: number}| null>(null);

const editPuppy = (puppy: {puppyName: string, puppyBreed: string, puppyBirthday: string, puppyId: number}) => {
  setPuppyToEdit(puppy);
  setEditMode(true);
}
  

  const [images, setImages] = useState<Images>({
    'Lucy': 'https://images.unsplash.com/photo-1556647034-7aa9a4ea7437?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8R29sZGVuJTIwUmV0cmlldmVyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    'Charlie': 'https://images.unsplash.com/photo-1515722467270-dfefadd22f6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nJTIwTGFicmFkb29kbGV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'Max': 'https://images.unsplash.com/photo-1558619819-fc2fa628fe77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fEdlcm1hbiUyMFNoZXBoZXJkfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    'Bella': 'https://images.unsplash.com/photo-1555596873-1916fae19257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8UG9vZGxlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    'Daisy' : 'https://images.unsplash.com/photo-1585698708041-af48d48f8c0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fENvY2tlciUyMFNwYW5pZWx8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'Peanut': 'https://images.unsplash.com/photo-1610041518868-f9284e7eecfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hpaHVhaHVhfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    'Winston': 'https://images.unsplash.com/photo-1611611158876-41699b77a059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8QnVsbGRvZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Molly': 'https://images.unsplash.com/photo-1529158299404-547993c51cc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Qm94ZXIlMjBkb2d8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'Toby': 'https://images.unsplash.com/photo-1586917138540-f1490b02f205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fEJlYWdsZSUyMGRvZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Rocky': 'https://images.unsplash.com/photo-1634333190301-43e9f64d1590?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Um90dHdlaWxlcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Buddy': 'https://images.unsplash.com/photo-1569384229236-567b90d915cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8UGl0JTIwQnVsbHxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Sasha': 'https://images.unsplash.com/photo-1598584237788-b5d6e87148d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fFNpYmVyaWFuJTIwSHVza3l8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  });

    const[data, setData]= useState<any | null>(null)
    const [isLoading, setLoading] = useState(false)
    const baseUrl = 'http://puppies-api-backend-production.up.railway.app/puppies';

    useEffect(()=>{
        setLoading(true);
        fetch(baseUrl)
            .then(data=> data.json())
            .then((data) => 
                setData(data))
                setLoading(false)
    }, [])

    if(isLoading) return <p>Loading</p>
    if(!data) return <p>There are no puppies</p>  

    const deletePuppy = async (puppyName: string, puppyId: number) => {
      await axios.delete(`http://localhost:8080/puppies/${puppyId}`);
      const newImages = { ...images };
      delete newImages[puppyName];
      setImages(newImages);
      const newData = data.filter((item: { puppyName: string; }) => item.puppyName !== puppyName);
      setData(newData);
    }

    const updatePuppy = async () => {
      if(puppyToEdit) {
        try {
            const response = await axios.put(`http://puppies-api-backend-production.up.railway.app/puppies/${puppyToEdit.puppyId}`, puppyToEdit);
            setEditMode(false);
            setPuppyToEdit(null);
            const fetchData = await axios.get(`http://puppies-api-backend-production.up.railway.app/puppies`);
            setData(fetchData.data);
        } catch (error) {
            console.error(error);
        }
      }
    };

    return (
      <div className='puppies'>
          {data.map((item: { puppyName: string; puppyBreed: string; puppyBirthday: string; puppyId: number; }, index: React.Key | null | undefined)=>
          <div className='puppy-cart' key={item.puppyId}>
            <img className='article-image' src={item.puppyName in images ? images[item.puppyName] : 'https://cdn.dribbble.com/userupload/3079047/file/original-40e155214e180fc53f5cca7ae9b74681.png?resize=400x0'} width='368' height='250'/>
              {editMode && puppyToEdit?.puppyId === item.puppyId ? 
                <>
                <input value={puppyToEdit?.puppyName} onChange={(e)=>setPuppyToEdit({...puppyToEdit, puppyName:e.target.value})}/>
                <input value={puppyToEdit?.puppyBreed} onChange={(e)=>setPuppyToEdit({...puppyToEdit, puppyBreed:e.target.value})}/>
                <input value={puppyToEdit?.puppyBirthday} onChange={(e)=>setPuppyToEdit({...puppyToEdit, puppyBirthday:e.target.value})}/>
                <button onClick={updatePuppy}>Save</button>
                </>
                : 
                <>
                <p>{item.puppyName}</p>
                <p>{item.puppyBreed}</p>
                <p>{item.puppyBirthday}</p>
                </>
                }
              <button onClick={() => editPuppy(item)}>Edit</button>
              <button onClick={() => deletePuppy(item.puppyName, item.puppyId)}>Delete</button>
          </div>
          )}
      </div>
    );
    
    



  






}

export default Puppies
