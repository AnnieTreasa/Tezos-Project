import smartpy as sp

class FundChain(sp.Contract):
    def __init__(self):
        self.init(
        users = sp.map(
                            #uuid
                            tkey=sp.TString,
                            tvalue=sp.TRecord(
                                    uuid=sp.TString,
                                    datetime=sp.TTimestamp,
                                    donated_mutez=sp.TMutez,
                                    email = sp.TString,
                                    applic= sp.TList(sp.TString),
                                    org_xp = sp.TInt,
                                    user_xp = sp.TInt,
                                )
                            ),
        transactions=sp.map(
                                #uuid or puid
                                tkey=sp.TString,
                                tvalue=sp.TList(
                                    sp.TRecord(
                                        transid = sp.TString,
                                        type = sp.TNat,
                                        from_uuid=sp.TString,
                                        from_address=sp.TAddress,
                                        to_puid=sp.TString,
                                        to_address=sp.TAddress,
                                        amount = sp.TMutez,
                                        comment=sp.TString,
                                        timestamp=sp.TTimestamp,
                                        downvotes = sp.TNat,
                                        claimable = sp.TNat
                                        # verified = sp.TBool,
                                    )
                                )
                            ),
        applic=sp.map(
                    # puid
                    tkey=sp.TString,
                    tvalue=sp.TRecord(
                        owner_uuid = sp.TString,
                        name = sp.TString,
                        company = sp.TString,
                        description = sp.TString,
                        company_type = sp.TString,
                        goal=sp.TMutez,
                        timestamp=sp.TTimestamp,
                        received_mutez=sp.TMutez,
                        goal_reached=sp.TBool,
                        address = sp.TAddress,
                        pictures = sp.TList(sp.TString),
                        proposal_ppt = sp.TString,
                        proposal_video = sp.TString,
                        deadline = sp.TTimestamp,
                        locked_fund = sp.TMutez,
                        upvotes = sp.TList(sp.TString),
                        downvotes =sp.TList(sp.TString),
                        # supports=sp.TNat,
                        # reports=sp.TNat,
                        # verified=sp.TBool
                    )
                ),
        total_fund=sp.mutez(0),
        total_donors = sp.nat(0),
        total_goals_reached=sp.nat(0),
        total_fundings=sp.nat(0),
        locked_funds=sp.mutez(0)
        )

    @sp.entry_point
    def add_user(self,params):
            sp.set_type(params.uuid,sp.TString)
            sp.set_type(params.email,sp.TString)
            sp.verify(self.data.users.contains(params.uuid)==False)
            self.data.users[params.uuid]=sp.record(
                uuid=params.uuid,
                datetime=sp.now,
                donated_mutez=sp.mutez(0),
                email = params.email,
                applic= sp.list([]),
                org_xp = sp.int(0),
                user_xp = sp.int(0)
            )
            self.data.transactions[params.uuid] = sp.list([])

    @sp.entry_point
    def add_transaction1(self,params):
    #   params = from_uuid,from_address,to_puid,amount,comment
            sp.set_type(params.from_uuid,sp.TString)
            sp.set_type(params.from_address,sp.TAddress)
            sp.set_type(params.to_puid,sp.TString)
            sp.set_type(params.amount,sp.TMutez)
            sp.set_type(params.comment,sp.TString)
            sp.set_type(params.transid,sp.TString)
            sp.verify(self.data.users.contains(params.from_uuid) == True)
            sp.verify(self.data.applic.contains(params.to_puid) == True)
            sp.verify(self.data.applic[params.to_puid].goal_reached == False)
            sp.verify(self.data.applic[params.to_puid].owner_uuid != params.from_uuid)
            sp.send(self.data.applic[params.to_puid].address, params.amount, message = "HELLO")
            self.data.transactions[params.from_uuid].push(sp.record(
                transid = params.transid,
                type = 1,
                from_uuid=params.from_uuid,
                from_address=params.from_address,
                to_puid=params.to_puid,
                to_address= self.data.applic[params.to_puid].address,
                amount = params.amount, 
                comment= params.comment,
                timestamp= sp.now,
                downvotes = 0,
                claimable = 0,
                # verified = True,
            ))
            self.data.transactions[params.to_puid].push(sp.record(
                transid = params.transid,
                type = 1,
                from_uuid=params.from_uuid,
                from_address=params.from_address,
                to_puid=params.to_puid,
                to_address=self.data.applic[params.to_puid].address,
                amount = params.amount,
                comment= params.comment,
                timestamp=sp.now,
                downvotes = 0,
                claimable = 0,
                # verified = True,
            ))
            # sp.send(self.data.applic[params.to_puid].address, params.amount, message = None)
            sp.if self.data.users[params.from_uuid].donated_mutez == sp.mutez(0):
                self.data.total_donors += 1

            self.data.applic[params.to_puid].received_mutez += params.amount
            self.data.users[params.from_uuid].donated_mutez += params.amount
            self.data.total_fund += params.amount
            self.data.total_fundings += 1
            self.data.users[params.from_uuid].user_xp = sp.to_int(sp.fst(sp.ediv(self.data.users[params.from_uuid].donated_mutez,sp.mutez(100000)).open_some()))

            sp.if self.data.applic[params.to_puid].received_mutez > self.data.applic[params.to_puid].goal:
                self.data.applic[params.to_puid].goal_reached = True
                sp.if self.data.applic[params.to_puid].goal_reached == False :
                    self.data.total_goals_reached += 1
                self.data.users[self.data.applic[params.to_puid].owner_uuid].org_xp = sp.to_int(sp.fst(sp.ediv(self.data.applic[params.to_puid].received_mutez,sp.mutez(10000000)).open_some()))

    @sp.entry_point
    def add_transaction2(self,params):
        sp.set_type(params.from_uuid,sp.TString)
        sp.set_type(params.from_address,sp.TAddress)
        sp.set_type(params.to_puid,sp.TString)
        sp.set_type(params.amount,sp.TMutez)
        sp.set_type(params.comment,sp.TString)
        sp.set_type(params.downvotes,sp.TNat)
        sp.set_type(params.transid,sp.TString)
        sp.verify(self.data.users.contains(params.from_uuid) == True)
        sp.verify(self.data.applic.contains(params.to_puid) == True)
        sp.verify(self.data.applic[params.to_puid].goal_reached == False)
        sp.verify(self.data.applic[params.to_puid].owner_uuid != params.from_uuid)
        self.data.transactions[params.from_uuid].push(sp.record(
            transid = params.transid,
            type = 2,
            from_uuid=params.from_uuid,
            from_address=params.from_address,
            to_puid=params.to_puid,
            to_address= self.data.applic[params.to_puid].address,
            amount = params.amount, 
            comment= params.comment,
            timestamp= sp.now,
            downvotes = params.downvotes,
            claimable = 1,
            # verified = False,
        ))
        self.data.transactions[params.to_puid].push(sp.record(
            transid = params.transid,
            type = 2,
            from_uuid=params.from_uuid,
            from_address=params.from_address,
            to_puid=params.to_puid,
            to_address=self.data.applic[params.to_puid].address,
            amount = params.amount,
            comment= params.comment,
            timestamp=sp.now,
            downvotes = params.downvotes,
            claimable = 1,
            # verified = False,
        ))
        sp.if self.data.users[params.from_uuid].donated_mutez == sp.mutez(0):
            self.data.total_donors += 1

        self.data.applic[params.to_puid].locked_fund += params.amount
        # self.data.total_fund += params.amount
        self.data.total_fundings += 1
        self.data.locked_funds += params.amount

    @sp.entry_point
    def add_applic(self,params):
        sp.verify(self.data.applic.contains(params.puid) == False)
        sp.set_type(params.name,sp.TString)
        sp.set_type(params.description,sp.TString)
        sp.set_type(params.company,sp.TString)
        sp.set_type(params.company_type,sp.TString)
        sp.set_type(params.proposal_ppt,sp.TString)
        sp.set_type(params.proposal_video,sp.TString)
        sp.set_type(params.uuid,sp.TString)
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.goal,sp.TMutez)
        sp.set_type(params.deadline,sp.TTimestamp)
        sp.set_type(params.address,sp.TAddress)
        sp.set_type(params.pictures,sp.TList(sp.TString))

        self.data.applic[params.puid]=sp.record(
            owner_uuid = params.uuid,
            name = params.name,
            company = params.company,
            description = params.description,
            company_type = params.company_type,
            proposal_ppt=params.proposal_ppt,
            proposal_video=params.proposal_video,
            goal=params.goal,
            timestamp=sp.now,
            received_mutez=sp.mutez(0),
            goal_reached=sp.bool(False),
            address = params.address,
            pictures = params.pictures,
            deadline = params.deadline,
            locked_fund = sp.mutez(0),
            upvotes = sp.list([]),
            downvotes = sp.list([]),
        )
        self.data.transactions[params.puid] = sp.list([])
        self.data.users[params.uuid].applic.push(params.puid)

    @sp.entry_point
    def support(self,params):
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.uuid,sp.TString)
        sp.verify(self.data.users.contains(params.uuid) == True)
        sp.verify(self.data.applic.contains(params.puid) == True)
        self.data.applic[params.puid].upvotes.push(params.uuid)
        self.data.users[self.data.applic[params.puid].owner_uuid].org_xp += 5

    @sp.entry_point
    def report(self,params):
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.uuid,sp.TString)
        sp.verify(self.data.users.contains(params.uuid) == True)
        sp.verify(self.data.applic.contains(params.puid) == True)
        self.data.applic[params.puid].downvotes.push(params.uuid)
        self.data.users[self.data.applic[params.puid].owner_uuid].org_xp -= 5       

    @sp.entry_point
    def claim(self,params):
        sp.set_type(params.uuid,sp.TString)
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.transid,sp.TString)
        sp.for i in self.data.transactions[params.puid]:
            sp.if i.transid == params.transid:
                sp.verify(params.uuid == self.data.applic[params.puid].owner_uuid)
                sp.verify(self.data.applic[params.puid].goal_reached == False)
                sp.if self.data.applic[params.puid].deadline <= sp.now:
                    sp.if sp.len(self.data.applic[params.puid].downvotes) < i.downvotes:
                        sp.if i.claimable == 1:
                            sp.send(self.data.applic[params.puid].address, i.amount, message = "HELLO")
                            self.data.locked_funds -= i.amount
                            self.data.applic[params.puid].received_mutez += i.amount
                            self.data.total_fund += i.amount
                            self.data.users[i.from_uuid].donated_mutez += i.amount
                            self.data.users[i.from_uuid].user_xp = sp.to_int(sp.fst(sp.ediv(self.data.users[i.from_uuid].donated_mutez,sp.mutez(200000)).open_some()))
                            i.claimable = 0
                            sp.if self.data.applic[i.to_puid].received_mutez > self.data.applic[i.to_puid].goal:
                                self.data.applic[i.to_puid].goal_reached = True
                                sp.if self.data.applic[i.to_puid].goal_reached == False :
                                    self.data.total_goals_reached += 1
                                self.data.users[self.data.applic[params.puid].owner_uuid].org_xp = sp.to_int(sp.fst(sp.ediv(self.data.applic[params.puid].received_mutez,sp.mutez(1000000)).open_some()))
                            sp.trace("Claimed Succefully")
    @sp.entry_point
    def reclaim(self,params):
        sp.set_type(params.uuid,sp.TString)
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.transid,sp.TString)
        sp.set_type(params.address,sp.TAddress)
        sp.for i in self.data.transactions[params.puid]:
            sp.if i.transid == params.transid:
                sp.verify(params.uuid == i.from_uuid)
                sp.if self.data.applic[params.puid].deadline <= sp.now:
                    sp.if sp.len(self.data.applic[params.puid].downvotes) >= i.downvotes:
                        sp.if i.claimable == 1:
                            sp.send(params.address, sp.split_tokens(i.amount, 8, 10), message = "HELLO")
                            self.data.locked_funds -= sp.split_tokens(i.amount, 8, 10)
                            self.data.applic[params.puid].locked_fund -= sp.split_tokens(i.amount, 8, 10)
                            i.claimable = 0
                            sp.trace("Reclaimed Succefully")

    @sp.add_test(name = "fc testing")
    def test():
        scenario = sp.test_scenario()

        fc = FundChain()
        fc.set_initial_balance(sp.mutez(1000000))
        scenario += fc
        scenario += fc.add_user(uuid = "u00001",email = "user1@gmail.com")
        scenario += fc.add_user(uuid = "u00002",email = "user2@gmail.com")
        scenario += fc.add_user(uuid = "u00003",email = "user3@gmail.com")
        scenario += fc.add_applic(uuid = "u00002",puid = "p00001",name="ASD",description="ASD",company="nsd",company_type="Education",goal = sp.mutez(100000),address=sp.address("tz100002"),pictures = ["12123233","12312414"],proposal_ppt="abc",proposal_video="abc",deadline =sp.timestamp(1631039400))
        scenario += fc.add_transaction2(transid="t00001",from_uuid="u00001",from_address=sp.address("tz100001"),to_puid="p00001",amount = sp.mutez(1000),comment="Nuv superrraa",downvotes=10)
        scenario += fc.reclaim(uuid ="u00001",address=sp.address("tz1234343"), puid = "p00001",transid = "t00001")
        scenario += fc.claim(uuid="u00002" ,puid = "p00001",transid = "t00001")
        scenario += fc.add_transaction1(transid="t00001",from_uuid="u00001",from_address=sp.address("tz100001"),to_puid="p00001",amount = sp.mutez(50000),comment="Nuv superrraa")
        scenario += fc.add_transaction1(transid="t00001",from_uuid="u00001",from_address=sp.address("tz100001"),to_puid="p00001",amount = sp.mutez(50000),comment="Nuv superrraa")
