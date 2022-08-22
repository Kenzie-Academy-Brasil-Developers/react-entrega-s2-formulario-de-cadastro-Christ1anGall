import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

interface IProviderProps {
  children: ReactNode;
}

export interface IuserData {
  email: string;
  password: string;
  name?: string;
  bio?: string;
  contact?: string;
  course_module?: string;
}

export interface IresponseUserData {
  avatar_url?: string | null;
  bio?: string;
  contact?: string;
  course_module?: string;
  created_at?: string;
  email?: string;
  id?: string;
  name?: string;
  techs?: IuserTechs[];
  updated_at?: string;
  works?: IuserWorks[];
}

interface IuserTechs {
  created_at: string;
  id: string;
  status: string;
  title: string;
  updated_at: string;
}

interface IuserWorks {
  title: string;
  description: string;
  deploy_url: string;
}

export interface IuserContext {
  user: IresponseUserData;
  requestUser: (data: IuserData) => void;
  createUser: (data: IuserData) => void;
  setUser: Dispatch<SetStateAction<{}>>;
}

export const UserContext = createContext<IuserContext>({} as IuserContext);

const Provider = ({ children }: IProviderProps) => {
  let navigate = useNavigate();

  const [user, setUser] = useState({});

  const token = localStorage.getItem("@TOKEN");

  useEffect(() => {
    token
      ? api.get("/profile").then((res) => setUser(res.data))
      : navigate("../Login", { replace: true });
  }, [token]);

  const requestUser = async (data: IuserData) => {
    await api
      .post("/sessions", data)
      .then((res) => {
        setUser(res.data.user);
        const notify = () =>
          toast.success(`Bem vindo ${res.data.user.name}!`, {
            theme: "dark",
          });
        localStorage.setItem("@TOKEN", res.data.token);
        localStorage.setItem("@USERID", res.data.user.id);
        notify();
        navigate("../Dashboard", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        const notify = () =>
          toast.error(`ops!! email ou senha não confere!`, {
            theme: "dark",
          });
        notify();
      });
  };

  const createUser = async (data: IuserData) => {
    const { email, password, name, bio, contact, course_module } = data;

    const dataSend = {
      email,
      password,
      name,
      bio,
      contact,
      course_module,
    };

    api
      .post("/users", dataSend)
      .then((res) => {
        const notify = () =>
          toast.success("Conta criada com sucesso!", {
            theme: "dark",
          });
        localStorage.setItem("@USERID", res.data.user.id);
        notify();
        navigate("../login", { replace: true });
      })
      .catch((err) => {
        const notifyError = () =>
          toast.error(`Ops! ${err.response.data.message}`, {
            theme: "dark",
          });
        notifyError();
      });
  };

  return (
    <UserContext.Provider value={{ user, requestUser, createUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
