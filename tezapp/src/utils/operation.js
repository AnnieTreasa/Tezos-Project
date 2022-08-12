// TODO 6 - Call buy_ticket entrypoint in the Lottery contract
import { tezos } from "./tezos";

export const giveFundOperation = async () => {
  try {
    const contractInstance = await tezos.wallet.at("KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA");
    const op = await contractInstance.methods.add_transaction2("t00001","u00001","tz100001","p00001",1000,"Nuv superrraa",10).send({
      amount: 1,
      mutez: false,
    });
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};

// TODO 10 - Call end_game entrypoint in the Lottery contract

