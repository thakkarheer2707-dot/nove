"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  ChevronRight, 
  Search, 
  RefreshCcw, 
  Clock, 
  CreditCard, 
  Truck,
  ArrowLeft,
  X,
  CheckCircle,
  XCircle,
  MapPin,
  Mail,
  Phone,
  User as UserIcon,
  Package,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  name: string;
  color: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  customerEmail: string;
  date: string;
  total: number;
  items: OrderItem[];
  status: string;
  paymentMethod: string;
  shippingAddress?: {
    street: string;
    city: string;
    pincode: string;
    phone?: string;
  };
  // Snake case versions for direct access if mapping fails
  customer_email?: string;
  payment_method?: string;
  shipping_address?: any;
}

interface Stats {
  totalRevenue: number;
  orderCount: number;
  codOrders: number;
  onlineOrders: number;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        // Robust mapping of snake_case to camelCase
        const formattedOrders = (data.orders || []).map((o: any) => {
          const shippingData = o.shipping_address || o.shippingAddress;
          return {
            ...o,
            customerEmail: o.customer_email || o.customerEmail || "No Email",
            paymentMethod: o.payment_method || o.paymentMethod || "Unknown",
            shippingAddress: typeof shippingData === 'string' ? JSON.parse(shippingData) : shippingData,
          };
        });
        setOrders(formattedOrders);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedAdmin = localStorage.getItem("nove_admin");
    if (!savedAdmin) {
      router.push("/login");
      return;
    }
    setAdmin(JSON.parse(savedAdmin));
    fetchData();
  }, [router]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, newStatus }),
      });
      if (res.ok) {
        fetchData(); // Refresh list
        if (selectedOrder && selectedOrder.id === orderId) {
           setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nove_admin");
    router.push("/login");
  };

  const filteredOrders = orders.filter(order => {
    const search = searchTerm.toLowerCase().replace('#', '');
    const idMatch = (order.id || "").toLowerCase().includes(search);
    const emailMatch = (order.customerEmail || "").toLowerCase().includes(search);
    const cityMatch = (order.shippingAddress?.city || "").toLowerCase().includes(search);
    const phoneMatch = (order.shippingAddress?.phone || "").toLowerCase().includes(search);
    
    return idMatch || emailMatch || cityMatch || phoneMatch;
  });

  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Declined"];

  if (!admin) return null;

  // Helper to get nested value safely
  const getEmail = (o: Order) => o.customerEmail || o.customer_email || "No Email";
  const getPhone = (o: Order) => o.shippingAddress?.phone || o.shipping_address?.phone || "Not Provided";
  const getAddress = (o: Order) => {
    const addr = o.shippingAddress || o.shipping_address;
    if (!addr || (!addr.street && !addr.city)) return null;
    return addr;
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] pt-24 pb-20 px-6 font-sans relative selection:bg-black selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-2">
               <Link href="/store" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-all shadow-sm">
                  <ArrowLeft size={18} />
               </Link>
               <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">Enterprise Console</h1>
            </div>
            <p className="text-gray-500 font-medium">Logged in as {admin.name}</p>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-black transition-all w-64 md:w-80 shadow-sm"
              />
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest shadow-sm"
            >
              Sign Out
            </button>
            <button 
              onClick={fetchData}
              className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {[
             { label: "Total Revenue", value: `₹${stats?.totalRevenue.toLocaleString() || 0}`, sub: "GROSS SALES", icon: IndianRupee, color: "text-[#1d1d1f]", bg: "bg-white" },
             { label: "Acquisitions", value: stats?.orderCount || 0, sub: "LIFETIME ORDERS", icon: ShoppingBag, color: "text-[#1d1d1f]", bg: "bg-white" },
             { label: "COD Pending", value: stats?.codOrders || 0, sub: "CASH ON DELIVERY", icon: Truck, color: "text-[#1d1d1f]", bg: "bg-white" },
             { label: "Online Paid", value: stats?.onlineOrders || 0, sub: "SECURE PAYMENTS", icon: CreditCard, color: "text-[#1d1d1f]", bg: "bg-white" },
           ].map((stat, i) => (
             <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.bg} border border-gray-200 rounded-[32px] p-8 flex flex-col items-start shadow-sm`}
             >
                <div className={`p-3 bg-gray-50 rounded-2xl mb-6 ${stat.color}`}>
                   <stat.icon size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">{stat.label}</h3>
                <div className="text-3xl font-bold tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 font-bold tracking-widest uppercase">
                  {stat.sub}
                </div>
             </motion.div>
           ))}
        </div>

        {/* Main Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-[40px] overflow-hidden shadow-sm"
        >
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
             <h2 className="text-2xl font-bold">Order Queue</h2>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Live Data Stream</span>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  <th className="px-8 py-6">Reference</th>
                  <th className="px-8 py-6">Customer & Destination</th>
                  <th className="px-8 py-6">Method</th>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6">Amount</th>
                  <th className="px-8 py-6">Current Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                         <div className="w-8 h-8 border-2 border-gray-100 border-t-black rounded-full animate-spin" />
                         <p className="text-sm text-gray-400 font-medium">Synchronizing enterprise data...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="group hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedOrder(order)}>
                      <td className="px-8 py-6">
                        <span className="font-mono text-sm font-bold text-[#1d1d1f]">#{order.id.slice(-6).toUpperCase()}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold mb-1">{getEmail(order)}</div>
                        <div className="text-[11px] text-gray-500 font-medium leading-snug max-w-[200px]">
                           {getAddress(order) ? (
                             <>
                               {getAddress(order).street}, {getAddress(order).city} - {getAddress(order).pincode}
                             </>
                           ) : (
                             <span className="text-gray-400 italic">No physical address</span>
                           )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                          {order.paymentMethod === 'Online' || (order as any).payment_method === 'Online' ? <CreditCard size={14} className="text-purple-600" /> : <Truck size={14} className="text-blue-600" />}
                          <span>{order.paymentMethod || (order as any).payment_method}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                           <Clock size={12} /> {order.date}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-lg font-bold tracking-tighter">₹{order.total.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}>
                         <select 
                           value={order.status}
                           onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                           className={`bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-black transition-all ${
                              order.status === 'Delivered' ? 'text-green-600' : 
                              order.status === 'Shipped' ? 'text-blue-600' : 
                              order.status === 'Declined' ? 'text-red-600' :
                              'text-orange-600'
                           }`}
                         >
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                          className="px-5 py-2 bg-[#1d1d1f] text-white rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-black transition-all shadow-sm active:scale-95"
                        >
                           Review
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center text-gray-400 font-medium">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-gray-200 rounded-[40px] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Order Details</h2>
                  <p className="text-gray-400 text-xs font-bold font-mono tracking-widest uppercase">#{selectedOrder.id.slice(-8).toUpperCase()}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-10 h-10 bg-gray-50 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 flex items-center justify-center transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-10 overflow-y-auto">
                
                {/* Customer Details */}
                <div>
                   <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6 flex items-center gap-2">
                     <UserIcon size={14} /> Customer Information
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                      <div>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Email Address</p>
                        <p className="text-[#1d1d1f] font-bold flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {getEmail(selectedOrder)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Contact Number</p>
                        <p className="text-[#1d1d1f] font-bold flex items-center gap-2"><Phone size={16} className="text-gray-400"/> {getPhone(selectedOrder)}</p>
                      </div>
                      <div className="md:col-span-2 pt-4 border-t border-gray-200/50 mt-2">
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-3">Delivery Destination</p>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                            <MapPin size={20} />
                          </div>
                          {getAddress(selectedOrder) ? (
                            <p className="text-[#1d1d1f] font-bold leading-relaxed pt-1">
                              {getAddress(selectedOrder).street}<br/>
                              {getAddress(selectedOrder).city} - {getAddress(selectedOrder).pincode}
                            </p>
                          ) : (
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3 text-orange-700 w-full">
                               <AlertCircle size={18} />
                               <span className="font-bold text-sm">No physical delivery address provided for this order.</span>
                            </div>
                          )}
                        </div>
                      </div>
                   </div>
                </div>

                {/* Order Items */}
                <div>
                   <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6 flex items-center gap-2">
                     <Package size={14} /> Artisan Selections
                   </h3>
                   <div className="space-y-4">
                     {(selectedOrder.items || []).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                           <div className="flex items-center gap-6">
                              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 p-3">
                                 {item.image ? (
                                   <div className="relative w-full h-full">
                                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                                   </div>
                                 ) : (
                                   <ShoppingBag size={24} className="text-gray-300" />
                                 )}
                              </div>
                              <div>
                                 <h4 className="text-[#1d1d1f] font-bold text-lg">{item.name}</h4>
                                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Variant: {item.color}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[#1d1d1f] font-bold text-xl tracking-tighter">₹{item.price.toLocaleString()}</p>
                              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                           </div>
                        </div>
                     ))}
                   </div>
                   
                   {/* Summary */}
                   <div className="flex justify-end mt-10">
                      <div className="w-72 space-y-4">
                         <div className="flex justify-between text-sm font-bold">
                           <span className="text-gray-400 uppercase tracking-widest text-[10px]">Method</span>
                           <span className="text-[#1d1d1f]">{selectedOrder.paymentMethod || (selectedOrder as any).payment_method}</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold">
                           <span className="text-gray-400 uppercase tracking-widest text-[10px]">Status</span>
                           <span className="text-[#1d1d1f]">{selectedOrder.status || "Pending"}</span>
                         </div>
                         <div className="h-px w-full bg-gray-100 my-2"></div>
                         <div className="flex justify-between items-center">
                           <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total</span>
                           <span className="text-3xl font-bold text-[#1d1d1f] tracking-tighter">₹{selectedOrder.total.toLocaleString()}</span>
                         </div>
                      </div>
                   </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-4">
                 {selectedOrder.status === 'Declined' ? (
                   <div className="flex-1 text-red-600 text-sm font-bold flex items-center gap-2">
                     <XCircle size={18} /> Order has been declined
                   </div>
                 ) : selectedOrder.status === 'Pending' || selectedOrder.status === 'Processing' ? (
                   <>
                     <button 
                       onClick={() => {
                         handleUpdateStatus(selectedOrder.id, 'Declined');
                         setSelectedOrder(null);
                       }}
                       className="px-8 py-4 rounded-full border border-gray-200 bg-white text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-sm"
                     >
                       <XCircle size={16} /> Decline
                     </button>
                     <button 
                       onClick={() => {
                         handleUpdateStatus(selectedOrder.id, 'Shipped');
                         setSelectedOrder(null);
                       }}
                       className="px-10 py-4 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-all text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-black/10"
                     >
                       <CheckCircle size={16} /> Accept & Ship Order
                     </button>
                   </>
                 ) : (
                   <div className="flex-1 text-green-600 text-sm font-bold flex items-center gap-2">
                     <CheckCircle size={18} /> Order is currently {selectedOrder.status}
                   </div>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
