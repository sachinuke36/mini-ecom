"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Card from './Card';

type Props = {}

export default function MyProducts({data}: {data:any}) {
 
  return (
    <div className='flex w-full mt-12 h-full justify-center items-center flex-wrap gap-5'>
        {
            data.length > 0 && (
                data.map((card:any)=>(
                    <Card key={card.id}  card={card}/>
                ))
            )
        }
    </div>
  )
}