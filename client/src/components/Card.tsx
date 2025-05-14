import Image from 'next/image'
import React from 'react'


export default function Card({card}:{card:any}) {
  return (
    <div className='w-[150px] h-[200px] bg-white rounded-b-2xl shadow-amber-600 shadow-lg'>
        <Image src={card.imageUrl} alt='item' className='mx-auto h-[150px] p-2' width={300} height={300}/>
        <h5 className='text-center font-bold text-indigo-800'>{card.name}</h5>
        <p className='text-center font-semibold text-sm text-purple-900'>{Intl.NumberFormat('en-IN').format(Number(card.price))}
</p>
    </div>
  )
}