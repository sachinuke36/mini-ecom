"use client"
import React, { Dispatch} from 'react'
import Card from './Card';
import { Product } from '@/types/Products';


export default function MyProducts({data, setSelectedProduct, setModalOpen}: {data:Product[], 
  setSelectedProduct: Dispatch<React.SetStateAction<string>>,
  setModalOpen:  Dispatch<React.SetStateAction<boolean>>
}) {
 
  return (
    <div className='flex w-full py-4 mt-1 overflow-scroll max-h-[400px] h-[650px] justify-center items-center flex-wrap gap-5'>
        {
            data.length > 0 && (
                data.map((card:Product)=>(
                    <Card setModalOpen={setModalOpen} setSelectedProduct={setSelectedProduct} key={card.id}  card={card}/>
                ))
            )
        }
    </div>
  )
}