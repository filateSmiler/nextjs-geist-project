import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In production, this would be replaced with a database
let orders: Order[] = [];

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.table_id || !body.order || !Array.isArray(body.order)) {
      return NextResponse.json(
        { error: 'Missing required fields: table_id and order array' },
        { status: 400 }
      );
    }

    // Validate order items
    for (const item of body.order) {
      if (!item.item || typeof item.qty !== 'number' || item.qty <= 0) {
        return NextResponse.json(
          { error: 'Invalid order item format' },
          { status: 400 }
        );
      }
    }

    // Calculate total
    const total = body.order.reduce((sum: number, item: OrderItem) => sum + (item.price * item.qty), 0);

    // Create new order
    const newOrder: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      table_id: body.table_id,
      order: body.order,
      special_instructions: body.special_instructions || '',
      status: 'pending',
      timestamp: new Date().toISOString(),
      total: total
    };

    // Add to orders array
    orders.push(newOrder);

    return NextResponse.json({
      success: true,
      order_id: newOrder.id,
      message: 'Order placed successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Sort orders by timestamp (newest first)
    const sortedOrders = orders.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      orders: sortedOrders,
      count: orders.length
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.order_id || !body.status) {
      return NextResponse.json(
        { error: 'Missing required fields: order_id and status' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'preparing', 'ready', 'served'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    // Find and update order
    const orderIndex = orders.findIndex(order => order.id === body.order_id);
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    orders[orderIndex].status = body.status;

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      order: orders[orderIndex]
    });

  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
