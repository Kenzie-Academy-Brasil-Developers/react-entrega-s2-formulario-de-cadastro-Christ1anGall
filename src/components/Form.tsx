import { schemaRegister, schemaLogin } from "./schema/schema";
import { Container, FormMain, LinkForm } from "./style";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { IuserData, UserContext } from "../context/UserProvider";
import "react-toastify/dist/ReactToastify.css";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { ImEye } from "react-icons/im";

export const FormLogin = () => {
  const { requestUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(true);
  const [infoLoginPasswordRed, setInfoLoginPasswordRed] = useState("white");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserData>({
    resolver: yupResolver(schemaLogin),
  });

  let errorPassword = errors.password;
  useEffect(() => {
    if (errorPassword) {
      setInfoLoginPasswordRed("red");
    } else {
      setInfoLoginPasswordRed("white");
    }
  }, [errorPassword]);

  return (
    <FormMain onSubmit={handleSubmit(requestUser)}>
      <h1>Login</h1>

      <label htmlFor="email">Email</label>

      <div className="errorDiv">
        <input placeholder="Email" {...register("email")} />
        {errors.email && <BiErrorCircle />}
      </div>

      <label htmlFor="password">Senha</label>
      <Container>
        <input
          placeholder="Senha"
          type={showPassword ? "password" : "text"}
          {...register("password")}
        />

        <ImEye
          color={infoLoginPasswordRed}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </Container>

      <button type="submit">Entrar</button>

      <div className="NavDiv">
        <p>Ainda não possui uma conta?</p>
        <LinkForm to={"/register"}>Cadastre-se</LinkForm>
      </div>
    </FormMain>
  );
};

export const FormRegister = () => {
  const { createUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserData>({
    resolver: yupResolver(schemaRegister),
  });

  return (
    <FormMain onSubmit={handleSubmit(createUser)}>
      <h1>Crie sua conta</h1>
      <p>Rapido e grátis, vamos nessa</p>

      <label htmlFor="name">Nome</label>
      <div className="errorDiv">
        <input placeholder="digite aqui seu nome" {...register("name")} />
        {errors.name && <BiErrorCircle color="red" />}
      </div>

      <label htmlFor="email">Email</label>
      <div className="errorDiv">
        <input placeholder="digite aqui seu email" {...register("email")} />
        {errors.email && <BiErrorCircle color="red" />}
      </div>

      <label htmlFor="password">Senha</label>
      <div className="errorDiv">
        <input
          placeholder="Digite aqui sua senha"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <>
            <BiErrorCircle color="red" />{" "}
            <span>{errors.password?.message}</span>
          </>
        )}
      </div>

      <label htmlFor="passwordConfirm">Confirmar Senha</label>
      <div className="errorDiv">
        <input
          type="password"
          placeholder="Confirme sua senha"
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm && <BiErrorCircle color="red" />}
      </div>

      <label htmlFor="bio">Bio</label>
      <div className="errorDiv">
        <input placeholder="Fale sobre você" {...register("bio")} />
        {errors.bio && <BiErrorCircle color="red" />}
      </div>

      <label htmlFor="contact">Contato</label>
      <div className="errorDiv">
        <input placeholder="Opções de contato" {...register("contact")} />
        {errors.contact && <BiErrorCircle color="red" />}
      </div>

      <label htmlFor="course_module">Selecionar módulo</label>
      <select id="course_module" {...register("course_module")}>
        <option value="Primeiro Módulo (Introdução ao Frontend)">
          Primeiro Módulo
        </option>
        <option value="Segundo Módulo (Frontend Avançado)">
          Segundo Módulo
        </option>
        <option value="Terceiro Módulo (Introdução ao Backend)">
          Terceiro Módulo
        </option>
        <option value="Quarto Módulo (Backend Avançado)">Quarto Módulo</option>
      </select>
      <button type="submit">Cadastrar</button>
    </FormMain>
  );
};
