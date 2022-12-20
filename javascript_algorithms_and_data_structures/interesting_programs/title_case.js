function titleCase(str) {
  let s = str.split(" ");
  let arr = [];
  for (let i = 0; i < s.length; i ++) {
    let wlarray = s[i].toLowerCase().split("");
    console.log(wlarray);
    let rep = wlarray.shift();
    wlarray.unshift(rep.toUpperCase())
    arr.push(wlarray.join(""));
  }
    return (arr.join(" "));
}

titleCase("I'm a little tea pot");

// my solution. could probably make a lot more streamlined but like the way I wrestled it out

// Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

// For the purpose of this exercise, you should also capitalize connecting words like the and of.
