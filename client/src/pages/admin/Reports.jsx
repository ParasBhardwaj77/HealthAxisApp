import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Trash2,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import Table from "../../components/Table";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(API_ENDPOINTS.REPORTS.ALL);
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

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        const res = await fetchWithAuth(API_ENDPOINTS.REPORTS.DELETE(id), {
          method: "DELETE",
        });
        if (res.ok) {
          setReports(reports.filter((r) => r.id !== id));
        } else {
          alert("Failed to delete report");
        }
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
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
      report.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage all medical reports in the system
          </p>
        </div>
        <div className="flex gap-2">{/* Additional actions if needed */}</div>
      </div>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <Table
          headers={[
            "Report Name",
            "Patient",
            "Doctor",
            "Date",
            "Values",
            "Actions",
          ]}
          data={filteredReports}
          renderRow={(report) => (
            <>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {report.fileName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {report.fileType}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {report.patientName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {report.doctorName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(report.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDownload(report)}
                  className="text-gray-400 hover:text-primary-500"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </>
          )}
        />
      </div>
    </div>
  );
}
