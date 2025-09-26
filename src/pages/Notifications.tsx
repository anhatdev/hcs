import React, { useState } from 'react';
import Layout from '../component/Layout';
import Card from '../component/Card';
import Button from '../component/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  User, 
  Calendar,
  FileText,
  Settings,
  Check,
  X,
  Filter,
  Search,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'メンテナンス' | 'エラー' | '患者' | '予約' | 'システム';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: '高' | '中' | '低';
  patientId?: string;
  patientName?: string;
  actionRequired?: boolean;
}

interface NotificationsProps {
  onNavigate?: (page: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [user] = useState({
    id: '1',
    name: '山田医師',
    role: 'admin' as const
  });

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'N001',
      type: 'メンテナンス',
      title: 'システムメンテナンス予定',
      message: '2024年1月20日 02:00-04:00にシステムメンテナンスを実施します。この間、システムへのアクセスができません。',
      timestamp: '2024-01-15 09:00',
      isRead: false,
      priority: '高',
      actionRequired: true
    },
    {
      id: 'N002',
      type: 'エラー',
      title: 'データベース接続エラー',
      message: 'データベースへの接続が一時的に不安定になっています。システム管理者に連絡してください。',
      timestamp: '2024-01-15 08:45',
      isRead: false,
      priority: '高',
      actionRequired: true
    },
    {
      id: 'N003',
      type: '患者',
      title: '患者の検査結果異常',
      message: '田中太郎さんの血液検査で異常値が検出されました。至急確認が必要です。',
      timestamp: '2024-01-15 08:30',
      isRead: false,
      priority: '高',
      patientId: 'P001',
      patientName: '田中太郎',
      actionRequired: true
    },
    {
      id: 'N004',
      type: '予約',
      title: '予約キャンセル',
      message: '佐藤花子さんの本日14:30の予約がキャンセルされました。',
      timestamp: '2024-01-15 08:15',
      isRead: true,
      priority: '中',
      patientId: 'P002',
      patientName: '佐藤花子'
    },
    {
      id: 'N005',
      type: '患者',
      title: '新規患者登録',
      message: '山田次郎さんが新規患者として登録されました。初回診察の準備をお願いします。',
      timestamp: '2024-01-15 07:45',
      isRead: true,
      priority: '中',
      patientId: 'P003',
      patientName: '山田次郎'
    },
    {
      id: 'N006',
      type: 'システム',
      title: 'バックアップ完了',
      message: '定期バックアップが正常に完了しました。',
      timestamp: '2024-01-15 06:00',
      isRead: true,
      priority: '低'
    },
    {
      id: 'N007',
      type: '患者',
      title: '薬剤アレルギー情報更新',
      message: '鈴木美咲さんのアレルギー情報が更新されました。処方時にご注意ください。',
      timestamp: '2024-01-14 16:30',
      isRead: false,
      priority: '中',
      patientId: 'P004',
      patientName: '鈴木美咲',
      actionRequired: true
    },
    {
      id: 'N008',
      type: '予約',
      title: '予約リマインダー',
      message: '明日の予約が5件あります。スケジュールをご確認ください。',
      timestamp: '2024-01-14 15:00',
      isRead: true,
      priority: '低'
    }
  ]);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.patientName && notification.patientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !typeFilter || notification.type === typeFilter;
    const matchesPriority = !priorityFilter || notification.priority === priorityFilter;
    const matchesReadStatus = !showUnreadOnly || !notification.isRead;
    
    return matchesSearch && matchesType && matchesPriority && matchesReadStatus;
  });

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const handlePatientClick = (patientId: string) => {
    // Navigate to patients page and show patient detail
    onNavigate?.('patients');
    console.log(`患者詳細を表示: ${patientId}`);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'メンテナンス':
        return <Settings className="w-5 h-5" />;
      case 'エラー':
        return <AlertTriangle className="w-5 h-5" />;
      case '患者':
        return <User className="w-5 h-5" />;
      case '予約':
        return <Calendar className="w-5 h-5" />;
      case 'システム':
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === '高') {
      return 'bg-red-50 border-red-200 text-red-800';
    }
    switch (type) {
      case 'メンテナンス':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'エラー':
        return 'bg-red-50 border-red-200 text-red-800';
      case '患者':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case '予約':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'システム':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case '高': return '高';
      case '中': return '中';
      case '低': return '低';
      default: return '中';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'メンテナンス': return 'メンテナンス';
      case 'エラー': return 'エラー';
      case '患者': return '患者';
      case '予約': return '予約';
      case 'システム': return 'システム';
      default: return 'その他';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return '1時間以内';
    } else if (diffInHours < 24) {
      return `${diffInHours}時間前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}日前`;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const highPriorityCount = notifications.filter(n => n.priority === '高' && !n.isRead).length;

  const breadcrumbs = [
    { label: 'ダッシュボード', path: '/' },
    { label: '通知' }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      user={user}
      currentPage="notifications"
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E4A70] mb-2 flex items-center">
              <Bell className="w-8 h-8 mr-3" />
              通知
            </h1>
            <p className="text-gray-600">
              システムアラートと患者関連通知
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  未読 {unreadCount}件
                </span>
              )}
            </p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button onClick={handleMarkAllAsRead} variant="secondary" disabled={unreadCount === 0}>
              <CheckCircle className="w-4 h-4 mr-2" />
              すべて既読
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-red-500 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">高優先度</p>
                <p className="text-2xl font-bold text-[#2E4A70]">{highPriorityCount}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">未読通知</p>
                <p className="text-2xl font-bold text-[#2E4A70]">{unreadCount}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-[#2E4A70] rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総通知数</p>
                <p className="text-2xl font-bold text-[#2E4A70]">{notifications.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="通知を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">タイプ（全て）</option>
                <option value="メンテナンス">メンテナンス</option>
                <option value="エラー">エラー</option>
                <option value="患者">患者</option>
                <option value="予約">予約</option>
                <option value="システム">システム</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">優先度（全て）</option>
                <option value="高">高</option>
                <option value="中">中</option>
                <option value="低">低</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Unread Only Toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="rounded border-gray-300 text-[#2E4A70] focus:ring-[#2E4A70]"
                />
                <span className="ml-2 text-sm text-gray-700">未読のみ表示</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>{t('noNotifications')}</p>
              </div>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-l-4 transition-all duration-200 ${
                  notification.isRead ? 'opacity-75' : ''
                } ${getNotificationColor(notification.type, notification.priority)} ${
                  notification.actionRequired ? 'shadow-md' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type, notification.priority)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {notification.title}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          notification.priority === '高' ? 'bg-red-100 text-red-800' :
                          notification.priority === '中' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getPriorityLabel(notification.priority)}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {getTypeLabel(notification.type)}
                        </span>
                        {!notification.isRead && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            未読
                          </span>
                        )}
                        {notification.actionRequired && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            要対応
                          </span>
                        )}
                      </div>

                      <p className="text-gray-700 mb-3">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          {notification.patientName && (
                            <button
                              onClick={() => handlePatientClick(notification.patientId!)}
                              className="flex items-center space-x-1 text-[#2E4A70] hover:text-[#24B0BA] transition-colors"
                            >
                              <User className="w-4 h-4" />
                              <span>{notification.patientName}</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              既読
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;