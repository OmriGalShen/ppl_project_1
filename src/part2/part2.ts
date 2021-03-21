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
  return R.indexOf(ch.toLowerCase(), vowelList) !== -1;
};

/* Question 2 */
/*
    Write a function runLengthEncoding which takes a string as input and returns a “compressed” version of
    it, where identical consecutive characters appear as the character followed by its count. For example:
    runLengthEncoding("aaaabbbccd"); // ==> 'a4b3c2d'

*/

//"aaaabbbccd"==> [ 'aaaa', 'bbb', 'cc', 'd' ]
const groupConsecutive: (str: string) => string[] = (str: string) =>
  R.groupWith(R.equals, str);

//[ 'aaaa', 'bbb', 'cc', 'd' ] ==> [ 'a4', 'b3', 'c2', 'd1' ]
const addCount: (arr: string[]) => string[] = (arr: string[]) =>
  R.map(
    (x: string) =>
      x.length > 1 ? x.charAt(0) + x.length.toString() : x.charAt(0),
    arr
  );

//[ 'a4', 'b3', 'c2', 'd1' ] ==> a4b3c2d1
const arrToString: (arr: string[]) => string = (arr: string[]) =>
  R.join("", arr);

export const runLengthEncoding: (str: string) => string = R.pipe(
  groupConsecutive,
  addCount,
  arrToString
);

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
      isOpen(curr) && !hasClosing(acc, curr) // invalid: open character without closing
        ? R.tail(acc.concat("")) // acc length stays the same
        : R.tail(acc), //acc length reduced by 1
    arr,
    arr
  ).length === 0; // all the characters were valid

export const isPaired: (str: string) => boolean = R.pipe(onlyPera, isValid);
