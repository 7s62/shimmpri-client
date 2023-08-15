export type ChainType = {
  name: string;
  rpc: string;
  chainId: number;
  icon: string;
  nativeCurrency: {
    name: string;
    decimals: number;
    symbol: string;
  };
};

export const CVC = {
  network_name: "CVC-Testnet",
  rpc_url: "https://rpc-kura.cross.technology",
  chain_id: 5555,
  currency_symbol: "XCR",
  explorer_url: "https://testnet.cvcscan.com",
};

export const CHAINS_DATA: Array<ChainType> = [
  {
    name: "Etherium",
    rpc: "https://rpc.ankr.com/eth_goerli",
    chainId: 5,
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI1LjYyMzggMEwyNS4yNjA3IDEuMTg0OTJWMzUuNTY4NUwyNS42MjM4IDM1LjkxNjVMNDIuMjQ3NyAyNi40ODIzTDI1LjYyMzggMFoiIGZpbGw9IiMzNDM0MzQiLz4KPHBhdGggZD0iTTI1LjYyMzkgMEw5IDI2LjQ4MjNMMjUuNjIzOSAzNS45MTY2VjE5LjIyNzhWMFoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTI1LjYyMzggMzguOTM4NUwyNS40MTkyIDM5LjE3NzlWNTEuNDI2MUwyNS42MjM4IDUyTDQyLjI1NzYgMjkuNTA5TDI1LjYyMzggMzguOTM4NVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTI1LjYyMzkgNTEuOTk5OFYzOC45MzgzTDkgMjkuNTA4OEwyNS42MjM5IDUxLjk5OThaIiBmaWxsPSIjOEM4QzhDIi8+CjxwYXRoIGQ9Ik0yNS42MjM4IDM1LjkxNjRMNDIuMjQ3NCAyNi40ODI0TDI1LjYyMzggMTkuMjI3OVYzNS45MTY0WiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNOS4wMDAxMiAyNi40ODI0TDI1LjYyMzggMzUuOTE2NVYxOS4yMjhMOS4wMDAxMiAyNi40ODI0WiIgZmlsbD0iIzM5MzkzOSIvPgo8L3N2Zz4K",
    nativeCurrency: {
      name: "Etherium",
      decimals: 18,
      symbol: "ETH",
    },
  },
  {
    name: "Base",
    rpc: "https://rpc.ankr.com/eth_goerli",
    chainId: 84531,
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI1LjYyMzggMEwyNS4yNjA3IDEuMTg0OTJWMzUuNTY4NUwyNS42MjM4IDM1LjkxNjVMNDIuMjQ3NyAyNi40ODIzTDI1LjYyMzggMFoiIGZpbGw9IiMzNDM0MzQiLz4KPHBhdGggZD0iTTI1LjYyMzkgMEw5IDI2LjQ4MjNMMjUuNjIzOSAzNS45MTY2VjE5LjIyNzhWMFoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTI1LjYyMzggMzguOTM4NUwyNS40MTkyIDM5LjE3NzlWNTEuNDI2MUwyNS42MjM4IDUyTDQyLjI1NzYgMjkuNTA5TDI1LjYyMzggMzguOTM4NVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTI1LjYyMzkgNTEuOTk5OFYzOC45MzgzTDkgMjkuNTA4OEwyNS42MjM5IDUxLjk5OThaIiBmaWxsPSIjOEM4QzhDIi8+CjxwYXRoIGQ9Ik0yNS42MjM4IDM1LjkxNjRMNDIuMjQ3NCAyNi40ODI0TDI1LjYyMzggMTkuMjI3OVYzNS45MTY0WiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNOS4wMDAxMiAyNi40ODI0TDI1LjYyMzggMzUuOTE2NVYxOS4yMjhMOS4wMDAxMiAyNi40ODI0WiIgZmlsbD0iIzM5MzkzOSIvPgo8L3N2Zz4K",
    nativeCurrency: {
      name: "Etherium",
      decimals: 18,
      symbol: "ETH",
    },
  },
  {
    name: "Arbitrum",
    rpc: "https://arbitrum-nova.publicnode.com",
    chainId: 42170,
    icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI0NzAuMjg3cHgiIGhlaWdodD0iNTE0LjI1MXB4IiB2aWV3Qm94PSIwIDAgNDcwLjI4NyA1MTQuMjUxIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0NzAuMjg3IDUxNC4yNTEiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkJhY2tncm91bmQiPg0KPC9nPg0KPGcgaWQ9IkxvZ29zX2FuZF9zeW1ib2xzIj4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl8zIj4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfM18zXyI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzQiPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl80XzFfIj4NCgkJPGcgaWQ9IlNZTUJPTF9WRVJfNF8zXyI+DQoJCTwvZz4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfNV8xXyI+DQoJPC9nPg0KCTxnIGlkPSJvZmZfMl8xXyI+DQoJPC9nPg0KCTxnIGlkPSJWRVJfM18xXyI+DQoJCTxnIGlkPSJTWU1CT0xfVkVSXzJfMV8iPg0KCQk8L2c+DQoJPC9nPg0KCTxnIGlkPSJWRVJfMyI+DQoJCTxnIGlkPSJTWU1CT0xfVkVSXzIiPg0KCQk8L2c+DQoJPC9nPg0KCTxnIGlkPSJvZmZfMiI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzUiPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl8xIj4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfMV8xXyI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzEtMV8zXyI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzEtMV8yXyI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzEtMSI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzEtMV8xXyI+DQoJCTxnIGlkPSJfeDMxXy0zIj4NCgkJPC9nPg0KCQk8ZyBpZD0iU3ltYm9sXy1fT3JpZ2luYWxfMTRfIj4NCgkJCTxwYXRoIGZpbGw9IiMyRDM3NEIiIGQ9Ik0yOTEuMTM0LDIzNy40NjlsMzUuNjU0LTYwLjVsOTYuMTAzLDE0OS42ODRsMC4wNDYsMjguNzI3bC0wLjMxMy0xOTcuNjcyDQoJCQkJYy0wLjIyOC00LjgzMi0yLjc5NC05LjI1Mi02Ljg4Ny0xMS44NTlMMjQyLjcxNSw0Ni4zMjRjLTQuMDQ1LTEuOTktOS4xOC0xLjk2Ny0xMy4yMiwwLjA2M2MtMC41NDYsMC4yNzItMS4wNiwwLjU3LTEuNTQ4LDAuODk1DQoJCQkJbC0wLjYwNCwwLjM3OUw1OS4zOTksMTQ0Ljk4M2wtMC42NTEsMC4yOTZjLTAuODM4LDAuMzg1LTEuNjg2LDAuODc1LTIuNDgsMS40NDRjLTMuMTg1LDIuMjgzLTUuMjk5LDUuNjYtNS45ODMsOS40NDgNCgkJCQljLTAuMTAzLDAuNTc0LTAuMTc5LDEuMTU4LTAuMjE0LDEuNzQ5bDAuMjY0LDE2MS4wODNsODkuNTE1LTEzOC43NDVjMTEuMjcxLTE4LjM5NywzNS44MjUtMjQuMzIzLDU4LjYyLTI0LjAwMWwyNi43NTMsMC43MDYNCgkJCQlMNjcuNTg4LDQwOS43NjVsMTguNTgyLDEwLjY5N0wyNDUuNjkyLDE1Ny4yMmw3MC41MS0wLjI1NkwxNTcuMDkxLDQyNi44NDlsNjYuMzA2LDM4LjEzOGw3LjkyMiw0LjU1Ng0KCQkJCWMzLjM1MSwxLjM2Miw3LjMwMiwxLjQzMSwxMC42ODEsMC4yMWwxNzUuNDUzLTEwMS42NzhsLTMzLjU0NCwxOS40MzhMMjkxLjEzNCwyMzcuNDY5eiBNMzA0LjczNiw0MzMuMzk1bC02Ni45NjktMTA1LjEwOA0KCQkJCWw0MC44ODEtNjkuMzcxbDg3Ljk1MiwxMzguNjI4TDMwNC43MzYsNDMzLjM5NXoiLz4NCgkJCTxwb2x5Z29uIGZpbGw9IiMyOEEwRjAiIHBvaW50cz0iMjM3Ljc2OCwzMjguMjg2IDMwNC43MzYsNDMzLjM5NSAzNjYuNjAxLDM5Ny41NDMgMjc4LjY0OCwyNTguOTE1IAkJCSIvPg0KCQkJPHBhdGggZmlsbD0iIzI4QTBGMCIgZD0iTTQyMi45MzcsMzU1LjM3OWwtMC4wNDYtMjguNzI3bC05Ni4xMDMtMTQ5LjY4NGwtMzUuNjU0LDYwLjVsOTIuNzc0LDE1MC4wNDNsMzMuNTQ0LTE5LjQzOA0KCQkJCWMzLjI5LTIuNjczLDUuMjgxLTYuNTk0LDUuNDktMTAuODI1TDQyMi45MzcsMzU1LjM3OXoiLz4NCgkJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMC4yMTksMzgyLjQ2OWw0Ny4zNjksMjcuMjk2bDE1Ny42MzQtMjUyLjgwMWwtMjYuNzUzLTAuNzA2Yy0yMi43OTUtMC4zMjItNDcuMzUsNS42MDQtNTguNjIsMjQuMDAxDQoJCQkJTDUwLjMzNCwzMTkuMDA0bC0zMC4xMTUsNDYuMjcxVjM4Mi40Njl6Ii8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjMxNi4yMDIsMTU2Ljk2NCAyNDUuNjkyLDE1Ny4yMiA4Ni4xNyw0MjAuNDYyIDE0MS45MjgsNDUyLjU2NSAxNTcuMDkxLDQyNi44NDkgCQkJIi8+DQoJCQk8cGF0aCBmaWxsPSIjOTZCRURDIiBkPSJNNDUyLjY1LDE1Ni42MDFjLTAuNTktMTQuNzQ2LTguNTc0LTI4LjI0NS0yMS4wOC0zNi4xMDRMMjU2LjI4LDE5LjY5Mg0KCQkJCWMtMTIuMzcxLTYuMjI5LTI3LjgyNS02LjIzNy00MC4yMTgtMC4wMDRjLTEuNDY1LDAuNzM5LTE3MC40NjUsOTguNzUyLTE3MC40NjUsOTguNzUyYy0yLjMzOSwxLjEyMi00LjU5MiwyLjQ1OC02LjcxMSwzLjk3NQ0KCQkJCWMtMTEuMTY0LDguMDAxLTE3Ljk2OSwyMC40MzUtMTguNjY4LDM0LjA5NXYyMDguNzY1bDMwLjExNS00Ni4yNzFMNTAuMDcsMTU3LjkyMWMwLjAzNS0wLjU4OSwwLjEwOS0xLjE2OSwwLjIxNC0xLjc0MQ0KCQkJCWMwLjY4MS0zLjc5LDIuNzk3LTcuMTcxLDUuOTgzLTkuNDU2YzAuNzk1LTAuNTY5LDE3Mi42ODItMTAwLjA2NCwxNzMuMjI4LTEwMC4zMzdjNC4wNC0yLjAyOSw5LjE3NS0yLjA1MywxMy4yMi0wLjA2Mw0KCQkJCWwxNzMuMDIyLDk5LjUyM2M0LjA5MywyLjYwNyw2LjY1OSw3LjAyNyw2Ljg4NywxMS44NTl2MTk5LjU0MmMtMC4yMDksNC4yMzEtMS44ODIsOC4xNTItNS4xNzIsMTAuODI1bC0zMy41NDQsMTkuNDM4DQoJCQkJbC0xNy4zMDgsMTAuMDMxbC02MS44NjQsMzUuODUybC02Mi43MzcsMzYuMzU3Yy0zLjM3OSwxLjIyMS03LjMzLDEuMTUyLTEwLjY4MS0wLjIxbC03NC4yMjgtNDIuNjkzbC0xNS4xNjMsMjUuNzE3DQoJCQkJbDY2LjcwNiwzOC40MDZjMi4yMDYsMS4yNTUsNC4xNzEsMi4zNjcsNS43ODQsMy4yNzJjMi40OTcsMS40LDQuMTk5LDIuMzM3LDQuOCwyLjYyOWM0Ljc0MSwyLjMwMywxMS41NjMsMy42NDMsMTcuNzEsMy42NDMNCgkJCQljNS42MzYsMCwxMS4xMzItMS4wMzUsMTYuMzMyLTMuMDcybDE4Mi4yMjUtMTA1LjUzMWMxMC40NTktOC4xMDQsMTYuNjEyLTIwLjMyNSwxNy4xNjYtMzMuNTY0VjE1Ni42MDF6Ii8+DQoJCTwvZz4NCgkJPGcgaWQ9IlN5bWJvbF8tX09yaWdpbmFsXzEzXyI+DQoJCTwvZz4NCgkJPGcgaWQ9IlN5bWJvbF8tX09yaWdpbmFsXzZfIj4NCgkJPC9nPg0KCQk8ZyBpZD0iU3ltYm9sXy1fT3JpZ2luYWxfNF8iPg0KCQk8L2c+DQoJCTxnIGlkPSJPbmVfY29sb3JfdmVyc2lvbl8tX1doaXRlXzNfIj4NCgkJCTxnIGlkPSJTeW1ib2xfLV9PcmlnaW5hbF8xNV8iPg0KCQkJPC9nPg0KCQk8L2c+DQoJCTxnIGlkPSJPbmVfY29sb3JfdmVyc2lvbl8tX1doaXRlIj4NCgkJCTxnIGlkPSJTeW1ib2xfLV9PcmlnaW5hbCI+DQoJCQk8L2c+DQoJCTwvZz4NCgkJPGcgaWQ9IlN5bWJvbF8tX01vbm9jaHJvbWF0aWNfM18iPg0KCQkJPGcgaWQ9Il94MzNfXzdfIj4NCgkJCTwvZz4NCgkJPC9nPg0KCQk8ZyBpZD0iU3ltYm9sXy1fTW9ub2Nocm9tYXRpYyI+DQoJCQk8ZyBpZD0iX3gzM19fM18iPg0KCQkJPC9nPg0KCQk8L2c+DQoJCTxnIGlkPSJfeDMzX18yXyI+DQoJCTwvZz4NCgkJPGcgaWQ9Il94MzNfXzFfIj4NCgkJPC9nPg0KCQk8ZyBpZD0iX3gzM18iPg0KCQk8L2c+DQoJCTxnIGlkPSJTeW1ib2xfLV9PcmlnaW5hbF8xMF8iPg0KCQk8L2c+DQoJCTxnIGlkPSJTeW1ib2xfLV9PcmlnaW5hbF8xXyI+DQoJCTwvZz4NCgkJPGcgaWQ9IlN5bWJvbF8tX09yaWdpbmFsXzJfIj4NCgkJPC9nPg0KCQk8ZyBpZD0iX3gzNF9fMV8iPg0KCQk8L2c+DQoJCTxnIGlkPSJTeW1ib2xfLV9Nb25vY2hyb21hdGljXzJfIj4NCgkJCTxnIGlkPSJfeDMzX182XyI+DQoJCQk8L2c+DQoJCTwvZz4NCgkJPGcgaWQ9Ik9uZV9jb2xvcl92ZXJzaW9uXy1fV2hpdGVfMl8iPg0KCQkJPGcgaWQ9IlN5bWJvbF8tX09yaWdpbmFsXzExXyI+DQoJCQk8L2c+DQoJCTwvZz4NCgkJPGcgaWQ9IlN5bWJvbF8tX09yaWdpbmFsXzVfIj4NCgkJCTxnIGlkPSJTeW1ib2xfLV9PcmlnaW5hbF8xMl8iPg0KCQkJPC9nPg0KCQk8L2c+DQoJCTxnIGlkPSJPbmVfY29sb3JfdmVyc2lvbl8tX1doaXRlXzFfIj4NCgkJCTxnIGlkPSJTeW1ib2xfLV9PcmlnaW5hbF85XyI+DQoJCQk8L2c+DQoJCTwvZz4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfMV8yXyI+DQoJCTxnIGlkPSJTWU1CT0xfVkVSXzJfNF8iPg0KCQk8L2c+DQoJCTxnIGlkPSJTWU1CT0xfVkVSXzItMS0xXzFfIj4NCgkJPC9nPg0KCQk8ZyBpZD0iU1lNQk9MX1ZFUl8yLTItMV8xXyI+DQoJCTwvZz4NCgkJPGcgaWQ9IlNZTUJPTF9WRVJfMi0zLTFfNF8iPg0KCQk8L2c+DQoJCTxnIGlkPSJOZXdfU3ltYm9sXzFfIj4NCgkJCTxnIGlkPSJTWU1CT0xfVkVSXzItMy0xXzNfIj4NCgkJCTwvZz4NCgkJPC9nPg0KCQk8ZyBpZD0iTmV3X1N5bWJvbCI+DQoJCQk8ZyBpZD0iU1lNQk9MX1ZFUl8yLTMtMV8xXyI+DQoJCQk8L2c+DQoJCTwvZz4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfMl8yXyI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzRfMl8iPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl8zXzJfIj4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfM18xXyI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzEtMS0xXzFfIj4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfMS0xLTEiPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl8xLTEtMV8yXzJfIj4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfMS0xLTFfMiI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzEtMS0xXzJfMV8iPg0KCTwvZz4NCgk8ZyBpZD0iU3ltYm9sXy1fT3JpZ2luYWxfN18iPg0KCTwvZz4NCgk8ZyBpZD0iU3ltYm9sXy1fT3JpZ2luYWxfOF8iPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl8yLTEtMSI+DQoJPC9nPg0KCTxnIGlkPSJTWU1CT0xfVkVSXzItMi0xIj4NCgk8L2c+DQoJPGcgaWQ9IlNZTUJPTF9WRVJfMi0zLTEiPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl81LTFfMV8iPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl81LTEiPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl81LTJfMV8iPg0KCTwvZz4NCgk8ZyBpZD0iU1lNQk9MX1ZFUl81LTIiPg0KCTwvZz4NCgk8ZyBpZD0iU3ltYm9sXy1fTW9ub2Nocm9tYXRpY18xXyI+DQoJCTxnIGlkPSJfeDMzX180XyI+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==",
    nativeCurrency: {
      name: "Etherium",
      decimals: 18,
      symbol: "ETH",
    },
  },
  {
    name: "CVC",
    rpc: "https://rpc-kura.cross.technology",
    chainId: 5555,
    icon: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3203981039-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FV0mW3n7q1sGjuyyHSxIb%252Ficon%252F31md7yIE2WCI7HtdsUtu%252Fcrosstech-logo.png%3Falt%3Dmedia%26token%3D152ec430-0eeb-4448-a5b6-779a1cbd8068",
    nativeCurrency: {
      name: "CVC",
      decimals: 18,
      symbol: "CVC",
    },
  },
  // {
  //   name: "Polygon",
  //   rpc: "https://localhost:3003",
  //   chainId: 3,
  //   icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxjaXJjbGUgY3g9IjUxMiIgY3k9IjUxMiIgcj0iNTEyIiBmaWxsPSIjODI0N0U1Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTY4MS40NjkgNDAyLjQ1NkM2NjkuMTg5IDM5NS4zMTIgNjUzLjIyNCAzOTUuMzEyIDYzOS43MTYgNDAyLjQ1Nkw1NDMuOTI4IDQ1Ny4yMjhMNDc4Ljg0MiA0OTIuOTQ5TDM4My4wNTUgNTQ3LjcyMUMzNzAuNzc0IDU1NC44NjUgMzU0LjgxIDU1NC44NjUgMzQxLjMwMSA1NDcuNzIxTDI2NS4xNjIgNTA0Ljg1NkMyNTIuODgyIDQ5Ny43MTIgMjQ0LjI4NiA0ODQuNjE0IDI0NC4yODYgNDcwLjMyNVYzODUuNzg2QzI0NC4yODYgMzcxLjQ5OCAyNTEuNjU0IDM1OC40IDI2NS4xNjIgMzUxLjI1NkwzNDAuMDczIDMwOS41ODFDMzUyLjM1MyAzMDIuNDM3IDM2OC4zMTggMzAyLjQzNyAzODEuODI3IDMwOS41ODFMNDU2LjczNyAzNTEuMjU2QzQ2OS4wMTggMzU4LjQgNDc3LjYxNCAzNzEuNDk4IDQ3Ny42MTQgMzg1Ljc4NlY0NDAuNTU4TDU0Mi43IDQwMy42NDZWMzQ4Ljg3NEM1NDIuNyAzMzQuNTg2IDUzNS4zMzIgMzIxLjQ4OCA1MjEuODI0IDMxNC4zNDRMMzgzLjA1NSAyMzUuNzU4QzM3MC43NzQgMjI4LjYxNCAzNTQuODEgMjI4LjYxNCAzNDEuMzAxIDIzNS43NThMMjAwLjA3NiAzMTQuMzQ0QzE4Ni41NjcgMzIxLjQ4OCAxNzkuMTk5IDMzNC41ODYgMTc5LjE5OSAzNDguODc0VjUwNy4yMzdDMTc5LjE5OSA1MjEuNTI1IDE4Ni41NjcgNTM0LjYyMyAyMDAuMDc2IDU0MS43NjdMMzQxLjMwMSA2MjAuMzUzQzM1My41ODIgNjI3LjQ5OCAzNjkuNTQ2IDYyNy40OTggMzgzLjA1NSA2MjAuMzUzTDQ3OC44NDIgNTY2Ljc3Mkw1NDMuOTI4IDUyOS44Nkw2MzkuNzE2IDQ3Ni4yNzlDNjUxLjk5NiA0NjkuMTM1IDY2Ny45NjEgNDY5LjEzNSA2ODEuNDY5IDQ3Ni4yNzlMNzU2LjM4IDUxNy45NTNDNzY4LjY2IDUyNS4wOTggNzc3LjI1NyA1MzguMTk1IDc3Ny4yNTcgNTUyLjQ4NFY2MzcuMDIzQzc3Ny4yNTcgNjUxLjMxMiA3NjkuODg4IDY2NC40MDkgNzU2LjM4IDY3MS41NTNMNjgxLjQ2OSA3MTQuNDE5QzY2OS4xODkgNzIxLjU2MyA2NTMuMjI0IDcyMS41NjMgNjM5LjcxNiA3MTQuNDE5TDU2NC44MDUgNjcyLjc0NEM1NTIuNTI1IDY2NS42IDU0My45MjggNjUyLjUwMiA1NDMuOTI4IDYzOC4yMTRWNTgzLjQ0Mkw0NzguODQyIDYyMC4zNTNWNjc1LjEyNUM0NzguODQyIDY4OS40MTQgNDg2LjIxIDcwMi41MTIgNDk5LjcxOSA3MDkuNjU2TDY0MC45NDQgNzg4LjI0MkM2NTMuMjI0IDc5NS4zODYgNjY5LjE4OSA3OTUuMzg2IDY4Mi42OTcgNzg4LjI0Mkw4MjMuOTIyIDcwOS42NTZDODM2LjIwMyA3MDIuNTEyIDg0NC43OTkgNjg5LjQxNCA4NDQuNzk5IDY3NS4xMjVWNTE2Ljc2M0M4NDQuNzk5IDUwMi40NzQgODM3LjQzMSA0ODkuMzc3IDgyMy45MjIgNDgyLjIzMkw2ODEuNDY5IDQwMi40NTZaIi8+PC9zdmc+",
  // },
];
