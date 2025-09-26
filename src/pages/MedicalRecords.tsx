import React, { useState } from 'react';
import Layout from '../component/Layout';
import Card from '../component/Card';
import Button from '../component/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FileText, 
  Search, 
  Filter, 
  Upload,
  Download,
  Calendar,
  User,
  Stethoscope,
  BarChart3,
  Plus,
  Eye,
  ChevronDown
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  testType: string;
  result: string;
  doctor: string;
  status: 'Pending' | 'Completed' | 'Abnormal' | 'Reviewed';
  notes?: string;
}

interface MedicalRecordsProps {
  onNavigate?: (page: string) => void;
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [patientFilter, setPatientFilter] = useState('');
  const [testTypeFilter, setTestTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [user] = useState({
    id: '1',
    name: '山田医師',
    role: 'admin' as const
  });

  // Sample medical records data
  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: 'MR001',
      patientName: '田中太郎',
      patientId: 'P001',
      testType: '血液検査',
      result: '正常範囲内',
      doctor: '山田医師',
      status: '完了',
      notes: 'すべての値が正常範囲内'
    },
    {
      id: 'MR002',
      patientName: '佐藤花子',
      patientId: 'P002',
      testType: 'X線検査',
      result: '異常なし',
      doctor: '鈴木医師',
      status: '完了',
      notes: '胸部X線に異常所見なし'
    },
    {
      id: 'MR003',
      patientName: '山田次郎',
      patientId: 'P003',
      testType: 'MRI検査',
      result: '軽度の炎症',
      doctor: '高橋医師',
      status: '要注意',
      notes: '膝関節に軽度の炎症反応'
    },
    {
      id: 'MR004',
      patientName: '鈴木美咲',
      patientId: 'P004',
      testType: '血糖値検査',
      result: '高値',
      doctor: '佐藤医師',
      status: '要注意',
      notes: '空腹時血糖値が基準値を上回る'
    },
    {
      id: 'MR005',
      patientName: '高橋健一',
      patientId: 'P005',
      testType: '心電図検査',
      result: '不整脈',
      doctor: '山田医師',
      status: '確認済み',
      notes: '軽度の不整脈を確認'
    },
    {
      id: 'MR006',
      patientName: '田中太郎',
      patientId: 'P001',
      testType: '尿検査',
      result: '正常範囲内',
      doctor: '鈴木医師',
      status: '完了',
      notes: '蛋白、糖ともに陰性'
    },
    {
      id: 'MR007',
      patientName: '伊藤由美',
      patientId: 'P006',
      testType: '超音波検査',
      result: '要精密検査',
      doctor: '田中医師',
      status: '保留中',
      notes: '腹部に影を確認、精密検査が必要'
    },
    {
      id: 'MR008',
      patientName: '渡辺誠',
      patientId: 'P007',
      testType: '血圧測定',
      result: '高血圧',
      doctor: '高橋医師',
      status: '要注意',
      notes: '収縮期血圧が160mmHg'
    }
  ]);

  // Filter medical records based on search and filters
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPatient = !patientFilter || record.patientName === patientFilter;
    const matchesTestType = !testTypeFilter || record.testType === testTypeFilter;
    const matchesStatus = !statusFilter || record.status === statusFilter;
    
    return matchesSearch && matchesPatient && matchesTestType && matchesStatus;
  });

  // Get unique values for filters
  const uniquePatients = [...new Set(medicalRecords.map(record => record.patientName))];
  const uniqueTestTypes = [...new Set(medicalRecords.map(record => record.testType))];

  const handlePatientClick = (patientId: string) => {
    // Navigate to patients page and show patient detail
    onNavigate?.('patients');
    console.log(`患者詳細を表示: ${patientId}`);
  };

  const handleViewReport = (recordId: string) => {
    // Navigate to reports page for detailed analytics
    onNavigate?.('reports');
    console.log(`詳細レポートを表示: ${recordId}`);
  };

  const handleUploadRecord = () => {
    console.log('新しい記録をアップロード');
  };

  const handleDownloadRecord = (recordId: string) => {
    console.log(`記録をダウンロード: ${recordId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '完了':
        return 'bg-green-100 text-green-800';
      case '要注意':
        return 'bg-red-100 text-red-800';
      case '保留中':
        return 'bg-orange-100 text-orange-800';
      case '確認済み':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '完了':
        return '✓';
      case '要注意':
        return '⚠';
      case '保留中':
        return '👁';
      case '確認済み':
        return '?';
      default:
        return '?';
    }
  };

  const breadcrumbs = [
    { label: 'ダッシュボード', path: '/' },
    { label: '診療記録' }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      user={user}
      currentPage="records"
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E4A70] mb-2">診療記録</h1>
            <p className="text-gray-600">患者の診療記録と検査結果の管理</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button onClick={handleUploadRecord} variant="secondary">
              <Upload className="w-4 h-4 mr-2" />
              記録をアップロード
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新規記録追加
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="患者名、記録ID、検査タイプ、医師名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              />
            </div>

            {/* Patient Filter */}
            <div className="relative">
              <select
                value={patientFilter}
                onChange={(e) => setPatientFilter(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">患者（全て）</option>
                {uniquePatients.map(patient => (
                  <option key={patient} value={patient}>{patient}</option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Test Type Filter */}
            <div className="relative">
              <select
                value={testTypeFilter}
                onChange={(e) => setTestTypeFilter(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">検査タイプ（全て）</option>
                {uniqueTestTypes.map(testType => (
                  <option key={testType} value={testType}>{testType}</option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
              >
                <option value="">ステータス（全て）</option>
                <option value="保留中">保留中</option>
                <option value="完了">完了</option>
                <option value="要注意">要注意</option>
                <option value="確認済み">確認済み</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </Card>

        {/* Medical Records Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">記録ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">患者名</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">検査タイプ</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">結果</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">ステータス</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">担当医師</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#2E4A70]">アクション</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-[#F0F2F2] transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-[#2E4A70]">{record.id}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handlePatientClick(record.patientId)}
                        className="text-[#2E4A70] hover:text-[#24B0BA] font-medium transition-colors"
                      >
                        {record.patientName}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2 text-gray-400" />
                        {record.testType}
                      </div>
                    </td>
                    <td className="py-3 px-4">{record.result}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        <span className="mr-1">{getStatusIcon(record.status)}</span>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{record.doctor}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewReport(record.id)}
                          className="p-1 text-[#2E4A70] hover:text-[#24B0BA] transition-colors"
                          title="詳細レポートを表示"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadRecord(record.id)}
                          className="p-1 text-[#2E4A70] hover:text-[#24B0BA] transition-colors"
                          title="記録をダウンロード"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-[#2E4A70] hover:text-[#24B0BA] transition-colors"
                          title="詳細を表示"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRecords.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>該当する診療記録が見つかりません</p>
              </div>
            )}
          </div>
        </Card>

        {/* Summary Statistics */}
        <Card>
          <h2 className="text-xl font-semibold text-[#2E4A70] mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            診療記録統計
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#F0F2F2] rounded-lg">
              <div className="text-2xl font-bold text-[#2E4A70] mb-1">
                {filteredRecords.length}
              </div>
              <div className="text-sm text-gray-600">総記録数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {filteredRecords.filter(r => r.status === '完了').length}
              </div>
              <div className="text-sm text-gray-600">完了</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {filteredRecords.filter(r => r.status === '要注意').length}
              </div>
              <div className="text-sm text-gray-600">要注意</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {filteredRecords.filter(r => r.status === '保留中').length}
              </div>
              <div className="text-sm text-gray-600">保留中</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {filteredRecords.filter(r => r.status === '確認済み').length}
              </div>
              <div className="text-sm text-gray-600">確認済み</div>
            </div>
          </div>
        </Card>

        {/* Recent Records */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#2E4A70] flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              最近の記録
            </h2>
            <Button size="sm" variant="outline">すべて表示</Button>
          </div>
          <div className="space-y-3">
            {filteredRecords.slice(0, 5).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-[#F0F2F2] rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-[#2E4A70] bg-white px-3 py-1 rounded-full min-w-[60px] text-center">
                    {record.id}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{record.patientName}</p>
                    <p className="text-sm text-gray-600">{record.testType} - {record.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    <span className="mr-1">{getStatusIcon(record.status)}</span>
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default MedicalRecords;