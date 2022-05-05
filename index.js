const {
    Client,
    PrivateKey,
    TopicMessageQuery,
    AccountId,
    TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
    let client;

    try {
        client = Client.forName(process.env.HEDERA_NETWORK).setOperator(
            AccountId.fromString(process.env.MY_ACCOUNT_ID),
            PrivateKey.fromString(process.env.MY_PRIVATE_KEY)
        );
    } catch (error) {
        throw new Error(
            "Environment variables HEDERA_NETWORK, ACCOUNT_ID, and PRIVATE_KEY are required."
        );
    }
    const topicId = "0.0.34254689";
    //Create the query
    new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(client, (message) =>
            console.log(Buffer.from(message.contents, "utf8").toString())
        );
    //Create the transaction
    const transaction = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: "Tune.FM",
    }).execute(client);
}

void main();
