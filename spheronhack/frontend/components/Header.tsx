import { ModeToggle } from "./mode-toggle";
import { CardHeader, CardTitle } from "./ui/card";
import { WalletSelector } from "./WalletSelector";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
export function Header() {
  const { connected } = useWallet();
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-3xl z-50 border-b border-gray-600 shadow-lg mb-10"><div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
      <h1 className="display">Stream Dapp</h1>
      <div className="flex items-center justify-center flex-col">
        {!connected && (
          <CardHeader>
            <CardTitle>To get started Connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
      <div className="flex gap-16 items-center flex-wrap">

        <WalletSelector />
        <ModeToggle />
      </div>
    </div></header>
  );
}
