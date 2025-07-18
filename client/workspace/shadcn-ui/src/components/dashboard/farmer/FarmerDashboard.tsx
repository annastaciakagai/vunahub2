import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProduce } from '@/hooks/useProduce';
import { getUserInfo } from '@/utils/auth';
import { useState } from 'react';
import { ProduceItem } from '@/services/produceService';

const FarmerDashboard = () => {
  const userInfo = getUserInfo();
  const { produce, loading, createProduce } = useProduce({ 
    user: userInfo?.id, 
    intent: 'supply' 
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduce, setNewProduce] = useState({
    type: '',
    quantity: { amount: 0, unit: 'kg' },
    quality: 'Unsorted',
    pricePerUnit: 0,
    notes: '',
    locationName: userInfo?.locationName || ''
  });

  const handleAddProduce = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduce({
        ...newProduce,
        intent: 'supply'
      });
      setShowAddForm(false);
      setNewProduce({
        type: '',
        quantity: { amount: 0, unit: 'kg' },
        quality: 'Unsorted',
        pricePerUnit: 0,
        notes: '',
        locationName: userInfo?.locationName || ''
      });
    } catch (error) {
      console.error('Failed to add produce:', error);
    }
  };

  const stats = {
    totalListings: produce.length,
    availableListings: produce.filter(p => p.status === 'available').length,
    collectedListings: produce.filter(p => p.status === 'collected').length,
    soldListings: produce.filter(p => p.status === 'sold').length
  };

  return (
    <DashboardLayout title="Farmer Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">{stats.totalListings}</div>
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
              <CardTitle className="text-lg font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.availableListings}</div>
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
              <CardTitle className="text-lg font-medium">Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.collectedListings}</div>
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
              <CardTitle className="text-lg font-medium">Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.soldListings}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* My Produce Listings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Produce Listings</CardTitle>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-vunahub-600 hover:bg-vunahub-700 text-white"
              >
                Add New Listing
              </Button>
            </div>
            <CardDescription>
              Manage your produce listings and track their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : produce.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No produce listings yet. Add your first listing to get started!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Quantity</th>
                      <th className="pb-2 font-medium">Quality</th>
                      <th className="pb-2 font-medium">Price/Unit</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produce.map((item, index) => (
                      <tr key={item._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <td className="py-3 capitalize">{item.type}</td>
                        <td className="py-3">{item.quantity.amount} {item.quantity.unit}</td>
                        <td className="py-3">{item.quality}</td>
                        <td className="py-3">KES {item.pricePerUnit || 0}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === 'available' ? 'bg-green-100 text-green-800' :
                            item.status === 'collected' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'sold' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Produce Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Produce Listing</h3>
            <form onSubmit={handleAddProduce} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Produce Type</label>
                <select
                  value={newProduce.type}
                  onChange={(e) => setNewProduce(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full border rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select type</option>
                  <option value="avocado">Avocado</option>
                  <option value="maize">Maize</option>
                  <option value="banana">Banana</option>
                  <option value="kales">Kales</option>
                  <option value="spinach">Spinach</option>
                  <option value="carrots">Carrots</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    value={newProduce.quantity.amount}
                    onChange={(e) => setNewProduce(prev => ({ 
                      ...prev, 
                      quantity: { ...prev.quantity, amount: Number(e.target.value) }
                    }))}
                    className="w-full border rounded-md px-3 py-2"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unit</label>
                  <select
                    value={newProduce.quantity.unit}
                    onChange={(e) => setNewProduce(prev => ({ 
                      ...prev, 
                      quantity: { ...prev.quantity, unit: e.target.value }
                    }))}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="kg">Kg</option>
                    <option value="bags">Bags</option>
                    <option value="crates">Crates</option>
                    <option value="litres">Litres</option>
                    <option value="units">Units</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price per Unit (KES)</label>
                <input
                  type="number"
                  value={newProduce.pricePerUnit}
                  onChange={(e) => setNewProduce(prev => ({ ...prev, pricePerUnit: Number(e.target.value) }))}
                  className="w-full border rounded-md px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quality</label>
                <select
                  value={newProduce.quality}
                  onChange={(e) => setNewProduce(prev => ({ ...prev, quality: e.target.value }))}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="A">Grade A</option>
                  <option value="B">Grade B</option>
                  <option value="C">Grade C</option>
                  <option value="Unsorted">Unsorted</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                <textarea
                  value={newProduce.notes}
                  onChange={(e) => setNewProduce(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full border rounded-md px-3 py-2"
                  rows={3}
                  maxLength={200}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-vunahub-600 hover:bg-vunahub-700 text-white"
                >
                  Add Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FarmerDashboard;