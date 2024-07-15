import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import useGetOrders from "../../hooks/orders/useGetOrders";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrders()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error.error || error}
        </Message>
      ) : (
        <table className="container mx-auto w-full sm:w-[96%] sm:ml-[4%] res:mt-[80px]">
          <AdminMenu/>
          <thead className="w-full border hidden sm:table-header-group">
            <tr className="mb-[5rem]">
              <th className="text-left pl-1">ITEMS</th>
              <th className="text-left pl-1">ID</th>
              <th className="text-left pl-1">USER</th>
              <th className="text-left pl-1">DATE</th>
              <th className="text-left pl-1">TOTAL</th>
              <th className="text-left pl-1">PAID</th>
              <th className="text-left pl-1">DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order?._id} className="block sm:table-row mb-4 sm:mb-0 border sm:border-0 p-4 sm:p-0 shadow sm:shadow-none">
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="ITEMS">
                  <span className="sm:hidden font-bold pr-4">ITEMS:</span>
                  <img src={order?.orderItems[0]?.image} alt={order?._id} className="w-[5rem] pt-4 sm:pt-0" />
                </td>
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="ID">
                  <span className="sm:hidden font-bold pr-4">ID:</span>
                  {order?._id}
                </td>
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="USER">
                  <span className="sm:hidden font-bold pr-4">USER:</span>
                  {order?.user ? order?.user?.username : "N/A"}
                </td>
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="DATE">
                  <span className="sm:hidden font-bold pr-4">DATE:</span>
                  {order?.createdAt ? order?.createdAt?.substring(0, 10) : "N/A"}
                </td>
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="TOTAL">
                  <span className="sm:hidden font-bold pr-4">TOTAL:</span>
                  ₹ {order?.totalPrice}
                </td>
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="PAID">
                  <span className="sm:hidden font-bold pr-4">PAID:</span>
                  {order?.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="DELIVERED">
                  <span className="sm:hidden font-bold pr-4">DELIVERED:</span>
                  {order?.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td className="flex justify-between items-center sm:table-cell py-2 sm:py-0" data-label="ACTIONS">
                  <span className="sm:hidden font-bold pr-4">ACTIONS:</span>
                  <Link to={`/order/${order?._id}`}>
                    <button>More</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
