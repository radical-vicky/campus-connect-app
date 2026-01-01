import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Layers,
  List,
  AlertTriangle,
  Building,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import campusAerial from '@/assets/campus-aerial.jpg';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotices } from '@/contexts/NoticesContext';
import { mockLocations } from '@/data/mockData';
import { getCategoryIcon } from '@/lib/categories';

const CampusMap: React.FC = () => {
  const navigate = useNavigate();
  const { notices } = useNotices();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const [mapToken, setMapToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const locationsWithNotices = mockLocations.map((loc) => ({
    ...loc,
    notices: notices.filter((n) => n.location?.id === loc.id),
  }));

  const selectedLocationData = locationsWithNotices.find(
    (loc) => loc.id === selectedLocation
  );

  // Campus map coordinates (mock - center of campus)
  const campusCenter = { lat: 40.7128, lng: -74.006 };

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Campus Map</h1>
            <Button
              variant={showList ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setShowList(!showList)}
            >
              {showList ? <Layers className="h-5 w-5" /> : <List className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative h-[calc(100vh-60px)]">
        {showTokenInput ? (
          /* Token Input Screen */
          <div className="flex flex-col items-center justify-center h-full p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Campus Map</h2>
                <p className="text-sm text-muted-foreground">
                  To view the interactive campus map, please enter your Mapbox public token.
                  You can find it at{' '}
                  <a
                    href="https://mapbox.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    mapbox.com
                  </a>{' '}
                  in the Tokens section.
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="pk.eyJ1..."
                  value={mapToken}
                  onChange={(e) => setMapToken(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button
                  className="w-full"
                  onClick={() => {
                    if (mapToken.startsWith('pk.')) {
                      setShowTokenInput(false);
                    }
                  }}
                  disabled={!mapToken.startsWith('pk.')}
                >
                  Load Map
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-4">
                  Or view campus locations as a list:
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowList(true);
                    setShowTokenInput(false);
                  }}
                >
                  <List className="h-4 w-4 mr-2" />
                  View List
                </Button>
              </div>
            </motion.div>
          </div>
        ) : showList ? (
          /* List View */
          <ScrollArea className="h-full">
            <div className="container max-w-2xl mx-auto px-4 py-4 space-y-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {locationsWithNotices.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="cursor-pointer card-hover"
                      onClick={() => {
                        setSelectedLocation(location.id);
                        setShowList(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center shrink-0">
                            <Building className="h-6 w-6 text-info" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold">{location.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {location.building}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {location.zone}
                              </Badge>
                              {location.notices.length > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {location.notices.length} notice
                                  {location.notices.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Navigation className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollArea>
        ) : (
          /* Map View with Campus Image */
          <div className="relative h-full">
            {/* Campus Map Background */}
            <div className="absolute inset-0">
              <img 
                src={campusAerial} 
                alt="Campus aerial view" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />

              {/* Map Markers */}
              {locationsWithNotices.map((location, index) => {
                const hasUrgent = location.notices.some(
                  (n) => n.priority === 'urgent'
                );
                const angle = (index / locationsWithNotices.length) * Math.PI * 2;
                const radius = 120;
                const x = 50 + Math.cos(angle) * 20;
                const y = 50 + Math.sin(angle) * 15;

                return (
                  <motion.button
                    key={location.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                      hasUrgent ? 'animate-bounce-subtle' : ''
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <div
                      className={`relative ${
                        selectedLocation === location.id
                          ? 'scale-125'
                          : ''
                      } transition-transform`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          hasUrgent
                            ? 'bg-emergency text-emergency-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {hasUrgent ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <MapPin className="h-5 w-5" />
                        )}
                      </div>
                      {location.notices.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                          {location.notices.length}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center">
              <Badge variant="outline" className="bg-background/80 backdrop-blur">
                <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                Location
              </Badge>
              <Badge variant="outline" className="bg-background/80 backdrop-blur">
                <span className="w-2 h-2 rounded-full bg-emergency mr-2 animate-pulse" />
                Urgent Notice
              </Badge>
            </div>

            {/* Location Detail Sheet */}
            {selectedLocationData && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-elevated border-t border-border max-h-[60vh] overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {selectedLocationData.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedLocationData.building}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedLocation(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="max-h-[40vh]">
                  <div className="p-4 space-y-3">
                    {selectedLocationData.notices.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No notices at this location
                      </p>
                    ) : (
                      selectedLocationData.notices.map((notice) => {
                        const Icon = getCategoryIcon(notice.category);
                        return (
                          <Card
                            key={notice.id}
                            className="cursor-pointer card-hover"
                            onClick={() => navigate(`/notice/${notice.id}`)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm line-clamp-1">
                                    {notice.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {notice.excerpt}
                                  </p>
                                </div>
                                {notice.priority === 'urgent' && (
                                  <Badge variant="urgent" className="shrink-0">
                                    Urgent
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CampusMap;
