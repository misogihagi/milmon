// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const settingsGroups = [
    {
      title: "アカウント設定",
      items: [
        {
          id: "profile",
          icon: "fas fa-user-circle",
          title: "プロフィール設定",
          description: "名前、アバター、自己紹介の編集",
          hasNotification: false,
        },
        {
          id: "account",
          icon: "fas fa-id-card",
          title: "アカウント情報",
          description: "メールアドレス、電話番号の管理",
          hasNotification: false,
        },
        {
          id: "password",
          icon: "fas fa-key",
          title: "パスワード変更",
          description: "セキュリティ強化のための変更",
          hasNotification: false,
        },
      ],
    },
    {
      title: "アプリ設定",
      items: [
        {
          id: "notifications",
          icon: "fas fa-bell",
          title: "通知設定",
          description: "プッシュ通知、メール通知の管理",
          hasNotification: true,
        },
        {
          id: "language",
          icon: "fas fa-globe",
          title: "言語設定",
          description: "現在の設定：日本語",
          hasNotification: false,
        },
        {
          id: "theme",
          icon: "fas fa-palette",
          title: "テーマ設定",
          description: "ライト・ダークモードの切り替え",
          hasNotification: false,
        },
      ],
    },
    {
      title: "データとプライバシー",
      items: [
        {
          id: "data",
          icon: "fas fa-database",
          title: "データ管理",
          description: "データのバックアップと復元",
          hasNotification: false,
        },
        {
          id: "privacy",
          icon: "fas fa-shield-alt",
          title: "プライバシー設定",
          description: "個人情報の保護設定",
          hasNotification: false,
        },
        {
          id: "cache",
          icon: "fas fa-trash-alt",
          title: "キャッシュクリア",
          description: "一時ファイルの削除",
          hasNotification: false,
        },
      ],
    },
    {
      title: "その他",
      items: [
        {
          id: "about",
          icon: "fas fa-info-circle",
          title: "アプリ情報",
          description: "バージョン 2.1.0",
          hasNotification: false,
        },
        {
          id: "help",
          icon: "fas fa-question-circle",
          title: "ヘルプとサポート",
          description: "よくある質問、お問い合わせ",
          hasNotification: false,
        },
        {
          id: "terms",
          icon: "fas fa-file-contract",
          title: "利用規約",
          description: "最終更新：2024年12月1日",
          hasNotification: false,
        },
        {
          id: "logout",
          icon: "fas fa-sign-out-alt",
          title: "ログアウト",
          description: "アカウントからサインアウト",
          hasNotification: false,
          isDestructive: true,
        },
      ],
    },
  ];

  const renderDetailView = () => {
    const item = settingsGroups
      .flatMap((group) => group.items)
      .find((item) => item.id === selectedSection);

    if (!item) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Detail Header */}
        <div className="fixed top-0 w-full bg-white shadow-sm z-50">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSelectedSection(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <i className="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 className="text-lg font-bold text-gray-800">{item.title}</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Detail Content */}
        <div className="pt-20 px-4 pb-8">
          <Card className="p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${item.icon} text-2xl text-blue-600`}></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
            </div>

            {/* Sample Settings Content */}
            <div className="space-y-4">
              {item.id === "notifications" && (
                <>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <div className="font-medium text-gray-800">
                        新しいモンスター通知
                      </div>
                      <div className="text-sm text-gray-600">
                        モンスター生成時に通知
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <div className="font-medium text-gray-800">
                        ランキング更新通知
                      </div>
                      <div className="text-sm text-gray-600">
                        週間ランキング更新時
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium text-gray-800">
                        メンテナンス通知
                      </div>
                      <div className="text-sm text-gray-600">
                        アプリメンテナンス情報
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </>
              )}

              {item.id === "language" && (
                <>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🇯🇵</span>
                      <span className="font-medium text-gray-800">日本語</span>
                    </div>
                    <i className="fas fa-check text-blue-600"></i>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🇺🇸</span>
                      <span className="font-medium text-gray-800">English</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🇰🇷</span>
                      <span className="font-medium text-gray-800">한국어</span>
                    </div>
                  </div>
                </>
              )}

              {item.id === "data" && (
                <>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-cloud-upload-alt text-blue-600"></i>
                      <div>
                        <div className="font-medium text-gray-800">
                          データをバックアップ
                        </div>
                        <div className="text-sm text-gray-600">
                          クラウドに保存
                        </div>
                      </div>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-cloud-download-alt text-green-600"></i>
                      <div>
                        <div className="font-medium text-gray-800">
                          データを復元
                        </div>
                        <div className="text-sm text-gray-600">
                          バックアップから復元
                        </div>
                      </div>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                  <div className="py-4">
                    <div className="text-sm text-gray-600 mb-2">
                      最後のバックアップ
                    </div>
                    <div className="text-gray-800">2024年12月10日 14:30</div>
                  </div>
                </>
              )}

              {!["notifications", "language", "data"].includes(item.id) && (
                <div className="text-center py-8 text-gray-500">
                  <i className={`${item.icon} text-4xl mb-4`}></i>
                  <p>この設定項目の詳細画面は開発中です</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderMainSettings = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 py-4">
          <a
            href="https://readdy.ai/home/5f9c8615-5f2b-4629-b571-b0ceb073c7f8/689060c6-3410-438a-840a-6e9699a03536"
            data-readdy="true"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <i className="fas fa-arrow-left text-gray-600"></i>
          </a>
          <h1 className="text-lg font-bold text-gray-800">設定</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="pt-20 px-4 pb-6">
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">山田 太郎</h2>
              <p className="text-gray-600 text-sm">レベル 15 コレクター</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-600">23</div>
                  <div className="text-xs text-gray-500">モンスター</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-green-600">156</div>
                  <div className="text-xs text-gray-500">撮影回数</div>
                </div>
              </div>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
        </Card>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 px-1">
                {group.title}
              </h3>
              <Card className="overflow-hidden">
                {group.items.map((item, itemIndex) => (
                  <div key={item.id}>
                    <button
                      onClick={() => setSelectedSection(item.id)}
                      className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        item.isDestructive ? "hover:bg-red-50" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.isDestructive ? "bg-red-100" : "bg-blue-100"
                        }`}
                      >
                        <i
                          className={`${item.icon} ${
                            item.isDestructive
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        ></i>
                      </div>
                      <div className="flex-1 text-left">
                        <div
                          className={`font-medium ${
                            item.isDestructive
                              ? "text-red-600"
                              : "text-gray-800"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.description}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.hasNotification && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                        <i className="fas fa-chevron-right text-gray-400"></i>
                      </div>
                    </button>
                    {itemIndex < group.items.length - 1 && (
                      <div className="border-b border-gray-100 ml-14"></div>
                    )}
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>

        {/* App Version */}
        <div className="text-center mt-8 mb-8">
          <p className="text-xs text-gray-500">ミルクモンスター図鑑</p>
          <p className="text-xs text-gray-500">バージョン 2.1.0</p>
          <p className="text-xs text-gray-400 mt-2">© 2024 MilkMonster Inc.</p>
        </div>
      </div>
    </div>
  );

  return selectedSection ? renderDetailView() : renderMainSettings();
};

export default App;
