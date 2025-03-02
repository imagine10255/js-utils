import {htmlTags} from './config';

/**
 * 文本中的每個單詞以大寫字母開頭
 * ex: helloWorld -> HelloWorld
 *
 * @param str 需要轉換的字串
 */
export function toCapitalize(str: string): string {
    return str.replace(/\b(\w)/g, $1 => $1.toUpperCase());
}


/**
 * 大寫底線轉小駝峰
 * ex: Hello_World -> helloWorld
 *
 * @param str 需要轉換的字串
 */
export function upperLineToLowerCase(str: string): string {
    return str.toLowerCase().replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}


/**
 * -轉小駝峰
 * ex: Hello_World -> helloWorld
 *
 * @param str 需要轉換的字串
 *
 */
export function dashToLowerCase(str: string) {
    return str.toLowerCase().replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}


/**
 * 語言代碼格式轉換
 * ex: en-us -> en-US
 *
 * @param localeCode 需要轉換的字串lowerLocaleToISOCode
 */
export function lowerLocaleToISOCode(localeCode: string) {
    const result = localeCode.replace(/\-(.*)/g, $1 => $1.toUpperCase());
    return result.replace(/(.*)+\-/g, $1 => $1.toLowerCase());
}



/**
 * 小駝峰轉小寫底線
 * ex: helloWorld -> HELLO_WORLD
 *
 * @param str 需要轉換的字串
 */
export function lowerCaseToLowerDashCase(str: string): string {
    return str.replace(/([A-Z])/g,'-$1').toLowerCase();
}

/**
 * 小駝峰轉大寫底線
 * ex: helloWorld -> HELLO_WORLD
 *
 * @param str 需要轉換的字串
 */
export function lowerCaseToUpLineCase(str: string): string {
    return str.replace(/([A-Z])/g,'_$1').toUpperCase();
}





/**
 * 字串分割 (發生例外錯誤回傳 空陣列)
 *
 * @param str
 * @param separator
 */
export function stringSplit(str: string, separator: string): string[]{

    try {
        return str.split(separator);
    } catch (err) {}

    return [];
}



/**
 * Json Decode
 * ex: {'name':'jack"} -> {
 *     name: 'jack'
 * }
 *
 * @param jsonString
 */
export function jsonDecode<T = unknown>(jsonString: string): T|undefined{
    try {
        const obj = JSON.parse(jsonString);
        if (obj && typeof obj === 'object' && obj !== null) {
            return obj;
        }
    } catch (err) {}

    return undefined;
}



/**
 * 去頭去尾
 * @param str
 * @param startStr
 * @param endStr
 */
export function removeStartEnd(str: string, startStr: string, endStr: string): string {
    const regRule = `\\${startStr}|\\${endStr}`;
    const reg = new RegExp(`^${regRule}$`,'g');
    return str.replace(reg, '');
}


/**
 * 去除undefined value
 * @param obj
 */
export function removeUndefinedValues(obj: any) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value !== undefined)
    );
}



/**
 * 去除 Html tag
 * @param htmlStr 要被過濾的字串
 * @param whileTag 想保留的 Tag
 */
export function removeHtmlTag(htmlStr: string|number, whileTag?: string[]){
    const removeTag = whileTag && whileTag?.length > 0 ? htmlTags.filter(tag => !whileTag.includes(tag)) : htmlTags;
    let tmpStr = htmlStr.toString();
    for(const tag of removeTag){
        const regex = new RegExp('<' + tag + '.*?>|<\\/' + tag + '>', 'gi');
        tmpStr = tmpStr.replace(regex, '');
    }
    return tmpStr;
}



/**
 * 過濾只剩下數字
 * ex: asd1234 -> 1234
 *
 * @param value
 * @param defaultValue
 */
export function filterNumber(value: any, defaultValue = 0): number {
    const reg = new RegExp(/^\d+$/);
    if(reg.test(value)){
        return Number(value);
    }

    return defaultValue;
}

/**
 * 解析分離字串和數字(包含浮點數與負數)
 * expect(decodeStrAndNumber('a-45.22-35.21')).toBe(['a', -45.22, -35.21]);
 *
 * @param value
 */
export function decodeStrAndNumber(value: string): Array<string|number> {
    const reg = /(-?\d+(\.\d+)?)/g;
    const num = value.match(reg);
    const str = value.replace(reg, '').trim();
    return [str, ...num?.map(Number) ?? []];
}


/**
 * 解析分離字串和數字(包含浮點數與負數)
 * expect(decodeStrAndNumber('a-45.22-35.21')).toBe(['a', -45.22, -35.21]);
 *
 * @param value
 */
export function decodeStrAndNumberGroup(value: string): Array<string|number> {
    const res =  value.match(/[a-df-z][^a-df-z]*/ig) || [];
    return res.map(row => row.trim());
}
