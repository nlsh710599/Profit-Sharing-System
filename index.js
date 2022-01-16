// Example
const PSS = require('./lib/ProfitSharingSystem');

// Suppose MaxClaimableSession = 1
const pss = new PSS(1);

// Session 1

// invest 10 by Steve
pss.invest('Steve', 10);

// addProfit 20
pss.addProfit(20);

// invest 15 by Dave
pss.invest('Dave', 15);

// addProfit 30
pss.addProfit(30);

// invest 25 by Dave
pss.invest('Dave', 25);

// claim by Dave       Receives nothing
pss.claim('Dave');

// Session 2
pss.goToNextSession();

// claim by Dave       Receives 40
pss.claim('Dave');

// Session 3
pss.goToNextSession();

// invest 20 by Steve
pss.invest('Steve', 20);

// claim by Steve      Receives nothing, no profit from session 2, profit from session 1 has expired
pss.claim('Steve');

// addProfit 35
pss.addProfit(35);

// Session 4
pss.goToNextSession();

// claim by Steve / / Receives 15
pss.claim('Steve');

// claim by Dave / / Receives 20
pss.claim('Dave');
