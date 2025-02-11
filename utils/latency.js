// Function to simulate high latency
function simulateLatency(min = 0, max = 5000) {
    const latency = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, latency));
  }

module.exports = simulateLatency;
