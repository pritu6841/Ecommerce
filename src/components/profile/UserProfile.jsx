"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { User, Package, Heart, CreditCard, LogOut, Edit, Camera, MapPin, Mail, Phone } from "lucide-react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"

// Sample user data
const userData = {
  id: 1,
  name: "Peter Parker",
  email: "peter.parker@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://tse2.mm.bing.net/th?id=OIP.wimm5qxWNiF6qsr1GIImYgHaHa&pid=Api&P=0&h=180",
  addresses: [
    {
      id: 1,
      type: "Home",
      address: "20 Ingram Street, Queens",
      city: "New York",
      state: "NY",
      zipCode: "11375",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "Daily Bugle, 39th Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: false,
    },
  ],
}

// Sample orders data
const ordersData = [
  {
    id: "ORD123456",
    date: "2023-10-15",
    status: "Delivered",
    total: 1698,
    items: [
      {
        id: 1,
        name: "Spider-Man: Web Slinger Graphic Tee",
        price: 799,
        image: "https://m.media-amazon.com/images/I/B1OGJ8t+8ZS._CLa%7C2140%2C2000%7C91bGKdIRROL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX342_SY445_.png",
        quantity: 1,
      },
      {
        id: 2,
        name: "Batman: Dark Knight Oversized Tee",
        price: 899,
        image: "https://images.bewakoof.com/original/men-s-navy-blue-the-dark-knight-graphic-printed-oversized-t-shirt-592058-1731661124-1.jpg",
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD123457",
    date: "2023-09-28",
    status: "Processing",
    total: 899,
    items: [
      {
        id: 6,
        name: "Deadpool: Chimichangas Oversized Tee",
        price: 899,
        image: "https://www.redwolf.in/image/cache/catalog/t-shirts/oversized/deadpool-merc-with-a-mouth-oversized-t-shirt-mock-back-600x800.jpg?m=1728472094",
        quantity: 1,
      },
    ],
  },
]

// Sample wishlist data
const wishlistData = [
  {
    id: 3,
    name: "Iron Man: Arc Reactor Glow Print",
    price: 999,
    image: "https://tse2.mm.bing.net/th?id=OIP.gMTqgQ-XtU97Z_tcDbLXQwHaHa&pid=Api&P=0&h=180",
    inStock: true,
  },
  {
    id: 8,
    name: "Wonder Woman: Amazonian Warrior Tee",
    price: 849,
    image: "https://realinfinitywar.com/wp-content/uploads/2018/08/wonderwoman-casual-t-shirt-1.jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Demon Slayer: Tanjiro Graphic Tee",
    price: 899,
    image: "https://tse3.mm.bing.net/th?id=OIP.iosKPeA_9nl04nrXi8vnpgHaIJ&pid=Api&P=0&h=180",
    inStock: false,
  },
]

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState(() => {
    const stored = localStorage.getItem('profileData');
    return stored ? JSON.parse(stored) : {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    };
  });

  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem('addresses');
    return stored ? JSON.parse(stored) : userData.addresses;
  });

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    id: null,
    type: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState(() => {
    const stored = localStorage.getItem('paymentMethods');
    return stored ? JSON.parse(stored) : [];
  });
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    id: null,
    cardName: '',
    cardNumber: '',
    expiry: '',
    isDefault: false,
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Save profile data to localStorage (already handled by useEffect)had
    setIsEditingProfile(false)
  }

  const handleEditAddress = (addr) => {
    setAddressForm(addr);
    setEditingAddressId(addr.id);
    setShowAddressForm(true);
  };
  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };
  const handleAddAddress = () => {
    setAddressForm({ id: Date.now(), type: '', address: '', city: '', state: '', zipCode: '', isDefault: false });
    setEditingAddressId(null);
    setShowAddressForm(true);
  };
  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleAddressFormSubmit = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      setAddresses(addresses.map(a => a.id === editingAddressId ? addressForm : a));
    } else {
      setAddresses([...addresses, addressForm]);
    }
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  const handleAddPayment = () => {
    setPaymentForm({ id: Date.now(), cardName: '', cardNumber: '', expiry: '', isDefault: false });
    setEditingPaymentId(null);
    setShowPaymentForm(true);
  };
  const handleEditPayment = (pm) => {
    setPaymentForm(pm);
    setEditingPaymentId(pm.id);
    setShowPaymentForm(true);
  };
  const handleDeletePayment = (id) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };
  const handlePaymentFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handlePaymentFormSubmit = (e) => {
    e.preventDefault();
    if (editingPaymentId) {
      setPaymentMethods(paymentMethods.map(pm => pm.id === editingPaymentId ? paymentForm : pm));
    } else {
      setPaymentMethods([...paymentMethods, paymentForm]);
    }
    setShowPaymentForm(false);
    setEditingPaymentId(null);
  };

  // Generate glowing stars dynamically
  const renderGlowingStars = () => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      stars.push(
        <div 
          key={i}
          className="glowing-star" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            boxShadow: `0 0 ${size * 2}px ${size/2}px rgba(255, 255, 255, 0.8)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  // Generate shooting stars
  const renderShootingStars = () => {
    const shootingStars = [];
    for (let i = 0; i < 5; i++) {
      const width = Math.random() * 100 + 50;
      const top = Math.random() * 100;
      const left = Math.random() * 50;
      const delay = Math.random() * 15;
      const duration = Math.random() * 2 + 1;
      const angle = Math.random() * 60 - 30;
      
      shootingStars.push(
        <div 
          key={i}
          className="shooting-star" 
          style={{
            width: `${width}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${angle}deg)`,
            animation: `shoot ${duration}s ${delay}s linear infinite`
          }}
        />
      );
    }
    return shootingStars;
  };

  // Generate pulsating stars
  const renderPulsatingStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 3;
      
      stars.push(
        <div 
          key={i}
          className="pulsating-star" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            boxShadow: `0 0 ${size * 3}px ${size}px rgba(100, 200, 255, 0.8)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
        {/* Container for stars */}
        <div id="starry-profile-bg" className="absolute inset-0 overflow-hidden">
          {/* Enhanced star layers */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
                radial-gradient(2px 2px at 75% 75%, rgba(255, 255, 255, 0.8) 1%, transparent 1%),
                radial-gradient(1.5px 1.5px at 50% 50%, rgba(255, 255, 255, 0.9) 1%, transparent 1%),
                radial-gradient(1px 1px at 30% 70%, rgba(200, 200, 255, 0.7) 1%, transparent 1%),
                radial-gradient(2.5px 2.5px at 80% 20%, rgba(255, 255, 255, 0.7) 1%, transparent 1%)
              `,
              backgroundSize: "200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px",
              animation: "star-rotation 500s linear infinite"
            }}
          />
          
          {/* Secondary rotating star layer */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 10%, white 1%, transparent 1%),
                radial-gradient(1.5px 1.5px at 60% 40%, white 1%, transparent 1%),
                radial-gradient(1px 1px at 30% 80%, white 1%, transparent 1%)
              `,
              backgroundSize: "250px 250px, 300px 300px, 350px 350px",
              animation: "star-rotation-reverse 600s linear infinite"
            }}
          />
          
          {/* Deep space nebula effects */}
          <div className="absolute inset-0 opacity-30" 
            style={{
              background: "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)"
            }}
          />
          
          {/* Animated star clusters */}
          <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
          <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>
          
          {/* New enhanced glowing stars */}
          {renderGlowingStars()}
          {renderPulsatingStars()}
          {renderShootingStars()}
          
          {/* Additional nebula glow */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "nebula-pulse 8s infinite alternate ease-in-out"
            }}
          />
          
          <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(100, 0, 255, 0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
              animation: "nebula-pulse 12s infinite alternate-reverse ease-in-out"
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-8" 
             style={{textShadow: "0 0 10px rgba(100, 200, 255, 0.7)"}}>
            My Cosmic Profile
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50 transform rotate-1">
                <div className="transform -rotate-1">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-600 shadow-[0_0_15px_rgba(0,191,255,0.5)]">
                        <img
                          src={userData.avatar || "/placeholder.svg"}
                          alt={userData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-[0_0_10px_rgba(0,191,255,0.5)]">
                        <Camera size={16} />
                      </button>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-white" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                      {userData.name}
                    </h2>
                    <p className="text-blue-300 text-sm">{userData.email}</p>
                  </div>

                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "profile" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "orders" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <Package size={18} className="mr-3" />
                      Orders
                    </button>
                    <button
                      onClick={() => setActiveTab("wishlist")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "wishlist" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <Heart size={18} className="mr-3" />
                      Wishlist
                    </button>
                    <button
                      onClick={() => setActiveTab("payment")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "payment" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <CreditCard size={18} className="mr-3" />
                      Payment Methods
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/30 rounded-md transition-all duration-300">
                      <LogOut size={18} className="mr-3" />
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Comic-style decorative element */}
              <div className="absolute -bottom-6 -left-6 transform -rotate-12 z-20 hidden md:block">
                <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
                  POW!
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                <div>
              
                    {/* Personal Information Section */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                          Personal Information
                        </h2>
                        {!isEditingProfile && (
                          <button onClick={() => setIsEditingProfile(true)} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-300">Edit</button>
                        )}
                      </div>
                      <div className="mb-4">
                        <div className="text-blue-200 text-sm mb-1">Full Name</div>
                        <div className="text-white font-bold">{profileData.name}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-blue-200 text-sm mb-1">Email Address</div>
                        <div className="text-white font-bold">{profileData.email}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-blue-200 text-sm mb-1">Phone Number</div>
                        <div className="text-white font-bold">{profileData.phone}</div>
                      </div>
                    </div>

                    {/* Addresses Section */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-white">Addresses</h3>
                        <button onClick={handleAddAddress} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-300">+ Add Address</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                          <div key={address.id} className="border border-blue-900/50 rounded-lg p-4 bg-black/20 backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{address.type}</span>
                                {address.isDefault && <span className="bg-blue-900/70 text-white text-xs px-2 py-0.5 rounded ml-2">Default</span>}
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleEditAddress(address)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                                <button onClick={() => handleDeleteAddress(address.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                              </div>
                            </div>
                            <div className="text-blue-200 text-sm mb-1 flex items-center"><MapPin size={14} className="mr-1" />{address.address}</div>
                            <div className="text-blue-200 text-sm">{address.city}, {address.state} {address.zipCode}</div>
                          </div>
                        ))}
                      </div>
                      {showAddressForm && (
                        <form onSubmit={handleAddressFormSubmit} className="mt-4 bg-slate-800 p-4 rounded-lg border border-blue-900/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                            <div>
                              <label className="block text-xs text-blue-300 mb-1">Type</label>
                              <input name="type" value={addressForm.type} onChange={handleAddressFormChange} required className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs text-blue-300 mb-1">Address</label>
                              <input name="address" value={addressForm.address} onChange={handleAddressFormChange} required className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs text-blue-300 mb-1">City</label>
                              <input name="city" value={addressForm.city} onChange={handleAddressFormChange} required className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs text-blue-300 mb-1">State</label>
                              <input name="state" value={addressForm.state} onChange={handleAddressFormChange} required className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs text-blue-300 mb-1">Zip Code</label>
                              <input name="zipCode" value={addressForm.zipCode} onChange={handleAddressFormChange} required className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                            </div>
                            <div className="flex items-center mt-2">
                              <input type="checkbox" name="isDefault" checked={addressForm.isDefault} onChange={handleAddressFormChange} className="mr-2" />
                              <label className="text-xs text-blue-300">Set as default</label>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
                            <button type="button" onClick={() => setShowAddressForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">Cancel</button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                  <h2 className="text-xl font-bold text-white mb-6" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                    My Orders
                  </h2>

                  {ordersData.length > 0 ? (
                    <div className="space-y-6">
                      {ordersData.map((order) => (
                        <div key={order.id} className="border border-blue-900/50 rounded-lg overflow-hidden bg-black/20">
                          <div className="bg-blue-900/30 p-4 flex justify-between items-center backdrop-blur-sm">
                            <div>
                              <p className="font-medium text-white">Order #{order.id}</p>
                              <p className="text-sm text-blue-300">Placed on {order.date}</p>
                            </div>
                            <div className="flex items-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-yellow-900/50 text-yellow-300"
                                }`}
                              >
                                {order.status}
                              </span>
                              <Link
                                to={`/order/${order.id}`}
                                className="ml-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-300"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center">
                                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-blue-900/50">
                                    <img
                                      src={
                                        !item.image || item.image.startsWith('/')
                                          ? "https://images.unsplash.com/photo-1517841905240-472988babdf9"
                                          : item.image
                                      }
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex-1">
                                    <h3 className="text-sm font-medium text-white">{item.name}</h3>
                                    <p className="text-sm text-blue-300">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium text-white">₹{item.price}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-between items-center border-t border-blue-900/30 pt-4">
                              <p className="text-sm text-blue-300">Total Amount</p>
                              <p className="text-lg font-bold text-white" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.5)"}}>
                                ₹{order.total}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-blue-900/20 rounded-lg backdrop-blur-sm">
                      <Package className="mx-auto text-blue-400" size={48} />
                      <h3 className="mt-4 text-lg font-medium text-white">No orders yet</h3>
                      <p className="mt-1 text-blue-300">When you place an order, it will appear here.</p>
                      <Link
                        to="/products"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md shadow-sm text-sm font-medium text-white bg-blue-900/40 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                  <h2 className="text-xl font-bold text-white mb-6" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                    My Wishlist
                  </h2>

                  {wishlistData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistData.map((item) => (
                        <div key={item.id} className="border border-blue-900/50 rounded-lg p-4 flex bg-black/20 backdrop-blur-sm">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-blue-900/50">
                            <img
                              src={
                                !item.image || item.image.startsWith('/')
                                  ? "https://images.unsplash.com/photo-1517841905240-472988babdf9"
                                  : item.image
                              }
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <h3 className="text-sm font-medium text-white">{item.name}</h3>
                              <p className="mt-1 text-sm font-bold text-white">₹{item.price}</p>
                              <p className="mt-1 text-sm text-blue-300">
                                {item.inStock ? "In Stock" : "Out of Stock"}
                              </p>
                            </div>
                            <div className="mt-auto flex justify-between">
                              <button
                                className={`text-sm font-medium ${
                                  item.inStock
                                    ? "text-blue-400 hover:text-blue-300"
                                    : "text-gray-500 cursor-not-allowed"
                                  } transition-all duration-300`}
                                  disabled={!item.inStock}
                                >
                                  Add to Cart
                                </button>
                                <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-300">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-blue-900/20 rounded-lg backdrop-blur-sm">
                        <Heart className="mx-auto text-blue-400" size={48} />
                        <h3 className="mt-4 text-lg font-medium text-white">Your wishlist is empty</h3>
                        <p className="mt-1 text-blue-300">Save items you love to your wishlist.</p>
                        <Link
                          to="/products"
                          className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md shadow-sm text-sm font-medium text-white bg-blue-900/40 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300"
                        >
                          Explore Products
                        </Link>
                      </div>
                    )}
                  </div>
                )}
  
                {/* Payment Methods Tab */}
                {activeTab === "payment" && (
                  <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                    <h2 className="text-xl font-bold text-white mb-6" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                      Payment Methods
                    </h2>
                    <div className="mb-4 flex justify-end">
                      <button onClick={handleAddPayment} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">+ Add Payment Method</button>
                    </div>
                    {paymentMethods.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map(pm => (
                          <div key={pm.id} className="border border-blue-900/50 rounded-lg p-4 bg-black/20 backdrop-blur-sm flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-white font-bold">{pm.cardName}</div>
                                <div className="text-blue-200 text-sm">**** **** **** {pm.cardNumber.slice(-4)}</div>
                                <div className="text-blue-200 text-xs">Expiry: {pm.expiry}</div>
                                {pm.isDefault && <span className="bg-blue-900/70 text-white text-xs px-2 py-0.5 rounded ml-2">Default</span>}
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleEditPayment(pm)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                                <button onClick={() => handleDeletePayment(pm.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-blue-900/20 rounded-lg backdrop-blur-sm">
                        <CreditCard className="mx-auto text-blue-400" size={48} />
                        <h3 className="mt-4 text-lg font-medium text-white">No payment methods</h3>
                        <p className="mt-1 text-blue-300">Add a payment method for faster checkout.</p>
                      </div>
                    )}
                    {showPaymentForm && (
                      <form onSubmit={handlePaymentFormSubmit} className="mt-4 bg-slate-800 p-4 rounded-lg border border-blue-900/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                          <div>
                            <label className="block text-xs text-blue-300 mb-1">Cardholder Name</label>
                            <input name="cardName" value={paymentForm.cardName} onChange={handlePaymentFormChange} required className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-blue-300 mb-1">Card Number</label>
                            <input name="cardNumber" value={paymentForm.cardNumber} onChange={handlePaymentFormChange} required maxLength={16} className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-blue-300 mb-1">Expiry</label>
                            <input name="expiry" value={paymentForm.expiry} onChange={handlePaymentFormChange} required placeholder="MM/YY" className="w-full px-2 py-1 rounded bg-slate-700 text-white" />
                          </div>
                          <div className="flex items-center mt-2">
                            <input type="checkbox" name="isDefault" checked={paymentForm.isDefault} onChange={handlePaymentFormChange} className="mr-2" />
                            <label className="text-xs text-blue-300">Set as default</label>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
                          <button type="button" onClick={() => setShowPaymentForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Comic-style decorative element */}
        <div className="hidden md:block absolute bottom-20 right-10 transform rotate-12 z-20">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
            ZOOM!
          </div>
        </div>
        
        <Footer />
        
        {/* CSS for animations */}
        <style jsx>{`
          @keyframes star-rotation {
            0% { background-position: 0 0, 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px; }
          }
          
          @keyframes star-rotation-reverse {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: -250px -250px, -300px -300px, -350px -350px; }
          }
          
          .glowing-star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0;
            animation: star-glow 3s infinite ease-in-out;
          }
          
          @keyframes star-glow {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
          
          .shooting-star {
            position: absolute;
            height: 2px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
            opacity: 0;
          }
          
          @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(var(--angle)); opacity: 0; }
            10% { opacity: 1; }
            70% { opacity: 1; }
            100% { transform: translateX(500px) translateY(300px) rotate(var(--angle)); opacity: 0; }
          }
          
          .pulsating-star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            animation: pulsate 3s infinite ease-in-out;
          }
          
          @keyframes pulsate {
            0% { transform: scale(0.8); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(0.8); opacity: 0.3; }
          }
          
          .star-cluster-1 {
            top: 15%;
            left: 20%;
            background-image: radial-gradient(1px 1px at 25% 25%, white 1%, transparent 2%),
                              radial-gradient(2px 2px at 75% 75%, white 1%, transparent 2%),
                              radial-gradient(1px 1px at 50% 50%, white 1%, transparent 2%);
            background-size: 100px 100px;
            animation: cluster-float 20s infinite alternate ease-in-out;
          }
          
          .star-cluster-2 {
            bottom: 30%;
            right: 25%;
            background-image: radial-gradient(1px 1px at 25% 25%, white 1%, transparent 2%),
                              radial-gradient(2px 2px at 75% 75%, white 1%, transparent 2%),
                              radial-gradient(1px 1px at 50% 50%, white 1%, transparent 2%);
            background-size: 80px 80px;
            animation: cluster-float 25s infinite alternate-reverse ease-in-out;
          }
          
          @keyframes cluster-float {
            0% { transform: translateY(0) rotate(0); }
            100% { transform: translateY(20px) rotate(5deg); }
          }
          
          @keyframes nebula-pulse {
            0% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.1); }
            100% { opacity: 0.1; transform: scale(1); }
          }
        `}</style>
      </>
    );
  };
  
  export default UserProfilePage;