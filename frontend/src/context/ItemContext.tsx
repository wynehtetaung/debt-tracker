import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ItemProp } from "../types/item";
import axios from "axios";

type ItemProviderProps = {
  children: ReactNode;
};
type ItemContextType = {
  items: ItemProp[];
  setItems: React.Dispatch<React.SetStateAction<ItemProp[]>>;
  addItem: (
    name: string,
    price: number | "" | undefined,
    qty: number | "",
  ) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (
    id: string,
    name: string,
    price: number,
    qty: number,
  ) => Promise<void>;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useItem = (): ItemContextType => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [items, setItems] = useState<ItemProp[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/item");
        if (data.success) {
          setItems(data.items);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    })();
  }, []);

  const addItem = async (
    name: string,
    price: number | "" | undefined,
    qty: number | "",
  ) => {
    try {
      const { data } = await axios.post("/item/add", { name, price, qty });
      if (data.success) {
        setItems([...items, data.item]);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const updateItem = async (
    id: string,
    name: string,
    price: number,
    qty: number,
  ) => {
    try {
      const { data } = await axios.put(`/item/update/${id}`, {
        name,
        price,
        qty,
      });
      if (data.success) {
        const oldItems = items.filter((item) => item._id !== id);
        setItems([...oldItems, data.item]);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { data } = await axios.delete(`/item/delete/${id}`);
      if (data.success) {
        const updateItems = items.filter((item) => item._id !== id);
        setItems(updateItems);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  const value = {
    items,
    setItems,
    addItem,
    deleteItem,
    updateItem,
  };
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
