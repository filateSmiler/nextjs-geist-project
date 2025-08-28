"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  item: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  table_id: string;
  order: OrderItem[];
  special_instructions?: string;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timestamp: string;
  total: number;
}

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/order');
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data.orders || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    
    try {
      const response = await fetch('/api/order', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          status: newStatus
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the local state
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus as any } : order
        ));
      } else {
        setError(data.error || 'Failed to update order status');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Poll for new orders every 10 seconds
    const interval = setInterval(fetchOrders, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'served':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusOptions = (currentStatus: string) => {
    const allStatuses = ['pending', 'preparing', 'ready', 'served'];
    const currentIndex = allStatuses.indexOf(currentStatus);
    
    // Allow moving to next status or staying at current
    return allStatuses.slice(currentIndex);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getTimeElapsed = (timestamp: string) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    return `${diffInMinutes} minutes ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h1>
              <p className="text-gray-600">Real-time order management</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={fetchOrders} variant="outline">
                Refresh Orders
              </Button>
              <div className="text-sm text-gray-600">
                {orders.length} total orders
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Orders will appear here as customers place them</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.table_id}</CardTitle>
                      <CardDescription>
                        {formatTime(order.timestamp)} • {getTimeElapsed(order.timestamp)}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">Order Items:</h4>
                    {order.order.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.qty}x {item.item}</span>
                        <span className="text-gray-600">UGX {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Special Instructions */}
                  {order.special_instructions && (
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm text-gray-700">Special Instructions:</h4>
                      <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                        {order.special_instructions}
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between items-center font-medium">
                    <span>Total:</span>
                    <span>UGX {order.total.toLocaleString()}</span>
                  </div>

                  <Separator />

                  {/* Status Update */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Update Status:</label>
                    <Select
                      value={order.status}
                      onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                      disabled={updatingStatus === order.id}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getStatusOptions(order.status).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {updatingStatus === order.id && (
                      <p className="text-xs text-gray-500">Updating status...</p>
                    )}
                  </div>

                  {/* Order ID */}
                  <div className="text-xs text-gray-400 font-mono">
                    ID: {order.id}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Statistics */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['pending', 'preparing', 'ready', 'served'].map((status) => {
              const count = orders.filter(order => order.status === status).length;
              return (
                <Card key={status}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-sm text-gray-600 capitalize">{status}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
