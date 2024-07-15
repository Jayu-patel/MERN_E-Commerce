import { useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import useGetUsers from "../../hooks/user/useGetUsers";
import useGetTotalSales from "../../hooks/orders/useGetTotalSales";
import useGetTotalOrders from "../../hooks/orders/useGetTotalOrders";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSales()

  const {data: customers, refetch} = useGetUsers()

  const { data: orders } = useGetTotalOrders()


  useEffect(()=>{refetch()},[])

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] res:mt-[70px]">
        <div className="w-[80%] res:mx-auto flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              ₹
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              ₹ {isLoading ? <Loader /> : sales?.totalSales?.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              ₹
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              ₹
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
