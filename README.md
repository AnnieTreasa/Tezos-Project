# Tezos-Project

program code in branch master

**deployed app link** : https://neon-sunshine-71e5cf.netlify.app/  
**video** : https://drive.google.com/file/d/1XLuIm_ZdujeYjXhoqh2q-WPWfkTmqIjO/view?usp=sharing
#### Contract address : KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA
https://api.ghostnet.tzkt.io/v1/contracts/KT1AdnJw5wbdH2o3f3mBcamgmd1t7hhKSWqA/storage

# My Simple TezFunds

A decentralized fundraising application for empowering budding women entrepreneurs. The application sets a platform for women to showcase their works. Investors can fund the entrepreneurs whose profiles they find appealing.

## How does it work?

The following are the prominent features of this app:
#### Add Project Profile:
This function lets you add your project profile onto the app and give descriptions about the same.
#### Invest:
This function provides you with a list of projects that you can invest in.
#### Display Transactions:
This function gives you the details of all the transactions regarding a project you are investing in or a project of yours that has received investments. 

## Smart Contract Entrypoints
1. **add_applic**( address address, string company, string company_type, timestamp deadline, string description)
2. **add_transaction1**( mutez amount, string comment, address from_address, string from_uuid, string to_uuid)
3. **add_transaction2**( mutez amount, string comment, nat downvotes, adress from_address, string from_uuid)
4. **add_user**( string email, string uuid)
5. **claim**( string puid, string transid, string uuid)
6. **reclaim**( address address, string puid, string transid, string uuid)
7. **report**( string puid,string uuid)
8. **support**( string puid, string uuid)
