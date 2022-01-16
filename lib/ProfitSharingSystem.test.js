const PSS = require('./ProfitSharingSystem');

const investor1 = 'Steve',
  investor2 = 'Dave',
  maxClaimableSession = 1;

const pss = new PSS(maxClaimableSession);

test('new session will start in only one session', () => {
  expect(pss.getCurrentSession()).toBe(1);
});

test('currentAmount will increase correctly after adding profit', () => {
  pss.addProfit(30);
  expect(pss.getProfit()[0].currentAmount).toBe(30);
});

test('totalAmount will increase correctly after adding profit', () => {
  expect(pss.getProfit()[0].totalAmount).toBe(30);
});

test('investment list will increase correctly after investor invested', () => {
  pss.invest(investor1, 100);
  pss.invest(investor2, 100);
  expect(pss.getInvestorList()[investor1].investment).toBe(100);
});

test("withdraw investment wont't work if amount is greater than investment ", () => {
  pss.withdraw(investor1, 200);
  expect(pss.getInvestorList()[investor1].investment).toBe(100);
});

test('withdraw investment will decrease correctly after investor withdrawed', () => {
  pss.withdraw(investor1, 50);
  expect(pss.getInvestorList()[investor1].investment).toBe(50);
});

test('claiming before session has ended will receive nothing', () => {
  expect(pss.claim(investor1)).toBe(0);
});

test('session number will increase correctly after go to next session', () => {
  pss.goToNextSession();
  expect(pss.getCurrentSession()).toBe(2);
});

test('profit array will unshift a new element with zero of currentAmount after go to next session', () => {
  expect(pss.getProfit()[0].currentAmount).toBe(0);
});

test('profit array will unshift a new element with zero of totalAmount after go to next session', () => {
  expect(pss.getProfit()[0].totalAmount).toBe(0);
});

test('claiming after 1st session had ended will receive profit correctly', () => {
  expect(pss.claim(investor1)).toBe(10);
});

test('isClaimed flag will be changed correctly after claimed', () => {
  expect(pss.getInvestorList()[investor1].holdPoints[1].isClaimed).toBe(true);
});

test('recieve nothing when double claiming bedore new session has settle', () => {
  expect(pss.claim(investor1)).toBe(0);
});

test('currentAmount will decrease correctly after claimed', () => {
  expect(pss.getProfit()[1].currentAmount).toBe(20);
});

test('receives nothing after session has expired (maxClaimableSession is 1 in this test)', () => {
  pss.goToNextSession();
  expect(pss.claim(investor2)).toBe(0);
});
