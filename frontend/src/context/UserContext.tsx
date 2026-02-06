import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { DebtUser } from "../types/user";
import type { ItemProp } from "../types/item";
import toast from "react-hot-toast";

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  users: DebtUser[];
  addUser: (
    name: string,
    items: ItemProp[],
    paidAmount: number | "",
  ) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (uid: string, amount: number) => Promise<void>;
  editDebt: boolean;
  setEditDebt: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEdit: string;
  setSelectedEdit: React.Dispatch<React.SetStateAction<string>>;
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

const UserContext = createContext<UserContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<DebtUser[]>([]);
  const [editDebt, setEditDebt] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/user");
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          console.error(error.message);
        }
      }
    })();
  }, []);

  const addUser = async (
    name: string,
    items: ItemProp[],
    paidAmount: number | "",
  ) => {
    try {
      const { data } = await axios.post(`/user/add`, {
        name,
        items,
        paidAmount,
      });
      if (data.success) {
        setUsers([...users, data.newUser]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("error.message");
        console.error(error.message);
      }
    }
  };

  const updateUser = async (uid: string, amount: number): Promise<void> => {
    try {
      const user = users.find((user) => user._id === uid);
      if (user?.paidStatus === "paid") {
        toast.error("This user is already paid all debts.");
        return;
      } else if (
        user?.unPaidAmount !== undefined &&
        user.unPaidAmount < amount
      ) {
        toast.error(`total paid is ${user?.unPaidAmount.toLocaleString()}`);
        return;
      }
      const { data } = await axios.put(`/user/update/${uid}`, {
        amount,
      });
      if (data.success) {
        const oldUser = users.filter((user) => user._id !== uid);
        setUsers([...oldUser, data.updateUser]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      }
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { data } = await axios.delete(`/user/delete/${id}`);
      if (data.success) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      }
    }
  };

  const value = {
    users,
    addUser,
    deleteUser,
    updateUser,
    editDebt,
    setEditDebt,
    selectedEdit,
    setSelectedEdit,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
