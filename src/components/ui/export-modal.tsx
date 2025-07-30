import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { useHospital } from '@/providers/HospitalProvider';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataType: 'beds' | 'blood' | 'analytics';
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, dataType }) => {
  const { exportReport, beds, bloodStock } = useHospital();
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel'>('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeStats, setIncludeStats] = useState(true);
  const [dateRange, setDateRange] = useState('last_30_days');

  const handleExport = () => {
    let exportData;
    
    switch (dataType) {
      case 'beds':
        exportData = {
          type: 'Bed Management Report',
          timestamp: new Date().toISOString(),
          data: beds,
          summary: {
            total: beds.length,
            available: beds.filter(b => b.status === 'available').length,
            occupied: beds.filter(b => b.status === 'occupied').length,
            maintenance: beds.filter(b => b.status === 'maintenance').length,
          }
        };
        break;
      case 'blood':
        exportData = {
          type: 'Blood Bank Report',
          timestamp: new Date().toISOString(),
          data: bloodStock,
          summary: {
            totalUnits: bloodStock.reduce((sum, stock) => sum + stock.units, 0),
            criticalStock: bloodStock.filter(stock => stock.status === 'critical').length,
            lowStock: bloodStock.filter(stock => stock.status === 'low').length,
          }
        };
        break;
      case 'analytics':
        exportData = {
          type: 'Analytics Report',
          timestamp: new Date().toISOString(),
          dateRange: dateRange,
          includeCharts: includeCharts,
          includeStats: includeStats,
          data: {
            beds: beds,
            bloodStock: bloodStock,
          }
        };
        break;
      default:
        exportData = { type: 'Unknown Report' };
    }

    exportReport(exportFormat, exportData);
    onClose();
  };

  const getTitle = () => {
    switch (dataType) {
      case 'beds': return 'Export Bed Management Report';
      case 'blood': return 'Export Blood Bank Report';
      case 'analytics': return 'Export Analytics Report';
      default: return 'Export Report';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-primary" />
            <span>{getTitle()}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Export Format</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={exportFormat === 'pdf' ? 'default' : 'outline'}
                onClick={() => setExportFormat('pdf')}
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </Button>
              <Button
                variant={exportFormat === 'excel' ? 'default' : 'outline'}
                onClick={() => setExportFormat('excel')}
                className="flex items-center space-x-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Excel</span>
              </Button>
            </div>
          </div>

          {dataType === 'analytics' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                    <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Include in Report</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="charts" 
                      checked={includeCharts}
                      onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                    />
                    <Label htmlFor="charts" className="text-sm">Charts and Graphs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stats" 
                      checked={includeStats}
                      onCheckedChange={(checked) => setIncludeStats(checked === true)}
                    />
                    <Label htmlFor="stats" className="text-sm">Statistical Summary</Label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="gradient-primary text-primary-foreground">
            <Download className="w-4 h-4 mr-2" />
            Export {exportFormat.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};