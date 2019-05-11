class AddColumnToMessages < ActiveRecord::Migration[5.0]
  def change
    remove_column :messages, :message, :text
    remove_column :messages, :image, :string
    remove_column :messages, :user_id, :integer
    remove_column :messages, :group_id, :integer
    add_column :messages, :content, :string
    add_column :messages, :image, :string
    add_reference :messages, :group, foreign_key: true
    add_reference :messages, :user, foreign_key: true
  end
end
