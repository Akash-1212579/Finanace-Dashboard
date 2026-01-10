import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./app/layout/AppLayout";

// Pages
import Dashboard from "./features/dashboard/pages/Dashboard";
import Transactions from "./features/transactions/pages/Transactions";
import Analytics from "./features/analytics/pages/Analytics";
import ImportExport from "./features/vault/pages/ImportExport";
import Settings from "./features/settings/pages/Settings";

function App() {
  return (
    <>
    
      <Routes>
        {/* Redirecting root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* App layout routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/vault" element={<ImportExport />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
