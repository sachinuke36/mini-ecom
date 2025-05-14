import React, { Dispatch } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { activeProps } from '../app/page'
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from 'next/navigation';


type Props = {
    active: activeProps,
    setActive : Dispatch<React.SetStateAction<activeProps>>
}

export default function Navbar({active, setActive}: Props) {
    const router = useRouter()

  const logout = async () => {
    await fetch('http://localhost:8000/api/auth/logout', {
      credentials: 'include',
    })
    localStorage.removeItem('userId');
    router.push('/login')
  }
  return (
            <div className="w-4/10 h-15 rounded-3xl mx-auto my-5 shadow-purple-500 shadow-lg flex justify-center items-center gap-10 bg-white">
                <div onClick={()=>setActive('my-products')} className={`flex flex-col justify-center ${active==='my-products'?'border-0 border-b-2 pb-0.5 border-b-indigo-400' : ''}`  }>
                  <FaShoppingCart size={30} color="purple" className="font-extrabold mx-auto" />
                  <p className="text-xs text-indigo-800 font-bold">My products</p>
                </div>
                <div onClick={()=>setActive('add-product')} className={`flex flex-col justify-center ${active==='add-product'?'border-0 border-b-2 pb-0.5 border-b-indigo-400' : ''}`  }>
                  <IoMdAddCircleOutline size={30} color="purple" className=" font-extrabold mx-auto" />
                  <p className="text-xs text-indigo-800 font-bold">Add product</p>
              </div>
              <div className={`flex flex-col justify-center`}>
                  <IoMdLogOut onClick={logout} size={30} color="purple" className=" font-extrabold mx-auto" />
                  <p className="text-xs text-indigo-800 font-bold">Logout</p>
              </div>
            </div>
  )
}