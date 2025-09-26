import React, { useState } from 'react';
import Layout from '../component/Layout';
import Card from '../component/Card';
import Button from '../component/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { Settings as SettingsIcon, Users, Globe, Bell, FileText, Smartphone, Shield, Plus, CreditCard as Edit, Trash2, Save, X, Check, AlertTriangle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: '管理者' | '医師' | 'スタッフ' | '患者';
  status: '有効' | '無効';
  lastLogin: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  appointments: boolean;
  reports: boolean;
  emergencies: boolean;
}

interface Template {
  id: string;
  name: string;
  type: 'report' | 'message';
  content: string;
  lastModified: string;
}

interface SettingsProps {
  onNavigate?: (page: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [currentUser] = useState({
    id: '1',
    name: '山田医師',
    role: 'admin' as const
  });

  const [activeTab, setActiveTab] = useState('users');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Sample users data
  const [users, setUsers] = useState<User[]>([
    {
      id: 'U001',
      name: '山田医師',
      email: 'yamada@clinic.com',
      role: '管理者',
      status: '有効',
      lastLogin: '2024-01-15 09:30'
    },
    {
      id: 'U002',
      name: '鈴木医師',
      email: 'suzuki@clinic.com',
      role: '医師',
      status: '有効',
      lastLogin: '2024-01-15 08:45'
    },
    {
      id: 'U003',
      name: '佐藤看護師',
      email: 'sato@clinic.com',
      role: 'スタッフ',
      status: '有効',
      lastLogin: '2024-01-14 17:20'
    },
    {
      id: 'U004',
      name: '田中受付',
      email: 'tanaka@clinic.com',
      role: 'スタッフ',
      status: '無効',
      lastLogin: '2024-01-10 16:00'
    }
  ]);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    sms: false,
    appointments: true,
    reports: true,
    emergencies: true
  });

  // Templates
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 'T001',
      name: '月次レポートテンプレート',
      type: 'レポート',
      content: '月次患者統計レポート...',
      lastModified: '2024-01-10'
    },
    {
      id: 'T002',
      name: '予約確認メッセージ',
      type: 'メッセージ',
      content: 'ご予約の確認です...',
      lastModified: '2024-01-08'
    },
    {
      id: 'T003',
      name: '検査結果通知',
      type: 'メッセージ',
      content: '検査結果をお知らせします...',
      lastModified: '2024-01-05'
    }
  ]);

  // Check if current user is admin
  const isAdmin = currentUser.role === 'admin';

  if (!isAdmin) {
    return (
      <Layout
        user={currentUser}
        currentPage="settings"
        onNavigate={onNavigate}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="text-center max-w-md">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#2E4A70] mb-2">アクセス拒否</h2>
            <p className="text-gray-600 mb-4">
              この設定ページは管理者のみアクセス可能です。
            </p>
            <Button onClick={() => onNavigate?.('dashboard')}>
              ダッシュボードに戻る
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('このユーザーを削除しますか？')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      ));
      setEditingUser(null);
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case '管理者': return '管理者';
      case '医師': return '医師';
      case 'スタッフ': return 'スタッフ';
      case '患者': return '患者';
      default: return 'ユーザー';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case '管理者': return 'bg-red-100 text-red-800';
      case '医師': return 'bg-blue-100 text-blue-800';
      case 'スタッフ': return 'bg-green-100 text-green-800';
      case '患者': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'users', label: 'ユーザー管理', icon: Users },
    { id: 'language', label: '言語設定', icon: Globe },
    { id: 'notifications', label: '通知設定', icon: Bell },
    { id: 'templates', label: 'テンプレート', icon: FileText },
    { id: 'devices', label: 'デバイス連携', icon: Smartphone }
  ];

  const breadcrumbs = [
    { label: 'ダッシュボード', path: '/' },
    { label: '設定' }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      user={currentUser}
      currentPage="settings"
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E4A70] mb-2 flex items-center">
              <SettingsIcon className="w-8 h-8 mr-3" />
              設定
            </h1>
            <p className="text-gray-600">システム設定と管理</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Shield className="w-5 h-5 text-[#2E4A70]" />
            <span className="text-sm font-medium text-[#2E4A70]">管理者権限</span>
          </div>
        </div>

        {/* Tabs */}
        <Card>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-[#2E4A70] text-[#2E4A70]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </Card>

        {/* Tab Content */}
        {activeTab === 'users' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#2E4A70]">ユーザー管理</h2>
              <Button onClick={handleAddUser}>
                <Plus className="w-4 h-4 mr-2" />
                新規ユーザー追加
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">ユーザー名</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">メールアドレス</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">役割</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">ステータス</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">最終ログイン</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-[#F0F2F2] transition-colors">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === '有効' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === '有効' ? '有効' : '無効'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.lastLogin}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-[#2E4A70] hover:text-[#24B0BA] transition-colors"
                            title="編集"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {user.id !== currentUser.id && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                              title="削除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'language' && (
          <Card>
            <h2 className="text-xl font-semibold text-[#2E4A70] mb-6">言語設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  システム言語
                </label>
                <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent">
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                  <option value="ko">한국어</option>
                  <option value="zh">中文</option>
                  <option value="vi">Tiếng Việt</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  日付形式
                </label>
                <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent">
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                  <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  時刻形式
                </label>
                <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent">
                  <option value="24h">24時間形式</option>
                  <option value="12h">12時間形式</option>
                </select>
              </div>
              <Button className="mt-4">
                <Save className="w-4 h-4 mr-2" />
                設定を保存
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card>
            <h2 className="text-xl font-semibold text-[#2E4A70] mb-6">通知設定</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">通知方法</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email}
                      onChange={() => handleNotificationChange('email')}
                      className="rounded border-gray-300 text-[#2E4A70] focus:ring-[#2E4A70]"
                    />
                    <span className="ml-2 text-sm text-gray-700">メール通知</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.sms}
                      onChange={() => handleNotificationChange('sms')}
                      className="rounded border-gray-300 text-[#2E4A70] focus:ring-[#2E4A70]"
                    />
                    <span className="ml-2 text-sm text-gray-700">SMS通知</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">通知タイプ</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.appointments}
                      onChange={() => handleNotificationChange('appointments')}
                      className="rounded border-gray-300 text-[#2E4A70] focus:ring-[#2E4A70]"
                    />
                    <span className="ml-2 text-sm text-gray-700">予約関連通知</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.reports}
                      onChange={() => handleNotificationChange('reports')}
                      className="rounded border-gray-300 text-[#2E4A70] focus:ring-[#2E4A70]"
                    />
                    <span className="ml-2 text-sm text-gray-700">レポート通知</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emergencies}
                      onChange={() => handleNotificationChange('emergencies')}
                      className="rounded border-gray-300 text-[#2E4A70] focus:ring-[#2E4A70]"
                    />
                    <span className="ml-2 text-sm text-gray-700">緊急通知</span>
                  </label>
                </div>
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                通知設定を保存
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'templates' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#2E4A70]">テンプレート管理</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                新規テンプレート
              </Button>
            </div>

            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:bg-[#F0F2F2] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        タイプ: {template.type === 'レポート' ? 'レポート' : 'メッセージ'} | 
                        最終更新: {template.lastModified}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 truncate">
                        {template.content}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-[#2E4A70] hover:text-[#24B0BA] transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-800 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'devices' && (
          <Card>
            <h2 className="text-xl font-semibold text-[#2E4A70] mb-6">デバイス連携設定</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">血圧計</h3>
                  <p className="text-sm text-gray-600 mb-3">自動血圧測定データの取り込み</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">接続済み</span>
                    <Button size="sm" variant="outline">設定</Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">体重計</h3>
                  <p className="text-sm text-gray-600 mb-3">体重・BMIデータの自動記録</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">未接続</span>
                    <Button size="sm" variant="outline">接続</Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">心電図モニター</h3>
                  <p className="text-sm text-gray-600 mb-3">心電図データのリアルタイム監視</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">接続済み</span>
                    <Button size="sm" variant="outline">設定</Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">血糖値測定器</h3>
                  <p className="text-sm text-gray-600 mb-3">血糖値データの自動同期</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">未接続</span>
                    <Button size="sm" variant="outline">接続</Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">API設定</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      APIキー
                    </label>
                    <input
                      type="password"
                      value="••••••••••••••••"
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      エンドポイントURL
                    </label>
                    <input
                      type="url"
                      value="https://api.clinic-system.com/v1"
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
                    />
                  </div>
                </div>
                <Button className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  API設定を保存
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Settings;