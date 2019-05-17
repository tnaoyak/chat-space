$(function() {
  // 検索結果の表示
  var search_result = $("#user-search-result");

  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_result.append(html);
  }

  // 一致するもの無い時のメッセージ表示
  function appendErrMsgToHTML(msg) {
    var html = `<p>${ msg }</p>`
    search_result.append(html);
  }

  // 追加押した後メンバー欄に表示する処理
  var add_result = $("#chat-group-users");

  function appendMember(user) {
    var html_add = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                      <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                      <p class='chat-group-user__name'>${user.name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
    add_result.append(html_add);
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

      $(document).on("click", ".chat-group-user__btn--add", function(){ // 「追加」がクリックされた時
        var add_event = $(this).parent();                               // 「追加」の親要素取得
        $(add_event).remove();
        var select_id = $(this).data("user-id");
        var select_name = $(this).data("user-name");
        var select = { id: select_id, name: select_name };
        appendMember(select);
      })

      $(document).on("click", ".chat-group-user__btn--remove", function(){ // 「削除」がクリックされた時
        var delete_event = $(this).parent();                               // 「削除」の親要素取得
        $(delete_event).remove();
      })

      if (input.length !== 0 && users.length === 0 ) {     // input配列内の要素数が0ではない時（入力値がある時） & 検索結果が0の時（存在しない時）
        appendErrMsgToHTML("一致する名前はありません");
      }
      else if (input.length !== 0) {          // input配列内の要素数が0ではない時（入力値がある時）
        users.forEach(function(user){         // forEachメソッドを用いて、userの中身の数だけappendProduct関数を呼び出す
          appendProduct(user);
        });
      }
      
    })
    .fail(function() {
      alert('名前検索に失敗しました');
    })
  })

})

