import React, { useState } from 'react';
import Layout from '../component/Layout';
import Card from '../component/Card';
import Button from '../component/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Clock, User, Plus, Search, Filter, CheckCircle, AlertCircle, Stethoscope, Phone, Mail, CreditCard as Edit, X, UserCheck, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: '確定' | '待機中' | 'キャンセル' | '到着済み';
  contact: string;
  email: string;
  isToday?: boolean;
}

interface AppointmentsProps {
  onNavigate?: (page: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<Appointment[] | null>(null);
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [user] = useState({
    id: '1',
    name: '山田医師',
    role: 'admin' as const
  });

  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Sample appointment data for 2025
  const [appointments, setAppointments] = useState<Appointment[]>([
    // Today's appointments
    {
      id: 'A001',
      patientName: '田中太郎',
      patientId: 'P001',
      date: today,
      time: '09:00',
      doctor: '山田医師',
      type: '定期検診',
      status: '確定',
      contact: '090-1234-5678',
      email: 'tanaka@example.com',
      isToday: true
    },
    {
      id: 'A002',
      patientName: '佐藤花子',
      patientId: 'P002',
      date: today,
      time: '10:30',
      doctor: '鈴木医師',
      type: '相談',
      status: '確定',
      contact: '080-9876-5432',
      email: 'sato@example.com',
      isToday: true
    },
    {
      id: 'A003',
      patientName: '山田次郎',
      patientId: 'P003',
      date: today,
      time: '14:00',
      doctor: '高橋医師',
      type: '治療',
      status: '待機中',
      contact: '070-5555-1111',
      email: 'yamada@example.com',
      isToday: true
    },
    {
      id: 'A004',
      patientName: '鈴木美咲',
      patientId: 'P004',
      date: today,
      time: '15:30',
      doctor: '佐藤医師',
      type: '健康診断',
      status: '到着済み',
      contact: '090-7777-8888',
      email: 'suzuki@example.com',
      isToday: true
    },
    // Future appointments - January 2025
    {
      id: 'A005',
      patientName: '高橋健一',
      patientId: 'P005',
      date: '2025-01-20',
      time: '09:00',
      doctor: '山田医師',
      type: 'フォローアップ',
      status: '確定',
      contact: '080-3333-4444',
      email: 'takahashi@example.com'
    },
    {
      id: 'A006',
      patientName: '伊藤由美',
      patientId: 'P006',
      date: '2025-01-22',
      time: '11:00',
      doctor: '田中医師',
      type: '相談',
      status: '確定',
      contact: '090-2222-3333',
      email: 'ito@example.com'
    },
    {
      id: 'A007',
      patientName: '渡辺誠',
      patientId: 'P007',
      date: '2025-01-25',
      time: '14:30',
      doctor: '鈴木医師',
      type: '定期検診',
      status: '確定',
      contact: '070-4444-5555',
      email: 'watanabe@example.com'
    },
    // February 2025
    {
      id: 'A008',
      patientName: '中村麻衣',
      patientId: 'P008',
      date: '2025-02-03',
      time: '10:00',
      doctor: '高橋医師',
      type: '治療',
      status: '確定',
      contact: '080-6666-7777',
      email: 'nakamura@example.com'
    },
    {
      id: 'A009',
      patientName: '小林健太',
      patientId: 'P009',
      date: '2025-02-10',
      time: '13:30',
      doctor: '山田医師',
      type: '健康診断',
      status: '確定',
      contact: '090-8888-9999',
      email: 'kobayashi@example.com'
    },
    {
      id: 'A010',
      patientName: '松本美香',
      patientId: 'P010',
      date: '2025-02-15',
      time: '16:00',
      doctor: '佐藤医師',
      type: '相談',
      status: '待機中',
      contact: '080-1111-2222',
      email: 'matsumoto@example.com'
    },
    // March 2025
    {
      id: 'A011',
      patientName: '加藤雄一',
      patientId: 'P011',
      date: '2025-03-05',
      time: '09:30',
      doctor: '鈴木医師',
      type: 'フォローアップ',
      status: '確定',
      contact: '070-3333-4444',
      email: 'kato@example.com'
    },
    {
      id: 'A012',
      patientName: '木村さくら',
      patientId: 'P012',
      date: '2025-03-12',
      time: '11:30',
      doctor: '田中医師',
      type: '定期検診',
      status: '確定',
      contact: '090-5555-6666',
      email: 'kimura@example.com'
    },
    {
      id: 'A013',
      patientName: '斉藤直樹',
      patientId: 'P013',
      date: '2025-03-20',
      time: '15:00',
      doctor: '高橋医師',
      type: '治療',
      status: '確定',
      contact: '080-7777-8888',
      email: 'saito@example.com'
    },
    // April 2025
    {
      id: 'A014',
      patientName: '橋本理恵',
      patientId: 'P014',
      date: '2025-04-08',
      time: '10:30',
      doctor: '山田医師',
      type: '健康診断',
      status: '確定',
      contact: '090-9999-0000',
      email: 'hashimoto@example.com'
    },
    {
      id: 'A015',
      patientName: '森田和也',
      patientId: 'P015',
      date: '2025-04-18',
      time: '14:00',
      doctor: '佐藤医師',
      type: '相談',
      status: '待機中',
      contact: '070-1111-2222',
      email: 'morita@example.com'
    }
  ]);

  // Get today's appointments
  const todaysAppointments = appointments.filter(apt => apt.date === today);

  // Get appointments count for calendar
  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(apt => apt.date === date);
  };

  const handlePatientClick = (patientId: string) => {
    onNavigate?.('patients');
    console.log(`患者詳細を表示: ${patientId}`);
  };

  const handleAddAppointment = () => {
    console.log('新規予約を追加');
  };

  const handleEditAppointment = (appointmentId: string) => {
    console.log(`予約を編集: ${appointmentId}`);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (confirm('この予約をキャンセルしますか？')) {
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'キャンセル' as const } : apt
      ));
    }
  };

  const handleMarkArrived = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: '到着済み' as const } : apt
    ));
  };

  const handleDateSelect = (date: string) => {
    const dayAppointments = getAppointmentsForDate(date);
    setSelectedDayAppointments(dayAppointments);
    setSelectedDate(date);
    setShowDayDetail(true);
  };

  const handleCloseDayDetail = () => {
    setShowDayDetail(false);
    setSelectedDayAppointments(null);
    setSelectedDate('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '確定':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case '待機中':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'キャンセル':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case '到着済み':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case '確定':
        return 'bg-green-50 border-green-200';
      case '待機中':
        return 'bg-orange-50 border-orange-200';
      case 'キャンセル':
        return 'bg-red-50 border-red-200';
      case '到着済み':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    return date.toLocaleDateString('ja-JP', options);
  };

  // Large Calendar component
  const renderLargeCalendar = () => {
    const year = currentCalendarMonth.getFullYear();
    const month = currentCalendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dateStr = current.toISOString().split('T')[0];
      const appointmentsForDay = getAppointmentsForDate(dateStr);
      const isCurrentMonth = current.getMonth() === month;
      const isToday = dateStr === today;

      days.push(
        <button
          key={dateStr}
          onClick={() => handleDateSelect(dateStr)}
          className={`relative p-3 h-20 border border-gray-200 text-sm transition-all duration-200 hover:bg-blue-50 ${
            isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
          } ${
            isToday ? 'bg-[#2E4A70] text-white font-bold' : 'hover:bg-blue-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-base font-medium">{current.getDate()}</span>
            {appointmentsForDay.length > 0 && (
              <div className={`text-xs mt-1 px-2 py-1 rounded-full font-medium ${
                isToday ? 'bg-white text-[#2E4A70]' : 'bg-[#24B0BA] text-white'
              }`}>
                {appointmentsForDay.length}件
              </div>
            )}
          </div>
        </button>
      );
      current.setDate(current.getDate() + 1);
    }

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentCalendarMonth(new Date(year, month - 1, 1))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-xl font-semibold text-[#2E4A70]">
            {year}年{month + 1}月
          </h3>
          <button
            onClick={() => setCurrentCalendarMonth(new Date(year, month + 1, 1))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
          <button
            onClick={() => setCurrentCalendarMonth(new Date())}
            className="text-sm text-[#2E4A70] hover:text-[#24B0BA]"
          >
            今月に戻る
          </button>
      </div>
    );
  };

  // Day Detail Modal/Popup
  const renderDayDetail = () => {
    if (!showDayDetail || !selectedDayAppointments) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2E4A70] flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                {formatDate(selectedDate)}の予約
              </h2>
              <button
                onClick={handleCloseDayDetail}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {selectedDayAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>この日の予約はありません</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`border-2 rounded-lg p-4 transition-all duration-200 ${getStatusBg(appointment.status)}`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-[#2E4A70] min-w-[60px] text-center">
                            {appointment.time}
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(appointment.status)}
                            <span className={`text-sm font-medium ${
                              appointment.status === '確定' ? 'text-green-700' :
                              appointment.status === '待機中' ? 'text-orange-700' :
                              appointment.status === '到着済み' ? 'text-blue-700' :
                              'text-red-700'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <button
                              onClick={() => {
                                handleCloseDayDetail();
                                handlePatientClick(appointment.patientId);
                              }}
                              className="flex items-center space-x-2 text-[#2E4A70] hover:text-[#24B0BA] transition-colors"
                            >
                              <User className="w-4 h-4" />
                              <span className="font-medium">{appointment.patientName}</span>
                            </button>
                            <p className="text-sm text-gray-600 mt-1">ID: {appointment.patientId}</p>
                          </div>

                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Stethoscope className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-700">{appointment.doctor}</span>
                            </div>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{appointment.contact}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{appointment.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditAppointment(appointment.id)}
                        >
                          編集
                        </Button>
                        {appointment.status !== 'キャンセル' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            キャンセル
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const breadcrumbs = [
    { label: 'ダッシュボード', path: '/' },
    { label: '予約管理' }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      user={user}
      currentPage="appointments"
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E4A70] mb-2">予約管理</h1>
            <p className="text-gray-600">予約のスケジュールと管理</p>
          </div>
          <Button onClick={handleAddAppointment} className="mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            新規予約追加
          </Button>
        </div>

        {/* Today's Appointments */}
        {todaysAppointments.length > 0 && (
          <Card>
            <h2 className="text-xl font-semibold text-[#2E4A70] mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              本日の予約 ({todaysAppointments.length}件)
            </h2>
            <div className="space-y-3">
              {todaysAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`border-2 rounded-lg p-4 transition-all duration-200 ${getStatusBg(appointment.status)}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-[#2E4A70] min-w-[60px] text-center">
                          {appointment.time}
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(appointment.status)}
                          <span className={`text-sm font-medium ${
                            appointment.status === '確定' ? 'text-green-700' :
                            appointment.status === '待機中' ? 'text-orange-700' :
                            appointment.status === '到着済み' ? 'text-blue-700' :
                            'text-red-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <button
                            onClick={() => handlePatientClick(appointment.patientId)}
                            className="flex items-center space-x-2 text-[#2E4A70] hover:text-[#24B0BA] transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="font-medium">{appointment.patientName}</span>
                          </button>
                          <p className="text-sm text-gray-600 mt-1">ID: {appointment.patientId}</p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Stethoscope className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-700">{appointment.doctor}</span>
                          </div>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditAppointment(appointment.id)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        編集
                      </Button>
                      {appointment.status !== 'キャンセル' && appointment.status !== '到着済み' && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleMarkArrived(appointment.id)}
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            到着済み
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-1" />
                            キャンセル
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Search and Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="患者名、医師名、予約IDで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">ステータス（全て）</option>
                <option value="確定">確定</option>
                <option value="待機中">待機中</option>
                <option value="キャンセル">キャンセル</option>
                <option value="到着済み">到着済み</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Doctor Filter */}
            <div className="relative">
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">担当医師（全て）</option>
                <option value="山田医師">山田医師</option>
                <option value="鈴木医師">鈴木医師</option>
                <option value="高橋医師">高橋医師</option>
                <option value="佐藤医師">佐藤医師</option>
                <option value="田中医師">田中医師</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </Card>

        {/* Large Calendar View */}
        <Card>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-[#2E4A70] mb-2 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              予約カレンダー
            </h2>
            <p className="text-gray-600 text-sm">
              日付をクリックして詳細な予約情報を表示
            </p>
          </div>
          {renderLargeCalendar()}
        </Card>

        {/* Summary Statistics */}
        <Card>
          <h2 className="text-xl font-semibold text-[#2E4A70] mb-4">予約統計（全体）</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-[#F0F2F2] rounded-lg">
              <div className="text-2xl font-bold text-[#2E4A70] mb-1">
                {appointments.length}
              </div>
              <div className="text-sm text-gray-600">総予約数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {appointments.filter(a => a.status === '確定').length}
              </div>
              <div className="text-sm text-gray-600">確定</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {appointments.filter(a => a.status === '待機中').length}
              </div>
              <div className="text-sm text-gray-600">待機中</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {appointments.filter(a => a.status === '到着済み').length}
              </div>
              <div className="text-sm text-gray-600">到着済み</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {appointments.filter(a => a.status === 'キャンセル').length}
              </div>
              <div className="text-sm text-gray-600">キャンセル</div>
            </div>
          </div>
        </Card>

        {/* Day Detail Modal */}
        {renderDayDetail()}
      </div>
    </Layout>
  );
};

export default Appointments;