
import React, { useState } from 'react';

const KPIReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dealerId, setDealerId] = useState('');
  const [reportData, setReportData] = useState([]);

  const fetchReport = async () => {
    const res = await fetch(`/api/kpi-report?start=${startDate}&end=${endDate}&dealer=${dealerId}`);
    const data = await res.json();
    setReportData(data);
  };

  const exportCSV = () => {
    const csv = reportData.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kpi_report.csv';
    a.click();
  };

  return (
    <div>
      <h2>KPI Report Generator</h2>
      <label>Start Date: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
      <label>End Date: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></label>
      <label>Dealer ID: <input value={dealerId} onChange={e => setDealerId(e.target.value)} /></label>
      <button onClick={fetchReport}>Generate</button>
      <button onClick={exportCSV}>Export CSV</button>
      <table>
        <thead><tr>{reportData[0] && Object.keys(reportData[0]).map(k => <th key={k}>{k}</th>)}</tr></thead>
        <tbody>
          {reportData.map((row, idx) => (
            <tr key={idx}>{Object.values(row).map((v, i) => <td key={i}>{v}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KPIReport;
