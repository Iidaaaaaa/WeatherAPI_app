const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
let isJumping = false;
let decreaseAmount = 0.1;
let speed = 2;
let gameStarted = false;
let gameInterval;
window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && !isJumping) {
    jump();
  }
});

const prefectureCode = document.getElementById("prefecture-select").value;
const weekUrl = `https://www.jma.go.jp/bosai/forecast/data/forecast/${prefectureCode}.json`;

fetch(weekUrl).then(function (response) {
  if (response.status !== 200) {
    console.log("問題がありました。ステータスコード:" + response.status);
    return;
  }
  response.json().then(function (data) {
    // 天気のデータを取得
    const weatherData = data[0].timeSeries;
    console.log(weatherData);

    // 明日の日付を取得
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 明日の天気を取得
    const tomorrowWeather = weatherData.find((item) => {
      const date = new Date(item.time);
      return date.getDate() === tomorrow.getDate();
    });

    if (tomorrowWeather) {
      // 明日の天気をコンソールに表示
      console.log(`明日の天気: ${tomorrowWeather.weather}`);
    }
  });
});

function jump() {
  let position = 0;
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 240) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 10;
      dino.style.bottom = position + "px";
    }
  }, 20);
  let eeyan = new Audio("eeyan.m4a");
  eeyan.play();
}
window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && !isJumping) {
    jump();
  }
  if (e.key === " " && !gameStarted) {
    startGame();
    gameStarted = true;
  }
});
setInterval(() => {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  const isIntersecting = !(
    dinoRect.right < obstacleRect.left ||
    dinoRect.left > obstacleRect.right ||
    dinoRect.bottom < obstacleRect.top ||
    dinoRect.top > obstacleRect.bottom
  );

  if (isIntersecting) {
    let damage = new Audio("damage.m4a");
    damage.play();
    obstacle.style.animation = "none";
    setTimeout(() => {
      alert("Game Over Command + R でリロードしてください");
    }, 50); // 1秒後にアラートを表示
  }
}, 10);
// --------------
document.getElementById("start-button").addEventListener("click", () => {
  let audio = new Audio("start.m4a");
  audio.play();
  const obstacle = document.querySelector("#obstacle");
  obstacle.style.animation = "move 2s infinite linear";
  fetch(weekUrl).then(function (response) {
    if (response.status !== 200) {
      console.log("問題がありました。ステータスコード:" + response.status);
      return;
    }
    response.json().then(function (data) {
      const Data = data[1].tempAverage.areas[0].area.code;
      const Dataarea = document.querySelector(".data");
      Dataarea.textContent = Data;

      let score = 0;
      const scoreElement = document.querySelector(".score");
      let incrementPerMillisecond = 8000 / 1000;
      const intervalId = setInterval(() => {
        score += incrementPerMillisecond;
        scoreElement.textContent = Math.floor(score);
        if (score >= Data) {
          clearInterval(intervalId);
          let clear = new Audio("clear.m4a");
          clear.play();
          setTimeout(() => {
            alert("clear!");
          }, 50); // 1秒後にアラートを表示
          incrementPerMillisecond = 0 / 0;
          obstacle.style.animation = "none";

          const prefectureCode =
            document.getElementById("prefecture-select").value;
          const weekUrl = `https://www.jma.go.jp/bosai/forecast/data/forecast/${prefectureCode}.json`;

          fetch(weekUrl).then(function (response) {
            if (response.status !== 200) {
              console.log(
                "問題がありました。ステータスコード:" + response.status
              );
              return;
            }
            response.json().then(function (data) {
              const tenki = data[1].timeSeries[0].areas[0].weatherCodes[1];
              setTimeout(() => {
                console.log(tenki);
                switch (prefectureCode) {
                  case "230000":
                    switch (tenki) {
                      case "100":
                        alert("今日の愛知県の天気は晴れです");
                        break;
                      case "101":
                        alert("今日の愛知県の天気は晴れ 時々 くもりです");
                        break;
                      case "102":
                        alert("今日の愛知県の天気は晴れ 一時 雨です");
                        break;
                      case "103":
                        alert("今日の愛知県の天気は晴れ 時々 雨です");
                        break;
                      case "104":
                        alert("今日の愛知県の天気は晴れ 一時 雪です");
                        break;
                      case "105":
                        alert("今日の愛知県の天気は晴れ 時々 雪です");
                        break;
                      case "106":
                        alert("今日の愛知県の天気は晴れ 一時 雨か雪です");
                        break;
                      case "107":
                        alert("今日の愛知県の天気は晴れ 時々 雨か雪です");
                        break;
                      case "108":
                        alert("今日の愛知県の天気は晴れ 一時 雨か雷雨です");
                        break;
                      case "110":
                        alert("今日の愛知県の天気は晴れ のち時々くもりです");
                        break;
                      case "111":
                        alert("今日の愛知県の天気は晴れ のち くもりです");
                        break;
                      case "112":
                        alert("今日の愛知県の天気は晴れ のち一時 雨です");
                        break;
                      case "113":
                        alert("今日の愛知県の天気は晴れ のち時々 雨です");
                        break;
                      case "114":
                        alert("今日の愛知県の天気は晴れ のち 雨です");
                        break;
                      case "115":
                        alert("今日の愛知県の天気は晴れ のち一時 雪です");
                        break;
                      case "116":
                        alert("今日の愛知県の天気は晴れ のち時々 雪です");
                        break;
                      case "117":
                        alert("今日の愛知県の天気は晴れ のち 雪です");
                        break;
                      case "118":
                        alert("今日の愛知県の天気は晴れ のち 雨か雪です");
                        break;
                      case "119":
                        alert("今日の愛知県の天気は晴れ のち 雨か雷雨です");
                        break;
                      case "120":
                        alert("今日の愛知県の天気は晴れ 朝夕 一時 雨です");
                        break;
                      case "121":
                        alert("今日の愛知県の天気は晴れ 朝の内一時 雨です");
                        break;
                      case "122":
                        alert("今日の愛知県の天気は晴れ 夕方一時 雨です");
                        break;
                      case "123":
                        alert("今日の愛知県の天気は晴れ 山沿い 雷雨です");
                        break;
                      case "124":
                        alert("今日の愛知県の天気は晴れ 山沿い 雪です");
                        break;
                      case "125":
                        alert("今日の愛知県の天気は晴れ 午後は雷雨です");
                        break;
                      case "126":
                        alert("今日の愛知県の天気は晴れ 昼頃から雨です");
                        break;
                      case "127":
                        alert("今日の愛知県の天気は晴れ 夕方から雨です");
                        break;
                      case "128":
                        alert("今日の愛知県の天気は晴れ 夜は雨です");
                        break;
                      case "129":
                        alert("今日の愛知県の天気は晴れ 夜半から雨です");
                        break;
                      case "130":
                        alert("今日の愛知県の天気は朝の内 霧 後 晴れです");
                        break;
                      case "131":
                        alert("今日の愛知県の天気は晴れ 明け方 霧です");
                        break;
                      case "132":
                        alert("今日の愛知県の天気は晴れ 朝夕 くもりです");
                        break;
                      case "140":
                        alert("今日の愛知県の天気は晴れ 時々 雨で雷を伴うです");
                        break;
                      case "160":
                        alert("今日の愛知県の天気は晴れ 一時 雪か雨です");
                        break;
                      case "170":
                        alert("今日の愛知県の天気は晴れ 時々 雪か雨です");
                        break;
                      case "181":
                        alert("今日の愛知県の天気は晴れ のち 雪か雨です");
                        break;
                      case "200":
                        alert("今日の愛知県の天気はくもりです");
                        break;
                      case "201":
                        alert("今日の愛知県の天気はくもり 時々 晴れです");
                        break;
                      case "202":
                        alert("今日の愛知県の天気はくもり 一時 雨です");
                        break;
                      case "203":
                        alert("今日の愛知県の天気はくもり 時々 雨です");
                        break;
                      case "204":
                        alert("今日の愛知県の天気はくもり 一時 雪です");
                        break;
                      case "205":
                        alert("今日の愛知県の天気はくもり 時々 雪です");
                        break;
                      case "206":
                        alert("今日の愛知県の天気はくもり 一時 雨か雪です");
                        break;
                      case "207":
                        alert("今日の愛知県の天気はくもり 時々 雨か雪です");
                        break;
                      case "208":
                        alert("今日の愛知県の天気はくもり 一時 雨か雷雨です");
                        break;
                      case "209":
                        alert("今日の愛知県の天気は霧です");
                        break;
                      case "210":
                        alert("今日の愛知県の天気はくもり のち時々 晴れです");
                        break;
                      case "211":
                        alert("今日の愛知県の天気はくもり のち 晴れです");
                        break;
                      case "212":
                        alert("今日の愛知県の天気はくもり のち一時 雨です");
                        break;
                      case "213":
                        alert("今日の愛知県の天気はくもり のち時々 雨です");
                        break;
                      case "214":
                        alert("今日の愛知県の天気はくもり のち 雨です");
                        break;
                      case "215":
                        alert("今日の愛知県の天気はくもり のち一時 雪です");
                        break;
                      case "216":
                        alert("今日の愛知県の天気はくもり のち時々 雪です");
                        break;
                      case "217":
                        alert("今日の愛知県の天気はくもり のち 雪です");
                        break;
                      case "218":
                        alert("今日の愛知県の天気はくもり のち 雨か雪です");
                        break;
                      case "219":
                        alert("今日の愛知県の天気はくもり のち 雨か雷雨です");
                        break;
                      case "220":
                        alert("今日の愛知県の天気はくもり 朝夕一時 雨です");
                        break;
                      case "221":
                        alert("今日の愛知県の天気はくもり 朝の内一時 雨です");
                        break;
                      case "222":
                        alert("今日の愛知県の天気はくもり 夕方一時 雨です");
                        break;
                      case "223":
                        alert("今日の愛知県の天気はくもり 日中時々 晴れです");
                        break;
                      case "224":
                        alert("今日の愛知県の天気はくもり 昼頃から雨です");
                        break;
                      case "225":
                        alert("今日の愛知県の天気はくもり 夕方から雨です");
                        break;
                      case "226":
                        alert("今日の愛知県の天気はくもり 夜は雨です");
                        break;
                      case "227":
                        alert("今日の愛知県の天気はくもり 夜半から雨です");
                        break;
                      case "228":
                        alert("今日の愛知県の天気はくもり 昼頃から雪です");
                        break;
                      case "229":
                        alert("今日の愛知県の天気はくもり 夕方から雪です");
                        break;
                      case "230":
                        alert("今日の愛知県の天気はくもり 夜は雪です");
                        break;
                      case "231":
                        alert(
                          "今日の愛知県の天気はくもり海上海岸は霧か霧雨です"
                        );
                        break;
                      case "240":
                        alert(
                          "今日の愛知県の天気はくもり 時々雨で 雷を伴うです"
                        );
                        break;
                      case "250":
                        alert(
                          "今日の愛知県の天気はくもり 時々雪で 雷を伴うです"
                        );
                        break;
                      case "260":
                        alert("今日の愛知県の天気はくもり 一時 雪か雨です");
                        break;
                      case "270":
                        alert("今日の愛知県の天気はくもり 時々 雪か雨です");
                        break;
                      case "281":
                        alert("今日の愛知県の天気はくもり のち 雪か雨です");
                        break;
                      case "300":
                        alert("今日の愛知県の天気は雨です");
                        break;
                      case "301":
                        alert("今日の愛知県の天気は雨 時々 晴れです");
                        break;
                      case "302":
                        alert("今日の愛知県の天気は雨 時々 止むです");
                        break;
                      case "303":
                        alert("今日の愛知県の天気は雨 時々 雪です");
                        break;
                      case "304":
                        alert("今日の愛知県の天気は雨か雪です");
                        break;
                      case "306":
                        alert("今日の愛知県の天気は大雨です");
                        break;
                      case "307":
                        alert("今日の愛知県の天気は風雨共に強いです");
                        break;
                      case "308":
                        alert("今日の愛知県の天気は雨で暴風を伴うです");
                        break;
                      case "309":
                        alert("今日の愛知県の天気は雨 一時 雪です");
                        break;
                      case "311":
                        alert("今日の愛知県の天気は雨 のち 晴れです");
                        break;
                      case "313":
                        alert("今日の愛知県の天気は雨 のち くもりです");
                        break;
                      case "314":
                        alert("今日の愛知県の天気は雨 のち時々 雪です");
                        break;
                      case "315":
                        alert("今日の愛知県の天気は雨 のち 雪です");
                        break;
                      case "316":
                        alert("今日の愛知県の天気は雨か雪 のち 晴れです");
                        break;
                      case "317":
                        alert("今日の愛知県の天気は雨か雪 のち くもりです");
                        break;
                      case "320":
                        alert("今日の愛知県の天気は朝の内雨 のち 晴れです");
                        break;
                      case "321":
                        alert("今日の愛知県の天気は朝の内雨 のち くもりです");
                        break;
                      case "322":
                        alert("今日の愛知県の天気は雨 朝晩一時 雪です");
                        break;
                      case "323":
                        alert("今日の愛知県の天気は雨 昼頃から 晴れです");
                        break;
                      case "324":
                        alert("今日の愛知県の天気は雨 夕方から 晴れです");
                        break;
                      case "325":
                        alert("今日の愛知県の天気は雨 夜は晴です");
                        break;
                      case "326":
                        alert("今日の愛知県の天気は雨 夕方から雪です");
                        break;
                      case "327":
                        alert("今日の愛知県の天気は雨 夜は雪です");
                        break;
                      case "328":
                        alert("今日の愛知県の天気は雨 一時強く降るです");
                        break;
                      case "329":
                        alert("今日の愛知県の天気は雨 一時 みぞれです");
                        break;
                      case "340":
                        alert("今日の愛知県の天気は雪か雨です");
                        break;
                      case "350":
                        alert("今日の愛知県の天気は雨で雷を伴うです");
                        break;
                      case "361":
                        alert("今日の愛知県の天気は雪か雨 のち 晴れです");
                        break;
                      case "371":
                        alert("今日の愛知県の天気は雪か雨 のち くもりです");
                        break;
                      case "400":
                        alert("今日の愛知県の天気は雪です");
                        break;
                      case "401":
                        alert("今日の愛知県の天気は雪 時々 晴れです");
                        break;
                      case "402":
                        alert("今日の愛知県の天気は雪 時々止むです");
                        break;
                      case "403":
                        alert("今日の愛知県の天気は雪 時々 雨です");
                        break;
                      case "405":
                        alert("今日の愛知県の天気は大雪です");
                        break;
                      case "406":
                        alert("今日の愛知県の天気は風雪強いです");
                        break;
                      case "407":
                        alert("今日の愛知県の天気は暴風雪です");
                        break;
                      case "409":
                        alert("今日の愛知県の天気は雪 一時 雨です");
                        break;
                      case "411":
                        alert("今日の愛知県の天気は雪 のち 晴れです");
                        break;
                      case "413":
                        alert("今日の愛知県の天気は雪 のち くもりです");
                        break;
                      case "414":
                        alert("今日の愛知県の天気は雪 のち 雨です");
                        break;
                      case "420":
                        alert("今日の愛知県の天気は朝の内雪 のち 晴れです");
                        break;
                      case "421":
                        alert("今日の愛知県の天気は朝の内雪 のち くもりです");
                        break;
                      case "422":
                        alert("今日の愛知県の天気は雪 昼頃から雨です");
                        break;
                      case "423":
                        alert("今日の愛知県の天気は雪 夕方から雨です");
                        break;
                      case "424":
                        alert("今日の愛知県の天気は雪 夜半から雨です");
                        break;
                      case "425":
                        alert("今日の愛知県の天気は雪 一時強く降るです");
                        break;
                      case "426":
                        alert("今日の愛知県の天気は雪 のち みぞれです");
                        break;
                      case "427":
                        alert("今日の愛知県の天気は雪 一時 みぞれです");
                        break;
                      case "450":
                        alert("今日の愛知県の天気は雪で雷を伴うです");
                        break;
                      default:
                        alert("不明な天気コードです");
                    }
                    break;
                  case "210000":
                    switch (tenki) {
                      case "100":
                        alert("今日の岐阜県の天気は晴れです");
                        break;
                      case "200":
                        alert("今日の岐阜県の天気は曇りです");
                        break;
                      case "300":
                        alert("今日の岐阜県の天気は雨です");
                        break;
                      case "400":
                        alert("今日の岐阜県の天気は雪です");
                        break;
                    }
                    break;
                  case "240000":
                    switch (tenki) {
                      case "100":
                        alert("今日の三重県の天気は晴れです");
                        break;
                      case "200":
                        alert("今日の三重県の天気は曇りです");
                        break;
                      case "300":
                        alert("今日の三重県の天気は雨です");
                        break;
                      case "400":
                        alert("今日の三重県の天気は雪です");
                        break;
                    }
                    break;
                  case "220000":
                    switch (tenki) {
                      case "100":
                        alert("今日の静岡県の天気は晴れです");
                        break;
                      case "200":
                        alert("今日の静岡県の天気は曇りです");
                        break;
                      case "300":
                        alert("今日の静岡県の天気は雨です");
                        break;
                      case "400":
                        alert("今日の静岡県の天気は雪です");
                        break;
                    }
                    break;
                  default:
                    alert("天気情報が取得できませんでした");
                }
              }, 50); // 1秒後にアラートを表示
            });
          });
        }
      }, 1);
    });
  });
});
