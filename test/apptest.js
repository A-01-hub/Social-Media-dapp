const { expect, assert } = require("chai");
const { ether, ethers } = require("hardhat");
describe("appcontract", function () {
  let App;
  let app;
  let owner;
  const notmytweet = 5;
  const mytweet = 3;
  let totaltweet;
  let totalnumberofmytweet;
  beforeEach(async function () {
    const App = await ethers.getContractFactory("appcontract");
    [owner, address1, address2] = await ethers.getSigners(); //it help to in authentication
    app = await App.deploy();

    totaltweet = [];
    totalnumberofmytweet = [];
    for (let i = 0; i < notmytweet; i++) {
      let tweet = {
        TWEET: "random text along id :-" + i,
        USERNAME: address1,
        deleted: false,
      };
      await app.connect(address1).addtweet(tweet.TWEET, tweet.deleted);
      totaltweet.push(tweet);
      // not my tweet(8) tweet  add in address one //msg.sender help to address
    }
    for (let i = 0; i < mytweet; i++) {
      let tweet = {
        TWEET: "random text along id :-" + (notmytweet + i),
        USERNAME: owner,
        deleted: false,
      };
      await app.addtweet(tweet.TWEET, tweet.deleted);
      totaltweet.push(tweet);
      // my tweet(4) tweet  add in address one //msg.sender help to address
      totalnumberofmytweet.push(tweet);
    }
  });
  describe("add Tweet", function () {
    it("emit addtweet event ", async function () {
      let tweet = {
        TWEET: "my tweet ",
        deleted: false,
      };
      await expect(await app.addtweet(tweet.TWEET, tweet.deleted))
        .to.emit(app, "ADDTWEET")
        .withArgs(owner.address, notmytweet + mytweet);
      // to tell other people about tweet
    });
  });

  describe("get tweet ", function () {
    it("get all the tweet posted ", async function () {
      const tweetpresentinblockchain = await app.showalltweet();
      assert.equal(tweetpresentinblockchain.length, notmytweet + mytweet);
    });
    it(" return all my tweet", async function () {
      const mytweetinblockchain = await app.getallmytweet();
      expect(mytweetinblockchain.length).to.equal(mytweet);
    });
  });
  describe("deleted my tweet", function () {
    it("should emit delete tweet event", async function () {
      const TWEET_ID = 0;
      const tweet_delete = true;
      await expect(app.connect(address1).getdeletetweet(TWEET_ID, tweet_delete))
        .to.emit(app, "DELETE_TWEET")
        .withArgs(TWEET_ID, tweet_delete);
    });
  });
});
