import React, { useState } from 'react';
import Layout from '../component/Layout';
import Card from '../component/Card';
import Button from '../component/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Search, 
  Filter, 
  User, 
  Calendar, 
  FileText, 
  Upload,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  Stethoscope,
  X
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: '男性' | '女性';
  contact: string;
  email: string;
  address: string;
  nextAppointment: string;
  appointmentHistory: Array<{
    date: string;
    type: string;
    doctor: string;
    status: string;
  }>;
  medicalHistory: Array<{
    date: string;
    diagnosis: string;
    treatment: string;
    doctor: string;
  }>;
}

interface PatientsProps {
  onNavigate?: (page: string) => void;
}

const Patients: React.FC<PatientsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailExpanded, setIsDetailExpanded] = useState(true);
  const [user] = useState({
    id: '1',
    name: '山田医師',
    role: 'admin' as const
  });

  // Sample patient data
  const [patients] = useState<Patient[]>([
    {
      id: 'P001',
      name: '田中太郎',
      age: 45,
      gender: '男性',
      contact: '090-1234-5678',
      email: 'tanaka@example.com',
      address: '東京都渋谷区1-2-3',
      nextAppointment: '2024-01-15 14:00',
      appointmentHistory: [
        { date: '2024-01-08', type: '定期検診', doctor: '山田医師', status: '完了' },
        { date: '2023-12-15', type: '相談', doctor: '佐藤医師', status: '完了' },
        { date: '2023-11-20', type: '治療', doctor: '山田医師', status: '完了' }
      ],
      medicalHistory: [
        { date: '2024-01-08', diagnosis: '高血圧', treatment: '薬物療法', doctor: '山田医師' },
        { date: '2023-12-15', diagnosis: '風邪', treatment: '対症療法', doctor: '佐藤医師' }
      ]
    },
    {
      id: 'P002',
      name: '佐藤花子',
      age: 32,
      gender: '女性',
      contact: '080-9876-5432',
      email: 'sato@example.com',
      address: '東京都新宿区4-5-6',
      nextAppointment: '2024-01-16 10:30',
      appointmentHistory: [
        { date: '2024-01-05', type: '健康診断', doctor: '鈴木医師', status: '完了' },
        { date: '2023-12-20', type: '相談', doctor: '田中医師', status: '完了' }
      ],
      medicalHistory: [
        { date: '2024-01-05', diagnosis: '正常', treatment: '経過観察', doctor: '鈴木医師' }
      ]
    },
    {
      id: 'P003',
      name: '山田次郎',
      age: 28,
      gender: '男性',
      contact: '070-5555-1111',
      email: 'yamada@example.com',
      address: '東京都品川区7-8-9',
      nextAppointment: '2024-01-17 15:45',
      appointmentHistory: [
        { date: '2024-01-10', type: '治療', doctor: '高橋医師', status: '完了' },
        { date: '2023-12-25', type: '緊急', doctor: '山田医師', status: '完了' }
      ],
      medicalHistory: [
        { date: '2024-01-10', diagnosis: '捻挫', treatment: '理学療法', doctor: '高橋医師' },
        { date: '2023-12-25', diagnosis: '外傷', treatment: '縫合', doctor: '山田医師' }
      ]
    },
    {
      id: 'P004',
      name: '鈴木美咲',
      age: 55,
      gender: '女性',
      contact: '090-7777-8888',
      email: 'suzuki@example.com',
      address: '東京都世田谷区10-11-12',
      nextAppointment: '2024-01-18 09:00',
      appointmentHistory: [
        { date: '2024-01-12', type: '定期検診', doctor: '佐藤医師', status: '完了' },
        { date: '2023-12-30', type: '相談', doctor: '田中医師', status: '完了' }
      ],
      medicalHistory: [
        { date: '2024-01-12', diagnosis: '糖尿病', treatment: '食事療法', doctor: '佐藤医師' }
      ]
    },
    {
      id: 'P005',
      name: '高橋健一',
      age: 67,
      gender: '男性',
      contact: '080-3333-4444',
      email: 'takahashi@example.com',
      address: '東京都中野区13-14-15',
      nextAppointment: '2024-01-19 11:15',
      appointmentHistory: [
        { date: '2024-01-06', type: '治療', doctor: '山田医師', status: '完了' },
        { date: '2023-12-18', type: '定期検診', doctor: '鈴木医師', status: '完了' }
      ],
      medicalHistory: [
        { date: '2024-01-06', diagnosis: '関節炎', treatment: '薬物療法', doctor: '山田医師' },
        { date: '2023-12-18', diagnosis: '高コレステロール', treatment: '生活指導', doctor: '鈴木医師' }
      ]
    }
  ]);

  // Filter patients based on search and filters
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = !ageFilter || 
                      (ageFilter === '20-30' && patient.age >= 20 && patient.age <= 30) ||
                      (ageFilter === '31-50' && patient.age >= 31 && patient.age <= 50) ||
                      (ageFilter === '51+' && patient.age >= 51);
    const matchesGender = !genderFilter || patient.gender === genderFilter;
    
    return matchesSearch && matchesAge && matchesGender;
  });

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailExpanded(true);
  };

  const handleCloseDetail = () => {
    setSelectedPatient(null);
  };

  const handleViewMedicalRecords = (patientId: string) => {
    console.log(`診療記録を表示: ${patientId}`);
  };

  const handleAddAppointment = (patientId: string) => {
    console.log(`予約を追加: ${patientId}`);
  };

  const handleUploadDocuments = (patientId: string) => {
    console.log(`書類をアップロード: ${patientId}`);
  };

  const breadcrumbs = [
    { label: 'ダッシュボード', path: '/' },
    { label: '患者管理' }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      user={user}
      currentPage="patients"
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E4A70] mb-2">患者管理</h1>
            <p className="text-gray-600">患者情報の管理と検索</p>
          </div>
          <Button className="mt-4 sm:mt-0">
            <User className="w-4 h-4 mr-2" />
            新規患者登録
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="患者名またはIDで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              />
            </div>

            {/* Age Filter */}
            <div className="relative">
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">年齢（全て）</option>
                <option value="20-30">20-30歳</option>
                <option value="31-50">31-50歳</option>
                <option value="51+">51歳以上</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Gender Filter */}
            <div className="relative">
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">性別（全て）</option>
                <option value="男性">男性</option>
                <option value="女性">女性</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patients Table */}
          <div className={`${selectedPatient ? 'lg:col-span-2' : 'lg:col-span-3'} transition-all duration-300`}>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">氏名</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">年齢</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">性別</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">連絡先</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">次回予約</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        onClick={() => handlePatientClick(patient)}
                        className={`border-b border-gray-100 hover:bg-[#F0F2F2] cursor-pointer transition-colors ${
                          selectedPatient?.id === patient.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-[#2E4A70]">{patient.id}</td>
                        <td className="py-3 px-4">{patient.name}</td>
                        <td className="py-3 px-4">{patient.age}歳</td>
                        <td className="py-3 px-4">{patient.gender}</td>
                        <td className="py-3 px-4">{patient.contact}</td>
                        <td className="py-3 px-4">{patient.nextAppointment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPatients.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    該当する患者が見つかりません
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Patient Detail Section */}
          {selectedPatient && (
            <div className="lg:col-span-1">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#2E4A70] flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    患者詳細
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsDetailExpanded(!isDetailExpanded)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {isDetailExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={handleCloseDetail}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {isDetailExpanded && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="font-semibold text-[#2E4A70] mb-3 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        基本情報
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="font-medium w-16">氏名:</span>
                          <span>{selectedPatient.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium w-16">年齢:</span>
                          <span>{selectedPatient.age}歳</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium w-16">性別:</span>
                          <span>{selectedPatient.gender}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{selectedPatient.contact}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{selectedPatient.email}</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                          <span>{selectedPatient.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Appointment History */}
                    <div>
                      <h4 className="font-semibold text-[#2E4A70] mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        予約履歴
                      </h4>
                      <div className="space-y-2">
                        {selectedPatient.appointmentHistory.slice(0, 3).map((appointment, index) => (
                          <div key={index} className="bg-[#F0F2F2] p-3 rounded-lg text-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{appointment.date}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                appointment.status === '完了' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                            <div className="text-gray-600">
                              {appointment.type} - {appointment.doctor}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Medical History */}
                    <div>
                      <h4 className="font-semibold text-[#2E4A70] mb-3 flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        診療履歴
                      </h4>
                      <div className="space-y-2">
                        {selectedPatient.medicalHistory.slice(0, 2).map((record, index) => (
                          <div key={index} className="bg-[#F0F2F2] p-3 rounded-lg text-sm">
                            <div className="font-medium mb-1">{record.date}</div>
                            <div className="text-gray-600 mb-1">
                              診断: {record.diagnosis}
                            </div>
                            <div className="text-gray-600">
                              治療: {record.treatment}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleViewMedicalRecords(selectedPatient.id)}
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        診療記録を表示
                      </Button>
                      <Button
                        onClick={() => handleAddAppointment(selectedPatient.id)}
                        variant="secondary"
                        size="sm"
                        className="w-full"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        予約を追加
                      </Button>
                      <Button
                        onClick={() => handleUploadDocuments(selectedPatient.id)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        書類をアップロード
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Patients;