import {
  BanknoteArrowUp,
  BanknoteX,
  CircleCheck,
  List,
  Plus,
  Search,
} from "lucide-react";
import NewDebt from "../components/NewDebt";
import User from "../components/User";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import type { DebtUser } from "../types/user";
import EditUser from "../components/EditUser";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const [newDebt, setNewDebt] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [itemSearch, setItemSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  const { users, deleteUser, setSelectedEdit, setEditDebt } = useUser();
  const totalDebt =
    users && users.reduce((sum, user: DebtUser) => sum + user.totalPaid, 0);
  const totalUnPaid = users.reduce(
    (sum, user: DebtUser) => sum + user.unPaidAmount,
    0,
  );
  const totalPaid = users.reduce(
    (sum, user: DebtUser) => sum + user.paidAmount,
    0,
  );

  const filterUsers = users.filter((user) =>
    filter
      ? filter !== ""
        ? user.paidStatus === filter
        : user
      : !itemSearch
        ? user.name.toLowerCase().includes(search.toLowerCase())
        : user.items.some((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          ),
  );
  return (
    <div className="w-full lg:w-11/12 mx-auto">
      <div className="max-md:flex-row md:flex justify-between items-center mt-10">
        <div className="max-md:text-xl max-md:ml-2 md:text-3xl font-bold uppercase">
          Debt OverView
        </div>
        <Toaster />
        <div className="max-md:float-end max-md:mr-2 max-md:my-4 flex gap-4">
          <div
            onClick={() => navigate("/list")}
            className="bg-blue-600 rounded-lg flex gap-2 justify-center items-center max-md:p-1 md:p-3 select-none cursor-pointer"
          >
            <List className="max-md:hidden md:flex  text-white w-5 h-5" />
            <span className="text-white max-md:px-2">ပစ္စည်းများ</span>
          </div>
          <div
            onClick={() => setNewDebt(true)}
            className="bg-blue-600 rounded-lg flex gap-2 justify-center items-center p-3 select-none cursor-pointer"
          >
            <Plus className="bg-white text-blue-600 rounded-full w-5 h-5" />
            <span className="text-white">အသစ်ထည့်ရန်</span>
          </div>
        </div>
      </div>
      <NewDebt newDebt={newDebt} setNewDebt={setNewDebt} />
      <div className="max-md:flex-col md:flex md:justify-evenly gap-5 px-5 mt-12">
        <div className="bg-white border border-gray-300 max-md:py-20 md:p-25 rounded-lg w-full h-30 flex flex-col items-center justify-center">
          <div className="flex gap-2 w-full justify-center items-center">
            <BanknoteArrowUp className="min-w-12 min-h-12 bg-blue-600/50 p-3 rounded-full" />
            <span className="text-3xl font-bold">စုစုပေါင်း</span>
          </div>
          <p className="mt-3 text-xl font-semibold">
            {totalDebt.toLocaleString()} MMK
          </p>
        </div>
        <div className="bg-white border max-md:my-3 border-gray-300 max-md:py-20 md:p-25 rounded-lg w-full h-30 flex flex-col items-center justify-center">
          <div className="flex gap-2 justify-center items-center">
            <BanknoteX className="min-w-12 min-h-12 bg-red-200/70 p-3 rounded-full text-red-500" />
            <span className="text-3xl font-bold">မပေးသေးသောငွေ</span>
          </div>
          <p className="mt-3 text-xl font-semibold">
            {totalUnPaid.toLocaleString()} MMK
          </p>
          <p className="text-lg text-red-500 mt-2 font-semibold">
            {users.filter((user) => user.paidStatus === "unpaid").length} Debt
            pending
          </p>
        </div>
        <div className="bg-white border border-gray-300 max-md:py-20 md:p-25 rounded-lg w-full h-30 flex flex-col items-center justify-center">
          <div className="flex gap-2 justify-center items-center">
            <CircleCheck className="min-w-12 min-h-12 bg-green-600/40 p-3 rounded-full text-green-600" />
            <span className="text-3xl font-bold">ပေးပြီးသား</span>
          </div>
          <p className="mt-3 text-xl font-semibold">
            {totalPaid.toLocaleString()} MMK
          </p>
          <p className="text-lg text-green-500 mt-2 font-semibold">
            {Math.floor((totalPaid / totalDebt) * 100)}% paid
          </p>
        </div>
      </div>
      <div className="w-full mt-5 max-md:justify-between md:justify-evenly max-md:flex-col md:flex gap-5 p-5 border border-gray-300 rounded-lg">
        <div className="bg-gray-400/40 max-md:w-full md:w-2/3 gap-3 items-center flex max-md:py-3 max-md:px-1 md:p-3 rounded-lg">
          <Search className="text-gray-500" />
          <input
            onChange={(e) => {
              setSearch(e.target.value.trim());
            }}
            className="max-md:w-7/12 md:w-10/12 outline-none py-3 text-gray-600 max-md:text-sm md:text-lg font-bold"
            autoComplete="off"
            type="text"
            name="search"
            placeholder="နာမည်(သို့)ပစ္စည်းအမည်ရိုက်ထည့်ပါ"
            value={search}
          />
          <button
            onClick={() => setItemSearch(!itemSearch)}
            className={`text-white max-md:text-sm rounded-lg px-2 py-3 cursor-pointer ${itemSearch ? "bg-blue-500" : "bg-gray-500"}`}
          >
            ပစ္စည်းအမည်
          </button>
        </div>
        <div className="max-md:w-full max-md:my-3 md:w-1/3 bg-gray-400/40 rounded-lg justify-center items-center flex md:px-3 max-md:py-4 max-md:px-2">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="w-full outline-none text-lg font-bold"
          >
            <option className="text-lg font-semibold" value="">
              အားလုံး
            </option>
            <option className="text-lg font-semibold" value="paid">
              ပေးပြီးသား
            </option>
            <option className="text-lg font-semibold" value="unpaid">
              မပေးရသေး
            </option>
            <option className="text-lg font-semibold" value="partial">
              အကုန်မကျေသေး
            </option>
          </select>
        </div>
      </div>

      {/* user lists */}
      {/* desktop view  */}
      <div className="max-md:hidden w-full mt-5 border border-gray-300 rounded-lg overflow-hidden">
        {/* TABLE HEADER */}
        <table className="w-full table-fixed bg-black/20">
          <thead className="uppercase">
            <tr className="text-xl font-bold">
              <th className="px-5 py-5">အမည်</th>
              <th className="px-5 py-5">အချိန်</th>
              <th className="px-5 py-5">ပစ္စည်း နှင့် အရေအတွက်</th>
              <th className="px-5 py-5">စုစုပေါင်းတန်ဖိုး</th>
              <th className="px-5 py-5">ပေးငွေ</th>
              <th className="px-5 py-5">မပေးသေးသောငွေ</th>
              <th className="px-5 py-5">စစ်ဆေးချက်</th>
              <th className="px-5 py-5">လုပ်ဆောင်ချက်</th>
            </tr>
            <tr className="border-b border-black/20"></tr>
          </thead>
        </table>

        {/* TABLE BODY (SCROLL ONLY HERE) */}
        <div className="max-h-87.5 overflow-y-auto">
          <table className="w-full table-fixed bg-black/20">
            <tbody>
              {filterUsers.map((user: DebtUser) => (
                <User key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* phone view  */}
      <div className="">
        {filterUsers.map((user: DebtUser) => (
          <div
            key={user._id}
            className="my-4 bg-black/20 max-w-11/12 mx-auto rounded-sm py-3 px-1 "
          >
            <div className="mb-3 flex justify-around">
              <div className="">
                <p className="font-semibold text-lg mb-1">{user.name}</p>

                <p className="font-light text-sm">{user.date}</p>
              </div>
              <div className="border-l border-gray-500"></div>
              <div className="">
                {user.items.map((item) => (
                  <li key={item._id} className="my-1 list-decimal">
                    {item.name}
                  </li>
                ))}
              </div>
            </div>
            <div className="border-b"></div>
            <div className="flex justify-around my-3 items-center">
              <div className="text-center">
                <p className="mb-2">စုစုပေါင်းတန်ဖိုး</p>
                <p>{user.totalPaid}</p>
              </div>
              <div className="text-center">
                <p className="mb-2">ပေးငွေ</p>
                <p>
                  {typeof user.paidAmount === "object"
                    ? "0"
                    : user.paidAmount?.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="mb-2">မပေးသေးသောငွေ</p>
                <p>{user.unPaidAmount}</p>
              </div>
            </div>
            <div className="border-b"></div>
            <div className="flex justify-around mt-3 items-center">
              <div className="">
                <span
                  onClick={() => {
                    setEditDebt(true);
                    setSelectedEdit(user._id);
                  }}
                  className="text-violet-500"
                >
                  ပေးရန်
                </span>
              </div>
              <div className="">
                <p
                  className={`${user.paidStatus === "paid" ? "text-green-600 bg-green-400/20 rounded-sm p-2" : "text-red-600 bg-red-400/20 rounded-sm p-2"}`}
                >
                  {" "}
                  {user.paidStatus === "paid"
                    ? "ပေးပြီး"
                    : user.paidStatus === "unpaid"
                      ? "မပေးရသေး"
                      : "အကုန်မကျေသေး"}
                </p>
              </div>
              <div className="">
                <span
                  onClick={() => deleteUser(user._id)}
                  className="text-red-500 ml-4"
                >
                  ဖျက်မည်
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EditUser />
    </div>
  );
};

export default Home;
