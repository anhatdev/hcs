import React, { useState } from 'react';
import Layout from '../component/Layout';
import Card from '../component/Card';
import Button from '../component/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Clock, 
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Settings,
  Bell,
  UserCheck,
  Activity,
  Stethoscope,
  ClipboardList
} from 'lucide-react';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [user] = useState({
    id: '1',
    name: '山田医師',
    role: 'admin' as const
  });

  // Today's stats
  const todayStats = {
    totalPatients: 24,
    completedAppointments: 18,
    pendingAppointments: 6,
    newPatients: 3
  };

  // Upcoming appointments
  const upcomingAppointments = [
    { id: '1', time: '14:00', patient: 'John Smith', type: 'Consultation', status: 'confirmed' },
    { id: '2', time: '14:30', patient: 'Mary Johnson', type: 'Follow-up', status: 'confirmed' },
    { id: '3', time: '15:00', patient: 'David Lee', type: 'Check-up', status: 'pending' },
    { id: '4', time: '15:30', patient: 'Sarah Wilson', type: 'Consultation', status: 'confirmed' },
    { id: '5', time: '16:00', patient: 'Michael Brown', type: 'Treatment', status: 'pending' }
  ];

  // Main menu items
  const menuItems = [
    { 
      label: '患者管理', 
      icon: Users, 
      description: '患者情報の管理',
      action: () => onNavigate?.('patients'),
      color: 'bg-[#2E4A70]'
    },
    { 
      label: '予約管理', 
      icon: Calendar, 
      description: '予約のスケジュールと管理',
      action: () => onNavigate?.('appointments'),
      color: 'bg-[#24B0BA]'
    },
    { 
      label: '診療記録', 
      icon: FileText, 
      description: '患者の診療記録へのアクセス',
      action: () => onNavigate?.('records'),
      color: 'bg-[#2E4A70]'
    },
    { 
      label: 'レポート', 
      icon: BarChart3, 
      description: '分析とレポートの表示',
      action: () => onNavigate?.('reports'),
      color: 'bg-[#24B0BA]'
    },
    { 
      label: '設定', 
      icon: Settings, 
      description: 'システム設定',
      action: () => onNavigate?.('settings'),
      color: 'bg-[#2E4A70]'
    },
    { 
      label: '通知', 
      icon: Bell, 
      description: 'すべての通知を表示',
      action: () => onNavigate?.('notifications'),
      color: 'bg-[#24B0BA]'
    }
  ];

  // Quick action cards
  const quickActions = [
    { 
      label: '新規患者登録', 
      icon: UserCheck, 
      action: () => console.log('新規患者登録'),
      variant: 'primary' as const,
      description: '新しい患者を登録'
    },
    { 
      label: '予約スケジュール', 
      icon: Calendar, 
      action: () => console.log('予約スケジュール'),
      variant: 'secondary' as const,
      description: '新しい予約を取る'
    },
    { 
      label: 'クイック診察', 
      icon: Stethoscope, 
      action: () => console.log('クイック診察'),
      variant: 'accent' as const,
      description: '患者の診察を開始'
    },
    { 
      label: '記録閲覧', 
      icon: ClipboardList, 
      action: () => console.log('記録閲覧'),
      variant: 'outline' as const,
      description: '患者ファイルへのアクセス'
    }
  ];

  const handleSettingsClick = () => {
    console.log('設定がクリックされました');
  };

  const handleHelpClick = () => {
    console.log('ヘルプがクリックされました');
  };

  const handleUserClick = () => {
    console.log('ユーザープロフィールがクリックされました');
  };

  return (
    <Layout
      user={user}
      onSettingsClick={handleSettingsClick}
      onHelpClick={handleHelpClick}
      onUserClick={handleUserClick}
      showNavigation={false}
      currentPage="dashboard"
      onNavigate={onNavigate}
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2E4A70] mb-2">
            ダッシュボード
          </h1>
          <p className="text-gray-600 text-lg">
            お疲れ様です！本日のクリニック概要をご確認ください。
          </p>
        </div>

        {/* Today's Summary */}
        <Card>
          <h2 className="text-xl font-semibold text-[#2E4A70] mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            本日の概要
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#F0F2F2] rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#2E4A70] mb-1">
                {todayStats.totalPatients}
              </div>
              <div className="text-sm text-gray-600">総患者数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                {todayStats.completedAppointments}
              </div>
              <div className="text-sm text-gray-600">完了</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                {todayStats.pendingAppointments}
              </div>
              <div className="text-sm text-gray-600">待機中</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                {todayStats.newPatients}
              </div>
              <div className="text-sm text-gray-600">新規患者</div>
            </div>
          </div>
        </Card>

        {/* Main Menu Section */}

        {/* Upcoming Appointments */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2E4A70] flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              今後の予約
            </h2>
            <Button size="sm" variant="outline">すべて表示</Button>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-[#F0F2F2] rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-[#2E4A70] bg-white px-3 py-1 rounded-full min-w-[60px] text-center">
                    {appointment.time}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.status === 'confirmed' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-semibold text-[#2E4A70] mb-6">クイックアクション</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 active:scale-95 text-left group ${
                  action.variant === 'primary' ? 'bg-[#2E4A70] text-white border-[#2E4A70]' :
                  action.variant === 'secondary' ? 'bg-[#24B0BA] text-white border-[#24B0BA]' :
                  action.variant === 'accent' ? 'bg-[#73C7E3] text-white border-[#73C7E3]' :
                  'bg-white text-[#2E4A70] border-[#2E4A70] hover:bg-[#2E4A70] hover:text-white'
                }`}
              >
                <action.icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{action.label}</h3>
                <p className={`text-sm ${
                  action.variant === 'outline' ? 'text-gray-600 group-hover:text-white' : 'opacity-80'
                }`}>
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;