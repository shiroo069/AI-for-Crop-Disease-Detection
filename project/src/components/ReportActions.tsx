import React from 'react';
import { Download, FileJson, FileSpreadsheet, FileText, Share2 } from 'lucide-react';
import { DiagnosticReport, AnalysisResult, UploadedImage } from '../types';
import { generatePDFReport, exportAsJSON, exportAsCSV, downloadFile } from '../utils/reportService';

interface ReportActionsProps {
  report: DiagnosticReport;
  analysis: AnalysisResult;
  image: UploadedImage;
}

const ReportActions: React.FC<ReportActionsProps> = ({ report, analysis, image }) => {
  const handleDownloadPDF = () => {
    const pdfBlob = generatePDFReport(report, analysis, image);
    downloadFile(pdfBlob, `crop-report-${report.id}.txt`);
  };
  
  const handleExportJSON = () => {
    const jsonBlob = exportAsJSON(report, analysis);
    downloadFile(jsonBlob, `crop-report-${report.id}.json`);
  };
  
  const handleExportCSV = () => {
    const csvBlob = exportAsCSV(report, analysis);
    downloadFile(csvBlob, `crop-report-${report.id}.csv`);
  };
  
  const handleShare = () => {
    // In a real app, this would show a sharing dialog
    alert('Sharing functionality would be implemented here in a production app.');
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Report Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={handleDownloadPDF}
          className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <FileText className="w-6 h-6 text-green-600 mb-2" />
          <span className="text-sm font-medium text-green-800">Download Report</span>
        </button>
        
        <button
          onClick={handleExportJSON}
          className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <FileJson className="w-6 h-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium text-blue-800">Export JSON</span>
        </button>
        
        <button
          onClick={handleExportCSV}
          className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        >
          <FileSpreadsheet className="w-6 h-6 text-purple-600 mb-2" />
          <span className="text-sm font-medium text-purple-800">Export CSV</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
        >
          <Share2 className="w-6 h-6 text-amber-600 mb-2" />
          <span className="text-sm font-medium text-amber-800">Share Report</span>
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Report generated on {report.generatedAt.toLocaleString()}</p>
        <p>Report ID: {report.id.substring(0, 8)}</p>
      </div>
    </div>
  );
};

export default ReportActions;