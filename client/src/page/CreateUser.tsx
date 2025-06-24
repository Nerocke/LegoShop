import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Page } from "../components/Page";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type UserForm = {
  login: string;
  password: string;
  isAdmin: boolean;
};

const userFormSchema = Joi.object<UserForm>({
  login: Joi.string().required(),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean().optional(),
});

export const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: joiResolver(userFormSchema),
  });

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = handleSubmit(async ({ isAdmin, login, password }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/users", {
        login,
        password,
        role: isAdmin ? "admin" : "user",
      });

      console.log("Created:", res.data);
      setSuccessMessage("✅ Compte créé avec succès !");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Erreur création user", err);
    }
  });

  return (
      <Page title="Créer un compte" hideNavbar>
        <Form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
          <Form.Group>
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control placeholder="Ex: brique123" {...register("login")} />
            {errors.login && (
                <small className="text-danger">{errors.login.message}</small>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
                type="password"
                placeholder="Minimum 6 caractères"
                {...register("password")}
            />
            {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Check type="checkbox" label="Admin" {...register("isAdmin")} />
          </Form.Group>

          <Button variant="primary" type="submit">
            S'inscrire
          </Button>

          {successMessage && (
              <p className="text-success text-center mt-3">{successMessage}</p>
          )}
        </Form>
      </Page>
  );
};
