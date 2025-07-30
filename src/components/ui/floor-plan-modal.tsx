import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Bed, MapPin } from 'lucide-react';

interface FloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  floor: string;
}

export const FloorPlanModal: React.FC<FloorPlanModalProps> = ({ isOpen, onClose, floor }) => {
  // Mock bed layout for floor plan
  const mockBeds = [
    { id: '1', position: { x: 20, y: 20 }, status: 'available', bedNumber: 'A-01' },
    { id: '2', position: { x: 80, y: 20 }, status: 'occupied', bedNumber: 'A-02' },
    { id: '3', position: { x: 140, y: 20 }, status: 'maintenance', bedNumber: 'A-03' },
    { id: '4', position: { x: 200, y: 20 }, status: 'available', bedNumber: 'A-04' },
    { id: '5', position: { x: 20, y: 80 }, status: 'occupied', bedNumber: 'A-05' },
    { id: '6', position: { x: 80, y: 80 }, status: 'available', bedNumber: 'A-06' },
    { id: '7', position: { x: 140, y: 80 }, status: 'occupied', bedNumber: 'A-07' },
    { id: '8', position: { x: 200, y: 80 }, status: 'reserved', bedNumber: 'A-08' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'occupied': return '#ef4444';
      case 'maintenance': return '#f59e0b';
      case 'reserved': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{floor} Floor Plan</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 p-4">
          <div className="bg-accent/30 rounded-lg p-4 h-full relative overflow-hidden">
            {/* Floor layout background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-background/50 rounded-lg"></div>
            
            {/* Room outlines */}
            <div className="absolute top-4 left-4 w-64 h-32 border-2 border-border rounded-lg bg-background/50">
              <div className="p-2 text-sm font-medium text-muted-foreground">Ward A</div>
            </div>
            <div className="absolute top-4 right-4 w-64 h-32 border-2 border-border rounded-lg bg-background/50">
              <div className="p-2 text-sm font-medium text-muted-foreground">Ward B</div>
            </div>
            <div className="absolute bottom-4 left-4 w-64 h-32 border-2 border-border rounded-lg bg-background/50">
              <div className="p-2 text-sm font-medium text-muted-foreground">ICU</div>
            </div>
            <div className="absolute bottom-4 right-4 w-64 h-32 border-2 border-border rounded-lg bg-background/50">
              <div className="p-2 text-sm font-medium text-muted-foreground">Emergency</div>
            </div>
            
            {/* Beds */}
            {mockBeds.map((bed) => (
              <div
                key={bed.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 cursor-pointer group"
                style={{ left: bed.position.x, top: bed.position.y }}
              >
                <div className="relative">
                  <Bed 
                    className="w-8 h-8 transition-colors duration-200" 
                    style={{ color: getStatusColor(bed.status) }}
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Badge 
                      className="text-xs whitespace-nowrap"
                      style={{ backgroundColor: getStatusColor(bed.status) }}
                    >
                      {bed.bedNumber}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-success"></div>
              <span className="text-sm text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-destructive"></div>
              <span className="text-sm text-muted-foreground">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-warning"></div>
              <span className="text-sm text-muted-foreground">Maintenance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-info"></div>
              <span className="text-sm text-muted-foreground">Reserved</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};