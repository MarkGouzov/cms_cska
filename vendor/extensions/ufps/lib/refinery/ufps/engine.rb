module Refinery
  module Ufps
    class Engine < Rails::Engine
      include Refinery::Engine
      isolate_namespace Refinery::Ufps

      engine_name :refinery_ufps

      initializer "register refinerycms_ufps plugin" do
        Refinery::Plugin.register do |plugin|
          plugin.name = "ufps"
          plugin.url = proc { Refinery::Core::Engine.routes.url_helpers.ufps_admin_ufps_path }
          plugin.pathname = root
          plugin.activity = {
            :class_name => :'refinery/ufps/ufp'
          }
          
        end
      end

      config.after_initialize do
        Refinery.register_extension(Refinery::Ufps)
      end
    end
  end
end
