"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface OrderItem {
  item: string;
  qty: number;
  price: number;
}

const menuData: MenuItem[] = [
  // Starters
  {
    id: "1",
    name: "Grilled Chicken Wings",
    description: "Juicy chicken wings marinated in herbs and spices, grilled to perfection",
    price: 15000,
    category: "starters",
    image: "https://placehold.co/400x300?text=Golden+crispy+grilled+chicken+wings+with+charred+grill+marks+garnished+with+fresh+herbs+parsley+and+lemon+wedges+on+white+plate"
  },
  {
    id: "2",
    name: "Spring Rolls",
    description: "Crispy vegetable spring rolls served with sweet chili sauce",
    price: 8000,
    category: "starters",
    image: "https://placehold.co/400x300?text=Golden+brown+crispy+spring+rolls+cut+diagonally+showing+colorful+vegetable+filling+with+red+sweet+chili+dipping+sauce+in+small+bowl"
  },
  {
    id: "3",
    name: "Samosas",
    description: "Traditional pastries filled with spiced vegetables or meat",
    price: 5000,
    category: "starters",
    image: "https://placehold.co/400x300?text=Triangle+shaped+golden+brown+samosas+with+flaky+pastry+texture+arranged+on+banana+leaf+with+mint+chutney+and+sliced+onions"
  },

  // Mains
  {
    id: "4",
    name: "Grilled Tilapia",
    description: "Fresh tilapia grilled with lemon and herbs, served with rice and vegetables",
    price: 25000,
    category: "mains",
    image: "https://placehold.co/400x300?text=Perfectly+grilled+whole+tilapia+fish+with+lemon+slices+and+fresh+herbs+served+with+white+rice+and+colorful+steamed+vegetables+on+elegant+plate"
  },
  {
    id: "5",
    name: "Beef Stew",
    description: "Tender beef slow-cooked with local spices, served with posho or rice",
    price: 20000,
    category: "mains",
    image: "https://placehold.co/400x300?text=Rich+brown+beef+stew+with+tender+meat+chunks+in+thick+gravy+served+with+white+posho+and+steamed+rice+garnished+with+fresh+cilantro"
  },
  {
    id: "6",
    name: "Chicken Curry",
    description: "Aromatic chicken curry with coconut milk and spices",
    price: 18000,
    category: "mains",
    image: "https://placehold.co/400x300?text=Creamy+orange+chicken+curry+with+tender+pieces+in+coconut+milk+sauce+garnished+with+fresh+cilantro+and+red+chili+slices+with+basmati+rice"
  },
  {
    id: "7",
    name: "Vegetarian Pasta",
    description: "Fresh pasta with seasonal vegetables in tomato basil sauce",
    price: 16000,
    category: "mains",
    image: "https://placehold.co/400x300?text=Colorful+penne+pasta+with+fresh+zucchini+bell+peppers+cherry+tomatoes+in+rich+red+tomato+basil+sauce+topped+with+fresh+basil+leaves"
  },

  // Drinks
  {
    id: "8",
    name: "Passion Juice",
    description: "Fresh passion fruit juice, naturally sweet and refreshing",
    price: 6000,
    category: "drinks",
    image: "https://placehold.co/400x300?text=Tall+glass+of+golden+yellow+passion+fruit+juice+with+visible+black+seeds+garnished+with+mint+leaves+and+passion+fruit+half+with+ice+cubes"
  },
  {
    id: "9",
    name: "Mango Smoothie",
    description: "Creamy mango smoothie made with fresh mangoes and yogurt",
    price: 8000,
    category: "drinks",
    image: "https://placehold.co/400x300?text=Thick+creamy+orange+mango+smoothie+in+tall+glass+topped+with+whipped+cream+fresh+mango+chunks+and+mint+garnish+with+colorful+straw"
  },
  {
    id: "10",
    name: "Coffee",
    description: "Freshly brewed Ugandan coffee, served hot",
    price: 4000,
    category: "drinks",
    image: "https://placehold.co/400x300?text=Steaming+hot+black+coffee+in+white+ceramic+cup+and+saucer+with+coffee+beans+scattered+around+and+rising+steam+wisps+on+wooden+table"
  },
  {
    id: "11",
    name: "Soda",
    description: "Assorted soft drinks - Coca Cola, Fanta, Sprite",
    price: 3000,
    category: "drinks",
    image: "https://placehold.co/400x300?text=Three+colorful+soda+bottles+Coca+Cola+orange+Fanta+and+clear+Sprite+with+condensation+drops+and+ice+cubes+in+glasses+with+straws"
  },

  // Desserts
  {
    id: "12",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with creamy frosting",
    price: 12000,
    category: "desserts",
    image: "https://placehold.co/400x300?text=Decadent+slice+of+dark+chocolate+layer+cake+with+rich+chocolate+frosting+drizzled+with+chocolate+sauce+and+fresh+strawberry+garnish+on+white+plate"
  },
  {
    id: "13",
    name: "Fruit Salad",
    description: "Fresh seasonal fruits with honey dressing",
    price: 8000,
    category: "desserts",
    image: "https://placehold.co/400x300?text=Colorful+fresh+fruit+salad+with+diced+pineapple+mango+watermelon+grapes+and+berries+drizzled+with+golden+honey+in+clear+glass+bowl"
  },
  {
    id: "14",
    name: "Ice Cream",
    description: "Vanilla, chocolate, or strawberry ice cream",
    price: 6000,
    category: "desserts",
    image: "https://placehold.co/400x300?text=Three+scoops+of+ice+cream+vanilla+chocolate+and+pink+strawberry+in+waffle+cone+with+colorful+sprinkles+and+cherry+on+top+melting+slightly"
  }
];

export default function MenuPage() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get('table') || 'Unknown Table';
  
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    { id: 'starters', name: 'Starters', emoji: '🥗' },
    { id: 'mains', name: 'Main Dishes', emoji: '🍽️' },
    { id: 'drinks', name: 'Drinks', emoji: '🥤' },
    { id: 'desserts', name: 'Desserts', emoji: '🍰' }
  ];

  const addToCart = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item === item.name);
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].qty += qty;
      setCart(updatedCart);
    } else {
      setCart([...cart, { item: item.name, qty, price: item.price }]);
    }
    
    // Reset quantity for this item
    setQuantities({ ...quantities, [item.id]: 1 });
  };

  const removeFromCart = (itemName: string) => {
    setCart(cart.filter(item => item.item !== itemName));
  };

  const updateCartQuantity = (itemName: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemName);
      return;
    }
    
    const updatedCart = cart.map(item => 
      item.item === itemName ? { ...item, qty: newQty } : item
    );
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      setErrorMessage('Please add items to your order');
      setOrderStatus('error');
      return;
    }

    setIsSubmitting(true);
    setOrderStatus('idle');

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table_id: tableId,
          order: cart,
          special_instructions: specialInstructions
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderStatus('success');
        setCart([]);
        setSpecialInstructions('');
        setQuantities({});
      } else {
        setErrorMessage(data.error || 'Failed to place order');
        setOrderStatus('error');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setOrderStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://placehold.co/400x300?text=Menu+Item+Image';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digital Menu</h1>
              <p className="text-gray-600">{tableId}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="relative">
                  View Cart
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500">
                      {cart.reduce((sum, item) => sum + item.qty, 0)}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Your Order</DialogTitle>
                  <DialogDescription>
                    Review your items before placing the order
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div className="flex-1">
                            <p className="font-medium">{item.item}</p>
                            <p className="text-sm text-gray-600">UGX {item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCartQuantity(item.item, item.qty - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.qty}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCartQuantity(item.item, item.qty + 1)}
                            >
                              +
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFromCart(item.item)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Total:</span>
                          <span>UGX {getTotalPrice().toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Special Instructions (Optional)</label>
                        <Textarea
                          placeholder="Any special requests or dietary requirements..."
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                        />
                      </div>

                      {orderStatus === 'success' && (
                        <div className="p-3 bg-green-100 text-green-800 rounded">
                          Order placed successfully! Your food will be prepared shortly.
                        </div>
                      )}

                      {orderStatus === 'error' && (
                        <div className="p-3 bg-red-100 text-red-800 rounded">
                          {errorMessage}
                        </div>
                      )}

                      <Button
                        onClick={submitOrder}
                        disabled={isSubmitting || cart.length === 0}
                        className="w-full"
                      >
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                      </Button>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="starters" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm">
                <span className="mr-1">{category.emoji}</span>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {menuData
                  .filter(item => item.category === category.id)
                  .map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <Badge variant="secondary">UGX {item.price.toLocaleString()}</Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setQuantities({
                                ...quantities,
                                [item.id]: Math.max(1, (quantities[item.id] || 1) - 1)
                              })}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {quantities[item.id] || 1}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setQuantities({
                                ...quantities,
                                [item.id]: (quantities[item.id] || 1) + 1
                              })}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            onClick={() => addToCart(item)}
                            className="flex-1"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
