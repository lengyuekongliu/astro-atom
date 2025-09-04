export interface ReadingTimeOptions {
  /** 中文每分钟阅读速度 (默认 350 字/分钟) */
  charsPerMinute?: number;
  /** 英文每分钟阅读速度 (默认 200 词/分钟) */
  wordsPerMinute?: number;
  /** 最少显示的分钟数 (默认 1) */
  minMinutes?: number;
}

export interface ReadingTimeResult {
  /** 例如 "3 分钟阅读" */
  text: string;
  /** 精确分钟数，可能是小数 */
  minutes: number;
  /** 毫秒数 */
  time: number;
  /** 中文字符数 */
  characters: number;
  /** 英文单词数 */
  words: number;
}

export default function readingTime(
  text: string | undefined = "",
  options: ReadingTimeOptions = {}
): ReadingTimeResult {
  const {
    charsPerMinute = 350,
    wordsPerMinute = 200,
    minMinutes = 1
  } = options;

  if (typeof text !== "string") {
    throw new Error("reading-time-cn: text must be a string");
  }

  // 匹配中文字符
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 匹配英文单词
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

  // 分别计算时间
  const minutes = chineseChars / charsPerMinute + englishWords / wordsPerMinute;
  const resultMinutes = Math.max(minMinutes, Math.ceil(minutes));

  return {
    text: `${resultMinutes} 分钟阅读`,
    minutes,
    time: minutes * 60 * 1000,
    characters: chineseChars,
    words: englishWords
  };
}