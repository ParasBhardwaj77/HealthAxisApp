import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Eye, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import Table from "../../components/Table";

const reportsData = [
  {
    id: 1,
    date: "Oct 15, 2024",
    doctor: "Dr. Sarah Wilson",
    type: "Blood Test Results",
    status: "Available",
    size: "1.2 MB",
  },
  {
    id: 2,
    date: "Sep 22, 2024",
    doctor: "Dr. Michael Brown",
    type: "X-Ray Report",
    status: "Available",
    size: "4.5 MB",
  },
  {
    id: 3,
    date: "Aug 10, 2024",
    doctor: "Dr. Emily Chen",
    type: "General Checkup",
    status: "Available",
    size: "0.8 MB",
  },
  {
    id: 4,
    date: "Jul 05, 2024",
    doctor: "Dr. Sarah Wilson",
    type: "Urinalysis",
    status: "Available",
    size: "1.1 MB",
  },
  {
    id: 5,
    date: "Jun 18, 2024",
    doctor: "Dr. James Carter",
    type: "MRI Scan",
    status: "Available",
    size: "12.4 MB",
  },
];

export default function ReportsList({ onBack }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const filteredReports = reportsData.filter(
    (report) =>
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View and download your medical reports
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by report type or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
      </div>

      <Table
        headers={["Report Type", "Doctor", "Date", "Size"]}
        data={filteredReports}
        actions={false}
        renderRow={(report) => (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {report.type}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {report.doctor}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {report.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {report.size}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-primary-500"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-primary-500"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </td>
          </>
        )}
      />
    </div>
  );
}
