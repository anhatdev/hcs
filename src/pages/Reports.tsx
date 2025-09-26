import React, { useState } from 'react';
import Layout from '../component/Layout';
import Card from '../component/Card';
import Button from '../component/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  FileText,
  PieChart,
  Activity,
  Users,
  AlertTriangle,
  CheckCircle,
  Filter
} from 'lucide-react';

interface ReportsProps {
  onNavigate?: (page: string) => void;
}

const Reports: React.FC<ReportsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });
  const [user] = useState({
    id: '1',
    name: '山田医師',
    role: 'admin' as const
  });

  // Sample data for charts
  const visitData = [
    { month: '1月', visits: 120, newPatients: 15 },
    { month: '2月', visits: 135, newPatients: 18 },
    { month: '3月', visits: 150, newPatients: 22 },
    { month: '4月', visits: 142, newPatients: 19 },
    { month: '5月', visits: 168, newPatients: 25 },
    { month: '6月', visits: 155, newPatients: 21 }
  ];

  const testResultData = [
    { type: '血液検査', normal: 85, abnormal: 15 },
    { type: 'X線検査', normal: 92, abnormal: 8 },
    { type: 'MRI検査', normal: 78, abnormal: 22 },
    { type: '心電図検査', normal: 88, abnormal: 12 },
    { type: '超音波検査', normal: 90, abnormal: 10 }
  ];

  const abnormalFindingsData = [
    { category: '高血圧', count: 45, percentage: 35 },
    { category: '糖尿病', count: 32, percentage: 25 },
    { category: '高コレステロール', count: 28, percentage: 22 },
    { category: '不整脈', count: 15, percentage: 12 },
    { category: 'その他', count: 8, percentage: 6 }
  ];

  const handleExportPDF = () => {
    console.log('PDFレポートを出力');
  };

  const handleExportCSV = () => {
    console.log('CSVレポートを出力');
  };

  const handleChartClick = (dataType: string, item?: any) => {
    console.log(`チャートクリック: ${dataType}`, item);
    onNavigate?.('records');
  };

  const breadcrumbs = [
    { label: 'ダッシュボード', path: '/' },
    { label: 'レポート' }
  ];

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      user={user}
      currentPage="reports"
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E4A70] mb-2">レポート</h1>
            <p className="text-gray-600">患者データの分析とレポート</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button onClick={handleExportCSV} variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              CSV出力
            </Button>
            <Button onClick={handleExportPDF}>
              <FileText className="w-4 h-4 mr-2" />
              PDF出力
            </Button>
          </div>
        </div>

        {/* Date Range Filter */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-[#2E4A70] mb-4 sm:mb-0 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              期間フィルター
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">開始日:</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">終了日:</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E4A70] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hover>
            <div className="flex items-center">
              <div className="p-3 bg-[#2E4A70] rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総患者数</p>
                <p className="text-2xl font-bold text-[#2E4A70]">1,247</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% 前月比
                </p>
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center">
              <div className="p-3 bg-[#24B0BA] rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総診察数</p>
                <p className="text-2xl font-bold text-[#2E4A70]">870</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% 前月比
                </p>
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center">
              <div className="p-3 bg-green-500 rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">正常結果</p>
                <p className="text-2xl font-bold text-[#2E4A70]">87%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2% 前月比
                </p>
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center">
              <div className="p-3 bg-red-500 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">異常所見</p>
                <p className="text-2xl font-bold text-[#2E4A70]">128</p>
                <p className="text-xs text-red-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% 前月比
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Visits Chart */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#2E4A70] flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                月別患者数推移
              </h2>
              <Button size="sm" variant="outline" onClick={() => handleChartClick('visits')}>
                詳細を見る
              </Button>
            </div>
            <div className="space-y-4">
              {visitData.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleChartClick('visits', data)}
                  className="cursor-pointer hover:bg-[#F0F2F2] p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{data.month}</span>
                    <span className="text-sm text-gray-600">総数: {data.visits}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-[#2E4A70] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(data.visits / 200) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>新規患者: {data.newPatients}</span>
                    <span>既存患者: {data.visits - data.newPatients}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Test Results Chart */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#2E4A70] flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                検査結果分析
              </h2>
              <Button size="sm" variant="outline" onClick={() => handleChartClick('tests')}>
                詳細を見る
              </Button>
            </div>
            <div className="space-y-4">
              {testResultData.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleChartClick('tests', data)}
                  className="cursor-pointer hover:bg-[#F0F2F2] p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{data.type}</span>
                    <span className="text-sm text-gray-600">
                      総数: {data.normal + data.abnormal}
                    </span>
                  </div>
                  <div className="flex w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-500 h-3 transition-all duration-300"
                      style={{ width: `${(data.normal / (data.normal + data.abnormal)) * 100}%` }}
                    ></div>
                    <div
                      className="bg-red-500 h-3 transition-all duration-300"
                      style={{ width: `${(data.abnormal / (data.normal + data.abnormal)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span className="text-green-600">正常: {data.normal}</span>
                    <span className="text-red-600">異常: {data.abnormal}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Abnormal Findings Analysis */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2E4A70] flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              異常所見分析
            </h2>
            <Button size="sm" variant="outline" onClick={() => handleChartClick('abnormal')}>
              詳細を見る
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {abnormalFindingsData.map((data, index) => (
              <div
                key={index}
                onClick={() => handleChartClick('abnormal', data)}
                className="cursor-pointer hover:bg-[#F0F2F2] p-4 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">{data.category}</h3>
                  <span className="text-2xl font-bold text-[#2E4A70]">{data.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  全体の {data.percentage}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Reports */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#2E4A70] flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              最近のレポート
            </h2>
            <Button size="sm" variant="outline">すべて表示</Button>
          </div>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', title: '月次患者統計レポート', type: 'PDF', size: '2.3MB' },
              { date: '2024-01-10', title: '検査結果分析レポート', type: 'CSV', size: '1.8MB' },
              { date: '2024-01-05', title: '異常所見サマリー', type: 'PDF', size: '1.2MB' },
              { date: '2024-01-01', title: '年次総合レポート', type: 'PDF', size: '5.7MB' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#F0F2F2] rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-[#2E4A70] bg-white px-3 py-1 rounded-full min-w-[80px] text-center">
                    {report.date}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.title}</p>
                    <p className="text-sm text-gray-600">{report.type} - {report.size}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  ダウンロード
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;