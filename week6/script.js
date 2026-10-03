const state = {
    selectedTier: 'safe',
    gas: { safe: null, standard: null, fast: null },
    ethPrice: null
  };

  const els = {
    tiers: document.getElementById('tiers'),
    gasLimit: document.getElementById('gas-limit'),
    ethPrice: document.getElementById('eth-price'),
    resultEth: document.getElementById('result-eth'),
    resultUsd: document.getElementById('result-usd'),
    selectedLabel: document.getElementById('selected-tier-label'),
    status: document.getElementById('status'),
    refresh: document.getElementById('refresh'),
  };

  // Tier click handling
  els.tiers.addEventListener('click', (e) => {
    const tierEl = e.target.closest('.tier');
    if (!tierEl) return;
    document.querySelectorAll('.tier').forEach(t => t.classList.remove('selected'));
    tierEl.classList.add('selected');
    state.selectedTier = tierEl.dataset.tier;
    els.selectedLabel.textContent = tierEl.dataset.tier[0].toUpperCase() + tierEl.dataset.tier.slice(1) + ' tier';
    calculate();
  });

  els.gasLimit.addEventListener('input', calculate);
  els.ethPrice.addEventListener('input', calculate);

  function calculate() {
    const gasLimitVal = parseFloat(els.gasLimit.value) || 0;
    const gweiVal = state.gas[state.selectedTier];
    const ethPriceVal = parseFloat(els.ethPrice.value) || state.ethPrice || 0;

    if (gweiVal == null) return;

    const costEth = (gweiVal * gasLimitVal) / 1e9;
    const costUsd = costEth * ethPriceVal;

    els.resultEth.textContent = costEth.toFixed(6) + ' ETH';
    els.resultUsd.textContent = '$' + costUsd.toFixed(2);
  }

  async function loadGasPrices() {

    try {
      const res = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`);
      const data = await res.json();

      if (data.status !== '1') throw new Error(data.result || 'API error');

      state.gas.safe = parseFloat(data.result.SafeGasPrice);
      state.gas.standard = parseFloat(data.result.ProposeGasPrice);
      state.gas.fast = parseFloat(data.result.FastGasPrice);

      document.getElementById('safe-value').innerHTML = state.gas.safe + '<span class="tier-unit">gwei</span>';
      document.getElementById('standard-value').innerHTML = state.gas.standard + '<span class="tier-unit">gwei</span>';
      document.getElementById('fast-value').innerHTML = state.gas.fast + '<span class="tier-unit">gwei</span>';

      els.status.textContent = 'Live from Etherscan';
      calculate();
    } catch (err) {
      // Fallback: mock values so the UI still demonstrates itself without a key
      state.gas = { safe: 18, standard: 24, fast: 32 };
      document.getElementById('safe-value').innerHTML = '18<span class="tier-unit">gwei</span>';
      document.getElementById('standard-value').innerHTML = '24<span class="tier-unit">gwei</span>';
      document.getElementById('fast-value').innerHTML = '32<span class="tier-unit">gwei</span>';

      els.status.innerHTML = 'Showing sample data — add your Etherscan API key in the script <span class="status error"></span>';
      els.status.classList.add('error');
      calculate();
    }
  }

  async function loadEthPrice() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await res.json();
      state.ethPrice = data.ethereum.usd;
      els.ethPrice.value = state.ethPrice.toFixed(2);
      calculate();
    } catch (err) {
      state.ethPrice = 2500; // fallback placeholder
      els.ethPrice.value = state.ethPrice.toFixed(2);
      calculate();
    }
  }

  loadGasPrices();
  loadEthPrice();