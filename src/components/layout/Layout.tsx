import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, TopBar } from './Sidebar';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
