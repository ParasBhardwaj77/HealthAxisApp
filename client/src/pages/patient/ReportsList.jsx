import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Search,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import Table from "../../components/Table";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function ReportsList({ onBack }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(API_ENDPOINTS.REPORTS.MY);
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleDownload = (report) => {
    const link = document.createElement("a");
    link.href = API_ENDPOINTS.REPORTS.DOWNLOAD(report.id);
    link.setAttribute("download", report.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search by report name or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <Table
          headers={["Report Name", "Doctor", "Date", "Type"]}
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
                    {report.fileName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {report.doctorName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(report.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {report.fileType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-primary-500"
                    onClick={() => handleDownload(report)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </>
          )}
        />
      )}
    </div>
  );
}
