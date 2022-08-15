// TODO 6 - Call buy_ticket entrypoint in the Lottery contract
import { tezos } from "./tezos";

export const giveFundOperation = async (from_uuid,from_address,to_puid,amount,comment) => {
  try {
    const contractInstance = await tezos.wallet.at("KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA");
    const op = await contractInstance.methods.add_transaction1(from_uuid,from_address,to_puid,amount,comment).send({
      amount: amount,
      mutez: false,
    });
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};

// TODO 10 - add users

export const addNewUseraoperation = async (uuid,email) => {
  
    
    try {
    const contractInstance = await tezos.wallet.at("KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA");
    contractInstance.methods.add_user(uuid,email)
    } catch (err) {
      throw err;
    }
 
};

// add profile

export const addprofileOperation= async (uuid,email) => {
  
  
  try {
    const contractInstance = await tezos.wallet.at("KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA");
   contractInstance.methods.add_applic(uuid,email);
    } catch (err) {
      throw err;
    }
  

};
