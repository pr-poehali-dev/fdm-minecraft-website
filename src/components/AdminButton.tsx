import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import AdminAuth from "./AdminAuth";

const AdminButton = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    window.location.reload();
  };

  if (isAuthenticated) {
    return (
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-40 bg-red-500/20 border-red-500/40 hover:bg-red-500/30"
      >
        <Icon name="LogOut" size={16} className="mr-2" />
        Выйти из админки
      </Button>
    );
  }

  return (
    <>
      {showAuth && <AdminAuth onAuthenticated={handleAuthSuccess} />}
      <Button
        onClick={() => setShowAuth(true)}
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-40"
      >
        <Icon name="Lock" size={16} className="mr-2" />
        Админ-панель
      </Button>
    </>
  );
};

export default AdminButton;
