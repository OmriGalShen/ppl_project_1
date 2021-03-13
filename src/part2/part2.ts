import * as R from "ramda";

/*
    helper function stringToArray which takes a string and returns an array of the
    characters that make up the string. For example:
    stringToArray("Hello!"); // ==> [ 'H', 'e', 'l', 'l', 'o', '!' ]
*/
const stringToArray = R.split("");

/* Question 1 */
/*
    Write a function countVowels that takes a string as input and returns the number of vowels in the text.
    Reminder: vowels are one of ‘a’, ‘e’, ‘i’, ‘o’, ‘u’, either uppercase or lowercase. For example:
    countVowels("This is SOME Text"); // ==> 5 
*/
export const countVowels: (str: string) => number = (str: string) =>
  R.filter(checkVowel, stringToArray(str)).length;

const checkVowel: (ch: string) => boolean = (ch: string) => {
  const vowelList: string[] = ["a", "e", "i", "o", "u"];
  return vowelList.includes(ch.toLowerCase());
};

// console.log(countVowels("This is SOME Text"));

/* Question 2 */
/*
    Write a function runLengthEncoding which takes a string as input and returns a “compressed” version of
    it, where identical consecutive characters appear as the character followed by its count. For example:
    runLengthEncoding("aaaabbbccd"); // ==> 'a4b3c2d'

*/

//"aaaabbbccd"==> [ 'aaaa', 'bbb', 'cc', 'd' ]
const f1: (str: string) => string[] = (str: string) =>
  R.groupWith(R.equals, str);

//[ 'aaaa', 'bbb', 'cc', 'd' ] ==> [ 'a4', 'b3', 'c2', 'd1' ]
const f2: (arr: string[]) => string[] = (arr: string[]) =>
  R.map((x: string) => x.charAt(0) + x.length.toString(), arr);

//[ 'a4', 'b3', 'c2', 'd1' ] ==> a4b3c2d1
const f3: (arr: string[]) => string = (arr: string[]) => R.join("", arr);

export const runLengthEncoding: (str: string) => string = R.pipe(f1, f2, f3);

// console.log(runLengthEncoding("aaaabbbccd"));

/* Question 3 */
/*
    Write a function isPaired that takes a string and returns whether the parentheses ({, }, (, ), [, ]) in the
    string are paired. For example:
    isPaired("This is ([some]) {text}"); // ==> true
    isPaired("This is ]some[ (text)"); // ==> false
*/

type Parentheses = Record<string, string>;

const parentheses: Parentheses = { "{": "}", "(": ")", "[": "]" };

const isPera: (ch: string) => boolean = (ch: string) =>
  R.indexOf(ch, Object.keys(parentheses)) != -1 ||
  R.indexOf(ch, Object.values(parentheses)) != -1;

const isOpen: (ch: string) => boolean = (ch: string) =>
  R.indexOf(ch, Object.keys(parentheses)) !== -1;

const hasClosing: (arr: string[], ch: string) => boolean = (
  arr: string[],
  ch: string
) => R.indexOf(parentheses[ch], arr) !== -1;

// "This is ([some]) {text}" ==> [ '(', '[', ']', ')', '{', '}' ]
const onlyPera: (str: string) => string[] = (str: string) =>
  R.filter((ch: string) => isPera(ch), stringToArray(str));

// [ '(', '[', ']', ')', '{', '}' ] ==> true
const isValid: (arr: string[]) => boolean = (arr: string[]) =>
  R.reduce(
    (acc: string[], curr: string) =>
      isOpen(curr) && !hasClosing(acc, curr)
        ? R.tail(acc.concat(curr)) // add curr to the end of acc
        : R.tail(acc), //acc length reduced by 1
    arr,
    arr
  ).length === 0;

export const isPaired: (str: string) => boolean = R.pipe(onlyPera, isValid);

console.log(isPaired("This is ([some]) {text}")); //true
console.log(isPaired("This is ]some[ (text)")); //false
console.log(isPaired("")); // true
console.log(isPaired("This is (]som")); //false
