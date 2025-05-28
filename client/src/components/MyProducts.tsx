"use client"
import React, { Dispatch} from 'react'
import Card from './Card';


export default function MyProducts({data, setSelectedProduct, setModalOpen}: {data:any, 
  setSelectedProduct: Dispatch<React.SetStateAction<string>>,
  setModalOpen:  Dispatch<React.SetStateAction<boolean>>
}) {
 
  return (
    <div className='flex w-full mt-12 h-full justify-center items-center flex-wrap gap-5'>
        {
            data.length > 0 && (
                data.map((card:any)=>(
                    <Card setModalOpen={setModalOpen} setSelectedProduct={setSelectedProduct} key={card.id}  card={card}/>
                ))
            )
        }
    </div>
  )
}