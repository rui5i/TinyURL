const getShortUrl = function(longUrl) {
    return base10ToBase62(longUrl);
}

const base10ToBase62 = function(num) {
    const symbolArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let shortUrl = '';
    let r = 0;
    num++;

    while (num != 0) {
        r = --num % 62;
        num = Math.floor(num / 62);
        shortUrl = symbolArray[r] + shortUrl;
    }

    return shortUrl;
}

module.exports = {
    getShortUrl: getShortUrl
};
