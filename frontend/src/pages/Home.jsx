import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import useGetProducts from "../hooks/product/useGetProducts";

const Home = () => {
  const { keyword } = useParams();
  const {data, isLoading, isError} = useGetProducts(keyword)

  return (
    <>
      {!keyword ? <Header /> : null}
      {
      isLoading ? <Loader />
      : isError ?
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      : 
        <>
          <div className="flex justify-between items-center w-[96%] ml-[4%] res:mt-[80px] res:w-full res:ml-auto">
            <h1 className="ml-[20rem] mt-[10rem] res:ml-auto res:mt-auto text-[3rem] res:text-[1.4rem] res:pr-[1rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] res:mr-auto res:mt-auto"
            >
              Shop
            </Link>
          </div>

          <div className="">
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data?.products?.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Home;
