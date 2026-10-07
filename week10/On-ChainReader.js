
const alchemyURL = `${ALCHEMY_URL}`
//Initialize the provider
const provider = new ethers.providers.JsonRpcProvider(alchemyURL);

const addressInput = document.getElementById("address");
const statusEl = document.getElementById("status");

async function fetchData() {
    const address = addressInput.value.trim();
    statusEl.className = "";

    // Validate before hitting the network
    if (!ethers.utils.isAddress(address)) {
        statusEl.className = "error";
        statusEl.textContent = "That is not a valid Ethereum address.";
        return;
    }

    statusEl.textContent = "Connecting...";

    try {

        // Connect to the network
        const network = await provider.getNetwork();
        // Fetch the current block number
        const blockNumber = await provider.getBlockNumber();

        // Fetch the balance (returned as a BigNumber in wei) and convert to ETH
        const balanceWei = await provider.getBalance(address);
        const balanceEth = ethers.utils.formatEther(balanceWei);

        document.getElementById("network").textContent = `${network.name} (chainId ${network.chainId})`;
        document.getElementById("block").textContent = blockNumber.toLocaleString();
        document.getElementById("balance").textContent = `${balanceEth} ETH`;
        statusEl.textContent = "Done.";

        console.log({ network: network.name, blockNumber, balanceEth });

    } catch (err) {
        console.error(err);
        statusEl.className = "error";
        statusEl.textContent = "Could not reach the network. Check your connection or try another RPC URL.";
    }

}

document.getElementById("fetchBtn").addEventListener("click", fetchData);
fetchData(); // run once on page load



