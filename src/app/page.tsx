import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Restaurant Digital Menu Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern QR code-based ordering system for restaurants. Customers scan, browse, and order directly from their phones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Customer Menu</CardTitle>
              <CardDescription>
                Browse our delicious menu and place orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu?table=Table_1">
                <Button className="w-full">View Menu</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Kitchen Dashboard</CardTitle>
              <CardDescription>
                Real-time order management for staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/kitchen">
                <Button className="w-full" variant="outline">Kitchen View</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>QR Code Generator</CardTitle>
              <CardDescription>
                Generate QR codes for table ordering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/qr">
                <Button className="w-full" variant="secondary">Generate QR</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Scan QR Code</h3>
              <p className="text-sm text-gray-600">Customer scans QR code at their table</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Browse Menu</h3>
              <p className="text-sm text-gray-600">View menu items with descriptions and prices</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Place Order</h3>
              <p className="text-sm text-gray-600">Add items to cart and submit order</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h3 className="font-medium mb-2">Receive Food</h3>
              <p className="text-sm text-gray-600">Kitchen prepares and delivers to table</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
