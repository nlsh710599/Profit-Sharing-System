# Profit Sharing System

## Getting Started

This repository is a lightweight library of profit sharing system. It helps you to share profit with investors and more features are described as below.

+ Share profit per session. Investors with shareholding can claim their session profit after the session has ended.
+ During each session, you may addProfit one or more times.
+ Investors can invest, withdraw many times during a session, but we only consider the share status at the end of the session.
+ The session profit will expire in MaxClaimableSession sessions (which can be setted by you when initiating)

### Prerequisites

Before you start using the Profit Sharing System library. You need to install npm for helping you to get modules you need

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

After you have installed npm, do the following steps to setup the repo on your device

1. . Clone the repo
   ```sh
   git clone https://github.com/nlsh710599/Profit-Sharing-System.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
## Run unit test

```shell
npm run test
```
