import Image from 'next/image'
import React, { Dispatch } from 'react'


export default function Card({card, setSelectedProduct, setModalOpen}:{card:any, 
  setSelectedProduct: Dispatch<React.SetStateAction<string>>,
  setModalOpen: Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div onClick={
      ()=>{
        setSelectedProduct(card.id);
        setModalOpen(true)
        }} className='w-[150px] h-[200px] bg-white rounded-b-2xl shadow-amber-600 shadow-lg'>
        <Image src={card.imageUrl} alt='item' className='mx-auto h-[150px] p-2' width={300} height={300}/>
        <h5 className='text-center font-bold text-indigo-800'>{card.name.length > 12 ? card.name.slice(0,10) + '...' : card.name}</h5>
        <p className='text-center font-semibold text-sm text-purple-900'>{Intl.NumberFormat('en-IN').format(Number(card.price))}
</p>
    </div>
  )
}