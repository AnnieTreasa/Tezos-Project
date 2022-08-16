// TODO 6 - Call buy_ticket entrypoint in the Lottery contract
import { tezos } from "./tezos";

export const giveFundOperation = async (transid,from_uuid,from_address,to_puid,amount,comment) => {
  try {
    transid = transid + 1;
    const contractInstance = await tezos.wallet.at("KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA");
    const op = await contractInstance.methods.add_transaction1(String(transid),from_uuid,from_address,to_puid,amount,comment).send({
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
    contractInstance.methods.add_user(email,uuid)
    } catch (err) {
      throw err;
    }
 
};

// add profile

export const addprofileOperation= async (name, desc, comp, comp_t, ppt, video, puuid, puid, goal, dl, addr, pic) => {
  
  
  try {
    const contractInstance = await tezos.wallet.at("KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA");
   contractInstance.methods.add_applic(name, desc, comp, comp_t, ppt, video, puuid, puid, goal, dl, addr, pic);
    } catch (err) {
      throw err;
    }
  

};
