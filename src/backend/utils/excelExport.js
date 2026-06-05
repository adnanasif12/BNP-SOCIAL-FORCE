// Excel Export Utility - CSV Format (works without external dependencies)
export const downloadExcel = (data, fileName = 'data') => {
  if (!data || data.length === 0) {
    alert('ডাউনলোড করার জন্য কোন ডেটা নেই');
    return;
  }

  const csv = convertToCSV(data);
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', `${fileName}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';

  // Get headers
  const headers = Object.keys(data[0]);
  const csv = [headers.join(',')];

  // Add rows
  data.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header];
      // Handle comma and quotes in values
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csv.push(values.join(','));
  });

  return csv.join('\n');
};

// Alias for backward compatibility
export const downloadExcelAdvanced = (data, fileName = 'data') => {
  downloadExcel(data, fileName);
};
