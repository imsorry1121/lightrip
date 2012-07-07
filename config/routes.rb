LightripD1::Application.routes.draw do
  resources :users
  post '/share_backstage' => 'home#share_backstage'
  post '/save' => 'schedules#save'
  post '/save_rewrite' => 'schedules#save_rewrite'
  get '/open' => 'schedules#show_user_schedule'
  get '/post' => 'schedules#postSchedule'
  resources :schedules
  get '/lightrip' => 'home#lightrip'
  #post '/save' => 'schedules#save'
  get '/login' => 'home#login'
  get '/logout' => 'home#logout'
  get '/info' => 'home#info'
  get '/' => 'home#index', :as => :home
  get "/spots/new_backstage" => "spots#new_backstage"
  get "/img/:id" => "spots#showing"
  resources :spots
  get "/step3" => "home#step3"
  
  #get "lightrip/index"
  get "/lightrip" => "lightrip#index"
  #post "/" => "home#smart"
  get "home/index"
  get "/share/:sid" => "home#share_schedule"
  post "/remove" => "schedules#remove"
  get '/:sid'=>"home#index"
  #get '/' => 'home#info'


  #post "/attr" => "home#attr"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
   root :to => 'home#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
