// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const App: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center pt-16 pb-8">
        <div className="w-20 h-20 mb-6">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20minimalist%20app%20logo%20design%20with%20clean%20geometric%20shapes%20and%20soft%20gradients%2C%20professional%20brand%20identity%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20high%20quality%20vector%20style%2C%20contemporary%20design%20aesthetic&width=80&height=80&seq=logo001&orientation=squarish"
            alt="アプリロゴ"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ログイン</h1>
        <p className="text-gray-600 text-sm">
          アカウントにログインしてください
        </p>
      </div>
      {/* Login Form */}
      <div className="flex-1 px-6">
        <div className="max-w-sm mx-auto">
          {/* Email Input */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400 text-sm"></i>
              </div>
              <Input
                type="email"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          {/* Password Input */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400 text-sm"></i>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-12 py-3 w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 text-sm`}
                ></i>
              </button>
            </div>
          </div>
          {/* Login Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium mb-4 !rounded-button cursor-pointer">
            ログイン
          </Button>
          {/* Forgot Password Link */}
          <div className="text-center mb-8">
            <a
              href="#"
              className="text-gray-500 text-sm cursor-pointer hover:text-gray-700"
            >
              パスワードをお忘れの方
            </a>
          </div>
          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">または</span>
            </div>
          </div>
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            {/* Google Login */}
            <Button className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-3 hover:bg-gray-50 !rounded-button cursor-pointer">
              <i className="fab fa-google text-red-500"></i>
              <span>Google でログイン</span>
            </Button>
            {/* Apple Login */}
            <Button className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-3 hover:bg-gray-800 !rounded-button cursor-pointer">
              <i className="fab fa-apple text-white"></i>
              <span>Apple でログイン</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Sign Up Link */}
      <div className="px-6 pb-8">
        <div className="text-center">
          <span className="text-gray-600 text-sm">
            アカウントをお持ちでない方{" "}
          </span>
          <a
            href="https://readdy.ai/home/5f9c8615-5f2b-4629-b571-b0ceb073c7f8/ba3909ad-3773-4067-b34d-3b1cad7b8cbb"
            data-readdy="true"
            className="text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700"
          >
            新規登録
          </a>
        </div>
      </div>
    </div>
  );
};
export default App;
