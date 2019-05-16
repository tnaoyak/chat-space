$(function(){

  function buildHTML(message){
    var html = `<div class="chat-area__post-area__post__message">
                  <div class="chat-area__post-area__post__message__contributor">
                    <p class="chat-area__post-area__post__message__contributor__name">
                      ${message.user_name}
                    </p>`

    // 日時フォーマットを指定する関数
    function datetostr(date, format, is12hours) {
      var weekday = ["日", "月", "火", "水", "木", "金", "土"];
      if (!format) {
          format = 'YYYY/MM/DD(WW) hh:mm:dd'
      }
      var year = date.getFullYear();
      var month = (date.getMonth() + 1);
      var day = date.getDate();
      var weekday = weekday[date.getDay()];
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var secounds = date.getSeconds();

      // var ampm = hours < 12 ? 'AM' : 'PM';
      // if (is12hours) {
      //     hours = hours % 12;
      //     hours = (hours != 0) ? hours : 12; // 0時は12時と表示する
      // }

      var replaceStrArray =
          {
              'YYYY': year,
              'Y': year,
              'MM': ('0' + (month)).slice(-2),
              'M': month,
              'DD': ('0' + (day)).slice(-2),
              'D': day,
              'WW': weekday,
              'hh': ('0' + hours).slice(-2),
              'h': hours,
              'mm': ('0' + minutes).slice(-2),
              'm': minutes,
              'ss': ('0' + secounds).slice(-2),
              's': secounds,
              // 'AP': ampm,
          };

      var replaceStr = '(' + Object.keys(replaceStrArray).join('|') + ')';
      var regex = new RegExp(replaceStr, 'g');

      ret = format.replace(regex, function (str) {
          return replaceStrArray[str];
      });

      return ret;
  }
    html += `<div class="chat-area__post-area__post__message__contributor__date">
                ${datetostr(new Date(message.created_at), 'Y/MM/DD hh:mm', false)}
            </div>
          </div>
          <di class="chat-area__post-area__post__message__text">`


    if(message.content) {
      html += `<div>${message.content}</div>`;
    }
    if(message.image) {
      html += `<img src=${message.image}>`;
    }
    html += `</div>
          </div>`

    return html;
  }

  $("#chat-form").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-area__post-area__post").append(html);
      $(".chat-footer__box__form__text").val("");
      $(".chat-footer__box__form__icon__btn").val("");
      $('.chat-area__post-area__post').animate({ scrollTop: $('.chat-area__post-area__post')[0].scrollHeight });
    })
    .fail(function(){
      alert("メッセージを入力してください。");
    })
    return false; // falseを返すことでformのPOSTを止めて、createアクションのsaveとダブってデータベースに二重で投稿されないようにしている
  })
});