import { useContext } from "react";
import { ModalProvider } from "../../context/ModalProvider";
import { Itech } from "../Body/Body";
import LiContainer from "./style";

const ListTechs = ({ id, title, status }: Itech) => {
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
