"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  IndianRupee, 
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
  AlertCircle,
  TrendingUp,
  Sliders
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
        fetchData();
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

  const getEmail = (o: Order) => o.customerEmail || o.customer_email || "No Email";
  const getPhone = (o: Order) => o.shippingAddress?.phone || o.shipping_address?.phone || "Not Provided";
  const getAddress = (o: Order) => {
    const addr = o.shippingAddress || o.shipping_address;
    if (!addr || (!addr.street && !addr.city)) return null;
    return addr;
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fbfbfd] via-[#f7f7fa] to-[#f0eef5] text-[#1d1d1f] pt-28 pb-20 px-6 font-sans relative selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-200/10 via-amber-200/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-100px] w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/10 via-blue-200/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Luxury Glassmorphic Header */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px_16px_32px_16px] p-6 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            <Link 
              href="/store" 
              className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-black hover:border-black hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <Sliders size={20} className="text-gray-400" />
                <h1 className="text-2xl md:text-3xl font-serif tracking-[0.05em] text-[#1d1d1f] font-medium">Enterprise Console</h1>
              </div>
              <p className="text-gray-500 text-xs mt-1 font-medium tracking-[0.02em]">
                Active Session: <span className="text-black font-semibold">{admin.name}</span>
              </p>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-black focus:shadow-md transition-all duration-300 w-full sm:w-72 shadow-sm"
              />
            </div>
            
            <button 
              onClick={fetchData}
              className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 hover:shadow-md active:scale-95 transition-all duration-300 flex items-center justify-center shadow-sm"
              title="Refresh Stream"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin text-black" : "text-gray-500"} />
            </button>

            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-black hover:bg-neutral-800 text-white rounded-2xl hover:shadow-lg active:scale-95 transition-all duration-300 text-xs font-bold uppercase tracking-widest"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dynamic Organic Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { 
              label: "Gross Sales", 
              value: `₹${stats?.totalRevenue.toLocaleString() || 0}`, 
              sub: "TOTAL REVENUE", 
              icon: IndianRupee, 
              color: "text-amber-800",
              bg: "bg-gradient-to-br from-[#fffdfa]/80 via-[#fdf2e4]/60 to-[#fbf7f0]/80",
              border: "border-amber-100/50",
              shadow: "shadow-amber-100/10"
            },
            { 
              label: "Acquisitions", 
              value: stats?.orderCount || 0, 
              sub: "LIFETIME ORDERS", 
              icon: ShoppingBag, 
              color: "text-rose-800", 
              bg: "bg-gradient-to-br from-[#fffbfc]/80 via-[#fdebeb]/60 to-[#fbf7f9]/80",
              border: "border-rose-100/50",
              shadow: "shadow-rose-100/10"
            },
            { 
              label: "COD Pending", 
              value: stats?.codOrders || 0, 
              sub: "DELIVERY IN PROGRESS", 
              icon: Truck, 
              color: "text-blue-800", 
              bg: "bg-gradient-to-br from-[#f8fbff]/80 via-[#edf4ff]/60 to-[#f6f9ff]/80",
              border: "border-blue-100/50",
              shadow: "shadow-blue-100/10"
            },
            { 
              label: "Online Secure", 
              value: stats?.onlineOrders || 0, 
              sub: "PREPAID ACQUISITIONS", 
              icon: CreditCard, 
              color: "text-purple-800", 
              bg: "bg-gradient-to-br from-[#faf8ff]/80 via-[#f3ecff]/60 to-[#f9f6ff]/80",
              border: "border-purple-100/50",
              shadow: "shadow-purple-100/10"
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`${stat.bg} ${stat.border} border shadow-lg ${stat.shadow} rounded-[28px_14px_36px_14px] p-4 sm:p-6 lg:p-8 flex flex-col items-start backdrop-blur-sm transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Inner ambient shine */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className={`p-3 sm:p-4 bg-white/90 border border-white/80 rounded-2xl mb-4 sm:mb-6 shadow-sm ${stat.color} transition-transform duration-500 group-hover:scale-110`}>
                <stat.icon size={20} className="w-5 h-5" />
              </div>
              
              <h3 className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1 line-clamp-1">{stat.label}</h3>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2 text-neutral-800 font-serif line-clamp-1">{stat.value}</div>
              
              <div className="text-[8px] sm:text-[9px] bg-white/60 border border-white/40 px-2 sm:px-2.5 py-1 rounded-full text-neutral-500 font-bold tracking-wider uppercase mt-auto">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/85 border border-white/60 rounded-[48px_24px_64px_24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)] backdrop-blur-md"
        >
          <div className="p-8 border-b border-gray-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-white/50 to-transparent">
            <div>
              <h2 className="text-2xl font-serif tracking-[0.03em] font-medium">Order Queue</h2>
              <p className="text-xs text-gray-400 mt-1">Manage, verify, and update active buyer orders</p>
            </div>
            
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100/60 px-3.5 py-1.5 rounded-2xl w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] text-emerald-800 uppercase tracking-widest font-extrabold">Live sync active</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-neutral-400 uppercase tracking-widest font-bold bg-neutral-50/20">
                  <th className="px-8 py-5">Reference</th>
                  <th className="px-8 py-5">Customer Details</th>
                  <th className="px-8 py-5">Method</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-3 border-gray-100 border-t-black rounded-full animate-spin" />
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Synchronizing secure records...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="group hover:bg-neutral-50/40 transition-all duration-300 cursor-pointer" 
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-8 py-6">
                        <span className="font-mono text-sm font-bold text-neutral-700 bg-neutral-100/50 border border-neutral-200/30 px-3 py-1 rounded-xl group-hover:bg-black group-hover:text-white transition-colors duration-300">
                          #{order.id.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold text-neutral-800 mb-1">{getEmail(order)}</div>
                        <div className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[220px] truncate">
                          {getAddress(order) ? (
                            <span>{getAddress(order).street}, {getAddress(order).city}</span>
                          ) : (
                            <span className="text-gray-400 italic">No destination address</span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-white border border-gray-100 rounded-xl px-3 py-1.5 w-fit shadow-sm">
                          {order.paymentMethod === 'Online' || (order as any).payment_method === 'Online' ? (
                            <>
                              <CreditCard size={13} className="text-purple-600" />
                              <span className="text-purple-700 text-[10px]">Online</span>
                            </>
                          ) : (
                            <>
                              <Truck size={13} className="text-blue-600" />
                              <span className="text-blue-700 text-[10px]">COD</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                          <Clock size={12} className="text-gray-300" /> {order.date}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-lg font-bold tracking-tight text-neutral-800 font-serif">₹{order.total.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}>
                        <select 
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className={`bg-white border border-gray-200 rounded-xl px-3 py-2 text-[10px] uppercase tracking-widest font-extrabold outline-none focus:border-black focus:ring-1 focus:ring-black transition-all cursor-pointer shadow-sm ${
                            order.status === 'Delivered' ? 'text-emerald-600 border-emerald-100 bg-emerald-50/20' : 
                            order.status === 'Shipped' ? 'text-blue-600 border-blue-100 bg-blue-50/20' : 
                            order.status === 'Declined' ? 'text-rose-600 border-rose-100 bg-rose-50/20' :
                            'text-amber-600 border-amber-100 bg-amber-50/20'
                          }`}
                        >
                          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                          className="px-6 py-2 bg-neutral-900 hover:bg-black text-white rounded-xl text-[10px] font-extrabold tracking-widest uppercase hover:shadow-md transition-all duration-300 shadow-sm active:scale-95"
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

      {/* Luxury Responsive Details Drawer Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div 
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-gray-100 rounded-[48px_24px_48px_24px] w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Sticky Glass Modal Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div>
                  <h2 className="text-xl font-serif tracking-[0.02em] font-medium text-neutral-800">Order Verification</h2>
                  <p className="text-gray-400 text-[10px] font-bold font-mono tracking-widest uppercase mt-1">#REF-{selectedOrder.id.slice(-8).toUpperCase()}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-10 h-10 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl text-gray-500 hover:text-black flex items-center justify-center transition-all duration-300"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8 overflow-y-auto">
                
                {/* Customer Section */}
                <div>
                  <h3 className="text-[9px] uppercase tracking-widest text-neutral-400 font-extrabold mb-4 flex items-center gap-2">
                    <UserIcon size={12} className="text-neutral-300" /> Buyer Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50/50 border border-neutral-100 rounded-3xl p-6">
                    <div>
                      <p className="text-gray-400 text-[9px] uppercase tracking-widest font-extrabold mb-1">Email Address</p>
                      <p className="text-neutral-800 font-bold text-sm flex items-center gap-2"><Mail size={14} className="text-neutral-400"/> {getEmail(selectedOrder)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[9px] uppercase tracking-widest font-extrabold mb-1">Contact Number</p>
                      <p className="text-neutral-800 font-bold text-sm flex items-center gap-2"><Phone size={14} className="text-neutral-400"/> {getPhone(selectedOrder)}</p>
                    </div>
                    <div className="md:col-span-2 pt-4 border-t border-neutral-100 mt-2">
                      <p className="text-gray-400 text-[9px] uppercase tracking-widest font-extrabold mb-3">Delivery Destination</p>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/50 flex items-center justify-center text-neutral-400 flex-shrink-0 shadow-sm">
                          <MapPin size={18} />
                        </div>
                        {getAddress(selectedOrder) ? (
                          <p className="text-neutral-800 font-bold leading-relaxed text-xs pt-1">
                            {getAddress(selectedOrder).street}<br/>
                            {getAddress(selectedOrder).city} - {getAddress(selectedOrder).pincode}
                          </p>
                        ) : (
                          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3 text-amber-800 w-full text-xs">
                            <AlertCircle size={16} />
                            <span className="font-bold">No physical shipping address provided (Guest / Direct browsing).</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Section */}
                <div>
                  <h3 className="text-[9px] uppercase tracking-widest text-neutral-400 font-extrabold mb-4 flex items-center gap-2">
                    <Package size={12} className="text-neutral-300" /> Artisan Collections Ordered
                  </h3>
                  <div className="space-y-3">
                    {(selectedOrder.items || []).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-neutral-50 rounded-xl flex items-center justify-center border border-neutral-100 p-2 flex-shrink-0">
                            {item.image ? (
                              <div className="relative w-full h-full">
                                <Image src={item.image} alt={item.name} fill className="object-contain" />
                              </div>
                            ) : (
                              <ShoppingBag size={20} className="text-neutral-300" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-neutral-800 font-bold text-sm">{item.name}</h4>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-extrabold mt-1">Color: {item.color}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-neutral-800 font-bold text-lg font-serif">₹{item.price.toLocaleString()}</p>
                          <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Total Summary */}
                  <div className="flex justify-end mt-8">
                    <div className="w-72 space-y-3.5 bg-neutral-50/50 border border-neutral-100 rounded-3xl p-6">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-neutral-400 uppercase tracking-widest text-[9px]">Method</span>
                        <span className="text-neutral-700">{selectedOrder.paymentMethod || (selectedOrder as any).payment_method}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-neutral-400 uppercase tracking-widest text-[9px]">Status</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-lg font-extrabold uppercase tracking-wider ${
                          selectedOrder.status === 'Delivered' ? 'text-emerald-700 bg-emerald-50' :
                          selectedOrder.status === 'Shipped' ? 'text-blue-700 bg-blue-50' :
                          'text-amber-700 bg-amber-50'
                        }`}>{selectedOrder.status || "Pending"}</span>
                      </div>
                      <div className="h-px w-full bg-neutral-200/50 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Total Gross</span>
                        <span className="text-2xl font-bold text-neutral-800 tracking-tight font-serif">₹{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sticky Action Footer */}
              <div className="p-8 border-t border-gray-100 bg-neutral-50/60 sticky bottom-0 backdrop-blur-md flex items-center justify-end gap-4">
                {selectedOrder.status === 'Declined' ? (
                  <div className="flex-1 text-rose-600 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2">
                    <XCircle size={16} /> Verification declined
                  </div>
                ) : selectedOrder.status === 'Pending' || selectedOrder.status === 'Processing' ? (
                  <>
                    <button 
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, 'Declined');
                        setSelectedOrder(null);
                      }}
                      className="px-6 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 hover:shadow-md transition-all duration-300 text-xs font-bold tracking-widest uppercase flex items-center gap-2 active:scale-95"
                    >
                      <XCircle size={15} /> Decline
                    </button>
                    <button 
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, 'Shipped');
                        setSelectedOrder(null);
                      }}
                      className="px-8 py-3.5 rounded-2xl bg-black hover:bg-neutral-800 text-white hover:shadow-lg transition-all duration-300 text-xs font-bold tracking-widest uppercase flex items-center gap-2 active:scale-95"
                    >
                      <CheckCircle size={15} /> Ship Package
                    </button>
                  </>
                ) : (
                  <div className="flex-1 text-emerald-600 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle size={16} /> Package marked as {selectedOrder.status}
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
