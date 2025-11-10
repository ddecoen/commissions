'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UploadPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [pdfData, setPdfData] = useState<any>(null);
  const [csvData, setCsvData] = useState<any>(null);

  const handlePdfUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      const response = await fetch('/api/upload/pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('PDF uploaded and processed successfully!');
        setPdfData(data);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error uploading PDF');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await fetch('/api/upload/csv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('CSV uploaded and processed successfully!');
        setCsvData(data);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error uploading CSV');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Upload Data</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes('Error')
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <UploadCard
            title="Employee Roster"
            description="Upload a CSV file with employee information"
            icon="👥"
            acceptedFormat=".csv"
            file={csvFile}
            onFileChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            onSubmit={handleCsvUpload}
            uploading={uploading}
            data={csvData}
            sampleFormat={[
              'employee_name,email,quota,base_salary,commission_target',
              'John Doe,john@company.com,1440000,160000,160000',
            ]}
          />

          <UploadCard
            title="Salesforce Opportunities"
            description="Upload PDF export from Salesforce"
            icon="📄"
            acceptedFormat=".pdf"
            file={pdfFile}
            onFileChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            onSubmit={handlePdfUpload}
            uploading={uploading}
            data={pdfData}
            instructions={[
              '1. Go to Salesforce Opportunities',
              '2. Filter: Stage = "Closed Won"',
              '3. Click "Printable View"',
              '4. Save as PDF and upload',
            ]}
          />
        </div>

        {(pdfData || csvData) && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Preview
            </h2>
            
            {csvData && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Employees: {csvData.employees?.length || 0}</h3>
                <div className="bg-gray-50 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">{JSON.stringify(csvData, null, 2)}</pre>
                </div>
              </div>
            )}

            {pdfData && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Opportunities: {pdfData.opportunities?.length || 0}</h3>
                <div className="bg-gray-50 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">{JSON.stringify(pdfData, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function UploadCard({
  title,
  description,
  icon,
  acceptedFormat,
  file,
  onFileChange,
  onSubmit,
  uploading,
  data,
  sampleFormat,
  instructions,
}: {
  title: string;
  description: string;
  icon: string;
  acceptedFormat: string;
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  uploading: boolean;
  data: any;
  sampleFormat?: string[];
  instructions?: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File ({acceptedFormat})
          </label>
          <input
            type="file"
            accept={acceptedFormat}
            onChange={onFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!file || uploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {sampleFormat && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="text-xs font-semibold text-gray-700 mb-2">CSV Format:</p>
          <pre className="text-xs text-gray-600 overflow-x-auto">{sampleFormat.join('\n')}</pre>
        </div>
      )}

      {instructions && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <p className="text-xs font-semibold text-blue-900 mb-2">How to export:</p>
          <ul className="text-xs text-blue-800 space-y-1">
            {instructions.map((instruction, i) => <li key={i}>{instruction}</li>)}
          </ul>
        </div>
      )}

      {data && (
        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
          <p className="text-sm font-semibold text-green-800">✓ Success</p>
          <p className="text-xs text-green-700 mt-1">
            {data.employees?.length || data.opportunities?.length || 0} records
          </p>
        </div>
      )}
    </div>
  );
}
