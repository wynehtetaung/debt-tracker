import { ArrowLeftCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NewItem from "../components/NewItem";
import { useState } from "react";
import { useItem } from "../context/ItemContext";
import EditItem from "../components/EditItem";
import type { ItemProp } from "../types/item";
import { Toaster } from "react-hot-toast";

const ItemList = () => {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<boolean>(false);
  const [editItemProp, setEditItemProp] = useState<ItemProp>();
  const { items, deleteItem } = useItem();
  return (
    <div className="max-w-11/12 mx-auto">
      <div className="mt-5 flex justify-between">
        <div className="flex gap-4 justify-center items-center">
          <ArrowLeftCircle
            className="w-10 h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-2xl uppercase font-bold">Item Lists</p>
          <Toaster />
        </div>

        <div
          onClick={() => setNewItem(true)}
          className="bg-blue-600 rounded-lg flex gap-2 justify-center items-center p-3 select-none cursor-pointer"
        >
          <Plus className="bg-white text-blue-600 rounded-full w-5 h-5" />
          <span className="text-white">Add New Item</span>
        </div>
        <NewItem newItem={newItem} setNewItem={setNewItem} />
      </div>
      <div className="w-full border border-gray-300 mt-10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-black/20">
              <th className="py-5">Name</th>
              <th className="py-5">Price</th>
              <th className="py-5">Quantity</th>
              <th className="py-5">Action</th>
            </tr>
            <tr className="border-b border-gray-600"></tr>
          </thead>
          <tbody className="">
            {items.map((item) => (
              <tr key={item._id} className="border-b border-gray-400">
                <th className="py-5 text-lg capitalize">{item.name}</th>
                <th className="py-5 text-lg">{item.price.toLocaleString()}</th>
                <th className="py-5 text-lg">{item.qty.toLocaleString()}</th>
                <th className="py-5 text-lg ">
                  <span
                    onClick={() => {
                      setEditItem(true);
                      setEditItemProp(item);
                    }}
                    className="capitalize p-2 bg-blue-500 text-white px-4 rounded-lg mr-3 cursor-pointer"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => deleteItem(item._id)}
                    className="capitalize p-2 cursor-pointer hover:bg-red-500 hover:text-white hover:rounded-lg"
                  >
                    Delete
                  </span>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <EditItem
          editItem={editItem}
          setEditItem={setEditItem}
          item={editItemProp}
        />
      </div>
    </div>
  );
};

export default ItemList;
