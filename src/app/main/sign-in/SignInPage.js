import "@mock-api";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import ConnectWallet from "./connect-wallet";

const projectId = "74bc34341f14d37fb7c45cb013472515";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygon, avalanche, arbitrum, bsc, optimism, gnosis, fantom],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Give4all",
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
function SignInPage() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="w-screen h-screen">
          <Box
            className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
            sx={{ backgroundColor: "primary.main" }}
          >
            <ConnectWallet />
            <svg
              className="absolute inset-0 pointer-events-none"
              viewBox="0 0 960 540"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMax slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Box
                component="g"
                sx={{ color: "primary.light" }}
                className="opacity-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="100"
              >
                <circle r="234" cx="196" cy="23" />
                <circle r="234" cx="790" cy="491" />
              </Box>
            </svg>
            <Box
              component="svg"
              className="absolute -top-64 -right-64 opacity-20"
              sx={{ color: "primary.light" }}
              viewBox="0 0 220 192"
              width="220px"
              height="192px"
              fill="none"
            >
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                </pattern>
              </defs>
              <rect
                width="220"
                height="192"
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
              />
            </Box>

            <div className="z-10 relative w-full max-w-2xl">
              <div className="text-7xl font-bold leading-none text-gray-100">
                <div>Welcome to</div>
                <div>our community</div>
              </div>
              <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
                Supporting Charitable Initiatives that Create Lasting Change and
                Uplift Lives in Communities Across the Globe
              </div>
              <div className="flex items-center mt-32">
                <AvatarGroup
                  sx={{
                    "& .MuiAvatar-root": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Avatar src="assets/images/avatars/female-18.jpg" />
                  <Avatar src="assets/images/avatars/female-11.jpg" />
                  <Avatar src="assets/images/avatars/male-09.jpg" />
                  <Avatar src="assets/images/avatars/male-16.jpg" />
                </AvatarGroup>

                <div className="ml-16 font-medium tracking-tight text-gray-400">
                  More than 17k people joined us, it's your turn
                </div>
              </div>
            </div>
          </Box>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default SignInPage;
