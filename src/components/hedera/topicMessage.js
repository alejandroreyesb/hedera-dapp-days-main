import { TopicMessageSubmitTransaction } from "@hashgraph/sdk";

async function topicMessageFcn(walletData, accountId, tId) {
	
	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);


	//Create the transaction
	const topicMessageTx = await new TopicMessageSubmitTransaction()
		.setTopicId("0.0.7325477")
		.setMessage("hello, HCS! ")
		.freezeWithSigner(signer);

	//v2.0.0

	const topicMessageSubmit = await topicMessageTx.executeWithSigner(signer);
	const topicMessageRx = await provider.getTransactionReceipt(topicMessageSubmit.transactionId);

	const topicMessage = topicMessageTx.getMessage();
	console.log(`- New topic message ${topicMessage}`);

	return [topicMessage];
}

export default topicMessageFcn;
