import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import ModalContainer from "../components/Modal/style";
import { toast } from "react-toastify";

interface IModalProps {
  children: ReactNode;
}

interface Itechs {
  title: string;
  status: string;
}

interface ImodalProvider {
  isModalON: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  Modal: () => JSX.Element;
  setType: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
  setTitleEdit: Dispatch<SetStateAction<string>>;
}

export const ModalProvider = createContext<ImodalProvider>(
  {} as ImodalProvider
);

const ModalContext = ({ children }: IModalProps) => {
  const [type, setType] = useState("create");
  const [isModalON, setModal] = useState<boolean>(false);
  const [tittle, setTitle] = useState<string>("Cadastrar Tecnologia");
  const [id, setId] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const { register, handleSubmit } = useForm<Itechs>();

  const Modal = () => {
    function closeModal() {
      setModal(!isModalON);
    }

    const createTech = (data: Itechs) => {
      api
        .post("users/techs", data)
        .then(() => {
          const notify = () =>
            toast.success(`tech ${data.title} Criada com Sucesso!`, {
              theme: "dark",
            });
          notify();
        })
        .catch((err) => {
          const notify = () =>
            toast.error(`${err.response.data.message}`, {
              theme: "dark",
            });
          notify();
          console.error(err);
        });
    };

    const editTech = (data: Itechs) => {
      api
        .put(`users/techs/${id}`, { status: data.status })
        .then(closeModal)
        .catch((err) => {
          console.error(err, "ERROR");
        });
    };

    const deleteTech = () => {
      api
        .delete(`users/techs/${id}`)
        .then(closeModal)
        .catch((err) => {
          console.error(err, "ERROR");
        });
    };

    return (
      <ModalContainer>
        <div className="Modal-Container">
          <div className="header-Modal">
            <h2>{tittle}</h2>
            <button
              onClick={() => {
                setModal(!isModalON);
              }}
            >
              X
            </button>
          </div>
          <div className="body-Modal">
            <form>
              <label>Nome do Projeto</label>
              {type === "create" ? (
                <input
                  type="text"
                  placeholder="digite o nome"
                  {...register("title")}
                />
              ) : (
                <input value={titleEdit} />
              )}

              <label>Status</label>
              <select id="Status" {...register("status")}>
                <option value="Iniciante">Iniciante </option>
                <option value="Intermediário">Intermediário </option>
                <option value="Avançado">Avançado </option>
              </select>
              <div className="button-Container">
                {type === "create" ? (
                  <button
                    onClick={handleSubmit(createTech)}
                    className="button-Create button-Standart"
                  >
                    Cadastrar Tecnologia
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit(editTech)}
                      className="button-Edit button-Standart"
                    >
                      Salvar alterações
                    </button>
                    <button
                      onClick={handleSubmit(deleteTech)}
                      className="button-Delete button-Standart"
                    >
                      Excluir
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </ModalContainer>
    );
  };

  return (
    <ModalProvider.Provider
      value={{
        isModalON,
        setModal,
        Modal,
        setType,
        setTitle,
        setId,
        setTitleEdit,
      }}
    >
      {children}
    </ModalProvider.Provider>
  );
};

export default ModalContext;
