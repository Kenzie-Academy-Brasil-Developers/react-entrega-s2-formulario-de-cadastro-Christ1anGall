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
  passwordConfirm?: string;
  showPassworde?: boolean;
  name?: string;
  bio?: string;
  contact?: string;
  course_module?: string;
}

export interface IresponseUserData {
  id: string;
  avatar_url: string | null;
  bio: string | undefined;
  contact: string | undefined;
  course_module: string | undefined;
  created_at: string;
  email: string;
  name: string;
  techs: IuserTechs[];
  updated_at: string;
  works: IuserWorks[];
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
  setUser: Dispatch<SetStateAction<IresponseUserData>>;
}

interface IresponseUser {
  token: string;
  user: IresponseUserData;
}

export const UserContext = createContext<IuserContext>({} as IuserContext);

const Provider = ({ children }: IProviderProps) => {
  let navigate = useNavigate();

  const [user, setUser] = useState<IresponseUserData>({} as IresponseUserData);

  const token = localStorage.getItem("@TOKEN");

  useEffect(() => {
    token
      ? api.get<IresponseUserData>("profile").then(({ data }) => setUser(data))
      : navigate("../Login", { replace: true });
  }, [navigate, token]);

  const requestUser = async (data: IuserData) => {
    await api
      .post<IresponseUser>("sessions", data)
      .then(({ data }) => {
        setUser(data.user);
        const notify = () =>
          toast.success(`Bem vindo ${data.user.name}!`, {
            theme: "dark",
          });
        localStorage.setItem("@TOKEN", data.token);
        localStorage.setItem("@USERID", data.user.id);
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
      .post<IresponseUser>("users", dataSend)
      .then(({ data }) => {
        const notify = () =>
          toast.success("Conta criada com sucesso!", {
            theme: "dark",
          });
        localStorage.setItem("@USERID", data.user.id);
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
