import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../public/assets/Logo_BrickMorty.png";

// Types
type FormData = {
  login: string;
  password: string;
};

const formValidation = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: joiResolver(formValidation),
  });

  const onSubmit = handleSubmit(async ({ login, password }) => {
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        login,
        password,
      });
      setAuth(response.data.id, response.data.token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/catalog");
      }, 1500);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Identifiants incorrects");
    }
  });

  return (
      <div
          className="w-screen h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: 'url("src/assets/lego-wallpaper.png")' }}
      >
        <motion.img
            src={logo}
            alt="LEGO Shop Logo"
            className="mb-4 object-contain drop-shadow-lg"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            style={{ width: "clamp(60px, 8vw, 90px)", height: "auto" }}
        />

        <h1
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 text-center drop-shadow-xl font-lego"
            style={{ fontFamily: 'LegoThick, sans-serif' }}
        >
          🔐 Connexion à la boutique LEGO
        </h1>

        <form
            onSubmit={onSubmit}
            className="bg-white/90 border-2 border-yellow-400 rounded-2xl p-6 gap-4 flex flex-col w-full max-w-md shadow-2xl"
        >
          <label className="text-sm font-semibold text-gray-800">Login</label>
          <input
              type="text"
              className="rounded px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-yellow-400"
              placeholder="Votre identifiant LEGO"
              {...register("login")}
          />

          <label className="text-sm font-semibold text-gray-800">Mot de passe</label>
          <input
              type="password"
              placeholder="Votre mot de passe"
              className="rounded px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-yellow-400"
              {...register("password")}
          />

          <input
              type="submit"
              value="Connexion"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow mt-4"
          />

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>

        <AnimatePresence>
          {success && (
              <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-green-700 text-xl font-semibold bg-green-100 border border-green-400 px-6 py-3 rounded-lg"
              >
                ✅ Connexion réussie ! Redirection...
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};
