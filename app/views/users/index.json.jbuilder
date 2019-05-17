json.array! @users do |user| # JSON形式のデータを配列で返すようにするため、array!メソッドを使用
  json.id user.id
  json.name user.name
end
