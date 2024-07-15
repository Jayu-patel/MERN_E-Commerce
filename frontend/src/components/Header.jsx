import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import useGetTopProducts from "../hooks/product/useGetTopProducts";
import { useEffect, useState } from "react";

const Header = () => {
  const [carouselProduct, setProduct] = useState([])
  const { data, isLoading, error } = useGetTopProducts()

  useEffect(()=>{
    setProduct(data)
  },[data])

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex res:flex-col-reverse justify-around res:w-[95%] res:mx-auto w-[96%] ml-[4%] res:mt-[80px]">
        <div className="xl:block">
          <div className="grid grid-cols-2">
            {data?.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel products={carouselProduct} isLoading={isLoading} error={error}/>
      </div>
    </>
  );
};

export default Header;
