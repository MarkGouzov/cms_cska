Refinery::Core::Engine.routes.append do

  # Frontend routes
  namespace :ufps do
    resources :ufps, :path => '', :only => [:index, :show]
  end

  # Admin routes
  namespace :ufps, :path => '' do
    namespace :admin, :path => 'refinery' do
      resources :ufps, :except => :show do
        collection do
          post :update_positions
        end
      end
    end
  end

end
