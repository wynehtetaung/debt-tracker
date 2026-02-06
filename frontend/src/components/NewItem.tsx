import { CircleX, Users, Receipt, FileDigit } from "lucide-react";
import { useState } from "react";
import { useItem } from "../context/ItemContext";

type newItemProps = {
  newItem: boolean;
  setNewItem: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewItem = ({ newItem, setNewItem }: newItemProps) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [qty, setQty] = useState<number | "">("");
  const { addItem } = useItem();
  return (
    newItem && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="bg-white/90 w-11/12 md:w-1/2 lg:w-1/3 p-5 rounded-lg relative">
          <button
            onClick={() => setNewItem(!newItem)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CircleX />
          </button>

          {/* content  */}
          <h2 className="text-2xl font-bold mb-4">ပစ္စည်း စာရင်းထည့်ရန်</h2>
          <p className="font-light">
            ပစ္စည်းအမည်၊ တစ်ခုလျှင်ဈေးနှုန်းနှင့် အရေအတွက်ကို ဖြည့်စွက်ပါ။
          </p>

          <div className="border-b w-full my-5"></div>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              addItem(name, price, qty);
              setName("");
              setPrice("");
              setQty("");
            }}
          >
            <div className="w-full">
              <p className="font-semibold text-xl mb-1">အမည်</p>
              <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                <Users className="text-gray-500" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  className="w-full outline-none text-black text-lg"
                  type="text"
                  name="name"
                  placeholder="ပစ္စည်းအမည်ထည့်ပါ"
                  value={name}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-evenly">
              <div className="max-w-1/2">
                <p className="text-xl font-semibold mb-1">စျေးနှုန်း</p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <Receipt className="text-gray-500" />
                  <input
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                    autoComplete="off"
                    className="w-full outline-none"
                    type="number"
                    name="item"
                    value={price}
                  />
                </div>
              </div>
              <div className="max-w-1/2">
                <p className="text-xl font-semibold mb-1">အရေအတွက်</p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <FileDigit className="text-gray-500" />
                  <input
                    onChange={(e) => {
                      setQty(Number(e.target.value));
                    }}
                    autoComplete="off"
                    className="w-full outline-none"
                    type="number"
                    name="item"
                    value={qty}
                  />
                </div>
              </div>
            </div>
            <div className="w-full relative h-18 mt-5">
              <div className="w-5/12 absolute right-0 bottom-0 flex justify-evenly gap-4">
                <button
                  onClick={() => setNewItem(!newItem)}
                  className="px-5 py-3 max-w-1/2 cursor-pointer rounded-sm hover:bg-red-500 hover:text-white"
                >
                  ပယ်ဖျက်ရန်
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 cursor-pointer max-w-1/2 bg-blue-500 rounded-sm text-gray-200"
                >
                  ထည့်ရန်
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default NewItem;
