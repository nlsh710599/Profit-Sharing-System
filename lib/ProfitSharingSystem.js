module.exports = class ProfitSharingSystem {
  constructor(maxClaimableSession) {
    // maxClaimableSession record the farest session which investors can claim
    this.maxClaimableSession = maxClaimableSession;

    // this.profit is an array to record totalAmount and currentAmount in each session
    // NOTICE: we implement this array in reverse-direction
    // i.e. the latest session is this.profit[0]
    // and the oldest session is this.profit[this.profit.length - 1]
    this.profit = [{ totalAmount: 0, currentAmount: 0 }];

    // a variable makes calculating hold points eazier
    this.totalInvestment = 0;

    // {
    //   Steve: {
    //     investment: 30,
    //     holdPoints: [
    //       { isClaimed: false, amount: 0 },
    //       { isClaimed: true, amount: 15 },
    //       { isClaimed: true, amount: 0 },
    //       { isClaimed: false, amount: 10 },
    //     ],
    //   },
    //   Dave: {
    //     investment: 40,
    //     holdPoints: [
    //       { isClaimed: false, amount: 0 },
    //       { isClaimed: false, amount: 20 },
    //       { isClaimed: false, amount: 0 },
    //       { isClaimed: true, amount: 40 },
    //     ],
    //   },
    // };
    // as example above this object record every investor, their investment and theit claimable amount in each sessions
    // NOTICE: this holdPoints array is also in reverse-direction just like this.profit
    this.investorList = {};
  }

  // add profit to latest session
  addProfit(amount) {
    this.profit[0].totalAmount += amount;
    this.profit[0].currentAmount += amount;
  }

  // add investment to investor object and initialize if investor is new
  invest(investor, investment) {
    if (this.investorList[investor]) {
      this.investorList[investor].investment += investment;
    } else {
      this.investorList[investor] = {
        investment,
        holdPoints: new Array(Math.min(this.maxClaimableSession, this.getCurrentSession())).fill(0).map(() => {
          return { isClaimed: false, amount: 0 };
        }),
      };
    }
    this.totalInvestment += investment;
  }

  // withdraw investment by investors
  withdraw(investor, amount) {
    if (this.investorList[investor] && this.investorList[investor].investment >= amount) {
      this.investorList[investor].investment -= amount;
      this.totalInvestment -= amount;
    }
  }

  // return profit to investor when claimed
  claim(investor) {
    let totalClaimedAmount = 0;

    // check if investor is exist
    if (this.investorList[investor]) {
      // start from the session before latest since latest one is not settled yet
      for (let i = 1; i <= this.maxClaimableSession; i++) {
        // the profit is claimable only one time thus we check isClaimed
        if (this.investorList[investor].holdPoints[i] && !this.investorList[investor].holdPoints[i].isClaimed) {
          let partialClaimedAmount = this.investorList[investor].holdPoints[i].amount;
          totalClaimedAmount += partialClaimedAmount;
          this.investorList[investor].holdPoints[i].isClaimed = true;
          this.profit[i].currentAmount -= partialClaimedAmount;
        }
      }
    }
    return totalClaimedAmount;
  }

  // settle all profit to investors and move to next session
  goToNextSession() {
    for (const investor in this.investorList) {
      // distribute their profit according to their hold points
      this.investorList[investor].holdPoints[0].amount = this.profit[0].totalAmount * this.investRatio(investor);
      // create a new hold points array element for new session just start
      this.investorList[investor].holdPoints.unshift({ isClaimed: false, amount: 0 });

      while (this.investorList[investor].holdPoints.length > this.maxClaimableSession + 1) {
        this.investorList[investor].holdPoints.pop();
      }
    }
    // create a new profit array element for new session just start
    this.profit.unshift({ totalAmount: 0, currentAmount: 0 });

    while (this.profit.length > this.maxClaimableSession + 1) {
      this.profit.pop();
    }
  }

  getCurrentSession() {
    return this.profit.length;
  }

  getProfit() {
    return this.profit;
  }

  getInvestorList() {
    return this.investorList;
  }

  investRatio(investor) {
    if (this.totalInvestment === 0) return 0;
    if (!this.investorList[investor].investment) return 0;
    return this.investorList[investor].investment / this.totalInvestment;
  }
};
