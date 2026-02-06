import {
  CircleX,
  Users,
  ShoppingBasket,
  DollarSign,
  Receipt,
  FileDigit,
} from "lucide-react";
import { useItem } from "../context/ItemContext";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import type { ItemProp } from "../types/item";
import toast from "react-hot-toast";

type NewDebtProps = {
  newDebt: boolean;
  setNewDebt: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewDebt = ({ newDebt, setNewDebt }: NewDebtProps) => {
  const { items, setItems } = useItem();
  const { addUser } = useUser();
  const [price, setPrice] = useState<number | undefined>(0);
  const [qty, setQty] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [paid, setPaid] = useState<number | "">("");
  const [getItem, setGetItem] = useState<ItemProp[]>([]);

  return (
    newDebt && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="bg-white/90 w-11/12 md:w-1/2 lg:w-1/3 p-5 rounded-lg relative">
          <button
            onClick={() => setNewDebt(!newDebt)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CircleX />
          </button>

          {/* content  */}
          <h2 className="text-2xl font-bold mb-4">ဝယ်သူအသစ်ထည့်ရန်</h2>
          <p className="font-light mt-10">
            ဝယ်သူအသစ်ထည့်ရန်အတွက် အောက်ပါအချက်အလက်များကို ဖြည့်စွက်ပေးပါ။
          </p>

          <div className="border-b w-full my-8"></div>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full">
              <p className="font-semibold max-md:text-md md:text-xl mb-2">
                နာမည်
              </p>
              <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                <Users className="text-gray-500" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  className="w-full outline-none text-black text-lg"
                  type="text"
                  name="name"
                  placeholder="ဝယ်သူနာမည်ထည့်ပါ"
                  value={name}
                />
              </div>
            </div>
            <div className="flex justify-evenly gap-4 mb-3 mt-4">
              <div className="md:w-full max-md:w-6/12">
                <p className="max-md:text-md md:text-xl font-semibold mb-2">
                  ပစ္စည်း
                </p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <ShoppingBasket className="text-gray-500" />
                  <select
                    name="item"
                    className="w-full outline-none capitalize"
                    onChange={(e) => {
                      const price = items.find(
                        (item) => item._id === e.target.value,
                      )?.price;

                      setPrice(price);
                      setSelectedId(e.target.value);
                      setQty(1);
                      if (e.target.value === "") {
                        setPrice(0);
                        setQty(0);
                      }
                    }}
                  >
                    <option className="max-md:text-sm" value="">
                      ပစ္စည်းများ
                    </option>
                    {items.map(
                      (item) =>
                        item.stock &&
                        item.stock > 0 && (
                          <option key={item._id} value={item._id}>
                            {item.name} {`[${item.stock}]`}
                          </option>
                        ),
                    )}
                  </select>
                </div>
              </div>
              <div className="max-md:w-3/12 md:w-full">
                <p className="max-md:text-md md:text-xl font-semibold mb-2">
                  အရေအတွက်
                </p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <FileDigit className="text-gray-500" />
                  <input
                    onChange={(e) => {
                      setQty(Number(e.target.value));
                      const selectedItem = items.find(
                        (item) => item._id === selectedId,
                      );
                      if (selectedItem?.stock !== undefined)
                        if (Number(e.target.value) > selectedItem?.stock) {
                          toast.error("Quantity exceeds available stock");
                          setQty(selectedItem?.stock);
                        }
                    }}
                    autoComplete="off"
                    type="number"
                    className="w-full outline-none"
                    value={qty}
                  />
                </div>
              </div>
              <div className="max-md:w-3/12 md:w-full">
                <p className="max-md:text-md md:text-xl font-semibold mb-2">
                  စျေးနှုန်း
                </p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <DollarSign className="text-gray-500" />
                  <div className="w-full">{price}</div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <button
                onClick={() => {
                  const selectedItem = items.find(
                    (item) => item._id === selectedId,
                  );
                  if (selectedItem && typeof selectedItem.stock === "number") {
                    selectedItem.stock = selectedItem.stock - qty;
                  }
                  const oldItems = items.filter(
                    (item) => item._id !== selectedId,
                  );
                  if (selectedItem) {
                    setItems([
                      ...oldItems,
                      ...(selectedItem ? [selectedItem] : []),
                    ]);
                  } else {
                    setItems([...oldItems]);
                  }
                  if (
                    selectedItem &&
                    typeof selectedItem._id === "string" &&
                    typeof selectedItem.name === "string" &&
                    typeof selectedItem.price === "number"
                  ) {
                    const updateSelectedItem: ItemProp = {
                      _id: selectedItem._id,
                      name: selectedItem.name,
                      price: selectedItem.price * qty,
                      qty: qty,
                    };
                    setGetItem([...getItem, updateSelectedItem]);
                  }
                  setQty(1);
                  setPrice(0);
                }}
                className="bg-blue-500 w-full rounded-lg py-2 uppercase text-white font-semibold cursor-pointer"
              >
                ထည့်ပါ
              </button>
            </div>
            <div>
              <p className="text-xl font-semibold mb-2 mt-5">
                ရွေးချယ်ထားသော ပစ္စည်းများ
              </p>
              <div className="flex flex-wrap gap-2 border border-black/20 px-2 py-3 rounded-lg">
                {getItem.map((item) => (
                  <li
                    key={item._id}
                    className="list-none bg-blue-200 p-3 rounded-lg relative"
                  >
                    <CircleX
                      className="absolute -right-2 -top-2 text-red-500 bg-red-300 rounded-full cursor-pointer"
                      onClick={() => {
                        setGetItem(
                          getItem.filter((get) => get._id !== item._id),
                        );
                        const selectedItem = items.find(
                          (it) => it._id === item._id,
                        );
                        if (
                          selectedItem &&
                          typeof selectedItem.stock === "number"
                        ) {
                          selectedItem.stock = selectedItem.stock + item.qty;
                        }
                        const oldItems = items.filter(
                          (it) => it._id !== item._id,
                        );
                        if (selectedItem) {
                          setItems([...oldItems, selectedItem]);
                        } else {
                          setItems([...oldItems]);
                        }
                      }}
                    />
                    {item.name}
                  </li>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xl font-semibold mb-2">
                ပေးထားသော ပိုက်ဆံပမာဏ
              </p>
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
              <div className="max-md:w-10/12 md:w-5/12 absolute right-0 bottom-0 flex justify-evenly gap-4">
                <button
                  onClick={() => setNewDebt(!newDebt)}
                  className="px-5 py-3 max-w-1/2 cursor-pointer rounded-sm hover:bg-red-500 hover:text-white"
                >
                  ပယ်ဖျက်ရန်
                </button>
                <button
                  onClick={() => {
                    if (name.trim() === "" || getItem.length === 0) {
                      toast.error("နာမည်နှင့် ပစ္စည်းအချက်အလက်များကို ဖြည့်ပါ");
                      return;
                    }
                    addUser(name, getItem, paid);
                    setName("");
                    setPaid("");
                    setGetItem([]);
                    setNewDebt(false);
                  }}
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

export default NewDebt;
