import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import jwtService from "../../auth/services/jwtService";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
  const { isConnected } = useAccount();
  let mount = isConnected;
  const [isRendered] = useState(false);

  useEffect(() => {
    if (isConnected) {
      onSubmit();
    }
  }, [mount, isRendered]);
  function onSubmit() {
    const email = "admin@give4all.com";
    const password = "admin";
    jwtService.signInWithEmailAndPassword(email, password).catch((_errors) => {
      _errors.forEach((error) => {
        setError(error.type, {
          type: "manual",
          message: error.message,
        });
      });
    });
  }
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="rounded-lg bg-cyan-100 p-5 text-15 px-5 font-extrabold text-cyan-900 fixed top-0 right-0 z-999"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="rounded-lg bg-red-500 p-2 px-5 font-extrabold text-white"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {/* {currentChain.map((item) => (
                    <div>
                      {item}
                      <WalletButton wallet={item} />
                    </div>
                  ))} */}

                  <button
                    className="rounded-lg bg-cyan-100 p-2 px-5 font-extrabold text-cyan-900"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
