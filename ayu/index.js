let toggleCanvas = 1;
// let audio = new Audio('./audio.mp3');
$(document).ready(async () => {

    // audio.loop = true;

    // $('input[type=range]').on('input', function () {
    //     $(this).trigger('change');
    // });

    // $('#audio').change(function (e) { 
    //     alert('boop')
    //     audio.volume = $(this).value / 100;
    // });

    // audio.play()

    $('#ayu').mouseover(function (e) {
        $('#gif').css('opacity', 1);
    });

    $('#ayu').mouseleave(function (e) {
        $('#gif').css('opacity', 0);
    });

    $('#ayu').click(function(e) {
        e.preventDefault();
        $('#ayumoment > canvas').css('opacity', toggleCanvas);
        toggleCanvas == 0 ? toggleCanvas = 1 : toggleCanvas = 0;
    })

    let randomWord = await request("https://random-word-api.herokuapp.com/word?swear=1", {})
    let translatedWord = await request("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: randomWord,
            source: "en",
            target: "ja",
            format: "text"
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    let definition = await request(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    let jpw = translatedWord.translatedText[0]
    $('#writing').append(`<p>Kana : ${wanakana.toKana(jpw)}</p><p>Katakana : ${wanakana.toKatakana(jpw)}</p><p>Hiragana : ${wanakana.toHiragana(jpw)}</p><p>Romaji : ${wanakana.toRomaji(jpw)}</p>`)
    $('#word').html(jpw + " - " + randomWord);
    $("#def").text(definition ? definition[0].meanings[0].partOfSpeech + " - " + definition[0].meanings[0].definitions[0].definition : "Sorry - Definition Unavailable")
});

async function request(url, options) {
    let returnValue = 0;
    await fetch(url, options).then(res => {
        if (!res.ok) {
            throw new Error("HTTP error " + res.status);
        }
        return res.json();
    }).then(json => {
        returnValue = json
    }).catch(err => {
        console.log(err);
    })
    return returnValue;
}