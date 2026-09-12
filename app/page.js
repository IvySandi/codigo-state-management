import Dashboard from "./components/dashboard";
import { StoreProvider } from "./store/provider";

export default function Home() {
  return (
    <StoreProvider>
      <Dashboard />
    </StoreProvider>
  );
}
