import { CircleX, Receipt, Users } from "lucide-react";
import { useState } from "react";
import { useItem } from "../context/ItemContext";

type EditItemProp = {
  editItem: boolean;
  setEditItem: React.Dispatch<React.SetStateAction<boolean>>;
  item: { _id: string; name: string; price: number; qty: number } | undefined;
};

const EditItem = ({ editItem, setEditItem, item }: EditItemProp) => {
  const [name, setName] = useState<string | undefined>("");
  const [price, setPrice] = useState<number | undefined | "">("");
  const [qty, setQty] = useState<number | undefined | "">("");
  const { updateItem } = useItem();
  return (
    editItem && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="bg-white/90 w-11/12 md:w-1/2 lg:w-1/3 p-5 rounded-lg relative">
          <button
            onClick={() => setEditItem(!editItem)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CircleX />
          </button>

          {/* content  */}
          <h2 className="text-2xl font-bold mb-4">ပစ္စည်း စာရင်းပြင်ဆင်ရန်</h2>
          <p className="font-light mt-10">
            ပစ္စည်းအမည်၊ တစ်ခုလျှင်ဈေးနှုန်းနှင့် အရေအတွက်ကို ပြင်ဆင်ပါ။
          </p>

          <div className="border-b w-full my-8"></div>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full">
              <p className="font-semibold text-xl mb-2">အမည်</p>
              <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                <Users className="text-gray-500" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none text-black text-lg"
                  type="text"
                  name="name"
                  placeholder="ပြင်မည့်နာမည်ထည့်ပါ"
                  value={name}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-between gap-3">
              <div className="max-w-1/2">
                <p className="text-xl font-semibold mb-2">စျေးနှုန်း</p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <Receipt className="text-gray-500" />
                  <input
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                    className="w-full outline-none"
                    type="number"
                    name="item"
                    value={price}
                  />
                </div>
              </div>
              <div className="max-w-1/2">
                <p className="text-xl font-semibold mb-2">အရေအတွက်</p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <Receipt className="text-gray-500" />
                  <input
                    onChange={(e) => {
                      setQty(Number(e.target.value));
                    }}
                    className="w-full outline-none"
                    autoComplete="off"
                    type="number"
                    name="item"
                    value={qty}
                  />
                </div>
              </div>
            </div>
            <div className="w-full relative h-18 mt-5">
              <div className="max-md:w-10/12 md:w-5/12 absolute right-0 bottom-0 flex justify-evenly gap-4">
                <button
                  onClick={() => setEditItem(!editItem)}
                  className="px-5 py-3 max-w-1/2 cursor-pointer rounded-sm hover:bg-red-500 hover:text-white"
                >
                  ပယ်ဖျက်ရန်
                </button>
                <button
                  onClick={() => {
                    updateItem(
                      item?._id ?? "",
                      name === "" ? (item?.name ?? "") : (name ?? ""),
                      typeof price === "number" && !isNaN(price)
                        ? price
                        : (item?.price ?? 0),
                      typeof qty === "number" && !isNaN(qty)
                        ? qty
                        : (item?.qty ?? 0),
                    );
                    setName("");
                    setPrice("");
                    setQty("");
                    setEditItem(false);
                  }}
                  className="px-5 py-3 cursor-pointer max-w-1/2 bg-blue-500 rounded-sm text-gray-200"
                >
                  ပြင်ဆင်ရန်
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditItem;
