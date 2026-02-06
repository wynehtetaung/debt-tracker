import {
  CircleX,
  Users,
  ShoppingBasket,
  DollarSign,
  Receipt,
  FileDigit,
} from "lucide-react";
import { useItem } from "../context/ItemContext";
import { useEffect, useState } from "react";
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
  const [price, setPrice] = useState<number | "" | undefined>("");
  const [qty, setQty] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [paid, setPaid] = useState<number | "">("");
  const [getItem, setGetItem] = useState<ItemProp[]>([]);

  useEffect(() => {
    if (items.length > 0 && selectedId === "") {
      setSelectedId(items[0]._id);
      setPrice(items[0].price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
          <p className="font-light">
            ဝယ်သူအသစ်ထည့်ရန်အတွက် အောက်ပါအချက်အလက်များကို ဖြည့်စွက်ပေးပါ။
          </p>

          <div className="border-b w-full my-5"></div>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full">
              <p className="font-semibold text-xl mb-1">နာမည်</p>
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
            <div className="flex justify-evenly gap-4 my-3">
              <div className="w-full">
                <p className="text-xl font-semibold mb-1">ပစ္စည်း</p>
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
                    }}
                  >
                    {items.map(
                      (item) =>
                        item.qty > 0 && (
                          <option key={item._id} value={item._id}>
                            {item.name} {`[${item.qty}]`}
                          </option>
                        ),
                    )}
                  </select>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-semibold mb-1">အရေအတွက်</p>
                <div className="flex gap-2 border border-black/20 px-2 py-3 rounded-lg">
                  <FileDigit className="text-gray-500" />
                  <input
                    onChange={(e) => {
                      setQty(Number(e.target.value));
                      const selectedItem = items.find(
                        (item) => item._id === selectedId,
                      );
                      if (Number(e.target.value) > (selectedItem?.qty || 0)) {
                        toast.error("Quantity exceeds available stock");
                        setQty(selectedItem?.qty || 0);
                      }
                    }}
                    autoComplete="off"
                    type="number"
                    className="w-full outline-none"
                    value={qty}
                  />
                </div>
              </div>
              <div className="">
                <p className="text-xl font-semibold mb-1">စျေးနှုန်း</p>
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
                  if (selectedItem && typeof selectedItem.qty === "number") {
                    selectedItem.qty = selectedItem.qty - qty;
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
                }}
                className="bg-blue-500 w-full rounded-lg py-2 uppercase text-white font-semibold cursor-pointer"
              >
                ထည့်ပါ
              </button>
            </div>
            <div>
              <p className="text-xl font-semibold mb-1">
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
                          typeof selectedItem.qty === "number"
                        ) {
                          selectedItem.qty = selectedItem.qty + item.qty;
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
              <p className="text-xl font-semibold mb-1">
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
              <div className="w-5/12 absolute right-0 bottom-0 flex justify-evenly gap-4">
                <button
                  onClick={() => setNewDebt(!newDebt)}
                  className="px-5 py-3 max-w-1/2 cursor-pointer rounded-sm hover:bg-red-500 hover:text-white"
                >
                  ပယ်ဖျက်ရန်
                </button>
                <button
                  onClick={() => {
                    if (name.trim() === "" || getItem.length === 0) {
                      toast.error("Name and items are required");
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
