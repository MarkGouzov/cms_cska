Refinery::Core::Engine.routes.append do

  # Frontend routes
  namespace :ufptitle:strings do
    resources :ufptitle:strings, :path => '', :only => [:index, :show]
  end

  # Admin routes
  namespace :ufptitle:strings, :path => '' do
    namespace :admin, :path => 'refinery' do
      resources :ufptitle:strings, :except => :show do
        collection do
          post :update_positions
        end
      end
    end
  end

end
