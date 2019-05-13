require 'rails_helper'

describe MessagesController do

  #  letを利用してテスト中使用するインスタンスを定義
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id } # messagesのルーティングはgroupsにネストされているため、group_idを含んだパスを生成します。そのため、getメソッドの引数として、params: { group_id: group.id }を渡しています。
      end

      # この中にログインしている場合のテストを記述

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'redners index' do
        expect(response).to render_template :index
      end

    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end
      
      # この中にログインしていない場合のテストを記述

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end

    end
  end

end