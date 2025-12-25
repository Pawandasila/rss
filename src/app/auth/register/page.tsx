import React from "react";
import { RegisterForm } from "./_components";

const RegisterPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-12">
      <div className="w-full max-w-2xl">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
