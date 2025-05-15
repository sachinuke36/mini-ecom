import Image from 'next/image';
import React, { Dispatch, FormEvent, useState } from 'react';

type Props = {};

export default function AddProduct({setData}: {setData: Dispatch<React.SetStateAction<any>>}) {
  const [productName, setProductName] = useState<string>('');
  const [productDetails, setProductDetails] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const BackendUrl = 'http://localhost:8000'

  const inputStyle =
    'border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e: FormEvent)=>{
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if(!image) return alert('Please select an image');

        const formdata = new FormData();
        formdata.append('name',productName);
        formdata.append('price', price?.toString() || '');
        formdata.append('image',image);
        formdata.append('description',productDetails);
        formdata.append('userId', userId as string);

        try {
            const res = await fetch(BackendUrl + '/api2/products/add',{
                method:"POST",
                body: formdata,
                credentials:'include'
            });
            const data = await res.json();
            console.log(data);
            alert(data.message);
            setImage(null);
            setProductDetails('');
            setPreviewUrl('');
            setPrice(null);
            setProductName('')
            if(data?.product){
              setData((prev: any)=>[...prev, data.product])
            }
        } catch (error) {
            console.log(error)
        }
  }

  return (
    <div className="bg-white flex w-[90%] h-[90%] mx-auto mt-10 p-5 shadow-2xl">

      {/* Left box with image preview */}
      <div className="w-1/2 h-[400px] bg-purple-300 flex items-center justify-center">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-[400px] h-[400px] object-contain" />
        ) : (
          <p className="text-gray-400">Image preview will appear here</p>
        )}
      </div>

      {/* Right box with form */}
      <div className=" w-1/2 h-full">
        <form className="flex flex-col gap-4  px-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product name"
            className={inputStyle}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <textarea
            placeholder="Enter product details"
            className={inputStyle}
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className={inputStyle}
            value={price || ''}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <input
            type="file"
            accept="image/*"
            className="cursor-pointer text-sm"
            onChange={handleImageChange}
          />
          <button
            type='submit'
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 my-10 rounded-full hover:opacity-90 transition"
          >Add product</button>
        </form>
      </div>
    </div>
  );
}
