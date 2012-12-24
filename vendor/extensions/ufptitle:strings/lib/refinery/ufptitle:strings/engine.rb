module Refinery
  module Ufptitle:strings
    class Engine < Rails::Engine
      include Refinery::Engine
      isolate_namespace Refinery::Ufptitle:strings

      engine_name :refinery_ufptitle:strings

      initializer "register refinerycms_ufptitle:strings plugin" do
        Refinery::Plugin.register do |plugin|
          plugin.name = "ufptitle:strings"
          plugin.url = proc { Refinery::Core::Engine.routes.url_helpers.ufptitle:strings_admin_ufptitle:strings_path }
          plugin.pathname = root
          plugin.activity = {
            :class_name => :'refinery/ufptitle:strings/ufptitle:string'
          }
          
        end
      end

      config.after_initialize do
        Refinery.register_extension(Refinery::Ufptitle:strings)
      end
    end
  end
end
