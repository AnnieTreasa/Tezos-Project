// TODO 8 - Fetch lottery contract storage

import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA/storage"
  );
  return res.data;
};
