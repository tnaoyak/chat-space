$(function() {

  var search_result = $("#user-search-result");

  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_result.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<p>${ msg }</p>`
    search_result.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();       // search__queryのvalue属性（つまり入力値）を取得
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {                                // user情報が配列で返ってきて、usersに代入されている
      $("#user-search-result").empty();                    // すでに表示されている名前を削除
      if (input.length !== 0 && users.length === 0 ) {     // input配列内の要素数が0ではない時（入力値がある時） & 検索結果が0の時（存在しない時）
        appendErrMsgToHTML("一致する名前はありません");
      }
      else if (input.length !== 0) {          // input配列内の要素数が0ではない時（入力値がある時）
        users.forEach(function(user){         // forEachメソッドを用いて、inputの中身の数だけappendProduct関数を呼び出す
          appendProduct(user);
        });
      }
    })
    .fail(function() {
      alert('名前検索に失敗しました');
    })
  })
})