class ApplicationController < ActionController::Base
  def login
    redirect_to home_path
  end

private
  def load_facebook
    rest_graph_setup(:write_session => true)
  end

  def login_facebook
    rest_graph_setup(:auto_authorize         => true,
                     :auto_authorize_scope   => 'publish_checkins,publish_stream',#設定要改成什麼?
                     :ensure_authorized      => true,
                     :write_session          => true)
  end

  def filter_setup_rest_graph
    rest_graph_setup(:auto_authorize => true,
                      :auto_authorize_scope   => 'read_stream')
  end

  def filter_cache
    rest_graph_setup(:cache => Rails.cache)
  end

end
