import { useUser } from "../context/UserContext";
import type { DebtUser } from "../types/user";

type userProp = {
  user: DebtUser;
};
const User = ({ user }: userProp) => {
  const { deleteUser, setEditDebt, setSelectedEdit } = useUser();
  return (
    <>
      <tr className="capitalize">
        <th className="p-5">{user.name}</th>
        <th className="p-5">{user.date}</th>
        <th className="p-5">
          {user.items.map((item) => (
            <li key={item._id} className="list-none">
              {item.name} {`[ ${item.qty}]`}
            </li>
          ))}
        </th>
        <th className="p-5">{user.totalPaid?.toLocaleString()}</th>
        <th className="p-5">
          {typeof user.paidAmount === "object"
            ? "0"
            : user.paidAmount?.toLocaleString()}
        </th>
        <th className="p-5">{user.unPaidAmount?.toLocaleString()}</th>
        <th className={`p-5 `}>
          <p
            className={`${user.paidStatus === "paid" ? "text-green-600 bg-green-400/20 rounded-full py-1" : "text-red-600 bg-red-400/20 rounded-full py-1"}`}
          >
            {" "}
            {user.paidStatus === "paid"
              ? "ပေးပြီး"
              : user.paidStatus === "unpaid"
                ? "မပေးရသေး"
                : "အကုန်မကျေသေး"}
          </p>
        </th>
        <th className="p-5 cursor-pointer text-blue-600 select-none">
          <span
            onClick={() => {
              setEditDebt(true);
              setSelectedEdit(user._id);
            }}
          >
            ပြင်ရန်
          </span>{" "}
          <span
            onClick={() => deleteUser(user._id)}
            className="text-red-500 ml-4"
          >
            ဖျက်မည်
          </span>
        </th>
      </tr>
    </>
  );
};

export default User;
