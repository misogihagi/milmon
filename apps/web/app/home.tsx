"use client";
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RarityCalculatorForm from "./form";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [showMonster, setShowMonster] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const monsters = [
    {
      id: 1,
      name: "フワフワミルモン",
      rarity: "SR",
      product: "特選牛乳 3.6%",
      brand: "明治乳業",
      image:
        "https://readdy.ai/api/search-image?query=cute%20fluffy%20white%20milk%20monster%20character%20with%20big%20eyes%20and%20soft%20appearance%2C%20kawaii%20style%2C%203D%20cartoon%20rendering%2C%20pastel%20colors%2C%20friendly%20expression%2C%20floating%20in%20air%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20playful%20design&width=200&height=200&seq=monster1&orientation=squarish",
    },
    {
      id: 2,
      name: "カチカチカルシモン",
      rarity: "R",
      product: "カルシウム強化牛乳",
      brand: "森永乳業",
      image:
        "https://readdy.ai/api/search-image?query=strong%20calcium%20milk%20monster%20character%20with%20crystalline%20white%20body%2C%20cute%20face%20with%20determined%20expression%2C%203D%20cartoon%20style%2C%20shimmering%20surface%20texture%2C%20kawaii%20design%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting&width=200&height=200&seq=monster2&orientation=squarish",
    },
    {
      id: 3,
      name: "プロテインマッチョモン",
      rarity: "SSR",
      product: "プロテイン牛乳",
      brand: "雪印メグミルク",
      image:
        "https://readdy.ai/api/search-image?query=muscular%20protein%20milk%20monster%20character%20with%20white%20body%20and%20strong%20arms%2C%20cute%20kawaii%20face%2C%203D%20cartoon%20rendering%2C%20friendly%20but%20powerful%20appearance%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20playful%20muscle%20definition&width=200&height=200&seq=monster3&orientation=squarish",
    },
  ];
  const categories = [
    {
      name: "撮影",
      icon: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20camera%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20blue%20and%20white%20colors%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=64&height=64&seq=camera&orientation=squarish",
    },
    {
      name: "図鑑",
      icon: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20book%20with%20pages%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20blue%20and%20white%20colors%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=64&height=64&seq=book&orientation=squarish",
    },
    {
      name: "ランキング",
      icon: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20trophy%20cup%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20gold%20and%20white%20colors%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=64&height=64&seq=trophy&orientation=squarish",
    },
    {
      name: "ガチャ",
      icon: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20gift%20box%20with%20ribbon%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic&width=64&height=64&seq=gift&orientation=squarish",
    },
  ];
  const handleUserIconClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  const handleDropdownItemClick = (action: string) => {
    setShowUserDropdown(false);
    if (action === "profile") {
      setSelectedTab("profile");
    } else if (action === "settings") {
      // Handle settings navigation
      console.log("Navigate to settings");
    } else if (action === "logout") {
      // Handle logout
      console.log("Logout user");
    }
  };
  const renderHomeContent = () => (
    <div className="px-4 pt-20 pb-24 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          成分表を撮影して
        </h2>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          モンスターを生成しよう！
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          牛乳パックの成分表を撮影すると
          <br />
          可愛いミルクモンスターが誕生します
        </p>
      </div>
      {/* Camera Button */}
      <div className="flex justify-between items-center flex-col mb-8 gap-4">
        <Button className="!rounded-button w-64 h-32 bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer">
          <i className="fas fa-camera text-3xl mb-2"></i>
          <div className="text-sm font-medium">撮影開始</div>
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="!rounded-button w-64 bg-amber-500 hover:bg-amber-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer">
              <div className="text-sm font-medium">
                カメラを使わない場合はこちら
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <RarityCalculatorForm />
          </PopoverContent>
        </Popover>
      </div>
      {/* Monster Generation Area */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-md min-h-48 flex items-center justify-center">
        {showMonster ? (
          <div className="text-center animate-bounce">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-star text-white text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              モンスター生成中...
            </h3>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <i className="fas fa-question-circle text-4xl mb-4"></i>
            <p className="text-sm">ここにモンスターが現れます</p>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {categories.map((category, index) => (
          <div key={index} className="text-center cursor-pointer">
            <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-2xl shadow-md flex items-center justify-center overflow-hidden">
              <img
                src={category.icon}
                alt={category.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="text-xs text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      {/* Recent Monsters */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          最近のモンスター
        </h3>
        <div className="space-y-3">
          {monsters.slice(0, 2).map((monster) => (
            <Card
              key={monster.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={monster.image}
                    alt={monster.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-gray-800">{monster.name}</h4>
                    <Badge
                      className={`text-xs px-2 py-1 ${
                        monster.rarity === "SSR"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                          : monster.rarity === "SR"
                            ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
                            : "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                      }`}
                    >
                      {monster.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{monster.product}</p>
                  <p className="text-xs text-gray-500">{monster.brand}</p>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  const renderCollectionContent = () => (
    <div className="px-4 pt-20 pb-24 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          モンスター図鑑
        </h2>
        <p className="text-gray-600 text-sm">
          コレクション数: {monsters.length}/100
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {monsters.map((monster) => (
          <Card
            key={monster.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-100 mb-3">
                <img
                  src={monster.image}
                  alt={monster.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex justify-center mb-2">
                <Badge
                  className={`text-xs px-2 py-1 ${
                    monster.rarity === "SSR"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                      : monster.rarity === "SR"
                        ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
                        : "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                  }`}
                >
                  {monster.rarity}
                </Badge>
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-1">
                {monster.name}
              </h4>
              <p className="text-xs text-gray-600 mb-1">{monster.product}</p>
              <p className="text-xs text-gray-500">{monster.brand}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
  const renderRankingContent = () => (
    <div className="px-4 pt-20 pb-24 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ランキング</h2>
        <p className="text-gray-600 text-sm">今週のトップコレクター</p>
      </div>
      <div className="space-y-4">
        {[
          { rank: 1, name: "田中 花子", monsters: 45, avatar: "👑" },
          { rank: 2, name: "佐藤 太郎", monsters: 38, avatar: "🥈" },
          { rank: 3, name: "鈴木 美咲", monsters: 32, avatar: "🥉" },
          { rank: 4, name: "高橋 健太", monsters: 28, avatar: "👤" },
          { rank: 5, name: "渡辺 さくら", monsters: 25, avatar: "👤" },
        ].map((user) => (
          <Card key={user.rank} className="p-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{user.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-gray-800">
                    #{user.rank}
                  </span>
                  <span className="font-medium text-gray-800">{user.name}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {user.monsters} 体のモンスター
                </p>
              </div>
              <div className="text-right">
                <i className="fas fa-trophy text-yellow-500"></i>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
  const renderProfileContent = () => (
    <div className="px-4 pt-20 pb-24 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <i className="fas fa-user text-white text-2xl"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">山田 太郎</h2>
        <p className="text-gray-600 text-sm">レベル 15 コレクター</p>
      </div>
      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-bold text-gray-800 mb-3">統計情報</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">コレクション数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">撮影回数</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-bold text-gray-800 mb-3">実績</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <i className="fas fa-medal text-yellow-500 text-xl"></i>
              <div>
                <div className="font-medium text-gray-800">初回撮影</div>
                <div className="text-sm text-gray-600">
                  最初のモンスターを生成
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-star text-purple-500 text-xl"></i>
              <div>
                <div className="font-medium text-gray-800">レアコレクター</div>
                <div className="text-sm text-gray-600">
                  SR モンスターを 5 体獲得
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-bold text-gray-800 mb-3">設定</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">通知設定</span>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">プライバシー</span>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">ヘルプ</span>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
              onClick={handleUserIconClick}
            >
              <i className="fas fa-user text-white text-sm"></i>
            </div>
            {showUserDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                <button
                  onClick={() => handleDropdownItemClick("profile")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                >
                  <i className="fas fa-user text-gray-500"></i>
                  <span>プロフィール</span>
                </button>
                <button
                  onClick={() => handleDropdownItemClick("settings")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                >
                  <i className="fas fa-cog text-gray-500"></i>
                  <span>設定</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={() => handleDropdownItemClick("logout")}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3 cursor-pointer"
                >
                  <i className="fas fa-sign-out-alt text-red-500"></i>
                  <span>ログアウト</span>
                </button>
              </div>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-blue-600">
              ミルクモンスター
            </h1>
          </div>
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
            <a
              href="https://readdy.ai/home/5f9c8615-5f2b-4629-b571-b0ceb073c7f8/745b8d21-748f-471e-aa10-31a1653852e3"
              data-readdy="true"
              className="text-gray-600"
            >
              <i className="fas fa-cog"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="pb-16">
        {selectedTab === "home" && renderHomeContent()}
        {selectedTab === "collection" && renderCollectionContent()}
        {selectedTab === "ranking" && renderRankingContent()}
        {selectedTab === "profile" && renderProfileContent()}
      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 px-0">
          {[
            { id: "home", icon: "fas fa-home", label: "ホーム" },
            { id: "collection", icon: "fas fa-book", label: "図鑑" },
            { id: "ranking", icon: "fas fa-trophy", label: "ランキング" },
            { id: "profile", icon: "fas fa-user", label: "マイページ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-3 px-4 text-center cursor-pointer transition-colors ${
                selectedTab === tab.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className={`${tab.icon} text-lg mb-1 block`}></i>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
