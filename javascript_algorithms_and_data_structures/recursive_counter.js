function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown(i) {
  await sleep(1);
  console.log(i)
  if (i >= 10000) {  // base case
      return;
  } else {     // recursive case
      countdown(i + 1);
  }
}

countdown(0)
