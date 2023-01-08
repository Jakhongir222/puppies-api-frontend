import React, { useEffect, useState } from 'react'
import './puppies.css'

function Puppies () {

  interface Images {
    [puppyName: string]: string;
  }
  

  const images: Images = {'Charlie': 'https://images.unsplash.com/photo-1591139308596-9b663fa6d0a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8SXJhbnxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Max': 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8U3dlZGVufGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    'Bella': 'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8SmFwYW58ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'Lucy': 'https://images.unsplash.com/photo-1505205296326-2178af1b47bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fEZyYW5jZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Daisy' : 'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8VGhhaWxhbmQnfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    'Peanut': 'https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGdyZWVjZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Winston': 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8TWFsZGl2ZXN8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'Molly': 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8SW5kaWF8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'Toby': 'https://images.unsplash.com/photo-1550850839-8dc894ed385a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fFVTQXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Rocky': 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8SWNlbGFuZHxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Buddy': 'https://images.unsplash.com/photo-1495885531856-008baf2cbaac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fFVuaXRlZCUyMGFyYWIlMjBlbWlyYXRlc3xlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60',
    'Sasha': 'https://images.unsplash.com/photo-1589561454226-796a8aa89b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8VHVya2V5fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
  };

    const[data, setData]= useState<any | null>(null)
    const [isLoading, setLoading] = useState(false)
    const baseUrl = 'http://localhost:8080/puppies';

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


  return (
    <div className='puppies'>
        {data.map((item: { puppyName: string; puppyBreed: string; puppyBirthday: string; puppyId: number; }, index: React.Key | null | undefined)=>
        <div className='puppy-cart' key={item.puppyId}>
          <img className='article-image' src={images[item.puppyName]} width='368' height='250'/>
            <p>{item.puppyName}</p>
            <p>{item.puppyBreed}</p>
            <p>{item.puppyBirthday}</p>
        </div>
        )}
    </div>
  )
}

export default Puppies
