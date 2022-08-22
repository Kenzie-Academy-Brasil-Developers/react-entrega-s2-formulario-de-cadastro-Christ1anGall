import { useContext } from "react";
import { ModalProvider } from "../../context/ModalProvider";
import LiContainer from "./style";

interface IlistTechs {
  id: string;
  title: string;
  status: string;
}

const ListTechs = ({ id, title, status }: IlistTechs) => {
  const { isModalON, setModal, setTitle, setType, setId, setTitleEdit } =
    useContext(ModalProvider);

  return (
    <LiContainer
      onClick={() => {
        setTitle("Editar Tecnologia");
        setType("edit");
        setModal(!isModalON);
        setId(id);
        setTitleEdit(title);
      }}
    >
      <h4>{title}</h4> <p>{status}</p>
    </LiContainer>
  );
};
export default ListTechs;
