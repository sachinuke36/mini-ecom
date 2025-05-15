"use client";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddProduct from "@/components/AddProduct";
import MyProducts from "@/components/MyProducts";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProductModal from "@/components/ProductModal";

export type activeProps = "my-products" | "add-product";

const HomePage = () => {
  const [active, setActive] = useState<activeProps>("my-products");
  const [data, setData] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const backendUrl = "http://localhost:8000";

  const getData = useCallback(async () => {
    const userId = localStorage.getItem("userId") as string;
    try {
      const response = await fetch(backendUrl + "/api/products/" + userId);
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
        console.log("User:", data.user);
      } catch (err) {
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const filteredData = data.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(selectedProduct);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="h-7/8 bg-gray-200 w-11/12 shadow-indigo-900 shadow-xl">
        {
          selectedProduct == '' ? <><div className="flex justify-evenly items-center px-20">
          <div className="shadow-lg rounded-2xl px-2 bg-white  shadow-purple-500 flex items-center justify-center gap-2">
            <input
              type="search"
              placeholder="Search"
              className="  bg-white rounded-l-2xl border-gray-500 px-2 w-[300px] focus:outline-none focus:border-purple-500 py-2"
              onChange={(e) => setSearchTerm(e.target.value)}
              name=""
              id=""
            />
            <FaSearch
              size={20}
              color="purple"
              className="font-extrabold mx-auto"
            />
          </div>
          <Navbar active={active} setActive={setActive} />
          <div className="shadow-lg p-2 rounded-2xl shadow-purple-500 bg-white">
            <p className="font-bold text-amber-800 text-shadow-sm">
              {user?.email.split("@")[0] || "User name"}
            </p>
          </div>
        </div>

        <div>
          {active == "add-product" ? (
            <AddProduct setData={setData} />
          ) : (
            <MyProducts
              setModalOpen={setModalOpen}
              setSelectedProduct={setSelectedProduct}
              data={filteredData}
            />
          )}
        </div></>:  <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct('')
        }}
        product={data?.find((item: any)=> item.id === selectedProduct )}
      />
        }
      </div>
    </div>
  );
};

export default HomePage;
