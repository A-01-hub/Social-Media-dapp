// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract appcontract {
    event ADDTWEET(address costumer, uint256 tweetid);
    event DELETE_TWEET(uint256 tweetid, bool deleted);
    struct USER {
        uint256 id;
        address USERNAME; //metamask account address
        string TWEET; // message
        bool deleted;
    }
    USER[] private tweet;
    mapping(uint256 => address) tweetowner;

    function addtweet(string memory TWEET, bool deleted) external {
        uint256 tweetid = tweet.length;
        tweet.push(USER(tweetid, msg.sender, TWEET, deleted));
        tweetowner[tweetid] = msg.sender;
        emit ADDTWEET(msg.sender, tweetid);
    }

    function showalltweet() external view returns (USER[] memory) {
        USER[] memory temporary = new USER[](tweet.length);
        uint count = 0;
        for (uint i = 0; i < tweet.length; i++) {
            if (tweet[i].deleted == false) {
                temporary[count] = tweet[i];
                count++;
            }
        }
        USER[] memory result = new USER[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getallmytweet() external view returns (USER[] memory) {
        USER[] memory temporary = new USER[](tweet.length);
        uint count = 0;
        for (uint i = 0; i < tweet.length; i++) {
            if (tweetowner[i] == msg.sender && tweet[i].deleted == false) {
                temporary[count] = tweet[i];
                count++;
            }
        }
        USER[] memory result = new USER[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getdeletetweet(uint256 tweetid, bool deleted) external {
        if (tweetowner[tweetid] == msg.sender) {
            tweet[tweetid].deleted = deleted;
            emit DELETE_TWEET(tweetid, deleted);
        }
    }
}
