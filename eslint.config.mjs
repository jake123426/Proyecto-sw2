import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuración base recomendada por ESLint
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },

  // Configuración para CommonJS (Node.js/Express)
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // Para módulos CommonJS
      globals: {
        ...globals.node, // Variables globales de Node (require, module, __dirname, etc.)
        ...{ 
          // Variables globales personalizadas (opcional)
          process: "readonly",
          Buffer: "readonly",
        },
      },
    },
  },
  // Nota: warn | off | error
  // Reglas personalizadas para Express
  {
    files: ["**/*.js"],
    rules: {
      // Reglas base para Node.js
      "no-console": "off", // Permite console.log con advertencia
      "no-unused-vars": [
        "warn",
        { 
          argsIgnorePattern: "^_|req|res|next", // Ignora parámetros comunes en Express
          varsIgnorePattern: "^_",
          
        },
      ],
      "no-undef": "off",

      // Estilo de código
      "indent": ["off", 2], // 2 espacios de indentación
      "quotes": ["off", "single"], // Comillas simples
      "semi": ["off", "always"], // Punto y coma obligatorio
      "linebreak-style": ["off", "unix"], // LF para saltos de línea

      // Reglas específicas para Express
      "handle-callback-err": "error", // Manejo de errores en callbacks
      "no-path-concat": "error", // Usa path.join() en lugar de concatenar con +
    },
  },

  // Archivos ignorados
  {
    ignores: [
      "node_modules/",
      "coverage/",
      "logs/",
      "*.min.js",
      "**/public/",
      "tests/"
    ],
  },
]);