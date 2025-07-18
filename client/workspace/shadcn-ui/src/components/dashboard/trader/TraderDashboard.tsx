import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProduce } from '@/hooks/useProduce';
import { useState } from 'react';

const TraderDashboard = () => {
  const { produce: availableProduce, loading } = useProduce({ 
    intent: 'supply', 
    status: 'available' 
  });
  
  const [selectedType, setSelectedType] = useState('');
  
  const filteredProduce = selectedType 
    ? availableProduce.filter(p => p.type === selectedType)
    : availableProduce;

  const stats = {
    availableSupplies: availableProduce.length,
    uniqueTypes: [...new Set(availableProduce.map(p => p.type))].length,
    averagePrice: availableProduce.length > 0 
      ? Math.round(availableProduce.reduce((sum, p) => sum + (p.pricePerUnit || 0), 0) / availableProduce.length)
      : 0,
    totalQuantity: availableProduce.reduce((sum, p) => sum + p.quantity.amount, 0)
  };

  return (
    <DashboardLayout title="Trader Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Available Supplies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">{stats.availableSupplies}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Produce Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.uniqueTypes}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avg. Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">KES {stats.averagePrice}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Quantity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.totalQuantity} kg</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Available Produce */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Available Produce</CardTitle>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">All Types</option>
                  <option value="avocado">Avocado</option>
                  <option value="maize">Maize</option>
                  <option value="banana">Banana</option>
                  <option value="kales">Kales</option>
                  <option value="spinach">Spinach</option>
                  <option value="carrots">Carrots</option>
                </select>
                <Button variant="outline" className="text-vunahub-600 border-vunahub-600">
                  Refresh
                </Button>
              </div>
            </div>
            <CardDescription>
              Browse and connect with farmers offering produce
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading available produce...</div>
            ) : filteredProduce.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No produce available matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProduce.map((item) => (
                  <div key={item._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold capitalize text-lg">{item.type}</h4>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {item.quality}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Quantity:</strong> {item.quantity.amount} {item.quantity.unit}</p>
                      <p><strong>Price:</strong> KES {item.pricePerUnit || 0} per {item.quantity.unit}</p>
                      <p><strong>Location:</strong> {item.locationName || 'Not specified'}</p>
                      <p><strong>Farmer:</strong> {item.user?.name || 'Unknown'}</p>
                      {item.notes && <p><strong>Notes:</strong> {item.notes}</p>}
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-vunahub-600 hover:bg-vunahub-700 text-white"
                      >
                        Contact Farmer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 border-vunahub-600 text-vunahub-600"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default TraderDashboard;