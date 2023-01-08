import React, { useEffect, useState } from 'react'

function Puppies () {

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
    <div>
        {data.map((item: { puppyName: string; puppyBreed: string; puppyBirthday: string; puppyId: number; }, index: React.Key | null | undefined)=>
        <div key={item.puppyId}>
            <p>{item.puppyName}</p>
            <p>{item.puppyBreed}</p>
            <p>{item.puppyBirthday}</p>
        </div>
        )}
    </div>
  )
}

export default Puppies
