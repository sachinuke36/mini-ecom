"use client";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddProduct from "@/components/AddProduct";
import MyProducts from "@/components/MyProducts";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types/Products";
import { User } from "@/types/User";

export type activeProps = "my-products" | "add-product";

const HomePage = () => {
  const [active, setActive] = useState<activeProps>("my-products");
  const [data, setData] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

// const BackendUrl = 'http://localhost:8000'
  const BackendUrl = 'https://mini-ecom-5r93.onrender.com'

  const getData = useCallback(async () => {
    const userId = localStorage.getItem("userId") as string;
    try {
      const response = await fetch(BackendUrl + "/api/products/" + userId);
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
        const res = await fetch(BackendUrl + "/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
        console.log("User:", data.user);
      } catch (err) {
        console.log(err)
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    getData();
  }, [getData, router]);

  const filteredData = data.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(selectedProduct);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center  md:p-4">
      <div className="h-full md:h-7/8 bg-gray-200 border  w-full md:w-11/12 shadow-indigo-900 shadow-xl">
        {selectedProduct == "" ? (
          <>
            <div className="flex flex-col gap-4 mt-6 md:mt-0 md:flex-row md:justify-evenly items-center  px-5 lg:px-20">
              <div className="shadow-lg rounded-2xl px-2 bg-white  shadow-purple-500 flex items-center justify-center gap-2">
                <input
                  type="search"
                  placeholder="Search"
                  className="  bg-white rounded-l-2xl border-gray-500 px-2 w-full focus:outline-none focus:border-purple-500 py-2"
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
              <div className="hidden lg:flex shadow-lg p-2 rounded-2xl shadow-purple-500 bg-white">
                <p className="hidden md:block font-bold text-amber-800 text-shadow-sm">
                  {user?.email.split("@")[0] || "User name"}
                </p>
              </div>
            </div>

            <div className="scroll-auto h-full max-h-[60%] overflow-y-scroll">
              {active == "add-product" ? (
                <AddProduct setData={setData} />
              ) : (
                <MyProducts
                  setModalOpen={setModalOpen}
                  setSelectedProduct={setSelectedProduct}
                  data={filteredData}
                />
              )}
            </div>
          </>
        ) : (
          (() => {
            const product = data?.find((item: Product) => item.id === selectedProduct);
            return product ? (
              <ProductModal
                isOpen={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                  setSelectedProduct("");
                }}
                product={product}
              />
            ) : null;
          })()
        )}
      </div>
    </div>
  );
};

export default HomePage;
