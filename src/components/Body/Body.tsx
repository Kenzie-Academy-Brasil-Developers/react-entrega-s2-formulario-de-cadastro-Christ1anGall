import { IresponseUserData, UserContext } from "../../context/UserProvider";
import ButtonCreateTechs from "../ButtonCreateTechs";
import ListTechs from "../ListTechs/ListTechs";
import BodyContainer from "./style";
import { useContext, useEffect } from "react";
import { ModalProvider } from "../../context/ModalProvider";
import api from "../../api/api";
import { useState } from "react";

export interface Itech {
  id: string;
  title: string;
  status: string;
}

const Body = () => {
  const { user } = useContext(UserContext);
  const { isModalON } = useContext(ModalProvider);
  const [techs, setTechs] = useState<Itech[]>([]);

  useEffect(() => {
    api.get<IresponseUserData>(`/users/${user.id}`).then(({ data }) => {
      setTechs(data.techs);
    });

    return () => {
      api.get<IresponseUserData>(`/users/${user.id}`).then(({ data }) => {
        setTechs(data.techs);
      });
    };
  }, [isModalON, user]);

  return (
    <BodyContainer>
      <ButtonCreateTechs />
      <ul>
        {techs.map((tech: Itech) => {
          return (
            <ListTechs
              key={tech.id}
              id={tech.id}
              title={tech.title}
              status={tech.status}
            />
          );
        })}
      </ul>
    </BodyContainer>
  );
};

export default Body;
