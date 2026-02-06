import { CircleX, Receipt } from "lucide-react";
import { useState } from "react";
import { useUser } from "../context/UserContext";

const EditUser = () => {
  const [paid, setPaid] = useState<number | "">("");
  const { editDebt, setEditDebt, updateUser, selectedEdit } = useUser();
  return (
    editDebt && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="bg-white/90 w-11/12 md:w-1/2 lg:w-1/3 p-5 rounded-lg relative">
          <button
            onClick={() => setEditDebt(!editDebt)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CircleX />
          </button>

          {/* content  */}
          <h2 className="text-2xl font-bold mb-4">Add New Debt Entry</h2>
          <p className="font-light">
            Record a new debt or credit to keep your finances.
          </p>

          <div className="border-b w-full my-5"></div>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mt-5">
              <p className="text-xl font-semibold mb-1">Paid Amount</p>
              <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                <Receipt className="text-gray-500" />
                <input
                  onChange={(e) => setPaid(Number(e.target.value))}
                  autoComplete="off"
                  className="w-full outline-none"
                  type="number"
                  name="item"
                  value={paid}
                />
              </div>
            </div>
            <div className="w-full relative h-18 mt-5">
              <div className="w-5/12 absolute right-0 bottom-0 flex justify-evenly gap-4">
                <button
                  onClick={() => setEditDebt(!editDebt)}
                  className="px-5 py-3 max-w-1/2 cursor-pointer rounded-sm hover:bg-red-500 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateUser(selectedEdit, paid as number);
                    setPaid("");
                    setEditDebt(false);
                  }}
                  className="px-5 py-3 cursor-pointer max-w-1/2 bg-blue-500 rounded-sm text-gray-200"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditUser;
