import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import useFetchCategories from "../hooks/categories/useFetchCategories";
import useGetFilteredProducts from "../hooks/product/useGetFilteredProducts";
import {RxHamburgerMenu} from "react-icons/rx"

const Shop = () => {

  const [hid, setHid] = useState('res:hidden')
  const [menu, setMenu] = useState('res:ml-[-180px]')

  const openMenu=()=>{
    hid == 'res:hidden' ? 
    setHid('res:block') : 
    setHid('res:hidden')

    menu == 'res:ml-[-180px]' ?
    setMenu('res:mx-0') :
    setMenu('res:ml-[-180px]')
  }

  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state?.shop
  );


  const { data: categoriesData, refetch, loading } = useFetchCategories()

  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProducts({checked,radio})


  useEffect(() => {
    if (!loading) {
      dispatch(setCategories(categoriesData));
    }
  }, [categoriesData, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery?.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery?.data?.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery?.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery?.data?.filter(
      (product) => product?.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery?.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  useEffect(()=>{
    refetch()
    filteredProductsQuery.getData()
  },[checked,radio])

  useEffect(()=>{},[hid,menu])

  const hideBtn=()=> {
    if(window.innerWidth > 1000){
      setHid('res:block')
      setMenu('res:mx-0')
    }
  }
  
  window.onresize = hideBtn

  return (
    <>
      <div className="container mx-auto ml-[4%] w-[96%] res:mt-[70px]">
        <div className="flex md:flex-row">
          <div className={"p-3 mt-2 mb-2 res:w-[200px] "+menu}>
            <div className="flex">
              <div className="flex-[9]">
                <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                  Filter by Categories
                </h2>
              </div>
              <div className="flex-1 py-2 ml-24 hidden res:block">
                <button className="flex-1 p-0" onClick={openMenu}> <RxHamburgerMenu /> </button>
              </div>
            </div>

            <div className={"p-5 w-[15rem] "+hid}>
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className={"h4 text-center py-2 bg-black rounded-full mb-2 "+hid}>
              Filter by Brands
            </h2>

            <div className={"p-5 "+hid}>
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-enter mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className={"h4 text-center py-2 bg-black rounded-full mb-2 "+hid}>
              Filer by Price
            </h2>

            <div className={"p-5 w-[15rem] "+hid}>
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className={"p-5 pt-0 "+hid}>
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h-4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap res:w-[80vw]">
              {products?.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
